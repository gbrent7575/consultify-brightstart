import { Helmet } from "react-helmet";
import NavigationNew from "@/components/NavigationNew";
import FooterNew from "@/components/FooterNew";
import PricingSection from "@/components/PricingSection";
import IsnQuoteForm from "@/components/IsnQuoteForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle2 } from "lucide-react";
import heroImage from "@/assets/hero-compliance-platforms.jpg";

const whatWeDo = [
  "Veriforce account setup or reset",
  "Operator Qualification (OQ) tracking and documentation",
  "Pipeline contractor compliance — alignment with DOT 49 CFR Part 192 (gas) and Part 195 (hazardous liquid). We work from the live regulatory text, not internal shorthand.",
  "Training records uploads and renewal tracking",
  "Drug and alcohol program documentation (DOT-aligned)",
  "Quarterly hours and incident reporting",
  "Pre-audit review and reviewer feedback responses",
];

const problems = [
  {
    problem: "My OQ records are out of date and a client just asked for proof.",
    answer:
      "We bring OQ tracking current and submit documentation in the format Veriforce expects.",
  },
  {
    problem: "My drug and alcohol program changed and I haven't updated Veriforce.",
    answer:
      "We update the documentation and tie it to the appropriate DOT references.",
  },
  {
    problem: "My account dropped because of expired training certs.",
    answer:
      "Monthly maintenance tracks renewals on a calendar and updates them before expiration.",
  },
  {
    problem: "I am not sure which Veriforce sub-platform a client wants me on.",
    answer:
      "We confirm with your client, set it up correctly the first time, and document it for your records.",
  },
  {
    problem: "My audit is in 30 days and I haven't started.",
    answer:
      "We pre-audit, identify gaps, and close them before your window opens.",
  },
];

const faqs = [
  {
    q: "Do you handle DOT-regulated pipeline contractors specifically?",
    a: "Yes. Veriforce's pipeline contractor compliance falls under DOT 49 CFR Part 192 (gas) and Part 195 (hazardous liquid). We reference the actual regulatory text and recommend you verify against the live reference rather than relying on summaries.",
  },
  {
    q: "Can you keep my OQ tracking current?",
    a: "Yes — OQ tracking is included in monthly maintenance. We track renewal cycles and prompt for re-evaluation before expiration.",
  },
  {
    q: "Will you write a drug and alcohol program for me?",
    a: "Custom safety program writing is not included in standard maintenance — it's a separate scope. But we'll review and upload an existing D&A program, or document the changes needed to bring it into Veriforce/DOT alignment.",
  },
  {
    q: "What if my contracts pull from multiple platforms (ISN, Avetta, Veriforce, BROWZ, PEC)?",
    a: "We coordinate across all of them. Most cross-platform issues are resolved by getting each underlying account to a clean, current state — which is exactly what monthly maintenance does.",
  },
  {
    q: "Can you support a contractor that is brand-new to Veriforce?",
    a: "Yes — that's what setup is for. $900 covers the full setup including questionnaire completion and reviewer feedback responses until approved.",
  },
];

const Veriforce = () => {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <Helmet>
        <title>Veriforce® Compliance Help, Including OQ | Cornerstone Risk Management</title>
        <meta
          name="description"
          content="Need help with Veriforce? Operator Qualification, training, D&A, and audit prep, handled end-to-end. 99% success. From $900 setup, $250/mo. Call 601-647-1201."
        />
        <link rel="canonical" href="https://cornerstoneriskmgt.com/veriforce-help" />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <NavigationNew />

        <main className="flex-grow">
          {/* Hero */}
          <section className="relative min-h-[60vh] flex items-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img
                src={heroImage}
                alt="Veriforce compliance management for contractors"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/70" />
            </div>

            <div className="container mx-auto px-4 py-20 relative z-10">
              <div className="max-w-3xl animate-fade-in">
                <p className="text-sm md:text-base font-semibold uppercase tracking-wider text-accent mb-4">
                  Operator Qualification · DOT-Aligned · Pipeline Contractors Welcome
                </p>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary-foreground">
                  Veriforce Compliance Management
                </h1>
                <p className="text-xl mb-8 text-primary-foreground/95">
                  Operator Qualification, training records, drug and alcohol program documentation, and audit prep — all handled end-to-end so your contractors stay eligible to work.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" variant="secondary" asChild>
                    <a href="#contact">Get a Free Veriforce Compliance Quote</a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
                    asChild
                  >
                    <a href="tel:601-647-1201">Call 601-647-1201</a>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* What We Do */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12 text-center">
                What We Do for Your Veriforce Account
              </h2>
              <ol className="max-w-3xl mx-auto space-y-4">
                {whatWeDo.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-9 h-9 rounded-full bg-accent text-accent-foreground font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <p className="text-lg pt-1">{item}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Problems We Solve */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12 text-center">
                Common Veriforce Problems We Solve
              </h2>
              <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {problems.map((p, i) => (
                  <Card key={i} className="h-full">
                    <CardContent className="pt-6">
                      <p className="font-bold text-lg mb-3 text-primary">"{p.problem}"</p>
                      <p className="text-muted-foreground">{p.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Why Cornerstone */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12 text-center">Why Cornerstone</h2>
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {[
                  "99% success rate across submissions",
                  "100+ contractors actively managed",
                  "15+ years inside Veriforce workflows",
                ].map((b, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="text-accent w-6 h-6 flex-shrink-0 mt-1" />
                    <p className="text-lg">{b}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Pricing */}
          <PricingSection />

          {/* FAQs */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12 text-center">
                Frequently Asked Questions
              </h2>
              <div className="max-w-3xl mx-auto">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((f, i) => (
                    <AccordionItem key={i} value={`item-${i}`}>
                      <AccordionTrigger className="text-left text-lg font-semibold">
                        {f.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-base text-muted-foreground">
                        {f.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section
            id="contact"
            className="py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground"
          >
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Get a Free Veriforce Compliance Quote
              </h2>
              <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-primary-foreground/90">
                Whether you need OQ help, audit prep, or full account management, tell us your situation and we'll send a personalized quote within 24 hours.
              </p>
              <IsnQuoteForm
                defaultPlatform="Veriforce"
                sourcePage="veriforce-help"
                messagePlaceholder="OQ status, audit timeline, or anything else we should know."
              />
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
                <Button size="lg" variant="secondary" asChild>
                  <a href="tel:601-647-1201">Call 601-647-1201</a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  asChild
                >
                  <a href="mailto:garland@cornerstoneriskmgt.com">Email Us</a>
                </Button>
              </div>
              <p className="text-xs text-primary-foreground/70 mt-10 max-w-3xl mx-auto">
                Cornerstone Risk Management is in no way endorsed, sponsored, approved by, or otherwise affiliated with Veriforce, LLC. Veriforce is a registered trademark of Veriforce, LLC.
              </p>
            </div>
          </section>
        </main>

        <FooterNew />
      </div>
    </>
  );
};

export default Veriforce;
