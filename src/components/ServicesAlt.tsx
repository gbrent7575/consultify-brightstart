import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, FileCheck, ClipboardCheck, Users, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Shield,
    title: "Platform Account Management",
    description: "Complete setup and ongoing management of contractor accounts on ISNetworld®, Avetta®, Veriforce®, and other compliance platforms.",
    features: ["Account Setup", "Red Flag Resolution", "Status Monitoring"]
  },
  {
    icon: FileCheck,
    title: "Documentation & Compliance",
    description: "Handle all required documentation including questionnaires, insurance certificates, training records, and certifications.",
    features: ["PQF/MSQ Completion", "COI Management", "Training Tracking"]
  },
  {
    icon: ClipboardCheck,
    title: "Safety Program Services",
    description: "Develop, review, and upload comprehensive safety programs tailored to meet client requirements.",
    features: ["RAVS® Programs", "Custom Manuals", "Policy Development"]
  },
  {
    icon: Users,
    title: "Audit & Consulting Support",
    description: "Expert guidance for audits, custom compliance requests, and troubleshooting to ensure success.",
    features: ["Audit Preparation", "Expert Consulting", "Issue Resolution"]
  },
];

const ServicesAlt = () => {
  return (
    <section id="services" className="py-20 bg-background relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-secondary/30 to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16 animate-fade-in">
          <div className="inline-block px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-4">
            <span className="text-accent font-medium text-sm">What We Do</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
            Comprehensive Compliance Services
          </h2>
          <p className="text-lg text-muted-foreground">
            End-to-end digital safety compliance management for contractors and service providers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card group animate-slide-up overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent group-hover:scale-110 transition-all">
                    <service.icon className="h-6 w-6 text-accent group-hover:text-accent-foreground transition-colors" />
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                </div>
                <CardTitle className="text-xl font-serif text-primary group-hover:text-accent transition-colors">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {service.description}
                </CardDescription>
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature, idx) => (
                    <span 
                      key={idx} 
                      className="text-xs px-3 py-1 bg-secondary rounded-full text-foreground border border-border"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesAlt;
