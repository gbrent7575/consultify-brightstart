import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, Phone, Mail, MapPin } from "lucide-react";
import { trackBookConsultation, trackPhoneClick } from "@/lib/ga4";
import NewsletterSection from "@/components/NewsletterSection";

const CAL_LINK = "https://cal.com/garland-brent-wa1zbs/15min";

const FooterNew = () => {
  const currentYear = new Date().getFullYear();

  const services = [
    { name: "Digital Compliance Management", path: "/services/compliance-platforms" },
    { name: "Safety Program Development", path: "/services/safety-program-development" },
    { name: "Regulatory Compliance", path: "/services/regulatory-compliance" },
    { name: "Onsite Audits & Training", path: "/services/onsite-audits-training" },
    { name: "Risk Consulting", path: "/services/risk-consulting" }
  ];

  const platforms = [
    "ISNetworld®",
    "Avetta®",
    "Veriforce®",
    "PEC Premier®",
    "BROWZ®"
  ];

  return (
    <>
      <NewsletterSection />
      <footer className="bg-primary text-primary-foreground">
      {/* CTA Section */}
      <div className="border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h3 className="text-2xl font-serif font-bold mb-2">
                Ready to Get Compliant?
              </h3>
              <p className="text-primary-foreground/70">
                Book a free 15-minute consultation — no obligation
              </p>
            </div>
            <Button 
              size="lg"
              asChild
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" onClick={trackBookConsultation}>
                <Calendar className="mr-2 h-5 w-5" />
                Book Free Consultation
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-4">
              Cornerstone Risk Management
            </h4>
            <p className="text-sm text-primary-foreground/70 mb-4 leading-relaxed">
              Professional compliance management for contractors. We handle ISNetworld, Avetta, Veriforce, and more — so you can focus on your work.
            </p>
            <div className="space-y-2">
              <a 
                href="tel:601-647-1201" 
                className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                <Phone className="h-4 w-4" />
                601-647-1201
              </a>
              <a 
                href="mailto:garland@cornerstoneriskmgt.com" 
                className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                <Mail className="h-4 w-4" />
                garland@cornerstoneriskmgt.com
              </a>
              <div className="flex items-start gap-2 text-sm text-primary-foreground/70">
                <MapPin className="h-4 w-4 mt-0.5" />
                <span>PO Box 271<br />Crystal Springs, MS 39059</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.path}>
                  <Link 
                    to={service.path}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platforms */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Platforms We Manage</h4>
            <ul className="space-y-2">
              {platforms.map((platform) => (
                <li key={platform} className="text-sm text-primary-foreground/70">
                  {platform}
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get Started</h4>
            <p className="text-sm text-primary-foreground/70 mb-4">
              Free 15-minute consultation to discuss your compliance needs
            </p>
            <Button 
              asChild
              variant="outline"
              className="w-full border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              <a href={CAL_LINK} target="_blank" rel="noopener noreferrer">
                <Calendar className="mr-2 h-4 w-4" />
                Book Consultation
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Trademarks Disclaimer */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <h4 className="text-sm font-semibold mb-2 text-primary-foreground/70">Trademarks</h4>
          <p className="text-xs text-primary-foreground/50 mb-2 max-w-4xl">
            Cornerstone Risk Management is in no way endorsed, sponsored, approved by, or otherwise affiliated with ISNetworld® or ISN Software Corporation.
          </p>
          <p className="text-xs text-primary-foreground/50 max-w-4xl">
            ISNetworld® is a registered trademark of ISN Software Corporation. Avetta®, Veriforce®, PEC Premier®, and BROWZ® are registered trademarks of their respective owners.
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-primary-foreground/50">
            © {currentYear} Cornerstone Risk Management. All rights reserved.
          </p>
        </div>
      </div>
      </footer>
    </>
  );
};

export default FooterNew;
