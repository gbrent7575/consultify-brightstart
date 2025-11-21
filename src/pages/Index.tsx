import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Cornerstone Risk Management | Expert Safety & Compliance Consulting</title>
        <meta
          name="description"
          content="Professional safety program development, regulatory compliance, and risk management consulting for contractors and industrial operations. Serving the Gulf Coast with 15+ years experience."
        />
        <meta name="keywords" content="safety consulting, risk management, OSHA compliance, ISNetworld, Veriforce, Avetta, contractor safety, industrial safety" />
        <link rel="canonical" href="https://cornerstoneriskmgt.com/" />
      </Helmet>

      <div className="min-h-screen">
        <Navigation />
        <main>
          <Hero />
          <Services />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
