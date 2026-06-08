import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, ClipboardCheck, Users, BookOpen, Camera } from "lucide-react";
import heroImage from "@/assets/hero-audits-training.jpg";

const OnsiteAuditsTraining = () => {
  return (
    <>
      <Helmet>
        <title>Onsite Safety Audits & Training | Cornerstone Risk Management</title>
        <meta
          name="description"
          content="Professional onsite safety audits and employee training services. Identify hazards, improve work practices, and strengthen your safety culture."
        />
        <meta name="keywords" content="safety audits, onsite training, employee safety training, facility audits, compliance audits" />
        <link rel="canonical" href="https://cornerstoneriskmgt.com/services/onsite-audits-training" />
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
                alt="Onsite safety audits and employee training" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/70" />
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-20 relative z-10">
              <div className="max-w-3xl animate-fade-in">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary-foreground">
                  Onsite Safety Audits & Employee Training
                </h1>
                <p className="text-xl mb-8 text-primary-foreground/90">
                  Cornerstone Risk Management provides professional onsite audits and tailored training that identify hazards, improve work practices, and strengthen your safety culture.
                </p>
                <Button size="lg" variant="secondary" asChild>
                  <a href="#contact">Request an Onsite Audit or Training Session</a>
                </Button>
              </div>
            </div>
          </section>

          {/* Audit Services Section */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8">Audit Services</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {[
                  { icon: ClipboardCheck, title: "Facility Safety Audits", desc: "Comprehensive evaluation of your facility" },
                  { icon: Users, title: "Field Observations", desc: "On-the-ground work practice assessments" },
                  { icon: CheckCircle2, title: "Client Readiness Audits", desc: "Pre-qualification preparation" },
                  { icon: ClipboardCheck, title: "Regulatory Compliance Reviews", desc: "OSHA and industry standard verification" },
                  { icon: Camera, title: "Incident Analysis", desc: "Root cause investigation and trend reviews" }
                ].map((service, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <service.icon className="w-12 h-12 text-primary mb-4" />
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{service.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <h3 className="text-2xl font-bold mb-6">Audit Deliverables Include:</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  "Full written audit report",
                  "Corrective action recommendations",
                  "Photos, documentation findings, and risk prioritization"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="text-primary w-6 h-6 flex-shrink-0 mt-1" />
                    <p className="text-lg">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Training Services Section */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8">Employee Training Services</h2>
              <p className="text-xl mb-8 max-w-3xl">
                We provide practical, field-focused training on topics such as:
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  "Heat stress and hydration",
                  "Hazard communication",
                  "PPE and basic industrial safety",
                  "JSA / JHA training",
                  "Confined space awareness",
                  "Lockout/tagout (awareness-level)",
                  "New-hire safety orientation"
                ].map((topic, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <BookOpen className="text-primary w-6 h-6 flex-shrink-0 mt-1" />
                        <p className="font-medium">{topic}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <p className="text-lg mt-8 text-center">
                Training can be delivered <strong>onsite</strong> or <strong>virtually</strong>.
              </p>
            </div>
          </section>

          {/* Why This Matters Section */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-center">Why This Matters</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: CheckCircle2, title: "Lower Injury Rates", desc: "Reduce workplace incidents and improve safety metrics" },
                  { icon: Users, title: "Increased Client Confidence", desc: "Demonstrate commitment to safety standards" },
                  { icon: ClipboardCheck, title: "Better Operational Consistency", desc: "Standardize procedures across your team" },
                  { icon: CheckCircle2, title: "Improved Compliance", desc: "Meet OSHA and client expectations" }
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

          {/* CTA Section */}
          <section id="contact" className="py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-6">Strengthen Your Safety Culture</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Request an onsite audit or training session and take your safety program to the next level.
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

export default OnsiteAuditsTraining;
