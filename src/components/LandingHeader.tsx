import { Link } from "react-router-dom";
import { Phone } from "lucide-react";
import { trackPhoneClick } from "@/lib/ga4";

const LandingHeader = ({ announcement }: { announcement: string }) => (
  <>
    <div className="w-full bg-accent text-accent-foreground py-2 px-4 text-center text-sm font-medium">
      {announcement}
    </div>
    <header className="w-full border-b border-border bg-background sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-base md:text-xl font-serif font-bold text-primary hover:opacity-80">
          Cornerstone Risk Management
        </Link>
        <a
          href="tel:601-647-1201"
          onClick={trackPhoneClick}
          className="inline-flex items-center gap-2 text-primary font-bold text-sm md:text-lg hover:text-accent-text transition-colors"
        >
          <Phone className="w-4 h-4 md:w-5 md:h-5" />
          <span className="hidden sm:inline">601-647-1201</span>
          <span className="sm:hidden">Call</span>
        </a>
      </div>
    </header>
  </>
);

export const MobileCallBar = () => (
  <a
    href="tel:601-647-1201"
    onClick={trackPhoneClick}
    className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-accent text-accent-foreground flex items-center justify-center gap-2 py-4 font-bold text-lg shadow-[0_-4px_12px_rgba(0,0,0,0.15)]"
  >
    <Phone className="w-5 h-5" />
    Call 601-647-1201
  </a>
);

export default LandingHeader;
