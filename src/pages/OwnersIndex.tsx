import { Helmet } from "react-helmet-async";
import { Link, useLoaderData } from "react-router-dom";
import FooterNew from "@/components/FooterNew";
import LandingHeader, { MobileCallBar } from "@/components/LandingHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Owner } from "@/lib/owners";

const TITLE = "Hiring Clients That Require ISNetworld®, Veriforce®, or Avetta® | Cornerstone Risk Management";
const DESC = "Hiring clients that require contractors to use ISNetworld®, Veriforce®, or Avetta®, and how Cornerstone Risk Management gets you approved.";
const URL = "https://contractorcompliancepros.com/owners";
const OG = "https://contractorcompliancepros.com/og-image.jpg";

const OwnersIndex = () => {
  const owners = (useLoaderData() as Owner[] | null | undefined) ?? [];

  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href={URL} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESC} />
        <meta property="og:url" content={URL} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={OG} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
        <meta name="twitter:url" content={URL} />
        <meta name="twitter:image" content={OG} />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <LandingHeader announcement="Compliance help for contractors — Talk to a specialist today" />
        <main className="flex-grow pb-20 md:pb-0">
          <section className="bg-primary text-primary-foreground py-10 md:py-16">
            <div className="container mx-auto px-4">
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                Hiring Clients That Require ISNetworld®, Veriforce®, or Avetta®
              </h1>
            </div>
          </section>
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              {owners.length === 0 ? (
                <div className="text-center space-y-6">
                  <p className="text-lg text-muted-foreground">New hiring clients are added as they announce.</p>
                  <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link to="/contact">Contact Us</Link>
                  </Button>
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {owners.map((o) => (
                    <Link key={o.slug} to={`/owners/${o.slug}`} className="block">
                      <Card className="h-full hover:border-accent transition-colors">
                        <CardContent className="pt-6 space-y-2">
                          <h2 className="font-bold text-primary text-lg">{o.company}</h2>
                          <span className="inline-block text-xs font-semibold rounded-full bg-accent/10 text-accent px-3 py-1">
                            {o.platform}®
                          </span>
                          {o.industry && <p className="text-sm text-muted-foreground">{o.industry}</p>}
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>
        <FooterNew />
        <MobileCallBar />
      </div>
    </>
  );
};

export default OwnersIndex;
