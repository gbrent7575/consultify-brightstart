import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { trackQuoteFormSubmission } from "@/lib/ga4";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  company: z.string().trim().min(1, "Company is required").max(150),
  phone: z.string().trim().min(7, "Phone is required").max(30),
  email: z.string().trim().email("Please enter a valid email").max(255),
  platform: z.string().min(1, "Please select a platform"),
  referral_source: z.string().min(1, "Please select one"),
});

const PLATFORMS = ["ISNetworld", "Veriforce", "Avetta", "Multiple"];
const REFERRAL_SOURCES = ["Google search", "ChatGPT or another AI assistant", "LinkedIn", "Someone referred me", "Other"];

interface Props {
  defaultPlatform: string;
  sourcePage: string;
  message?: string;
}

const PlatformQuoteForm = ({ defaultPlatform, sourcePage, message = "" }: Props) => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const empty = { name: "", company: "", phone: "", email: "", platform: defaultPlatform, referral_source: "" };
  const [form, setForm] = useState(empty);

  const update = (k: keyof typeof form, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e?: React.FormEvent | React.MouseEvent) => {
    e?.preventDefault?.();
    if (submitting) return;
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast({
        title: "Please check the form",
        description: parsed.error.issues[0]?.message ?? "Invalid input",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("send-isn-quote", {
        body: { ...parsed.data, message, source_page: sourcePage },
      });
      if (error || !data?.success) throw new Error(error?.message || "Send failed");
      toast({ title: "Request received!", description: "Thanks — we'll be in touch soon." });
      trackQuoteFormSubmission(
        parsed.data.platform as Parameters<typeof trackQuoteFormSubmission>[0],
        sourcePage as Parameters<typeof trackQuoteFormSubmission>[1],
      );
      setForm(empty);
    } catch {
      toast({ title: "Something went wrong", description: "Please call 601-647-1201.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      id="lead-form"
      onSubmit={handleSubmit}
      noValidate
      className="bg-background text-foreground rounded-lg p-6 md:p-7 shadow-2xl space-y-4 border border-border"
    >
      <div className="text-center mb-2">
        <h2 className="text-xl md:text-2xl font-bold text-primary">Get My Free Compliance Review</h2>
        <p className="text-sm text-muted-foreground">Takes 30 seconds. No obligation.</p>
      </div>
      <div>
        <Label htmlFor="name">Name *</Label>
        <Input id="name" value={form.name} onChange={(e) => update("name", e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="company">Company *</Label>
        <Input id="company" value={form.company} onChange={(e) => update("company", e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="phone">Phone *</Label>
        <Input id="phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="email">Email *</Label>
        <Input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@company.com" required />
      </div>
      <div>
        <Label htmlFor="platform">Platform *</Label>
        <Select value={form.platform} onValueChange={(v) => update("platform", v)}>
          <SelectTrigger id="platform"><SelectValue placeholder="Select a platform" /></SelectTrigger>
          <SelectContent>
            {PLATFORMS.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="referral_source">How did you hear about us? *</Label>
        <Select value={form.referral_source} onValueChange={(v) => update("referral_source", v)}>
          <SelectTrigger id="referral_source"><SelectValue placeholder="Select one" /></SelectTrigger>
          <SelectContent>
            {REFERRAL_SOURCES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <Button
        type="button"
        size="lg"
        onClick={handleSubmit}
        disabled={submitting}
        className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-base font-semibold"
      >
        {submitting ? "Sending..." : "Get My Free Compliance Review"}
      </Button>
      <p className="text-xs text-muted-foreground text-center">No spam. We only contact you about your compliance.</p>
    </form>
  );
};

export default PlatformQuoteForm;
