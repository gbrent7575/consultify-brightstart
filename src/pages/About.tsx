import { Helmet } from "react-helmet-async";
import NavigationNew from "@/components/NavigationNew";
import FooterNew from "@/components/FooterNew";
import TrademarkNotice from "@/components/TrademarkNotice";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Phone, ShieldCheck, Users, Clock } from "lucide-react";

const team = [
  {
    name: "Garland Brent",
    title: "Owner",
    description: "Garland spent 18 years in commercial insurance serving upstream and midstream oil and gas companies before founding Cornerstone Risk Management in April 2011. He also works as a fractional safety manager for industrial companies.",
    linkedIn: "https://www.linkedin.com/in/garland-brent-26b49611/",
  },
  {
    name: "Ginny U.",
    title: "Account Manager",
    description: "With Cornerstone for 14 years. Ginny runs ISNetworld®, Avetta® and Veriforce® accounts day to day and is the first call for most of our clients.",
  },
  {
    name: "Caryn R.",
    title: "Account Manager",
    description: "With Cornerstone for 7 years. Caryn manages ISNetworld®, Avetta® and Veriforce® accounts and runs our billing.",
  },
];

const About = () => {
  const scrollToHomeForm = () => {
    window.location.href = "/#lead-form";
  };

  return (
    <>
      <Helmet>
        <title>About Cornerstone Risk Management</title>
        <meta
          name="description"
          content="Cornerstone Risk Management — 15+ years managing ISNetworld®, Avetta®, Veriforce® and PEC Premier® accounts for contractors nationwide."
        />
        <link rel="canonical" href="https://contractorcompliancepros.com/about" />
        <meta property="og:title" content="About Cornerstone Risk Management" />
        <meta property="og:description" content="Cornerstone Risk Management — 15+ years managing ISNetworld®, Avetta®, Veriforce® and PEC Premier® accounts for contractors nationwide." />
        <meta property="og:url" content="https://contractorcompliancepros.com/about" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://contractorcompliancepros.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Cornerstone Risk Management" />
        <meta name="twitter:description" content="Cornerstone Risk Management — 15+ years managing ISNetworld®, Avetta®, Veriforce® and PEC Premier® accounts for contractors nationwide." />
        <meta name="twitter:url" content="https://contractorcompliancepros.com/about" />
        <meta name="twitter:image" content="https://contractorcompliancepros.com/og-image.jpg" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Garland Brent",
            jobTitle: "Owner",
            worksFor: { "@id": "https://contractorcompliancepros.com/#organization" },
            sameAs: ["https://www.linkedin.com/in/garland-brent-26b49611/"],
          })}
        </script>
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <NavigationNew />

        <main className="flex-grow pt-24">
          {/* Hero Section */}
          <section className="bg-primary text-primary-foreground py-20 md:py-28">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl animate-fade-in">
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
                  About Cornerstone Risk Management
                </h1>
                <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed">
                  With over 15 years of experience, Cornerstone Risk Management provides safety consulting and digital compliance management for contractors nationwide — in construction, industrial services and maintenance, oil, gas and energy, and manufacturing and food production.
                </p>
              </div>
            </div>
          </section>

          {/* What We Do */}
          <section className="py-16 md:py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-serif font-bold text-primary mb-6">What We Do</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  We manage ISNetworld®, Veriforce®, Avetta®, and PEC Premier® accounts for 100+ contractors — handling account setup, document uploads, questionnaire responses, and ongoing maintenance so our clients can focus on operations instead of paperwork.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Cornerstone Risk Management maintains a 99% compliance success rate.
                </p>
              </div>
            </div>
          </section>

          {/* Team */}
          <section className="pb-16 md:pb-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-serif font-bold text-primary mb-6">Who You'll Work With</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {team.map((person) => (
                    <Card key={person.name} className="border-border">
                      <CardContent className="pt-6">
                        <h3 className="text-xl font-serif font-bold text-primary mb-1">{person.name} — {person.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{person.description}</p>
                        {person.linkedIn && (
                          <a
                            href={person.linkedIn}
                            target="_blank"
                            rel="noopener"
                            className="inline-block mt-4 font-semibold text-primary hover:underline"
                          >
                            Garland on LinkedIn
                          </a>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
                {[
                  { icon: Clock, stat: "15+", label: "Years Experience" },
                  { icon: Users, stat: "100+", label: "Contractors Managed" },
                  { icon: ShieldCheck, stat: "99%", label: "Success Rate" },
                ].map((item) => (
                  <div key={item.label} className="animate-fade-in">
                    <item.icon className="h-8 w-8 text-accent mx-auto mb-3" />
                    <div className="text-3xl font-serif font-bold text-primary mb-1">{item.stat}</div>
                    <div className="text-sm text-muted-foreground">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Trademark Notice */}
          <section className="py-8 bg-background">
            <div className="container mx-auto px-4 max-w-3xl">
              <TrademarkNotice />
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                Tell us about your situation and we'll reach out.
              </p>
              <div className="flex justify-center mb-8">
                <Button
                  size="lg"
                  onClick={scrollToHomeForm}
                  className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6"
                >
                  Request a Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-primary-foreground/80">
                <a href="tel:601-647-1201" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
                  <Phone className="h-4 w-4" />
                  601-647-1201
                </a>
              </div>
            </div>
          </section>
        </main>

        <FooterNew />
      </div>
    </>
  );
};

export default About;
