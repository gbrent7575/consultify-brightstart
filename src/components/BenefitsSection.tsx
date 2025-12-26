import { Clock, ShieldCheck, FileCheck, DollarSign, HeadphonesIcon, AlertTriangle } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Save Hours of Admin Time",
    description: "Stop wrestling with complex questionnaires and document uploads. We handle all the paperwork."
  },
  {
    icon: ShieldCheck,
    title: "Avoid Rejections & Failed Audits",
    description: "Our 99% success rate means you stay approved and avoid costly compliance failures."
  },
  {
    icon: FileCheck,
    title: "Stay Eligible for Contracts",
    description: "Never lose a bid because of compliance issues. We keep your accounts in the green."
  },
  {
    icon: DollarSign,
    title: "Flat, Predictable Pricing",
    description: "No hourly billing surprises. Know exactly what you'll pay each month."
  },
  {
    icon: HeadphonesIcon,
    title: "Expert Support",
    description: "Direct access to compliance professionals who understand your industry."
  },
  {
    icon: AlertTriangle,
    title: "Proactive Issue Resolution",
    description: "We catch and fix problems before they affect your approval status."
  }
];

const BenefitsSection = () => {
  return (
    <section id="benefits" className="py-20 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
            Why Contractors Choose Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Focus on your operations. We'll handle the compliance headaches.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div 
              key={benefit.title}
              className="flex gap-4 animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <benefit.icon className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-primary mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
