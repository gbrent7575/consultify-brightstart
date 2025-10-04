import Navigation from "@/components/Navigation";
import HeroAlt from "@/components/HeroAlt";
import ServicesAlt from "@/components/ServicesAlt";
import AboutAlt from "@/components/AboutAlt";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroAlt />
        <ServicesAlt />
        <AboutAlt />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
