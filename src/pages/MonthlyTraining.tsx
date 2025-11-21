import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, BookOpen, Users, FileCheck, Calendar } from "lucide-react";

const MonthlyTraining = () => {
  return (
    <>
      <Helmet>
        <title>Monthly Safety Training Packages | Cornerstone Risk Management</title>
        <meta
          name="description"
          content="Custom monthly safety training packages for contractors & industrial teams. Professionally designed, turnkey training content delivered monthly with your company branding."
        />
        <meta name="keywords" content="monthly safety training, contractor training, toolbox talks, safety meetings, employee training packages" />
        <link rel="canonical" href="https://cornerstoneriskmgt.com/services/monthly-training" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Navigation />
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-20">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Monthly Safety Training Packages for Contractors & Industrial Teams
              </h1>
              <p className="text-xl max-w-3xl mb-8 text-primary-foreground/90">
                We create custom monthly training packages that help your team stay compliant, informed, and prepared — without the stress of building content yourself.
              </p>
              <Button size="lg" variant="secondary" asChild>
                <a href="#contact">Subscribe to Monthly Training Packages</a>
              </Button>
            </div>
          </section>

          {/* What's Included Section */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-12 text-center">What's Included Each Month</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { icon: BookOpen, title: "Professional Slide Deck", desc: "Professionally designed slide deck with your company branding" },
                  { icon: CheckCircle2, title: "Relevant Topics", desc: "Safety topic aligned with OSHA/industry trends" },
                  { icon: FileCheck, title: "Visuals & Infographics", desc: "Engaging visuals and infographics to enhance learning" },
                  { icon: Users, title: "Instructor Notes", desc: "Detailed instructor notes for easy delivery" },
                  { icon: FileCheck, title: "Attendance Sheet", desc: "Ready-to-use attendance tracking sheet" },
                  { icon: CheckCircle2, title: "Knowledge Check", desc: "Quiz or knowledge check to verify understanding" },
                  { icon: FileCheck, title: "Platform Documentation", desc: "Documentation ready for ISNetworld® / Veriforce® upload" }
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

          {/* Who This Helps Section */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-center">Who This Helps</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: Users, title: "Busy Owners", desc: "Busy owners who need turnkey training solutions" },
                  { icon: CheckCircle2, title: "Small Companies", desc: "Companies without an internal HSE department" },
                  { icon: Calendar, title: "All Teams", desc: "Teams that need consistent, reliable safety content" }
                ].map((client, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <client.icon className="w-12 h-12 text-primary mb-4" />
                      <CardTitle className="text-lg">{client.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{client.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Example Topics Section */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-center">Examples of Topics</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  "Heat stress & hydration",
                  "PPE basics",
                  "Slips, trips, and falls",
                  "Chemical handling",
                  "Job hazard analysis fundamentals",
                  "Cold stress",
                  "Fire safety",
                  "Ladder safety",
                  "Hand & power tool safety",
                  "Housekeeping & workplace organization",
                  "Electrical awareness",
                  "Confined space awareness"
                ].map((topic, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0 mt-1" />
                        <p className="font-medium">{topic}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-center">Why Subscribe</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: CheckCircle2, title: "Save Time", desc: "No need to research or build training content from scratch" },
                  { icon: Calendar, title: "Stay Consistent", desc: "Monthly delivery ensures regular training schedule" },
                  { icon: FileCheck, title: "Meet Requirements", desc: "Satisfy client and OSHA training documentation requirements" },
                  { icon: Users, title: "Professional Quality", desc: "Polished, branded materials that reflect well on your company" }
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

          {/* How It Works Section */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
              <div className="max-w-3xl mx-auto space-y-6">
                {[
                  { step: 1, title: "Subscribe", desc: "Choose your monthly training package subscription" },
                  { step: 2, title: "Receive", desc: "Get your branded training materials delivered each month" },
                  { step: 3, title: "Deliver", desc: "Conduct the training with your team using provided materials" },
                  { step: 4, title: "Document", desc: "File documentation for compliance platform uploads" }
                ].map((item) => (
                  <Card key={item.step}>
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0 font-bold text-xl">
                          {item.step}
                        </div>
                        <CardTitle className="text-xl">{item.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground ml-16">{item.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section id="contact" className="py-20 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold mb-6">Never Worry About Training Content Again</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Subscribe to our monthly training packages and keep your team trained, compliant, and safe.
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

export default MonthlyTraining;
