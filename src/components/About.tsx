import { CheckCircle2 } from "lucide-react";

const benefits = [
  "Experts in ISNetworld®, Avetta®, Veriforce® & more",
  "Proven track record maintaining compliance status",
  "Dedicated support for contractors and service providers",
  "Complete end-to-end compliance management",
];

const About = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
              Why Choose Cornerstone Risk Management
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We specialize in digital safety compliance, taking the burden of platform management off your shoulders. From account setup to audit support, we ensure your compliance status stays current so you can focus on your core business operations.
            </p>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start space-x-3 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-foreground text-lg">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative animate-fade-in">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary to-accent p-1">
              <div className="w-full h-full bg-card rounded-xl p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-bold text-primary mb-4">1000+</div>
                  <div className="text-xl text-muted-foreground mb-8">Active Accounts Managed</div>
                  
                  <div className="text-6xl font-bold text-primary mb-4">99%</div>
                  <div className="text-xl text-muted-foreground">Compliance Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
