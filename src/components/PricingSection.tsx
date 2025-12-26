import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Calendar, ArrowRight } from "lucide-react";

const CAL_LINK = "https://cal.com/garland-brent-wa1zbs/15min";

const PricingSection = () => {
  const scrollToForm = () => {
    const element = document.getElementById('lead-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="py-20 md:py-24 bg-background" aria-labelledby="pricing-heading">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 id="pricing-heading" className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
            Simple, Flat-Rate Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            No surprises. No hourly billing. Just predictable costs for complete compliance management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Setup Package */}
          <Card className="border-2 border-border hover:border-accent/50 transition-colors animate-slide-up">
            <CardHeader className="pb-4">
              <CardDescription className="text-accent font-semibold uppercase tracking-wide text-sm">One-Time Setup</CardDescription>
              <CardTitle className="text-3xl font-serif flex items-baseline gap-2">
                <span className="text-4xl font-bold">$900</span>
                <span className="text-muted-foreground text-base font-normal">one-time</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Complete account setup on your compliance platform(s)
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Full account configuration",
                  "Company profile completion",
                  "Initial documentation upload",
                  "Safety program setup",
                  "First questionnaire completion"
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Button 
                onClick={scrollToForm}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Monthly Maintenance */}
          <Card className="border-2 border-accent bg-accent/5 animate-slide-up relative overflow-hidden" style={{ animationDelay: '0.1s' }}>
            <div className="absolute top-0 right-0 bg-accent text-accent-foreground px-3 py-1 text-xs font-semibold rounded-bl-lg">
              MOST POPULAR
            </div>
            <CardHeader className="pb-4">
              <CardDescription className="text-accent font-semibold uppercase tracking-wide text-sm">Ongoing Maintenance</CardDescription>
              <CardTitle className="text-3xl font-serif flex items-baseline gap-2">
                <span className="text-sm text-muted-foreground">Starting at</span>
                <span className="text-4xl font-bold">$150</span>
                <span className="text-muted-foreground text-base font-normal">/month</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Hands-off compliance management — we handle everything
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Ongoing account monitoring",
                  "Document updates & renewals",
                  "Questionnaire responses",
                  "Red flag resolution",
                  "Approval status maintenance",
                  "Direct expert support"
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Button 
                asChild
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <a href={CAL_LINK} target="_blank" rel="noopener noreferrer">
                  <Calendar className="mr-2 h-4 w-4" />
                  Book Free Consultation
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Additional Note */}
        <p className="text-center text-muted-foreground text-sm mt-8 max-w-xl mx-auto">
          Pricing varies based on number of platforms and account complexity. Book a free consultation for a personalized quote.
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
