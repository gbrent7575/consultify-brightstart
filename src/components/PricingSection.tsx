import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Calendar, ArrowRight } from "lucide-react";
import { trackBookConsultation, trackGetStartedClick } from "@/lib/ga4";

const CAL_LINK = "https://cal.com/garland-brent-wa1zbs/15min";

const setupFeatures = [
  "New platform setup or remediation of an existing account",
  "Upload of insurance certificates",
  "Upload of up to 20 safety programs (template-based)",
  "Questionnaire completion with client-provided input",
  "Submission and correction of reviewer feedback until compliant",
];

const singleFeatures = [
  "Maintenance of one compliance platform",
  "Monthly data collection and uploads",
  "Quarterly hours and incident reporting",
  "Annual OSHA log uploads",
  "Insurance certificate renewals",
  "Routine corrections and client requirement updates",
];

const dualFeatures = [
  "Maintenance of two platforms (typically ISNetworld® + Veriforce®)",
  "All monthly, quarterly, and annual reporting cycles",
  "Client-specific requirement changes",
  "Routine issue resolution",
];

const multiFeatures = [
  "Maintenance of up to three platforms",
  "All recurring reporting and updates",
  "Priority response for issue resolution",
];

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Setup Card */}
          <Card className="border-2 border-border hover:border-accent/50 transition-colors animate-slide-up">
            <CardHeader className="pb-4">
              <CardDescription className="text-accent font-semibold uppercase tracking-wide text-sm">One-Time</CardDescription>
              <CardTitle className="text-2xl font-serif">Platform Setup or Reset</CardTitle>
              <div className="pt-2">
                <span className="text-4xl font-bold">$900</span>
                <span className="text-muted-foreground text-base font-normal"> /platform</span>
                <p className="text-sm text-muted-foreground mt-1">$1,600 for two platforms together</p>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-8">
                {setupFeatures.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={() => { scrollToForm(); trackGetStartedClick(); }}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Get a Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Single Platform */}
          <Card className="border-2 border-border hover:border-accent/50 transition-colors animate-slide-up" style={{ animationDelay: '0.05s' }}>
            <CardHeader className="pb-4">
              <CardDescription className="text-accent font-semibold uppercase tracking-wide text-sm">Monthly</CardDescription>
              <CardTitle className="text-2xl font-serif">Single-Platform Maintenance</CardTitle>
              <div className="pt-2">
                <span className="text-4xl font-bold">$250</span>
                <span className="text-muted-foreground text-base font-normal"> /month</span>
                <p className="text-sm text-muted-foreground mt-1">$3,000/year</p>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-8">
                {singleFeatures.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={scrollToForm}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Get a Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Dual Platform — MOST POPULAR */}
          <Card className="border-2 border-accent bg-accent/5 animate-slide-up relative overflow-hidden" style={{ animationDelay: '0.1s' }}>
            <div className="absolute top-0 right-0 bg-accent text-accent-foreground px-3 py-1 text-xs font-semibold rounded-bl-lg">
              MOST POPULAR
            </div>
            <CardHeader className="pb-4">
              <CardDescription className="text-accent font-semibold uppercase tracking-wide text-sm">Monthly — Most Common</CardDescription>
              <CardTitle className="text-2xl font-serif">Dual-Platform Maintenance</CardTitle>
              <div className="pt-2">
                <span className="text-4xl font-bold">$300</span>
                <span className="text-muted-foreground text-base font-normal"> /month</span>
                <p className="text-sm text-muted-foreground mt-1">$3,600/year</p>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-8">
                {dualFeatures.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={scrollToForm}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Get a Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          {/* Multi-Platform */}
          <Card className="border-2 border-border hover:border-accent/50 transition-colors animate-slide-up" style={{ animationDelay: '0.15s' }}>
            <CardHeader className="pb-4">
              <CardDescription className="text-accent font-semibold uppercase tracking-wide text-sm">Monthly</CardDescription>
              <CardTitle className="text-2xl font-serif">Multi-Platform Maintenance</CardTitle>
              <div className="pt-2">
                <span className="text-4xl font-bold">$350</span>
                <span className="text-muted-foreground text-base font-normal"> /month</span>
                <p className="text-sm text-muted-foreground mt-1">$4,200/year</p>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-8">
                {multiFeatures.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <Button
                onClick={scrollToForm}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Get a Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Notes */}
        <div className="max-w-3xl mx-auto mt-12 text-sm text-muted-foreground space-y-2">
          <p>Monthly maintenance requires the platform to be compliant at start. Platforms needing significant fixes must complete Setup first.</p>
          <p>New clients only — existing clients keep current pricing.</p>
          <p><strong>Not included:</strong> DOT compliance, custom safety program writing, multi-entity restructuring.</p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
