import { Helmet } from "react-helmet";
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
        <title>ISNetworld & Avetta Compliance Management | Cornerstone Risk Management</title>
        <meta
          name="description"
          content="Struggling with ISNetworld or Avetta? We handle digital compliance setup, maintenance, and support with a 99% success rate. $900 setup, $150/mo maintenance. Book a free consultation."
        />
        <meta name="keywords" content="ISNetworld compliance, Avetta management, Veriforce, contractor compliance, digital safety compliance, oil and gas compliance, contractor safety management" />
        <link rel="canonical" href="https://cornerstoneriskmgt.com/" />
        
        {/* Open Graph */}
        <meta property="og:title" content="ISNetworld & Avetta Compliance Management | Cornerstone Risk Management" />
        <meta property="og:description" content="We handle digital compliance so you can get back to work. 99% success rate, flat-rate pricing." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cornerstoneriskmgt.com/" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Cornerstone Risk Management" />
      </Helmet>

      <div className="min-h-screen">
        <NavigationNew />
        <main>
          <HeroNew />
          <BenefitsSection />
          <PricingSection />
          <TrustSection />
          <LeadForm />
        </main>
        <FooterNew />
      </div>
    </>
  );
};

export default Index;
