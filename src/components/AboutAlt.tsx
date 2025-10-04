import { CheckCircle2, Award, Users, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "500+",
    label: "Active Accounts"
  },
  {
    icon: Award,
    value: "99%",
    label: "Success Rate"
  },
  {
    icon: TrendingUp,
    value: "15+",
    label: "Years Experience"
  }
];

const benefits = [
  "Experts in ISNetworld®, Avetta®, Veriforce® & more",
  "Managing hundreds of active compliance accounts nationwide",
  "Dedicated support for contractors and service providers",
  "Complete end-to-end compliance management",
];

const AboutAlt = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-secondary/30 via-background to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-lg transition-shadow animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-6 w-6 text-accent" />
                </div>
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Content Section */}
          <div className="text-center max-w-3xl mx-auto mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">
              Why Choose Cornerstone Risk Management
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              We specialize in digital safety compliance, taking the burden of platform management off your shoulders. From account setup to audit support, we ensure your compliance status stays current so you can focus on your core business operations.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="flex items-start space-x-3 p-4 rounded-xl bg-card border border-border hover:border-accent/50 transition-colors animate-slide-up" 
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutAlt;
