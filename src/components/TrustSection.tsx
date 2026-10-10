import { Card, CardContent } from "@/components/ui/card";
import { Shield, Users, Clock, ShieldCheck, Zap } from "lucide-react";
import { Link } from "react-router-dom";


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
    description: "Nationwide"
  },
  {
    icon: Clock,
    value: "15+",
    label: "Years Experience",
    description: "In contractor compliance"
  }
];

const TrustSection = () => {
  return (
    <section id="trust" className="py-20 md:py-24 bg-secondary/30" aria-label="Why contractors choose Cornerstone">
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
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

        <div className="max-w-5xl mx-auto mb-16">
          <h2 className="text-xl font-serif font-bold text-primary mb-6">Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Zero to compliant in 9 days", subtitle: "Mississippi welding and fabrication shop · 2024", anchor: "fab-shop" },
              { title: "Straight F's overnight, fixed in 24 hours", subtitle: "Central Louisiana roustabout contractor · 2024", anchor: "roustabout" },
            ].map((result) => (
              <Card key={result.anchor} className="border-border">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-serif font-bold text-primary mb-2">{result.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{result.subtitle}</p>
                  <Link to={`/case-studies#${result.anchor}`} className="text-primary font-semibold hover:underline">Read the case study →</Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Client Types */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Contractors we support:</p>
          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            {[
              "Construction",
              "Industrial Services & Maintenance",
              "Oil, Gas & Energy",
              "Manufacturing & Food Production"
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
