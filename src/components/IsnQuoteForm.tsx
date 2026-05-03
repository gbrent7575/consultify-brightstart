import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { trackQuoteFormSubmission, type QuoteFormSourcePage } from "@/lib/ga4";

const PLATFORMS = [
  "ISNetworld",
  "Veriforce",
  "Avetta",
  "PEC Premier",
  "BROWZ",
  "Other",
];

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  company: z.string().trim().min(1, "Company is required").max(150),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().min(7, "Phone is required").max(30),
  platform: z.string().min(1, "Please select a platform"),
  message: z.string().max(2000).optional(),
});

interface IsnQuoteFormProps {
  defaultPlatform?: string;
  messagePlaceholder?: string;
  sourcePage?: QuoteFormSourcePage;
}

const IsnQuoteForm = ({
  defaultPlatform = "",
  messagePlaceholder = "Current score, recent audit findings, or anything else we should know.",
  sourcePage = "isnetworld-help",
}: IsnQuoteFormProps) => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    platform: defaultPlatform,
    message: "",
  });

  const update = (k: keyof typeof form, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

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
        body: parsed.data,
      });
      if (error || !data?.success) throw new Error(error?.message || "Send failed");

      toast({
        title: "Request received!",
        description: "We'll contact you within 24 hours with a quote.",
      });
      trackQuoteFormSubmission(parsed.data.platform as Parameters<typeof trackQuoteFormSubmission>[0], sourcePage);
      setForm({ name: "", company: "", email: "", phone: "", platform: defaultPlatform, message: "" });
    } catch (err) {
      toast({
        title: "Something went wrong",
        description: "Please call 601-647-1201 or email garland@cornerstoneriskmgt.com.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-background text-foreground rounded-lg p-6 md:p-8 max-w-2xl mx-auto text-left shadow-lg"
    >
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Name *</Label>
          <Input id="name" value={form.name} onChange={(e) => update("name", e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="company">Company *</Label>
          <Input id="company" value={form.company} onChange={(e) => update("company", e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required />
        </div>
        <div>
          <Label htmlFor="phone">Phone *</Label>
          <Input id="phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} required />
        </div>
        {!defaultPlatform && (
          <div className="md:col-span-2">
            <Label htmlFor="platform">Platforms Needed *</Label>
            <Select value={form.platform} onValueChange={(v) => update("platform", v)}>
              <SelectTrigger id="platform">
                <SelectValue placeholder="Select a platform" />
              </SelectTrigger>
              <SelectContent>
                {PLATFORMS.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        <div className="md:col-span-2">
          <Label htmlFor="message">Tell us about your account (optional)</Label>
          <Textarea
            id="message"
            rows={4}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            placeholder={messagePlaceholder}
          />
        </div>
      </div>
      <Button type="submit" size="lg" className="w-full mt-6 bg-accent text-accent-foreground hover:bg-accent/90" disabled={submitting}>
        {submitting ? "Sending..." : "Send My Quote Request"}
      </Button>
      <p className="text-xs text-muted-foreground text-center mt-3">
        No obligation, no pressure. We'll respond within 24 hours.
      </p>
    </form>
  );
};

export default IsnQuoteForm;
