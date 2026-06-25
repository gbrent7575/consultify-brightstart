import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { z } from "zod";
import { Link } from "react-router-dom";
import { Phone, Check, Shield, Award, Users, Clock, ShieldCheck, Zap } from "lucide-react";
import FooterNew from "@/components/FooterNew";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { trackQuoteFormSubmission, trackPhoneClick } from "@/lib/ga4";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  company: z.string().trim().min(1, "Company is required").max(150),
  phone: z.string().trim().min(7, "Phone is required").max(30),
  platform: z.string().min(1, "Please select a platform"),
});

const PLATFORMS = ["ISNetworld", "Veriforce", "Avetta", "Multiple"];
const SOURCE_PAGE = "veriforce-help";
const FORM_HEADING = "Get My Free Veriforce Review";

const scoreDrivers = [
  { title: "Safety programs", desc: "Your written HSE programs, reviewed and verified." },
  { title: "Operator Qualification (OQ)", desc: "Verified task qualifications and required training for covered tasks." },
  { title: "OSHA logs", desc: "Your 300/300A injury logs and TRIR." },
  { title: "EMR", desc: "Your workers' comp experience modification rate." },
  { title: "COIs", desc: "Certificates of insurance that meet each operator's limits." },
];

const stats = [
  { icon: Shield, value: "99%", label: "Compliance Success Rate" },
  { icon: Users, value: "100+", label: "Contractors Managed" },
  { icon: Clock, value: "15+", label: "Years Experience" },
  { icon: Award, value: "24-Hour", label: "Response Time" },
];

const testimonials = [
  {
    quote: "Cornerstone took over our ISNetworld account and we went from red flags to fully approved in two weeks. They handle everything now — I haven't logged in once this year.",
    author: "Operations Manager",
    company: "Gulf Coast Welding Services",
  },
  {
    quote: "We were losing bids because of compliance issues. Now we're approved on three platforms and winning more work than ever. Best investment we've made.",
    author: "Owner",
    company: "Industrial Maintenance Contractor",
  },
  {
    quote: "The monthly maintenance is worth every penny. They catch expiring documents before they become problems and keep us in the green.",
    author: "Safety Director",
    company: "Pipeline Services Company",
  },
];

const scrollToForm = () => {
  document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const QuoteForm = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    platform: "Veriforce",
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
        body: {
          name: parsed.data.name,
          company: parsed.data.company,
          phone: parsed.data.phone,
          platform: parsed.data.platform,
          email: "",
          message: "",
          source_page: SOURCE_PAGE,
        },
      });
      if (error || !data?.success) throw new Error(error?.message || "Send failed");
      toast({
        title: "Request received!",
        description: "We'll contact you within 24 hours.",
      });
      trackQuoteFormSubmission(
        parsed.data.platform as Parameters<typeof trackQuoteFormSubmission>[0],
        SOURCE_PAGE,
      );
      setForm({ name: "", company: "", phone: "", platform: "Veriforce" });
    } catch (err) {
      toast({
        title: "Something went wrong",
        description: "Please call 601-647-1201.",
        variant: "destructive",
      });
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
        <h2 className="text-xl md:text-2xl font-bold text-primary">{FORM_HEADING}</h2>
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
        <Label htmlFor="platform">Platform *</Label>
        <Select value={form.platform} onValueChange={(v) => update("platform", v)}>
          <SelectTrigger id="platform">
            <SelectValue placeholder="Select a platform" />
          </SelectTrigger>
          <SelectContent>
            {PLATFORMS.map((p) => (
              <SelectItem key={p} value={p}>{p}</SelectItem>
            ))}
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
        {submitting ? "Sending..." : FORM_HEADING}
      </Button>
      <p className="text-xs text-muted-foreground text-center">
        No spam. We only contact you about your compliance.
      </p>
    </form>
  );
};

