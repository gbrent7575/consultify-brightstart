import { Helmet } from "react-helmet-async";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, FileText, Users, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-safety-program-dev.jpg";

const SafetyProgramDevelopment = () => {
  return (
    <>
      <Helmet>
        <title>Safety Program Development | Cornerstone Risk Management</title>
        <meta
          name="description"
          content="Professional safety program development for contractors & industrial operations. OSHA-compliant, customized safety programs with 15+ years experience."
        />
        <meta name="keywords" content="safety program development, OSHA compliance, contractor safety, industrial safety programs" />
        <link rel="canonical" href="https://cornerstoneriskmgt.com/services/safety-program-development" />
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
                alt="Safety program development for industrial contractors" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/70" />
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-20 relative z-10">
              <div className="max-w-3xl animate-fade-in">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 text-primary-foreground">
                  Safety Program Development for Contractors & Industrial Operations
                </h1>
                <p className="text-xl mb-8 text-primary-foreground/90">
                  At Cornerstone Risk Management, we help Pipeline contractors, industrial service providers, and oil & gas support companies build safety programs that meet OSHA expectations, align with industry best practices, and reduce operational risk. With 15+ years of field and consulting experience, we create programs that are practical, compliant, and easy for your team to implement.
                </p>
                <Button size="lg" variant="secondary" asChild>
                  <a href="#contact">Schedule Your Safety Program Review</a>
                </Button>
              </div>
            </div>
          </section>

          {/* Approach Section */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12 text-center">Our Approach to Safety Program Development</h2>
              <div className="grid md:grid-cols-5 gap-6">
                {[
                  "We analyze your current program",
                  "We identify gaps based on OSHA, IOGP, and client requirements",
                  "We design your customized safety roadmap",
                  "We implement documentation, procedures, and training",
                  "We monitor and adjust as your business grows"
                ].map((step, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">
                          {index + 1}
                        </div>
                        <p className="text-sm">{step}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* What's Included Section */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8">What's Included in a Completed Safety Program</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Written HSE manual aligned with OSHA 1910 and IOGP Report 423",
                  "Hazard assessments and operating procedures",
                  "Employee orientation packets",
                  "JSA/JHA templates",
                  "Safety meeting documents",
                  "Field-level audit checklists",
                  "Corrective action tracking",
                  "ISNetworld® / Veriforce® / Avetta® documentation support"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="text-primary w-6 h-6 flex-shrink-0 mt-1" />
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Who This Service Is For */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8">Who This Service Is For</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: Users, title: "New Contractors", desc: "Entering new client facilities" },
                  { icon: TrendingUp, title: "Growing Companies", desc: "Scaling operations and needing formal documentation" },
                  { icon: FileText, title: "Outdated Programs", desc: "Businesses with patchwork safety programs" },
                  { icon: CheckCircle2, title: "Client Alignment", desc: "Organizations needing alignment with industrial or oil & gas clients" }
                ].map((item, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <item.icon className="w-12 h-12 text-primary mb-4" />
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Common Problems */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8">Common Problems We Solve</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  "We don't have a documented safety program.",
                  "Clients keep requesting additional safety procedures.",
                  "Our program was copied from a template and needs real customization.",
                  "We aren't sure what OSHA requires for our industry."
                ].map((problem, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <p className="text-lg font-medium">"{problem}"</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8">Why Cornerstone Risk Management</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  "15+ years supporting Gulf Coast industrial contractors",
                  "Practical, field-tested documentation",
                  "Fast turnaround and ongoing support",
                  "Strong familiarity with compliance platforms and operator expectations"
                ].map((benefit, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <CheckCircle2 className="text-primary w-8 h-8 mb-3" />
                      <p>{benefit}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
              <div className="space-y-6 max-w-3xl">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">How long does it take to build a complete program?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Most programs take 1–2 weeks depending on your size and complexity.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Can you update a program we already have?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Yes — we can revise, rewrite, or modernize any existing documentation.</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Do you handle client-specific addendums?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Absolutely. We regularly write programs for specific refinery, plant, or utility requirements.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section id="contact" className="py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Build Your Safety Program?</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Schedule your Safety Program Review today and get started with a compliant, comprehensive safety program.
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

export default SafetyProgramDevelopment;
