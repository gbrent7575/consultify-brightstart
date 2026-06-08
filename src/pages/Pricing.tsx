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
        <link rel="canonical" href="https://cornerstoneriskmgt.com/pricing" />
      </Helmet>

      <div className="min-h-screen">
        <NavigationNew />
        <main className="pt-28">
          <PricingSection />
        </main>
        <FooterNew />
      </div>
    </>
  );
};

export default Pricing;
