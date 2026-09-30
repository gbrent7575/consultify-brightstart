import { Helmet } from "react-helmet-async";
import NavigationNew from "@/components/NavigationNew";
import PricingSection from "@/components/PricingSection";
import FooterNew from "@/components/FooterNew";

const Pricing = () => {
  return (
    <>
      <Helmet>
        <title>Pricing | Cornerstone Risk Management</title>
        <meta
          name="description"
          content="Flat-rate ISNetworld, Avetta, and Veriforce compliance pricing. Setup from $900 per platform. Monthly maintenance from $250. No hourly billing, no surprises."
        />
        <link rel="canonical" href="https://contractorcompliancepros.com/pricing" />
        <meta property="og:title" content="Pricing | Cornerstone Risk Management" />
        <meta property="og:description" content="Flat-rate ISNetworld, Avetta, and Veriforce compliance pricing. Setup from $900 per platform. Monthly maintenance from $250. No hourly billing, no surprises." />
        <meta property="og:url" content="https://contractorcompliancepros.com/pricing" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://contractorcompliancepros.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pricing | Cornerstone Risk Management" />
        <meta name="twitter:description" content="Flat-rate ISNetworld, Avetta, and Veriforce compliance pricing. Setup from $900 per platform. Monthly maintenance from $250. No hourly billing, no surprises." />
        <meta name="twitter:url" content="https://contractorcompliancepros.com/pricing" />
        <meta name="twitter:image" content="https://contractorcompliancepros.com/og-image.jpg" />
      </Helmet>

      <div className="min-h-screen">
        <NavigationNew />
        <main className="pt-28">
          <PricingSection asH1 />
        </main>
        <FooterNew />
      </div>
    </>
  );
};

export default Pricing;
