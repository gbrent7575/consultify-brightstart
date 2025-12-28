import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Phone } from "lucide-react";
import heroImage from "@/assets/hero-option-1-oilfield.jpg";

const CAL_LINK = "https://cal.com/garland-brent-wa1zbs/15min";

const HeroNew = () => {
  const scrollToForm = () => {
    const element = document.getElementById('lead-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header role="banner" className="relative min-h-[90vh] flex items-center overflow-hidden" aria-label="Hero section">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Oil and gas contractor compliance support" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        <div className="max-w-3xl animate-fade-in">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-primary-foreground/90 font-medium">99% Compliance Success Rate</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground mb-6 leading-tight">
            Need Help with ISNetworld® or Avetta® Compliance? We Provide Support So You Can Get Back to Work.
          </h1>
          
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 leading-relaxed">
            Complete setup, maintenance, and ongoing compliance support services — with a 99% success rate. Stop losing contracts over paperwork.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button 
              size="lg" 
              asChild
              className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
            >
              <a href={CAL_LINK} target="_blank" rel="noopener noreferrer">
                <Calendar className="mr-2 h-5 w-5" />
                Book Free Consultation
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={scrollToForm}
              className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8 py-6 bg-transparent"
            >
              Request a Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Click to Call on Mobile */}
          <a 
            href="tel:601-647-1201" 
            className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors md:hidden"
          >
            <Phone className="h-4 w-4" />
            <span className="text-sm font-medium">Call Now: 601-647-1201</span>
          </a>

          {/* Platforms Supported */}
          <div className="mt-8 pt-8 border-t border-primary-foreground/20">
            <p className="text-sm text-primary-foreground/70 mb-3">Platforms we manage:</p>
            <div className="flex flex-wrap gap-3">
              {["ISNetworld®", "Avetta®", "Veriforce®", "PEC®", "BROWZ®"].map((platform) => (
                <span 
                  key={platform}
                  className="px-3 py-1.5 bg-primary-foreground/10 border border-primary-foreground/20 rounded-md text-sm text-primary-foreground font-medium"
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroNew;