const Veriforce = () => {
  return (
    <>
      <Helmet>
        <title>Veriforce Compliance Help for Oil & Gas Contractors | Cornerstone Risk Management</title>
        <meta
          name="description"
          content="Failed a Veriforce review or fallen out of compliance? We handle safety programs, OQ, OSHA logs, and document uploads so you get approved fast. Call 601-647-1201."
        />
        <link rel="canonical" href="https://cornerstoneriskmgt.com/veriforce-help" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <div className="w-full bg-accent text-accent-foreground py-2 px-4 text-center text-sm font-medium">
          Veriforce Compliance Help — Talk to a specialist today
        </div>

        <header className="w-full border-b border-border bg-background sticky top-0 z-40">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <Link to="/" className="text-base md:text-xl font-serif font-bold text-primary hover:opacity-80">
              Cornerstone Risk Management
            </Link>
            <a
              href="tel:601-647-1201"
              onClick={trackPhoneClick}
              className="inline-flex items-center gap-2 text-primary font-bold text-sm md:text-lg hover:text-accent transition-colors"
            >
              <Phone className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline">601-647-1201</span>
              <span className="sm:hidden">Call</span>
            </a>
          </div>
        </header>

        <main className="flex-grow pb-20 md:pb-0">
          {/* HERO */}
          <section className="bg-primary text-primary-foreground py-10 md:py-16">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-10 items-start">
                <div>
                  <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-5">
                    Veriforce® Compliance Help for Oil & Gas Contractors — Get Approved and Stay Approved
                  </h1>
                  <p className="text-base md:text-lg text-primary-foreground/90 mb-6">
                    Failed a Veriforce review or your account fell out of compliance? We handle your safety programs, operator qualification (OQ), OSHA logs, and document uploads — then get you back to approved so you stop losing bids over paperwork.
                  </p>
                  <a
                    href="tel:601-647-1201"
                    onClick={trackPhoneClick}
                    className="inline-flex items-center gap-3 bg-accent text-accent-foreground hover:bg-accent/90 transition-colors rounded-lg px-6 py-4 text-xl md:text-2xl font-bold shadow-lg mb-6"
                  >
                    <Phone className="w-6 h-6" />
                    Call 601-647-1201
                  </a>

                  <ul className="space-y-3 mt-4">
                    {[
                      "Recover a failing or rejected Veriforce status",
                      "Done-for-you paperwork — safety programs, OQ records, OSHA logs, COIs",
                      "Keep your operator approvals so you never lose a bid",
                    ].map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                        <span className="text-primary-foreground/95">{b}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-sm text-primary-foreground/70 italic">
                    Built for contractors with 5–250 employees who need their company approved — not for individuals seeking personal certification.
                  </p>
                </div>

                <div className="lg:sticky lg:top-24">
                  <QuoteForm />
                </div>
              </div>
            </div>
          </section>

          {/* 5 drivers */}
          <section className="py-16 md:py-20 bg-secondary/30">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-2xl md:text-4xl font-serif font-bold text-primary text-center mb-10">
                The 5 things that drive your Veriforce status
              </h2>
              <div className="grid md:grid-cols-2 gap-5">
                {scoreDrivers.map((d, i) => (
                  <Card key={d.title} className={i === 4 ? "md:col-span-2" : ""}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold flex-shrink-0">
                          {i + 1}
                        </div>
                        <div>
                          <h3 className="font-bold text-primary text-lg mb-1">{d.title}</h3>
                          <p className="text-muted-foreground">{d.desc}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Pricing */}
          <section className="py-16 md:py-20 bg-background">
            <div className="container mx-auto px-4 max-w-5xl">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-4xl font-serif font-bold text-primary mb-3">
                  Simple, flat-rate pricing — published, not hidden
                </h2>
                <p className="text-muted-foreground">Same prices we publish on the homepage. No surprises.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-2 border-border">
                  <CardContent className="pt-6">
                    <p className="text-accent text-xs font-semibold uppercase tracking-wide mb-1">One-Time Setup</p>
                    <h3 className="text-xl font-bold text-primary mb-3">Platform Setup</h3>
                    <div className="space-y-2 text-foreground">
                      <p><span className="text-3xl font-bold">$900</span> <span className="text-muted-foreground">/ platform</span></p>
                      <p className="text-muted-foreground">$1,600 for two platforms together</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-2 border-accent bg-accent/5">
                  <CardContent className="pt-6">
                    <p className="text-accent text-xs font-semibold uppercase tracking-wide mb-1">Monthly Maintenance</p>
                    <h3 className="text-xl font-bold text-primary mb-3">Keep You Approved</h3>
                    <ul className="space-y-2 text-foreground">
                      <li><span className="font-bold">$250/mo</span> — single platform</li>
                      <li><span className="font-bold">$300/mo</span> — dual platform</li>
                      <li><span className="font-bold">$350/mo</span> — multi-platform (up to 3)</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              <div className="text-center mt-8">
                <Button
                  size="lg"
                  onClick={scrollToForm}
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  {FORM_HEADING}
                </Button>
              </div>
            </div>
          </section>

          {/* Guarantees */}
          <section className="py-16 md:py-20 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-2xl md:text-4xl font-serif font-bold text-center mb-10">
                Our Guarantees
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-primary-foreground/5 border border-primary-foreground/20 rounded-lg p-6 flex items-start gap-4">
                  <ShieldCheck className="w-10 h-10 text-accent flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Approved or your setup fee back</h3>
                    <p className="text-primary-foreground/85">If we can't get your account to approved, your setup fee is refunded. Simple as that.</p>
                  </div>
                </div>
                <div className="bg-primary-foreground/5 border border-primary-foreground/20 rounded-lg p-6 flex items-start gap-4">
                  <Zap className="w-10 h-10 text-accent flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Submitted in 5 business days or your first month is free</h3>
                    <p className="text-primary-foreground/85">Once we have your documents, your submission is in within 5 business days — or your first month of maintenance is on us.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Proof */}
          <section className="py-16 md:py-20 bg-secondary/30">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-14 max-w-5xl mx-auto">
                {stats.map((s) => (
                  <Card key={s.label} className="text-center">
                    <CardContent className="pt-6">
                      <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                        <s.icon className="h-6 w-6 text-accent" />
                      </div>
                      <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{s.value}</div>
                      <div className="text-sm text-muted-foreground">{s.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary text-center mb-8">
                What our clients say
              </h2>
              <div className="grid md:grid-cols-3 gap-5 max-w-6xl mx-auto">
                {testimonials.map((t, i) => (
                  <Card key={i}>
                    <CardContent className="pt-6">
                      <div className="text-accent text-4xl font-serif leading-none mb-3">"</div>
                      <p className="text-foreground leading-relaxed mb-5">{t.quote}</p>
                      <div className="border-t border-border pt-4">
                        <div className="font-semibold text-primary">{t.author}</div>
                        <div className="text-sm text-muted-foreground">{t.company}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-16 md:py-20 bg-primary text-primary-foreground text-center">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Get your Veriforce account back to approved
              </h2>
              <p className="text-primary-foreground/90 mb-8 text-lg">
                Call us now or send your details — we'll review your account and tell you exactly what it'll take.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="tel:601-647-1201"
                  onClick={trackPhoneClick}
                  className="inline-flex items-center gap-3 bg-accent text-accent-foreground hover:bg-accent/90 transition-colors rounded-lg px-6 py-4 text-xl font-bold shadow-lg"
                >
                  <Phone className="w-6 h-6" />
                  Call 601-647-1201
                </a>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={scrollToForm}
                  className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground hover:text-primary text-base"
                >
                  Use the form instead
                </Button>
              </div>
              <p className="text-xs text-primary-foreground/70 mt-6">
                Veriforce® is a registered trademark of Veriforce, LLC. Cornerstone Risk Management is not endorsed by or affiliated with Veriforce, LLC.
              </p>
            </div>
          </section>
        </main>

        <FooterNew />

        <a
          href="tel:601-647-1201"
          onClick={trackPhoneClick}
          className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-accent text-accent-foreground flex items-center justify-center gap-2 py-4 font-bold text-lg shadow-[0_-4px_12px_rgba(0,0,0,0.15)]"
        >
          <Phone className="w-5 h-5" />
          Call 601-647-1201
        </a>
      </div>
    </>
  );
};

export default Veriforce;
