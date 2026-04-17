import { useEffect } from "react";

declare global {
  interface Window {
    ml?: (...args: any[]) => void;
  }
}

const NewsletterSection = () => {
  useEffect(() => {
    // MailerLite Universal renders embedded forms on load, but in a React SPA
    // the component mounts after that initial pass. Re-trigger the render.
    if (typeof window !== "undefined" && typeof window.ml === "function") {
      try {
        window.ml("render");
      } catch (e) {
        // no-op
      }
    }
  }, []);

  return (
    <section className="bg-primary py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-foreground mb-4">
            Monthly Safety Brief from Cornerstone
          </h2>
          <p className="text-primary-foreground/80 mb-8 text-lg">
            A free, print-ready toolbox talk delivered every month. Built by safety professionals for field teams.
          </p>
          <div className="ml-embedded" data-form="l7HbGg"></div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
