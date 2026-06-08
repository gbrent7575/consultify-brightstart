import { Helmet } from "react-helmet-async";
import NavigationNew from "@/components/NavigationNew";
import FooterNew from "@/components/FooterNew";
import PricingSection from "@/components/PricingSection";
import TrademarkNotice from "@/components/TrademarkNotice";
import IsnQuoteForm from "@/components/IsnQuoteForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CheckCircle2,
  FileCheck,
  ClipboardList,
  ShieldCheck,
  CalendarClock,
  TrendingUp,
} from "lucide-react";
import heroImage from "@/assets/hero-compliance-platforms.jpg";

const whatWeDo = [
  {
    icon: FileCheck,
    title: "RAVS® Review, Formatting & Upload",
    desc: "Including correcting common rejection causes — revision-date mismatches, missing required clauses, and outdated language.",
  },
  {
    icon: ClipboardList,
    title: "Client-Specific Questionnaires",
    desc: "Responses kept current as your hiring clients add or change requirements.",
  },
  {
    icon: ShieldCheck,
    title: "Insurance Certificate Renewal Tracking",
    desc: "We track expirations and coordinate updates so your COIs stay current in the system.",
  },
  {
    icon: ClipboardList,
    title: "Questionnaire & Form Completion",
    desc: "You provide the input, we format it the way ISNetworld® expects.",
  },
  {
    icon: TrendingUp,
    title: "Score Monitoring & Recovery",
    desc: "We monitor your score and address what's pulling it down.",
  },
  {
    icon: CalendarClock,
    title: "Ongoing Monitoring",
    desc: "Nothing expires while you're focused on the work — insurance, training, and OSHA logs all on a tracked calendar.",
  },
];

const problems = [
  {
    problem: "My RAVS® keep getting rejected.",
    answer:
      "Usually a revision-date mismatch or a missing required clause. We catch these before submission, not after.",
  },
  {
    problem: "My score dropped and I don't know why.",
    answer:
      "Often expired training records, lapsed certificates, or unfilled questionnaire updates. We diagnose the root cause and fix it.",
  },
  {
    problem: "My client added a new questionnaire and I have no idea what they want.",
    answer:
      "We translate the requirement, write the response with your input, and submit it.",
  },
  {
    problem: "I have audit findings I don't know how to close.",
    answer:
      "We review each finding, build the corrective action, and resubmit until they're cleared.",
  },
  {
    problem: "Things keep expiring and I find out too late.",
    answer:
      "Ongoing maintenance puts insurance, training, and OSHA logs on a tracked calendar. Nothing expires unannounced.",
  },
];

const faqs = [
  {
    q: "How fast can you fix a failed audit?",
    a: "Most failed-audit findings are fixed within a week or less once we have access to your account. Larger gaps that require new documentation from your team can take longer, but the typical turnaround is fast.",
  },
  {
    q: "Will I get a passing score above my client's threshold?",
    a: "We'll tell you what's pulling it down and whether it's fixable. Most score issues are documentation gaps, not underlying safety performance gaps.",
  },
  {
    q: "What if my client adds a new questionnaire mid-cycle?",
    a: "Covered under monthly maintenance. We complete the questionnaire with your input and submit it.",
  },
  {
    q: "Can I do this myself?",
    a: "Yes, but most clients hand it off — we operate the account end-to-end. Most clients haven't logged in for months.",
  },
  {
    q: "Is there a long-term contract?",
    a: "No annual commitment. Cancel anytime; your account stays exactly where it is.",
  },
];

const Isnetworld = () => {
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
        <title>ISNetworld® Compliance Help | Cornerstone Risk Management</title>
        <meta
          name="description"
          content="ISNetworld® compliance experts. RAVS® uploads, questionnaires, score recovery, and audit fixes — handled end-to-end. 99% success rate. 100+ contractors managed. 15+ years experience."
        />
        <meta
          name="keywords"
          content="ISNetworld compliance, RAVS upload, ISNetworld score, ISNetworld questionnaire, contractor prequalification, ISNetworld audit"
        />
        <link rel="canonical" href="https://cornerstoneriskmgt.com/services/isnetworld" />
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
                alt="ISNetworld® compliance management for contractors"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/70" />
            </div>

            <div className="container mx-auto px-4 py-20 relative z-10">
              <div className="max-w-3xl animate-fade-in">
                <p className="text-sm md:text-base font-semibold uppercase tracking-wider text-accent mb-4">
                  ISNetworld® Compliance Experts · 99% Success Rate · 100+ Contractors Managed · 15+ Years Experience
                </p>
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary-foreground">
                  ISNetworld® Compliance Management
                </h1>
                <p className="text-xl mb-4 text-primary-foreground/95">
                  Stop losing contracts because of RAVS® uploads, score drops, or questionnaire confusion.
                </p>
                <p className="text-lg mb-8 text-primary-foreground/85">
                  We handle the paperwork end-to-end so your account stays in the green and your bids stay alive.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" variant="secondary" asChild>
                    <a href="#contact">Get a Free ISN Compliance Quote</a>
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
                Full-service ISNetworld® account management — from RAVS® uploads to ongoing monitoring.
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
              <h2 className="text-3xl font-bold mb-12 text-center">Problems We Solve</h2>
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
                  "15+ years inside ISNetworld® workflows",
                ].map((b, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="text-accent w-6 h-6 flex-shrink-0 mt-1" />
                    <p className="text-lg">{b}</p>
                  </div>
                ))}
              </div>
              <div className="max-w-4xl mx-auto mt-12">
                <TrademarkNotice />
              </div>
            </div>
          </section>

          {/* Pricing */}
          <PricingSection />

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
                Get a Free ISN Compliance Quote
              </h2>
              <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto text-primary-foreground/90">
                Tell us about your account and we'll send you a personalized quote within 24 hours. No obligation, no pressure.
              </p>
              <IsnQuoteForm defaultPlatform="ISNetworld" sourcePage="isnetworld-help" />
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

        <FooterNew />
      </div>
    </>
  );
};

export default Isnetworld;
