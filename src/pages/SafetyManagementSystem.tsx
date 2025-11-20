import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, FileText, Users, TrendingUp, ClipboardCheck, Shield, AlertCircle } from "lucide-react";

const SafetyManagementSystem = () => {
  return (
    <>
      <Helmet>
        <title>Safety Management System (SMS) Development | Cornerstone Risk Management</title>
        <meta
          name="description"
          content="Professional SMS development and implementation services. Build scalable safety management systems that work in the real world for contractors and industrial companies."
        />
        <meta name="keywords" content="safety management system, SMS development, safety framework, safety program implementation, contractor SMS" />
        <link rel="canonical" href="https://cornerstoneriskmgt.com/services/safety-management-system" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navigation />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-20">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Safety Management System (SMS) Development & Implementation
              </h1>
              <p className="text-xl max-w-3xl mb-8 text-primary-foreground/90">
                A strong Safety Management System gives your company structure, consistency, and long-term improvement. We build scalable SMS frameworks that work in the real world — not just on paper.
              </p>
              <Button size="lg" variant="secondary" asChild>
                <a href="#contact">Start Building Your Safety Management System</a>
              </Button>
            </div>
          </section>

          {/* SMS Components Section */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12 text-center">SMS Components We Build</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: FileText, title: "Policies & Procedures", desc: "Comprehensive written policies and operating procedures" },
                  { icon: Users, title: "Roles & Responsibilities", desc: "Clear accountability structure across your organization" },
                  { icon: ClipboardCheck, title: "Training Structure", desc: "Training structure and competency tracking systems" },
                  { icon: AlertCircle, title: "Risk Assessment", desc: "Risk assessment processes and hazard identification" },
                  { icon: Shield, title: "Audit Programs", desc: "Audit and assurance programs for ongoing verification" },
                  { icon: FileText, title: "Incident Reporting", desc: "Incident reporting and investigation workflow" },
                  { icon: CheckCircle2, title: "Document Control", desc: "Document control and version tracking" }
                ].map((component, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <component.icon className="w-12 h-12 text-primary mb-4" />
                      <CardTitle className="text-lg">{component.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{component.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Why SMS Matters Section */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-center">Why an SMS Matters</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Shield, title: "Stronger Client Confidence", desc: "Demonstrate systematic approach to safety management" },
                  { icon: CheckCircle2, title: "More Consistent Operations", desc: "Standardize processes across projects and teams" },
                  { icon: FileText, title: "Better Regulatory Alignment", desc: "Meet OSHA, IOGP, and client-specific requirements" },
                  { icon: TrendingUp, title: "Reduced Incidents", desc: "Proactively identify and mitigate risks before incidents occur" }
                ].map((benefit, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <benefit.icon className="w-12 h-12 text-primary mb-4" />
                      <CardTitle className="text-lg">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Our Approach Section */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-center">Our Approach</h2>
              <div className="max-w-4xl mx-auto space-y-6">
                {[
                  { title: "Assessment", desc: "We evaluate your current safety program and operational needs" },
                  { title: "Design", desc: "We design an SMS framework tailored to your company size and industry" },
                  { title: "Documentation", desc: "We create all required policies, procedures, and forms" },
                  { title: "Implementation", desc: "We guide you through rollout and employee training" },
                  { title: "Monitoring", desc: "We establish metrics and ongoing performance monitoring" }
                ].map((step, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 font-bold text-xl">
                          {index + 1}
                        </div>
                        <CardTitle className="text-xl">{step.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground ml-16">{step.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Deliverables Section */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8">Deliverables</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  "Complete SMS framework documentation",
                  "Custom documentation packet aligned with your operations",
                  "Implementation roadmap with timeline and milestones",
                  "Ongoing performance monitoring and improvement recommendations"
                ].map((deliverable, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="text-primary w-6 h-6 flex-shrink-0 mt-1" />
                    <p className="text-lg">{deliverable}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Who Needs SMS Section */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-center">Who Needs an SMS?</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  "Growing contractors needing formal structure",
                  "Companies with multiple locations or project sites",
                  "Organizations pursuing ISO 45001 or similar certifications"
                ].map((client, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <CheckCircle2 className="w-12 h-12 text-primary mb-4" />
                      <p className="text-lg">{client}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section id="contact" className="py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-6">Build a Safety System That Works</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Start building your Safety Management System and create lasting structure for your safety program.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <a href="tel:601-627-1201">Call 601-627-1201</a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="mailto:garland@cornerstoneriskmgt.com">Email Us</a>
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default SafetyManagementSystem;
