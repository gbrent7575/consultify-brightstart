import { Helmet } from "react-helmet-async";
import NavigationNew from "@/components/NavigationNew";
import HeroNew from "@/components/HeroNew";
import BenefitsSection from "@/components/BenefitsSection";
import PricingSection from "@/components/PricingSection";
import TrustSection from "@/components/TrustSection";
import LeadForm from "@/components/LeadForm";
import FooterNew from "@/components/FooterNew";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>ISNetworld®, Veriforce® & Avetta® Compliance Support Services | Cornerstone Risk Management</title>
        <meta
          name="description"
          content="ISNetworld, Veriforce and Avetta compliance management for oil and gas contractors. 99 percent success rate. Setup from $900, maintenance from $250 per month."
        />
        <meta name="keywords" content="ISNetworld compliance support, Avetta compliance services, Veriforce compliance, contractor compliance, digital safety compliance, oil and gas compliance, contractor safety management, RAVS, PQF completion" />
        <link rel="canonical" href="https://cornerstoneriskmgt.com/" />
        
        {/* Open Graph */}
        <meta property="og:title" content="ISNetworld®, Veriforce® & Avetta® Compliance Support Services | Cornerstone Risk Management" />
        <meta property="og:description" content="We provide digital compliance support so you can get back to work. 99% success rate, flat-rate pricing." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cornerstoneriskmgt.com/" />
        <meta property="og:image" content="https://cornerstoneriskmgt.com/og-image.jpg" />
        <meta property="og:site_name" content="Cornerstone Risk Management" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ISNetworld®, Veriforce® & Avetta® Compliance Support Services" />
        <meta name="twitter:description" content="We provide digital compliance support so you can get back to work. 99% success rate." />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Cornerstone Risk Management" />
        <meta name="geo.region" content="US-MS" />
        <meta name="geo.placename" content="Crystal Springs" />
      </Helmet>

      <div className="min-h-screen">
        <NavigationNew />
        <main>
          <article>
            <HeroNew />
            <BenefitsSection />
            <PricingSection />
            <TrustSection />
            <LeadForm />
          </article>
        </main>
        <FooterNew />
      </div>
    </>
  );
};

export default Index;