import { Helmet } from "react-helmet-async";
import NavigationNew from "@/components/NavigationNew";
import FooterNew from "@/components/FooterNew";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Cornerstone Risk Management</title>
        <meta
          name="description"
          content="Contact Cornerstone Risk Management for a free compliance quote. Call 601-647-1201 or send us a message — we'll reach out."
        />
        <link rel="canonical" href="https://contractorcompliancepros.com/contact" />
        <meta property="og:url" content="https://contractorcompliancepros.com/contact" />
        <meta name="twitter:url" content="https://contractorcompliancepros.com/contact" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <NavigationNew />

        <main className="flex-grow pt-24">
          {/* Hero */}
          <section className="bg-primary text-primary-foreground py-20 md:py-28">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl animate-fade-in">
                <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
                  Get in Touch
                </h1>
                <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed">
                  Have questions about compliance management? We're here to help. Reach out directly or request a quote below.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Info + Booking */}
          <section className="py-16 md:py-20 bg-background">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                {/* Contact Details */}
                <div>
                  <h2 className="text-2xl font-serif font-bold text-primary mb-6">Contact Information</h2>
                  <div className="space-y-5">
                    <a
                      href="tel:601-647-1201"
                      className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                    >
                      <Phone className="h-5 w-5 text-accent" />
                      <span className="text-lg">601-647-1201</span>
                    </a>
                    <a
                      href="mailto:garland@cornerstoneriskmgt.com"
                      className="flex items-center gap-3 text-foreground hover:text-primary transition-colors"
                    >
                      <Mail className="h-5 w-5 text-accent" />
                      <span className="text-lg">garland@cornerstoneriskmgt.com</span>
                    </a>
                    <div className="flex items-start gap-3 text-muted-foreground">
                      <MapPin className="h-5 w-5 text-accent mt-0.5" />
                      <span className="text-lg">PO Box 271<br />Crystal Springs, MS 39059</span>
                    </div>
                  </div>
                </div>

                {/* Quote CTA */}
                <div className="bg-muted/30 rounded-lg p-8">
                  <h2 className="text-2xl font-serif font-bold text-primary mb-4">
                    Request a Quote
                  </h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Tell us about your situation and we'll reach out.
                  </p>
                  <Button
                    size="lg"
                    asChild
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-lg py-6"
                  >
                    <a href="/#lead-form">
                      Request a Quote
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>

        <FooterNew />
      </div>
    </>
  );
};

export default Contact;
