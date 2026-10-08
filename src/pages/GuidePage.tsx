import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLoaderData, useParams } from "react-router-dom";
import FooterNew from "@/components/FooterNew";
import LandingHeader, { MobileCallBar } from "@/components/LandingHeader";
import GuideBody, { SourceText } from "@/components/GuideBody";
import NotFound from "@/pages/NotFound";
import { fetchGuide, type Guide } from "@/lib/guides";

const GuidePage = () => {
  const { slug = "" } = useParams();
  const loaderData = (useLoaderData() as Guide | null | undefined) ?? undefined;
  const [guide, setGuide] = useState<Guide | null | undefined>(loaderData);

  useEffect(() => {
    if (loaderData) { setGuide(loaderData); return; }
    let active = true;
    setGuide(undefined);
    fetchGuide(slug)
      .then((g) => active && setGuide(g))
      .catch(() => active && setGuide(null));
    return () => { active = false; };
  }, [slug, loaderData]);

  if (guide === null) return <NotFound />;
  if (!guide) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <div className="bg-primary py-16">
          <div className="container mx-auto px-4 space-y-4 animate-pulse">
            <div className="h-10 w-3/4 bg-primary-foreground/20 rounded" />
            <div className="h-4 w-2/3 bg-primary-foreground/20 rounded" />
          </div>
        </div>
      </div>
    );
  }

  const url = `https://contractorcompliancepros.com/guides/${guide.slug}`;
  const og = "https://contractorcompliancepros.com/og-image.jpg";
  const date = guide.reviewed_on ? new Date(`${guide.reviewed_on}T00:00:00Z`) : null;
  const reviewed = date && !Number.isNaN(date.getTime())
    ? date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })
    : null;
  const sources = [...(guide.sources ?? [])].sort((a, b) => a.n - b.n);

  return (
    <>
      <Helmet>
        <title>{guide.title}</title>
        <meta name="description" content={guide.meta_description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={guide.title} />
        <meta property="og:description" content={guide.meta_description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={og} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={guide.title} />
        <meta name="twitter:description" content={guide.meta_description} />
        <meta name="twitter:url" content={url} />
        <meta name="twitter:image" content={og} />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <LandingHeader announcement="Compliance help for contractors — Talk to a specialist today" />
        <main className="flex-grow pb-20 md:pb-0">
          <section className="bg-primary text-primary-foreground py-10 md:py-16">
            <div className="container mx-auto px-4 max-w-3xl">
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">{guide.h1}</h1>
            </div>
          </section>
          <article className="py-12 md:py-16">
            <div className="container mx-auto px-4 max-w-3xl">
              <GuideBody text={guide.body_md} />
              {sources.length > 0 && (
                <div className="mt-12 text-sm">
                  <h2 className="text-xl font-serif font-bold text-primary mb-3">Sources</h2>
                  <ol className="list-decimal pl-6 space-y-2">
                    {sources.map((s) => (
                      <li key={s.n} id={`source-${s.n}`} value={s.n} className="scroll-mt-24 break-words">
                        <SourceText text={s.text} />
                      </li>
                    ))}
                  </ol>
                </div>
              )}
              {reviewed && <p className="text-sm text-muted-foreground mt-6">Last reviewed: {reviewed}</p>}
              {guide.disclaimer && (
                <p className="text-xs text-muted-foreground italic mt-4 whitespace-pre-line">{guide.disclaimer}</p>
              )}
            </div>
          </article>
        </main>
        <FooterNew />
        <MobileCallBar />
      </div>
    </>
  );
};

export default GuidePage;
