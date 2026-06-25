import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, Clock, Award, ShieldCheck, Zap } from "lucide-react";


const stats = [
  {
    icon: Shield,
    value: "99%",
    label: "Compliance Success Rate",
    description: "Our clients stay approved"
  },
  {
    icon: Users,
    value: "100+",
    label: "Contractors Managed",
    description: "Across the Gulf Coast & beyond"
  },
  {
    icon: Clock,
    value: "15+",
    label: "Years Experience",
    description: "In contractor compliance"
  },
  {
    icon: Award,
    value: "24hr",
    label: "Response Time",
    description: "For urgent compliance issues"
  }
];

const testimonials = [
  {
    quote: "Cornerstone took over our ISNetworld account and we went from red flags to fully approved in two weeks. They handle everything now — I haven't logged in once this year.",
    author: "Operations Manager",
    company: "Gulf Coast Welding Services"
  },
  {
    quote: "We were losing bids because of compliance issues. Now we're approved on three platforms and winning more work than ever. Best investment we've made.",
    author: "Owner",
    company: "Industrial Maintenance Contractor"
  },
  {
    quote: "The monthly maintenance is worth every penny. They catch expiring documents before they become problems and keep us in the green.",
    author: "Safety Director",
    company: "Pipeline Services Company"
  }
];

const TrustSection = () => {
  return (
    <section id="trust" className="py-20 md:py-24 bg-secondary/30" aria-labelledby="trust-heading">
      <div className="container mx-auto px-4">
        {/* Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-5xl mx-auto">
          <div className="bg-primary text-primary-foreground rounded-lg p-6 flex items-start gap-4">
            <ShieldCheck className="w-10 h-10 text-accent flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold mb-2">Approved or your setup fee back</h3>
              <p className="text-primary-foreground/85">If we can't get your account to approved, your setup fee is refunded. Simple as that.</p>
            </div>
          </div>
          <div className="bg-primary text-primary-foreground rounded-lg p-6 flex items-start gap-4">
            <Zap className="w-10 h-10 text-accent flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold mb-2">Submitted in 5 business days or your first month is free</h3>
              <p className="text-primary-foreground/85">Once we have your documents, your submission is in within 5 business days — or your first month of maintenance is on us.</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card 
              key={stat.label} 
              className="border-border text-center animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-6 w-6 text-accent" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="font-medium text-foreground mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonials */}
        <div className="text-center mb-12">
          <h2 id="trust-heading" className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground">
            Real results from real contractors
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="border-border animate-slide-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <CardContent className="pt-6">
                <div className="text-accent text-4xl font-serif mb-4">"</div>
                <p className="text-foreground leading-relaxed mb-6">
                  {testimonial.quote}
                </p>
                <div className="border-t border-border pt-4">
                  <div className="font-semibold text-primary">{testimonial.author}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Client Types */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">Trusted by contractors working with:</p>
          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            {[
              "Major Refineries",
              "Chemical Plants", 
              "Pipeline Companies",
              "Energy Producers",
              "Industrial Facilities"
            ].map((client) => (
              <span 
                key={client}
                className="px-4 py-2 bg-background border border-border rounded-md text-sm text-muted-foreground"
              >
                {client}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
