import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, TrendingUp, Users, FileText, Wrench } from "lucide-react";
import heroImage from "@/assets/hero-risk-consulting.jpg";

const RiskConsulting = () => {
  return (
    <>
      <Helmet>
        <title>Contractor & Industrial Risk Consulting | Cornerstone Risk Management</title>
        <meta
          name="description"
          content="Expert risk management consulting for contractors and industrial service companies. Reduce risk, improve job execution, and meet client expectations."
        />
        <meta name="keywords" content="risk consulting, contractor risk management, industrial consulting, operational risk, safety consulting" />
        <link rel="canonical" href="https://cornerstoneriskmgt.com/services/risk-consulting" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navigation />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative min-h-[60vh] flex items-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
              <img 
                src={heroImage} 
                alt="Risk management consulting for contractors" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/70" />
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-20 relative z-10">
              <div className="max-w-3xl animate-fade-in">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary-foreground">
                  Contractor & Industrial Risk Management Consulting
                </h1>
                <p className="text-xl mb-8 text-primary-foreground/90">
                  We help contractors and industrial service companies reduce risk, improve job execution, and meet client expectations through hands-on consulting support.
                </p>
                <Button size="lg" variant="secondary" asChild>
                  <a href="#contact">Schedule a Risk Consulting Session</a>
                </Button>
              </div>
            </div>
          </section>

          {/* What We Do Section */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12 text-center">What We Do</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                {[
                  { icon: TrendingUp, title: "Evaluate", desc: "Evaluate your operational risk profile" },
                  { icon: CheckCircle2, title: "Conduct", desc: "Conduct job-level hazard assessments" },
                  { icon: FileText, title: "Develop", desc: "Develop work processes and SOPs" },
                  { icon: Users, title: "Coach", desc: "Provide ongoing coaching for supervisors and leads" },
                  { icon: CheckCircle2, title: "Monitor", desc: "Monitor leading indicators and improve safety culture" }
                ].map((item, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6 text-center">
                      <item.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Typical Clients Section */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-center">Typical Clients</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Wrench, title: "Industrial Contractors", desc: "Multi-trade contractors serving industrial clients" },
                  { icon: TrendingUp, title: "Oil & Gas Support", desc: "Companies providing pipeline and field services" },
                  { icon: Users, title: "Maintenance & Service", desc: "Maintenance and service-based businesses" },
                  { icon: CheckCircle2, title: "Environmental Firms", desc: "Environmental and remediation firms" }
                ].map((client, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <client.icon className="w-12 h-12 text-primary mb-4" />
                      <CardTitle className="text-lg">{client.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{client.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Deliverables Section */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8">Deliverables</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { icon: FileText, title: "Risk Assessment Report", desc: "Comprehensive evaluation of your operational risks and improvement opportunities" },
                  { icon: CheckCircle2, title: "Improved Workflows", desc: "Improved workflows and process documentation tailored to your operations" },
                  { icon: Users, title: "Training Aids", desc: "Toolbox talk and training aids for your supervisors and field teams" },
                  { icon: TrendingUp, title: "Ongoing Recommendations", desc: "Ongoing improvement recommendations to sustain safety performance" }
                ].map((deliverable, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <deliverable.icon className="w-12 h-12 text-primary mb-4" />
                      <CardTitle className="text-lg">{deliverable.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{deliverable.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-center">Why Work With Us</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  "15+ years of field and consulting experience",
                  "Practical, hands-on approach to risk management",
                  "Strong understanding of contractor operations and client expectations"
                ].map((benefit, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <CheckCircle2 className="w-12 h-12 text-primary mb-4" />
                      <p className="text-lg">{benefit}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section id="contact" className="py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-6">Reduce Risk, Improve Performance</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Schedule a risk consulting session and get expert guidance to strengthen your operations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <a href="tel:601-647-1201">Call 601-647-1201</a>
                </Button>
                <Button size="lg" variant="secondary" asChild>
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

export default RiskConsulting;
