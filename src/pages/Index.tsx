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
        <title>ISNetworld®, Veriforce® & Avetta® Compliance Help for Contractors | Cornerstone Risk Management</title>
        <meta
          name="description"
          content="ISNetworld®, Avetta®, Veriforce® and PEC Premier® compliance management for contractors nationwide. Setup, maintenance and grade recovery — done for you, with flat-rate pricing."
        />
        <link rel="canonical" href="https://contractorcompliancepros.com/" />
        <meta name="twitter:url" content="https://contractorcompliancepros.com/" />
        
        {/* Open Graph */}
        <meta property="og:title" content="ISNetworld®, Veriforce® & Avetta® Compliance Help for Contractors | Cornerstone Risk Management" />
        <meta property="og:description" content="ISNetworld®, Avetta®, Veriforce® and PEC Premier® compliance management for contractors nationwide. Setup, maintenance and grade recovery — done for you, with flat-rate pricing." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://contractorcompliancepros.com/" />
        <meta property="og:image" content="https://contractorcompliancepros.com/og-image.jpg" />
        <meta property="og:site_name" content="Cornerstone Risk Management" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ISNetworld®, Veriforce® & Avetta® Compliance Help for Contractors | Cornerstone Risk Management" />
        <meta name="twitter:description" content="ISNetworld®, Avetta®, Veriforce® and PEC Premier® compliance management for contractors nationwide. Setup, maintenance and grade recovery — done for you, with flat-rate pricing." />
        <meta name="twitter:image" content="https://contractorcompliancepros.com/og-image.jpg" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Cornerstone Risk Management" />
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