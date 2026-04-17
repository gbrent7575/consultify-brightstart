const NewsletterSection = () => {
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
          <iframe
            src="https://landing.mailerlite.com/webforms/landing/l7HbGg"
            title="Subscribe to the Monthly Safety Brief"
            className="w-full bg-transparent"
            style={{ minHeight: "260px", border: "none" }}
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
