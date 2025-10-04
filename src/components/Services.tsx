import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, FileCheck, ClipboardCheck, Users } from "lucide-react";

const services = [
  {
    icon: Shield,
    title: "Platform Account Management",
    description: "Complete setup and ongoing management of contractor accounts on ISNetworld®, Avetta®, Veriforce®, and other compliance platforms. We keep your accounts updated and maintain approval status.",
    details: [
      "Account Setup & Organization",
      "Ongoing Account Monitoring",
      "Red Flag Resolution",
      "Approval Status Maintenance"
    ]
  },
  {
    icon: FileCheck,
    title: "Documentation & Compliance",
    description: "Handle all required documentation including questionnaires, insurance certificates, training records, and certifications to keep you compliant across all platforms.",
    details: [
      "PQF/MSQ Questionnaire Completion",
      "COI & Insurance Document Management",
      "Training & Certification Tracking",
      "OQ & Employee Documentation"
    ]
  },
  {
    icon: ClipboardCheck,
    title: "Safety Program Services",
    description: "Develop, review, and upload comprehensive safety programs tailored to meet client requirements. Custom RAVS® programs and company-specific safety manuals.",
    details: [
      "RAVS® Safety Program Support",
      "Custom Safety Programs & Manuals",
      "Policy Development & Review",
      "Program Upload & Management"
    ]
  },
  {
    icon: Users,
    title: "Audit & Consulting Support",
    description: "Expert guidance for audits, custom compliance requests, and troubleshooting. We provide comprehensive support to ensure your compliance success.",
    details: [
      "Audit Preparation & Response",
      "Client-Specific Requirements",
      "Expert Consulting & Guidance",
      "Compliance Issue Resolution"
    ]
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4">
            Comprehensive Compliance Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Full-service digital safety compliance management for contractors and service providers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-card animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="w-14 h-14 bg-accent rounded-lg flex items-center justify-center mb-4 shadow-md">
                  <service.icon className="h-7 w-7 text-accent-foreground" />
                </div>
                <CardTitle className="text-2xl font-serif text-primary">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-muted-foreground leading-relaxed mb-4">
                  {service.description}
                </CardDescription>
                <ul className="space-y-2">
                  {service.details.map((detail, idx) => (
                    <li key={idx} className="text-sm text-foreground flex items-start">
                      <span className="text-accent mr-2">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
