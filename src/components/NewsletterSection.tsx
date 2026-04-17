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
          <form
            action="https://assets.mailerlite.com/jsonp/946498/forms/185017198337590744/subscribe"
            method="post"
            target="_blank"
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              name="fields[email]"
              required
              placeholder="Enter your email"
              aria-label="Email address"
              className="flex-1 px-4 py-3 rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-md bg-accent text-accent-foreground font-semibold whitespace-nowrap hover:bg-accent/90 transition-colors"
            >
              Get My Free Safety Brief
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
