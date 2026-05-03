import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import IsnQuoteForm from "@/components/IsnQuoteForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Info, CheckCircle2, FileCheck, ClipboardList, ShieldCheck, CalendarClock, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-compliance-platforms.jpg";

const whatWeDo = [
  {
    icon: FileCheck,
    title: "Safety Program Review & Upload",
    desc: "We review your written programs against Avetta® requirements and upload them in the format their reviewers expect.",
  },
  {
    icon: ClipboardList,
    title: "Client-Specific Questionnaires",
    desc: "Every hiring client adds their own questionnaire. We complete and maintain them as requirements change.",
  },
  {
    icon: ShieldCheck,
    title: "Insurance Certificate Tracking",
    desc: "We track COI expirations and coordinate updates so your certificates stay current in Avetta®.",
  },
  {
    icon: ClipboardList,
    title: "Form & Document Completion",
    desc: "You provide the input — we format it the way Avetta® expects and submit it.",
  },
  {
    icon: TrendingUp,
    title: "Score & Status Monitoring",
    desc: "We monitor your Avetta® scorecard and address what's pulling your status down before clients notice.",
  },
  {
    icon: CalendarClock,
    title: "Ongoing Maintenance",
    desc: "Insurance, training records, and audit responses on a tracked calendar. Nothing expires unannounced.",
  },
];

const problems = [
  {
    problem: "My Avetta® documents keep getting rejected.",
    answer:
      "Usually wrong format, missing required clauses, or out-of-date revision language. We catch these before submission, not after.",
  },
  {
    problem: "My scorecard dropped and I don't know why.",
    answer:
      "Often expired training, lapsed certificates, or unfilled questionnaire updates. We diagnose the root cause and fix it.",
  },
  {
    problem: "A client added a new Avetta® questionnaire and I have no idea what they want.",
    answer:
      "We translate the requirement, write the response with your input, and submit it.",
  },
  {
    problem: "I have audit findings I don't know how to close.",
    answer:
      "We review each finding, build the corrective action, and resubmit until they're cleared.",
  },
  {
    problem: "Things keep expiring and I find out from the client.",
    answer:
      "Ongoing maintenance puts insurance, training, and audit items on a tracked calendar. Nothing expires unannounced.",
  },
];

const faqs = [
  {
    q: "What's included in custom client requirements?",
    a: "Hiring clients (especially oil majors) often layer custom requirements on top of Avetta®'s baseline. Monthly maintenance covers responses as they're issued.",
  },
  {
    q: "Is the pricing the same if I pair Avetta® with another platform?",
    a: "Yes — pricing is the same regardless of which two platforms you pair. Most clients pair Avetta® with either ISNetworld® or Veriforce®.",
  },
  {
    q: "How fast can you get me approved on Avetta®?",
    a: "Most setups complete in 2–4 weeks once we have your insurance certificates, safety programs, and questionnaire inputs.",
  },
  {
    q: "What happens if an Avetta® auditor pushes back on a response?",
    a: "Covered under maintenance. We rewrite, resubmit, and re-engage until your account is approved.",
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
        <title>Avetta Audit Prep | Scoring Remediation | Custom Client Requirements</title>
        <meta
          name="description"
          content="Avetta audit coming up? We get contractors approved and keep them there. Audit prep, scoring remediation, custom client requirements. 99% success. From $900 setup, $250/mo."
        />
        <meta
          name="keywords"
          content="Avetta compliance, Avetta audit prep, Avetta scoring remediation, custom client requirements, Avetta scorecard, Avetta questionnaire, contractor prequalification"
        />
        <link rel="canonical" href="https://cornerstoneriskmgt.com/avetta-help" />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navigation />

        <main className="flex-grow">
          {/* Hero */}
          <section className="relative min-h-[60vh] flex items-center overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img
                src={heroImage}
                alt="Avetta® compliance management for contractors"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/70" />
            </div>

            <div className="container mx-auto px-4 py-20 relative z-10">
              <div className="max-w-3xl animate-fade-in">
                <p className="text-sm md:text-base font-semibold uppercase tracking-wider text-accent mb-4">
                  Avetta® Compliance Experts · 99% Success Rate · 100+ Contractors Managed · 15+ Years Experience
                </p>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary-foreground">
                  Avetta® Compliance Management
                </h1>
                <p className="text-xl mb-8 text-primary-foreground/95">
                  Audit prep, scoring remediation, and custom client requirement responses — we handle Avetta® end-to-end so you stay eligible to bid.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" variant="secondary" asChild>
                    <a href="#contact">Get a Free Avetta® Compliance Quote</a>
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
              <h2 className="text-3xl font-bold mb-4 text-center">What We Do</h2>
              <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                Full-service Avetta® account management — from document uploads to ongoing monitoring.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {whatWeDo.map((item, i) => (
                  <Card key={i} className="h-full">
                    <CardContent className="pt-6">
                      <item.icon className="w-12 h-12 text-accent mb-4" />
                      <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Problems We Solve */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12 text-center">Common Problems We Solve</h2>
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
                  "15+ years inside contractor prequalification workflows",
                ].map((b, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="text-accent w-6 h-6 flex-shrink-0 mt-1" />
                    <p className="text-lg">{b}</p>
                  </div>
                ))}
              </div>

              {/* Avetta trademark notice */}
              <div className="max-w-4xl mx-auto mt-12">
                <div className="bg-muted/50 border border-border rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-muted-foreground">
                      <p className="mb-2">
                        Cornerstone Risk Management is in no way endorsed, sponsored, approved by, or otherwise
                        affiliated with Avetta® or Avetta, LLC.
                      </p>
                      <p className="text-xs">Avetta® is a registered trademark of Avetta, LLC.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
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
                Get a Free Avetta® Compliance Quote
              </h2>
              <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-primary-foreground/90">
                Tell us about your account, audit timeline, or scoring concern. We'll send a personalized quote within 24 hours.
              </p>
              <IsnQuoteForm defaultPlatform="Avetta" />
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
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Avetta;
