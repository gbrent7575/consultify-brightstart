const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface QuoteRequest {
  name: string;
  company: string;
  email: string;
  phone: string;
  platform: string;
  message?: string;
  source_page?: string;
  referral_source?: string;
  brief_opt_in?: boolean;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function validate(body: any): { ok: true; data: QuoteRequest } | { ok: false; error: string } {
  if (!body || typeof body !== "object") return { ok: false, error: "Invalid body" };
  const required = ["name", "company", "phone", "platform"] as const;
  for (const f of required) {
    if (typeof body[f] !== "string" || body[f].trim().length === 0) {
      return { ok: false, error: `Missing field: ${f}` };
    }
    if (body[f].length > 500) return { ok: false, error: `Field too long: ${f}` };
  }
  if (typeof body.email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim()) || body.email.length > 255) {
    return { ok: false, error: "Invalid email" };
  }
  if (body.phone.replace(/\D/g, "").length < 10) {
    return { ok: false, error: "Invalid phone" };
  }
  if (body.referral_source && (typeof body.referral_source !== "string" || body.referral_source.length > 100)) {
    return { ok: false, error: "Invalid referral_source" };
  }
  if (body.message && (typeof body.message !== "string" || body.message.length > 2000)) {
    return { ok: false, error: "Invalid message" };
  }
  return {
    ok: true,
    data: {
      name: body.name.trim(),
      company: body.company.trim(),
      email: body.email.trim(),
      phone: body.phone.trim(),
      platform: body.platform.trim(),
      message: body.message?.trim() || "",
      source_page: body.source_page?.trim() || "",
      referral_source: body.referral_source?.trim() || "",
      brief_opt_in: body.brief_opt_in === true,
    },
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not configured");

    const body = await req.json();

    // Bot drop: honeypot filled or submitted too fast. elapsed_ms is optional
    // so older published forms that don't send it still work.
    if (
      (body && typeof body.website === "string" && body.website.length > 0) ||
      (body && typeof body.elapsed_ms === "number" && body.elapsed_ms < 3000)
    ) {
      console.log("dropped: bot");
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const result = validate(body);
    if (!result.ok) {
      return new Response(JSON.stringify({ error: result.error }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const { name, company, email, phone, platform, message, source_page, referral_source, brief_opt_in } = result.data;

    let briefAdded = false;
    let briefError = "";
    if (brief_opt_in) {
      try {
        const parts = name.split(/\s+/);
        const first_name = parts[0];
        const last_name = parts.slice(1).join(" ");
        const cRes = await fetch("https://api.resend.com/contacts", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
          body: JSON.stringify({
            email,
            first_name,
            ...(last_name ? { last_name } : {}),
            unsubscribed: false,
            segments: ["75965ea4-3421-477d-bcbd-b8d2f43634d4"],
            topics: [{ id: "f63fbb35-f1bd-449d-80b4-829902ded29a", subscription: "opt_in" }],
          }),
        });
        if (cRes.ok) {
          briefAdded = true;
        } else {
          const t = await cRes.text().catch(() => "");
          briefError = `${cRes.status} ${t}`.slice(0, 200);
          console.error("Resend contact error", briefError);
        }
      } catch (err) {
        briefError = (err instanceof Error ? err.message : String(err)).slice(0, 200);
        console.error("Resend contact exception", briefError);
      }
    }
    const briefLine = brief_opt_in
      ? `Yes${briefAdded ? "" : ` (not added automatically — add by hand; Resend said: ${escapeHtml(briefError || "unknown error")})`}`
      : "No";

    const html = `
      <h2>New ISN Compliance Quote Request</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Company:</strong> ${escapeHtml(company)}</p>
      ${email ? `<p><strong>Email:</strong> ${escapeHtml(email)}</p>` : ""}
      <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Platforms Needed:</strong> ${escapeHtml(platform)}</p>
      ${referral_source ? `<p><strong>How they heard about us:</strong> ${escapeHtml(referral_source)}</p>` : ""}
      <p><strong>Wants the Monthly Safety Brief:</strong> ${briefLine}</p>
      ${source_page ? `<p><strong>Source Page:</strong> ${escapeHtml(source_page)}</p>` : ""}
      ${message ? `<p><strong>Message:</strong><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>` : ""}
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Cornerstone Website <onboarding@resend.dev>",
        to: ["garland@cornerstoneriskmgt.com"],
        ...(email ? { reply_to: email } : {}),
        subject: `${platform} Quote Request — ${company}`,
        html,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("Resend error", res.status, data);
      throw new Error(`Email send failed [${res.status}]`);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    console.error("send-isn-quote error:", msg);
    return new Response(JSON.stringify({ success: false, error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
