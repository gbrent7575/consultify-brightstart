import { Helmet } from "react-helmet";
import NavigationNew from "@/components/NavigationNew";
import FooterNew from "@/components/FooterNew";
import TrademarkNotice from "@/components/TrademarkNotice";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Phone, Mail, ShieldCheck, Users, Clock, Award } from "lucide-react";

const CAL_LINK = "https://cal.com/garland-brent-wa1zbs/15min";

const About = () => {
  const scrollToHomeForm = () => {
    window.location.href = "/#lead-form";
  };

  return (
    <>
      <Helmet>
        <title>About Cornerstone Risk Management — Safety Consulting & Digital Compliance</title>
        <meta
          name="description"
          content="15 plus years managing ISNetworld, Avetta and Veriforce accounts for 100 plus oil and gas contractors. Gulf Coast based. 24 hour response time."
        />
        <link rel="canonical" href="https://cornerstoneriskmgt.com/about" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <NavigationNew />

        <main className="flex-grow pt-24">
          {/* Hero Section */}
          <section className="bg-primary text-primary-foreground py-20 md:py-28">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl animate-fade-in">
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
                  About Cornerstone Risk Management
                </h1>
                <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed">
                  With over 15 years of experience, Cornerstone Risk Management provides safety consulting and digital compliance management services for oil and gas contractors across the Gulf Coast and Southeast United States.
                </p>
              </div>
            </div>
          </section>

          {/* What We Do */}
          <section className="py-16 md:py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-serif font-bold text-primary mb-6">What We Do</h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                  We manage ISNetworld®, Veriforce®, Avetta®, PEC®, and BROWZ® accounts for 100+ contractors — handling account setup, document uploads, questionnaire responses, and ongoing maintenance so our clients can focus on operations instead of paperwork.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Cornerstone Risk Management maintains a 99% compliance success rate and responds to urgent issues within 24 hours.
                </p>
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
                {[
                  { icon: Clock, stat: "15+", label: "Years Experience" },
                  { icon: Users, stat: "100+", label: "Contractors Managed" },
                  { icon: ShieldCheck, stat: "99%", label: "Success Rate" },
                  { icon: Award, stat: "24hr", label: "Response Time" },
                ].map((item) => (
                  <div key={item.label} className="animate-fade-in">
                    <item.icon className="h-8 w-8 text-accent mx-auto mb-3" />
                    <div className="text-3xl font-serif font-bold text-primary mb-1">{item.stat}</div>
                    <div className="text-sm text-muted-foreground">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Trademark Notice */}
          <section className="py-8 bg-background">
            <div className="container mx-auto px-4 max-w-3xl">
              <TrademarkNotice />
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                Book a free 15-minute consultation or request a quote today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button
                  size="lg"
                  asChild
                  className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6"
                >
                  <a href={CAL_LINK} target="_blank" rel="noopener noreferrer">
                    <Calendar className="mr-2 h-5 w-5" />
                    Book Free Consultation
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8 py-6 bg-transparent"
                >
                  <a href="/#lead-form">
                    Request a Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-primary-foreground/80">
                <a href="tel:601-647-1201" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
                  <Phone className="h-4 w-4" />
                  601-647-1201
                </a>
                <a href="mailto:garland@cornerstoneriskmgt.com" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
                  <Mail className="h-4 w-4" />
                  garland@cornerstoneriskmgt.com
                </a>
              </div>
            </div>
          </section>
        </main>

        <FooterNew />
      </div>
    </>
  );
};

export default About;
