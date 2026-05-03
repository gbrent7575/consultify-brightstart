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
  "Avetta account setup or reset",
  "Insurance certificate uploads and renewal tracking",
  "Training records and OSHA log uploads (annual and on-demand)",
  "Custom client requirement responses — when an oil major adds requirements on top of Avetta's baseline, we map them to your evidence and respond in the format auditors look for",
  "Audit grade review and scoring remediation",
  "Quarterly hours and incident reporting",
  "Pre-audit review and reviewer feedback responses until approved",
];

const problems = [
  {
    problem: "I am scheduled for an Avetta audit and I am not sure I will pass.",
    answer:
      "We pre-audit your account, identify gaps, and close them before your audit window opens.",
  },
  {
    problem: "My Avetta grade dropped and I do not know why.",
    answer:
      "Usually expired insurance, lapsed training, or a new client requirement that has not been responded to. We find the cause and fix it.",
  },
  {
    problem:
      "A new client added 12 custom requirements and I do not have time to write the responses.",
    answer:
      "We do this. Your input guides the answer; we format it the way Avetta auditors expect.",
  },
  {
    problem: "My account went red and a client is asking about it.",
    answer: "We get most accounts back to green within 2 to 4 weeks.",
  },
  {
    problem: "I never know which documents are about to expire.",
    answer: "Monthly maintenance includes a tracked renewal calendar.",
  },
];

const faqs = [
  {
    q: "Can you handle Avetta's custom client requirements?",
    a: "Yes. Each oil major or industrial client can layer custom requirements on top of Avetta's baseline. Monthly maintenance covers responses as they're issued.",
  },
  {
    q: "Is your $300 per month dual-platform price the same if I pair Avetta with another platform?",
    a: "Yes. The rate is the same regardless of which two platforms you pair. Most clients pair Avetta with either ISN or Veriforce.",
  },
  {
    q: "Do you handle drug and alcohol program documentation in Avetta?",
    a: "We work with your existing D&A program and submit the documentation in the format Avetta expects. If you do not have a written D&A program yet, that's a separate scope (custom safety program writing is not included in maintenance), but we can scope it.",
  },
  {
    q: "How long does an Avetta setup take?",
    a: "Most setups complete in 2 to 4 weeks once we have your insurance certificates, safety programs, and questionnaire inputs.",
  },
  {
    q: "What if my Avetta auditor pushes back on a response?",
    a: "Reviewer feedback responses are part of setup and maintenance. We rewrite, resubmit, and re-engage until your account is approved.",
  },
];

const Avetta = () => {
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
        <title>Avetta® Compliance Help | Cornerstone Risk Management</title>
        <meta
          name="description"
          content="Avetta audit coming up? We get contractors approved and keep them there. Audit prep, scoring remediation, custom client requirements. 99% success. From $900 setup, $250/mo."
        />
        <link rel="canonical" href="https://cornerstoneriskmgt.com/avetta-help" />
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
                alt="Avetta compliance management for contractors"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/70" />
            </div>

            <div className="container mx-auto px-4 py-20 relative z-10">
              <div className="max-w-3xl animate-fade-in">
                <p className="text-sm md:text-base font-semibold uppercase tracking-wider text-accent mb-4">
                  Audit Prep · Scoring Remediation · Custom Client Requirements
                </p>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary-foreground">
                  Avetta Compliance Management
                </h1>
                <p className="text-xl mb-8 text-primary-foreground/95">
                  From account setup to audit prep, scoring remediation, and custom client requirement responses, we handle Avetta end-to-end so you stay eligible to bid.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" variant="secondary" asChild>
                    <a href="#contact">Get a Free Avetta Compliance Quote</a>
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
                What We Do for Your Avetta Account
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
                Common Avetta Problems We Solve
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
                  "15+ years inside Avetta workflows",
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
                Get a Free Avetta Compliance Quote
              </h2>
              <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-primary-foreground/90">
                Tell us about your account, audit timeline, or scoring concern. We'll send a personalized quote within 24 hours.
              </p>
              <IsnQuoteForm
                defaultPlatform="Avetta"
                sourcePage="avetta-help"
                messagePlaceholder="Current grade, recent audit findings, or anything else we should know."
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
                Cornerstone Risk Management is in no way endorsed, sponsored, approved by, or otherwise affiliated with Avetta, LLC. Avetta is a registered trademark of Avetta, LLC.
              </p>
            </div>
          </section>
        </main>

        <FooterNew />
      </div>
    </>
  );
};

export default Avetta;
