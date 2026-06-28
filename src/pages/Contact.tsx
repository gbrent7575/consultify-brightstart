import { Helmet } from "react-helmet-async";
import NavigationNew from "@/components/NavigationNew";
import FooterNew from "@/components/FooterNew";
import { Button } from "@/components/ui/button";
import { Calendar, Phone, Mail, MapPin } from "lucide-react";

const CAL_LINK = "https://cal.com/garland-brent-wa1zbs/15min";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Cornerstone Risk Management — Free Consultation</title>
        <meta
          name="description"
          content="Contact Cornerstone Risk Management for a free 15 minute compliance consultation. Call 601-647-1201 or book online. No obligation."
        />
        <link rel="canonical" href="https://contractorcompliancepros.com/contact" />
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
                  Have questions about compliance management? We're here to help. Reach out directly or book a free consultation.
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

                {/* Booking CTA */}
                <div className="bg-muted/30 rounded-lg p-8">
                  <h2 className="text-2xl font-serif font-bold text-primary mb-4">
                    Book a Free Consultation
                  </h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Schedule a free 15-minute call to discuss your compliance needs — no obligation.
                  </p>
                  <Button
                    size="lg"
                    asChild
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90 text-lg py-6"
                  >
                    <a href={CAL_LINK} target="_blank" rel="noopener noreferrer">
                      <Calendar className="mr-2 h-5 w-5" />
                      Schedule a Call
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
