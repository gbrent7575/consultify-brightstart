import { Helmet } from "react-helmet-async";
import { Link, useLoaderData } from "react-router-dom";
import FooterNew from "@/components/FooterNew";
import LandingHeader, { MobileCallBar } from "@/components/LandingHeader";
import { Card, CardContent } from "@/components/ui/card";
import type { Guide } from "@/lib/guides";

const TITLE = "Guides for Contractors";
const DESC = "Plain answers to the questions contractors ask about ISNetworld®, Avetta® and Veriforce®, each with the sources behind it.";
const URL = "https://contractorcompliancepros.com/guides";
const OG = "https://contractorcompliancepros.com/og-image.jpg";

const GuidesIndex = () => {
  const guides = (useLoaderData() as Guide[] | null | undefined) ?? [];

  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        {guides.length === 0 && <meta name="robots" content="noindex, follow" />}
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
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">Guides for Contractors</h1>
              <p className="text-base md:text-lg text-primary-foreground/90 max-w-3xl mt-4">{DESC}</p>
            </div>
          </section>
          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
              {guides.length === 0 ? (
                <p className="text-center text-lg text-muted-foreground">Guides are on the way.</p>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {guides.map((g) => (
                    <Card key={g.slug} className="h-full hover:border-accent transition-colors">
                      <CardContent className="pt-6 space-y-3">
                        <h2 className="font-bold text-primary text-lg">{g.h1}</h2>
                        <p className="text-sm text-muted-foreground">{g.meta_description}</p>
                        <Link to={`/guides/${g.slug}`} className="inline-block font-semibold text-accent-text underline">
                          Read the guide
                        </Link>
                      </CardContent>
                    </Card>
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

export default GuidesIndex;
