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
          content="Struggling with ISNetworld or Avetta? We handle digital compliance setup ($900) and maintenance ($150/mo) with a 99% success rate. Book a free consultation today."
        />
        <meta name="keywords" content="ISNetworld compliance, Avetta management, Veriforce, contractor compliance, digital safety compliance, oil and gas compliance, contractor safety management, RAVS, PQF completion" />
        <link rel="canonical" href="https://cornerstoneriskmgt.com/" />
        
        {/* Open Graph */}
        <meta property="og:title" content="ISNetworld & Avetta Compliance Management | Cornerstone Risk Management" />
        <meta property="og:description" content="We handle digital compliance so you can get back to work. 99% success rate, flat-rate pricing." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cornerstoneriskmgt.com/" />
        <meta property="og:image" content="https://cornerstoneriskmgt.com/og-image.jpg" />
        <meta property="og:site_name" content="Cornerstone Risk Management" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ISNetworld & Avetta Compliance Management" />
        <meta name="twitter:description" content="We handle digital compliance so you can get back to work. 99% success rate." />
        
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