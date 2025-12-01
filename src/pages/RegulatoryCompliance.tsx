import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, FileCheck, Shield, AlertCircle } from "lucide-react";
import heroImage from "@/assets/hero-regulatory-compliance.jpg";

const RegulatoryCompliance = () => {
  return (
    <>
      <Helmet>
        <title>Regulatory Compliance Support | Cornerstone Risk Management</title>
        <meta
          name="description"
          content="Expert regulatory compliance support for industrial & contractor operations. OSHA, DOT, and industry-specific compliance services in Mississippi and Gulf Coast."
        />
        <meta name="keywords" content="regulatory compliance, OSHA compliance, DOT compliance, industrial compliance, contractor compliance" />
        <link rel="canonical" href="https://cornerstoneriskmgt.com/services/regulatory-compliance" />
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
                alt="Regulatory compliance support for industrial operations" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/70" />
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-20 relative z-10">
              <div className="max-w-3xl animate-fade-in">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary-foreground">
                  Regulatory Compliance Support for Industrial & Contractor Operations
                </h1>
                <p className="text-xl mb-8 text-primary-foreground/90">
                  Regulatory compliance is complex and ever-changing. Cornerstone Risk Management helps Mississippi and Gulf Coast companies stay aligned with OSHA, DOT (if applicable), and industry-specific requirements so your team stays safe and your operations stay uninterrupted.
                </p>
                <Button size="lg" variant="secondary" asChild>
                  <a href="#contact">Book a Compliance Consultation</a>
                </Button>
              </div>
            </div>
          </section>

          {/* Process Section */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12 text-center">Our Compliance Support Process</h2>
              <div className="grid md:grid-cols-5 gap-6">
                {[
                  { icon: FileCheck, title: "Review", desc: "We review your current documentation and operations" },
                  { icon: AlertCircle, title: "Identify", desc: "We identify compliance gaps" },
                  { icon: Shield, title: "Prioritize", desc: "We prioritize immediate risks" },
                  { icon: CheckCircle2, title: "Develop", desc: "We develop corrective actions and required documentation" },
                  { icon: CheckCircle2, title: "Monitor", desc: "We provide ongoing monitoring and updates" }
                ].map((step, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6 text-center">
                      <step.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Compliance Areas */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8">Compliance Areas We Support</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "OSHA 1910 General Industry",
                  "IOGP Report 423 alignment",
                  "Electrical, confined space, LOTO, hazard communication, PPE, and hot work programs",
                  "Recordkeeping and OSHA logs",
                  "Incident investigation and reporting",
                  "Safety training and documentation packages"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="text-primary w-6 h-6 flex-shrink-0 mt-1" />
                    <p className="text-lg">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Common Problems */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8">Common Problems We Solve</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  "We aren't sure what OSHA requires for our size/type of company.",
                  "We failed a client audit and need immediate corrections.",
                  "Our training documentation is disorganized."
                ].map((problem, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <AlertCircle className="w-12 h-12 text-primary mb-4" />
                      <p className="text-lg font-medium">"{problem}"</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Deliverables Section */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8">Deliverables You Receive</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { icon: FileCheck, title: "Updated Policies", desc: "Updated policies and procedures" },
                  { icon: Shield, title: "Audit Report", desc: "Regulatory compliance audit report" },
                  { icon: CheckCircle2, title: "Action Plan", desc: "Corrective action plan" },
                  { icon: FileCheck, title: "Documentation", desc: "Required safety postings and documentation templates" },
                  { icon: CheckCircle2, title: "Follow-up", desc: "Monthly or quarterly follow-up support" }
                ].map((item, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <item.icon className="w-12 h-12 text-primary mb-4" />
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section id="contact" className="py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-6">Stay Compliant and Secure</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Book a compliance consultation and ensure your operations meet all regulatory requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <a href="tel:601-627-1201">Call 601-627-1201</a>
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

export default RegulatoryCompliance;
