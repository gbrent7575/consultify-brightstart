import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import TrademarkNotice from "@/components/TrademarkNotice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, FileCheck, Upload, Award, RefreshCw } from "lucide-react";
import heroImage from "@/assets/hero-compliance-platforms.jpg";

const CompliancePlatforms = () => {
  return (
    <>
      <Helmet>
        <title>ISNetworld® / Veriforce® / Avetta® Compliance Support Services | Cornerstone Risk Management</title>
        <meta
          name="description"
          content="Expert ISNetworld®, Veriforce®, and Avetta® compliance support services. We handle account setup, document uploads, questionnaires, and ongoing maintenance. 99% success rate across all platforms."
        />
        <meta name="keywords" content="ISNetworld compliance support, Veriforce compliance services, Avetta compliance support, RAVS compliance, contractor prequalification" />
        <link rel="canonical" href="https://cornerstoneriskmgt.com/services/compliance-platforms" />
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
                alt="ISNetworld® Veriforce® Avetta® compliance support services" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/70" />
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-20 relative z-10">
              <div className="max-w-3xl animate-fade-in">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary-foreground">
                  ISNetworld® / Veriforce® / Avetta® Compliance Support Services
                </h1>
                <p className="text-xl mb-8 text-primary-foreground/90">
                  Cornerstone Risk Management helps contractors navigate online compliance platforms so they can qualify for more clients and maintain strong standing in each system.
                </p>
                <Button size="lg" variant="secondary" asChild>
                  <a href="#contact">Get Help With Your Compliance Platform Accounts</a>
                </Button>
              </div>
            </div>
          </section>

          {/* What's Included Section */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12 text-center">What's Included</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                {[
                  { icon: FileCheck, title: "Account Setup", desc: "We set up or update your account" },
                  { icon: Upload, title: "Document Upload", desc: "We upload all safety documentation and RAVS® documents" },
                  { icon: CheckCircle2, title: "Questionnaires", desc: "We complete questionnaires and scoring elements" },
                  { icon: Award, title: "Documentation", desc: "We manage insurance, training, and EMR documentation" },
                  { icon: RefreshCw, title: "Score Review", desc: "We review your score and correct issues" }
                ].map((service, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6 text-center">
                      <service.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">{service.title}</h3>
                      <p className="text-sm text-muted-foreground">{service.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Common Problems Section */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-center">Common Problems We Solve</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  "Missing documentation",
                  "Outdated procedures",
                  "Low scores preventing client approval",
                  "Confusion around questionnaire requirements"
                ].map((problem, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <p className="text-lg font-medium text-center">"{problem}"</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Platforms We Support */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-center">Platforms We Support</h2>
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {[
                  { name: "ISNetworld®", desc: "Comprehensive support for ISNetworld® accounts, including RAVS® uploads and questionnaire completion" },
                  { name: "Veriforce®", desc: "Complete support for Veriforce® profiles, training records, and compliance documentation" },
                  { name: "Avetta®", desc: "Full service support for Avetta® account setup, maintenance, and ongoing compliance needs" }
                ].map((platform, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <Award className="w-12 h-12 text-primary mb-4" />
                      <CardTitle className="text-xl">{platform.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{platform.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Trademark Notice */}
              <div className="max-w-4xl mx-auto mt-8">
                <TrademarkNotice />
              </div>
            </div>
          </section>

          {/* Deliverables Section */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8">Deliverables</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  "Completed account profile",
                  "Full document upload",
                  "Updated safety programs",
                  "Ongoing monthly or quarterly maintenance options"
                ].map((deliverable, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="text-primary w-6 h-6 flex-shrink-0 mt-1" />
                    <p className="text-lg">{deliverable}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Cornerstone</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  "15+ years navigating compliance platforms",
                  "Fast turnaround and responsive support",
                  "Strong understanding of what clients look for in contractor profiles"
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
              <h2 className="text-3xl font-bold mb-6">Qualify for More Clients</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Get expert help with your compliance platforms and improve your standing with industrial clients.
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

export default CompliancePlatforms;
