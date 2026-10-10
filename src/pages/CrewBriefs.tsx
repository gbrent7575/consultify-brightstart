import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import FooterNew from "@/components/FooterNew";
import LandingHeader, { MobileCallBar } from "@/components/LandingHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { fetchCrewBriefs, type CrewBrief } from "@/lib/crewBriefs";
import { useLoaderData } from "react-router-dom";

const TITLE = "Monthly Crew Briefs | Free Safety Meeting Downloads | Cornerstone Risk Management";
const DESC = "Free monthly crew safety briefs from Cornerstone Risk Management: printable 15 to 30 minute safety meetings with discussion points, a crew quiz and a sign-in sheet.";
const URL = "https://contractorcompliancepros.com/crew-briefs";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const monthLabel = (date: string) => {
  const [year, month] = date.split("-").map(Number);
  if (!year || !month) return date;
  return `${MONTHS[month - 1]} ${year}`;
};

const CrewBriefs = () => {
  const initial = (useLoaderData() as CrewBrief[] | null | undefined) ?? [];
  const [briefs, setBriefs] = useState<CrewBrief[]>(initial);
  const [copied, setCopied] = useState(false);

  // Refetch on every load so a new month appears on its publish date without a rebuild.
  useEffect(() => {
    let cancelled = false;
    fetchCrewBriefs()
      .then((rows) => { if (!cancelled) setBriefs(rows); })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link:", URL);
    }
  };

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
        <meta property="og:image" content="https://contractorcompliancepros.com/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
        <meta name="twitter:url" content={URL} />
        <meta name="twitter:image" content="https://contractorcompliancepros.com/og-image.jpg" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <LandingHeader announcement="Compliance help for contractors — Talk to a specialist today" />
        <main className="flex-grow pb-20 md:pb-0">
          <section className="bg-primary text-primary-foreground py-10 md:py-16">
            <div className="container mx-auto px-4">
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">Monthly Crew Briefs</h1>
              <p className="text-base md:text-lg text-primary-foreground/90 max-w-3xl mt-4">
                A free 15 to 30 minute safety meeting your supervisors can print and run. A new Crew Brief goes out to Cornerstone clients every month. Every past issue is here.
              </p>
            </div>
          </section>

          <section className="py-12 md:py-16">
            <div className="container mx-auto px-4 max-w-4xl">
              {briefs.length === 0 ? (
                <p className="text-center text-lg text-muted-foreground">Briefs will appear here as they're published.</p>
              ) : (
                <div className="space-y-5">
                  {briefs.map((brief) => (
                    <Card key={brief.month_start} className="hover:border-accent transition-colors">
                      <CardContent className="p-6 md:p-8">
                        <p className="text-sm font-semibold text-accent-text uppercase tracking-wide">{monthLabel(brief.month_start)}</p>
                        <h2 className="text-2xl font-serif font-bold text-primary mt-2">{brief.topic}</h2>
                        <p className="text-muted-foreground leading-relaxed mt-3">{brief.summary}</p>
                        <Button asChild className="mt-5 bg-accent text-accent-foreground hover:bg-accent/90">
                          <a href={brief.pdf_url} target="_blank" rel="noopener">Download the PDF</a>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              <div className="border border-border rounded-lg bg-secondary/50 p-4 md:p-6 mt-10 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                <p className="text-sm text-muted-foreground">
                  Know a supervisor who could use this? Forward this page:{" "}
                  <span className="font-medium text-foreground">contractorcompliancepros.com/crew-briefs</span>
                </p>
                <Button variant="outline" onClick={copyLink} className="shrink-0">
                  {copied ? "Copied" : "Copy link"}
                </Button>
              </div>

              <p className="text-center text-muted-foreground mt-10">
                Want the Crew Brief in your inbox each month? Cornerstone clients get it automatically.{" "}
                <a href="/#lead-form" className="font-semibold text-accent-text underline">Request a quote</a>
              </p>
            </div>
          </section>
        </main>
        <FooterNew />
        <MobileCallBar />
      </div>
    </>
  );
};

export default CrewBriefs;
