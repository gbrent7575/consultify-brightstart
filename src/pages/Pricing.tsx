import { Helmet } from "react-helmet";
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
          content="Simple, flat-rate pricing for ISNetworld®, Veriforce® & Avetta® compliance management. Platform setup from $900, maintenance from $250/month."
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
