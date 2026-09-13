import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import NavigationNew from "@/components/NavigationNew";
import FooterNew from "@/components/FooterNew";
import { Phone } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const links = [
    { label: "Home", to: "/" },
    { label: "ISNetworld® Help", to: "/isn/help" },
    { label: "Veriforce® Help", to: "/veriforce-help" },
    { label: "Avetta® Help", to: "/avetta-help" },
    { label: "Pricing", to: "/pricing" },
    { label: "About", to: "/about" },
    { label: "Contact", to: "/contact" },
  ];

  return (
    <>
      <Helmet>
        <title>Page Not Found | Cornerstone Risk Management</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <NavigationNew />

        <main className="flex-grow pt-24">
          <section className="bg-primary text-primary-foreground py-20 md:py-28">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                Page Not Found
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                Sorry, the page you are looking for does not exist. Here are some helpful links to get you back on track.
              </p>

              <div className="flex flex-wrap justify-center gap-3 mb-10">
                {links.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="inline-flex items-center px-5 py-2.5 rounded-md bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 transition-colors text-sm font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <a
                href="tel:601-647-1201"
                className="inline-flex items-center gap-2 text-primary-foreground/90 hover:text-primary-foreground transition-colors text-lg font-medium"
              >
                <Phone className="h-5 w-5" />
                601-647-1201
              </a>
            </div>
          </section>
        </main>

        <FooterNew />
      </div>
    </>
  );
};

export default NotFound;
