import { CheckCircle2 } from "lucide-react";

const benefits = [
  "Over 20 years of industry expertise",
  "Proven track record across multiple sectors",
  "Client-centric approach with measurable results",
  "Dedicated team of seasoned professionals",
];

const About = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">
              Why Choose Premier Consulting
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We partner with organizations to unlock their full potential through strategic insight and operational expertise. Our approach combines deep industry knowledge with innovative thinking to deliver sustainable business transformation.
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
                  <div className="text-6xl font-bold text-primary mb-4">500+</div>
                  <div className="text-xl text-muted-foreground mb-8">Successful Projects</div>
                  
                  <div className="text-6xl font-bold text-primary mb-4">98%</div>
                  <div className="text-xl text-muted-foreground">Client Satisfaction</div>
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
