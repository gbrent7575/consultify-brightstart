import { Button } from "@/components/ui/button";
import { Menu, ChevronDown, Calendar, Phone, X } from "lucide-react";
import { trackBookConsultation, trackPhoneClick } from "@/lib/ga4";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const CAL_LINK = "https://cal.com/garland-brent-wa1zbs/15min";

const NavigationNew = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  const services = [
    { name: "Digital Compliance Management", path: "/services/compliance-platforms" },
    { name: "Safety Program Development", path: "/services/safety-program-development" },
    { name: "Regulatory Compliance Support", path: "/services/regulatory-compliance" },
    { name: "Onsite Audits & Training", path: "/services/onsite-audits-training" },
    { name: "Risk Consulting", path: "/services/risk-consulting" },
    { name: "Safety Management System (SMS)", path: "/services/safety-management-system" },
    { name: "Monthly Training Packages", path: "/services/monthly-training" }
  ];

  return (
    <>
      {/* Sticky CTA Banner */}
      <div className="fixed top-0 w-full bg-accent text-accent-foreground z-50 py-2 px-4">
        <div className="container mx-auto flex items-center justify-center gap-4 text-sm">
          <span className="hidden sm:inline">Need ISNetworld®, Veriforce® or Avetta® Compliance Help?</span>
          <span className="sm:hidden">Need Compliance Help?</span>
          <Button 
            size="sm" 
            variant="secondary"
            asChild
            className="bg-accent-foreground text-accent hover:bg-accent-foreground/90 h-7 text-xs px-3"
          >
            <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" onClick={trackBookConsultation}>
              <Calendar className="mr-1 h-3 w-3" />
              Book Free Consult
            </a>
          </Button>
          <a 
            href="tel:601-647-1201"
            onClick={trackPhoneClick}
            className="hidden md:flex items-center gap-1 hover:underline"
          >
            <Phone className="h-3 w-3" />
            601-647-1201
          </a>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`fixed top-10 w-full z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-background/95 backdrop-blur-sm border-b border-border shadow-sm' 
          : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/"
              className={`text-xl md:text-2xl font-serif font-bold transition-colors ${
                scrolled ? 'text-primary' : 'text-primary-foreground md:text-primary'
              } hover:opacity-80`}
            >
              Cornerstone Risk Management
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              <div 
                className="relative"
                onMouseEnter={() => setServicesDropdownOpen(true)}
                onMouseLeave={() => setServicesDropdownOpen(false)}
              >
                <button 
                  className={`flex items-center gap-1 font-medium transition-colors ${
                    scrolled ? 'text-foreground hover:text-primary' : 'text-primary-foreground/90 hover:text-primary-foreground md:text-foreground md:hover:text-primary'
                  }`}
                >
                  Services
                  <ChevronDown className="h-4 w-4" />
                </button>
                {servicesDropdownOpen && (
                  <div className="absolute top-full left-0 pt-2 z-50">
                    <div className="bg-background border border-border rounded-lg shadow-lg py-2 min-w-[280px]">
                      {services.map((service) => (
                        <Link
                          key={service.path}
                          to={service.path}
                          className="block px-4 py-2 text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                        >
                          {service.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <button 
                onClick={() => scrollToSection('pricing')}
                className={`font-medium transition-colors ${
                  scrolled ? 'text-foreground hover:text-primary' : 'text-primary-foreground/90 hover:text-primary-foreground md:text-foreground md:hover:text-primary'
                }`}
              >
                Pricing
              </button>
              
              <Link 
                to="/about"
                className={`font-medium transition-colors ${
                  scrolled ? 'text-foreground hover:text-primary' : 'text-primary-foreground/90 hover:text-primary-foreground md:text-foreground md:hover:text-primary'
                }`}
              >
                About
              </Link>
              
              <Button 
                asChild
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                  <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" onClick={trackBookConsultation}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Free Consultation
                </a>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className={`lg:hidden ${scrolled ? 'text-foreground' : 'text-primary-foreground md:text-foreground'}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 space-y-3 animate-slide-up bg-background rounded-lg p-4 shadow-lg">
              <div>
                <button 
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className="flex items-center justify-between w-full py-2 text-foreground hover:text-primary transition-colors font-medium"
                >
                  Services
                  <ChevronDown className={`h-4 w-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileServicesOpen && (
                  <div className="pl-4 mt-2 space-y-2 border-l-2 border-accent/20">
                    {services.map((service) => (
                      <Link
                        key={service.path}
                        to={service.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block py-2 text-sm text-foreground hover:text-primary transition-colors"
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              
              <button 
                onClick={() => scrollToSection('pricing')}
                className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors font-medium"
              >
                Pricing
              </button>
              
              <Link 
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors font-medium"
              >
                About
              </Link>
              
              <div className="pt-4 space-y-3 border-t border-border">
                <Button 
                  asChild
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  <a href={CAL_LINK} target="_blank" rel="noopener noreferrer">
                    <Calendar className="mr-2 h-4 w-4" />
                    Book Free Consultation
                  </a>
                </Button>
                <a 
                  href="tel:601-647-1201"
                  className="flex items-center justify-center gap-2 py-2 text-primary font-medium"
                >
                  <Phone className="h-4 w-4" />
                  Call: 601-647-1201
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavigationNew;
