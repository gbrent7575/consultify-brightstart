import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { z } from "zod";
import { Phone } from "lucide-react";
import NavigationNew from "@/components/NavigationNew";
import FooterNew from "@/components/FooterNew";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { trackQuoteFormSubmission, trackPhoneClick } from "@/lib/ga4";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  company: z.string().trim().min(1, "Company is required").max(150),
  phone: z.string().trim().min(7, "Phone is required").max(30),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().max(2000).optional(),
});

const IsnHelp = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    message: "",
  });

  const update = (k: keyof typeof form, v: string) =>
    setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      const { error } = await supabase.functions.invoke("send-isn-quote", {
        body: {
          name: parsed.data.name,
          company: parsed.data.company,
          email: parsed.data.email,
          phone: parsed.data.phone,
          platform: "ISNetworld",
          message: parsed.data.message || "",
        },
      });
      if (error) throw error;
      toast({
        title: "Request received!",
        description: "We'll contact you within 24 hours.",
      });
      trackQuoteFormSubmission("ISNetworld", "isnetworld-help");
      setForm({ name: "", company: "", phone: "", email: "", message: "" });
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
    <>
      <Helmet>
        <title>ISNetworld Compliance Help | Cornerstone Risk Management</title>
        <meta
          name="description"
          content="Expert ISNetworld compliance support — setup, document uploads, grade improvement, and annual renewal. Call 601-647-1201 for a free quote."
        />
        <link rel="canonical" href="https://cornerstoneriskmgt.com/isn/help" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <NavigationNew />

        <main className="flex-grow">
          {/* Hero with prominent click-to-call */}
          <section className="bg-primary text-primary-foreground py-12 md:py-16">
            <div className="container mx-auto px-4 max-w-4xl text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-6">
                ISNetworld Compliance Help
              </h1>
              <p className="text-base md:text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                Cornerstone Risk Management provides expert ISNetworld compliance support — setup, document uploads, grade improvement, and annual renewal. Call us or fill out the form below.
              </p>
              <a
                href="tel:601-647-1201"
                onClick={trackPhoneClick}
                className="inline-flex items-center justify-center gap-3 bg-accent text-accent-foreground hover:bg-accent/90 transition-colors rounded-lg px-8 py-5 text-2xl md:text-3xl font-bold shadow-lg"
              >
                <Phone className="w-7 h-7" />
                Call 601-647-1201
              </a>
              <p className="text-sm text-primary-foreground/80 mt-4">
                Speak with a compliance specialist now
              </p>
            </div>
          </section>

          {/* Contact form */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4 max-w-2xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">
                Request a Free Quote
              </h2>
              <p className="text-muted-foreground text-center mb-8">
                We'll respond within 24 hours.
              </p>
              <form
                onSubmit={handleSubmit}
                noValidate
                className="bg-card rounded-lg p-6 md:p-8 shadow-lg space-y-4"
              >
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="company">Company *</Label>
                    <Input
                      id="company"
                      value={form.company}
                      onChange={(e) => update("company", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    rows={4}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Tell us about your ISNetworld account or compliance needs."
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  disabled={submitting}
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  {submitting ? "Sending..." : "Submit"}
                </Button>
              </form>
            </div>
          </section>
        </main>

        <FooterNew />
      </div>
    </>
  );
};

export default IsnHelp;
