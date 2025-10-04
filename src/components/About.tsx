import { CheckCircle2 } from "lucide-react";

const benefits = [
  "Experts in ISNetworld®, Avetta®, Veriforce® & more",
  "Managing hundreds of active compliance accounts nationwide",
  "99% compliance success rate across all platforms",
  "Dedicated support for contractors and service providers",
  "Complete end-to-end compliance management",
];

const About = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center animate-fade-in mb-12">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
              Why Choose Cornerstone Risk Management
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We specialize in digital safety compliance, taking the burden of platform management off your shoulders. From account setup to audit support, we ensure your compliance status stays current so you can focus on your core business operations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="flex items-start space-x-3 p-6 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors animate-slide-up border border-border" 
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-foreground text-lg">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
