import logo from "@/assets/cornerstone-logo.jpg";
const Footer = () => {
  return <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <img src={logo} alt="Cornerstone Risk Management" className="h-10 w-auto mb-4" />
            <p className="text-primary-foreground/80 text-sm">
              Expert digital safety compliance services for ISNetworld®, Avetta®, Veriforce® and more.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => document.getElementById('services')?.scrollIntoView({
                behavior: 'smooth'
              })} className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Services
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById('about')?.scrollIntoView({
                behavior: 'smooth'
              })} className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById('contact')?.scrollIntoView({
                behavior: 'smooth'
              })} className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          <div itemScope itemType="https://schema.org/ContactPoint">
            <h3 className="font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li itemProp="telephone">601-647-1201</li>
              <li itemProp="email">garland@cornerstoneriskmgt.com</li>
              <li itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                <span itemProp="streetAddress">PO Box 271</span>, <span itemProp="addressLocality">Crystal Springs</span>, <span itemProp="addressRegion">MS</span> <span itemProp="postalCode">39059</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/80">
          <p>&copy; {new Date().getFullYear()} Cornerstone Risk Management. All rights reserved.</p>
        </div>
      </div>
    </footer>;
};
export default Footer;