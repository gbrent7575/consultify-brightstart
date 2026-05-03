import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";

interface QuoteRequest {
  name: string;
  company: string;
  email: string;
  phone: string;
  platform: string;
  message?: string;
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
  const fields = ["name", "company", "email", "phone", "platform"] as const;
  for (const f of fields) {
    if (typeof body[f] !== "string" || body[f].trim().length === 0) {
      return { ok: false, error: `Missing field: ${f}` };
    }
    if (body[f].length > 500) return { ok: false, error: `Field too long: ${f}` };
  }
  if (body.message && (typeof body.message !== "string" || body.message.length > 2000)) {
    return { ok: false, error: "Invalid message" };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
    return { ok: false, error: "Invalid email" };
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
    },
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not configured");

    const body = await req.json();
    const result = validate(body);
    if (!result.ok) {
      return new Response(JSON.stringify({ error: result.error }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const { name, company, email, phone, platform, message } = result.data;

    const html = `
      <h2>New ISN Compliance Quote Request</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Company:</strong> ${escapeHtml(company)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
      <p><strong>Platforms Needed:</strong> ${escapeHtml(platform)}</p>
      ${message ? `<p><strong>Message:</strong><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>` : ""}
    `;

    const res = await fetch(`${GATEWAY_URL}/emails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": RESEND_API_KEY,
      },
      body: JSON.stringify({
        from: "Cornerstone Website <onboarding@resend.dev>",
        to: ["garland@cornerstoneriskmgt.com"],
        reply_to: email,
        subject: `ISN Quote Request — ${company}`,
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
