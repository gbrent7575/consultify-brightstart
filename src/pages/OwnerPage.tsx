import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLoaderData, useParams } from "react-router-dom";
import { Phone, Check } from "lucide-react";
import FooterNew from "@/components/FooterNew";
import LandingHeader, { MobileCallBar } from "@/components/LandingHeader";
import PlatformQuoteForm from "@/components/PlatformQuoteForm";
import OwnerRequirements from "@/components/OwnerRequirements";
import NotFound from "@/pages/NotFound";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { trackPhoneClick } from "@/lib/ga4";
import { fetchOwnerPage, type Owner } from "@/lib/owners";

const scrollToForm = () =>
  document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth", block: "start" });

const requirements = [
  "Company account and subscription",
  "Written safety programs that fit your work",
  "Safety and management questionnaires",
  "OSHA 300/300A logs and EMR",
  "Insurance certificates that meet their limits",
  "Training records for your crew",
];

const OwnerPage = () => {
  const { slug = "" } = useParams();
  const loaderData = (useLoaderData() as Owner | null | undefined) ?? undefined;
  const [owner, setOwner] = useState<Owner | null | undefined>(loaderData);

  useEffect(() => {
    if (loaderData) { setOwner(loaderData); return; }
    let active = true;
    setOwner(undefined);
    fetchOwnerPage(slug)
      .then((p) => active && setOwner(p))
      .catch(() => active && setOwner(null));
    return () => { active = false; };
  }, [slug, loaderData]);

  if (owner === null) return <NotFound />;
  if (!owner) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <div className="bg-primary py-16">
          <div className="container mx-auto px-4 space-y-4 animate-pulse">
            <div className="h-4 w-48 bg-primary-foreground/20 rounded" />
            <div className="h-10 w-3/4 bg-primary-foreground/20 rounded" />
            <div className="h-4 w-2/3 bg-primary-foreground/20 rounded" />
          </div>
        </div>
      </div>
    );
  }

  const { company, platform } = owner;
  const url = `https://contractorcompliancepros.com/owners/${owner.slug}`;
  const og = "https://contractorcompliancepros.com/og-image.jpg";
  const steps = [
    `We review what ${company} requires in ${platform}®.`,
    "We build or fix your programs and documents.",
    "We submit and handle reviewer feedback until you're approved.",
    "We keep you approved month to month.",
  ];

  return (
    <>
      <Helmet>
        <title>{owner.page_title}</title>
        <meta name="description" content={owner.page_meta} />
        {owner.noindex && <meta name="robots" content="noindex, follow" />}
        <link rel="canonical" href={url} />
        <meta property="og:title" content={owner.page_title} />
        <meta property="og:description" content={owner.page_meta} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={og} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={owner.page_title} />
        <meta name="twitter:description" content={owner.page_meta} />
        <meta name="twitter:url" content={url} />
        <meta name="twitter:image" content={og} />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <LandingHeader announcement={`Working for ${company}? Talk to ${platform === "Veriforce" ? "a" : "an"} ${platform}® specialist`} />

        <main className="flex-grow pb-20 md:pb-0">
          <section className="bg-primary text-primary-foreground py-10 md:py-16">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-10 items-start">
                <div>
                  <p className="text-xs md:text-sm font-semibold uppercase tracking-widest text-accent mb-3">
                    Contractors working for {company}
                  </p>
                  <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-5">{owner.page_h1}</h1>
                  <p className="text-base md:text-lg text-primary-foreground/90 mb-6">{owner.page_intro}</p>
                  <a
                    href="tel:601-647-1201"
                    onClick={trackPhoneClick}
                    className="inline-flex items-center gap-3 bg-accent text-accent-foreground hover:bg-accent/90 transition-colors rounded-lg px-6 py-4 text-xl md:text-2xl font-bold shadow-lg mb-6"
                  >
                    <Phone className="w-6 h-6" />
                    Call 601-647-1201
                  </a>
                  <ul className="space-y-3 mt-4">
                    {[
                      `We set up your ${platform}® account and get you connected to ${company}`,
                      "Done-for-you paperwork: safety programs, questionnaires, OSHA logs, insurance certificates",
                      "Monthly upkeep so you stay approved and keep bidding",
                    ].map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                        <span className="text-primary-foreground/95">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="lg:sticky lg:top-24">
                  <PlatformQuoteForm
                    defaultPlatform={platform}
                    sourcePage={`owner-${owner.slug}`}
                    message={`Works for ${company}`}
                  />
                </div>
              </div>
            </div>
          </section>

          <OwnerRequirements owner={owner} />

          <section className="py-16 md:py-20 bg-secondary/30">
            <div className="container mx-auto px-4 max-w-5xl">
              <h2 className="text-2xl md:text-4xl font-serif font-bold text-primary text-center mb-4">
                {owner.requirements_md
                  ? `What ${platform}® accounts usually need`
                  : `What ${company} contractors are usually asked for`}
              </h2>
              <p className="text-center text-muted-foreground mb-10">
                Every hiring client sets its own requirements inside {platform}®. The usual list:
              </p>
              <div className="grid md:grid-cols-2 gap-5">
                {requirements.map((r, i) => (
                  <Card key={r}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold flex-shrink-0">
                          {i + 1}
                        </div>
                        <h3 className="font-bold text-primary text-lg">{r}</h3>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          <section className="py-16 md:py-20 bg-background">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-2xl md:text-4xl font-serif font-bold text-primary text-center mb-10">
                How we get you approved
              </h2>
              <ol className="space-y-5">
                {steps.map((s, i) => (
                  <li key={s} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-lg text-foreground pt-1.5">{s}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section className="py-16 md:py-20 bg-secondary/30">
            <div className="container mx-auto px-4 max-w-5xl">
              <div className="text-center mb-10">
                <h2 className="text-2xl md:text-4xl font-serif font-bold text-primary mb-3">
                  Simple, flat-rate pricing — published, not hidden
                </h2>
                <p className="text-muted-foreground">Same prices we publish on the homepage. No surprises.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-2 border-border">
                  <CardContent className="pt-6">
                    <p className="text-accent-text text-xs font-semibold uppercase tracking-wide mb-1">One-Time Setup</p>
                    <h3 className="text-xl font-bold text-primary mb-3">Platform Setup</h3>
                    <div className="space-y-2 text-foreground">
                      <p><span className="text-3xl font-bold">$900</span> <span className="text-muted-foreground">/ platform</span></p>
                      <p className="text-muted-foreground">$1,600 for two platforms together</p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-2 border-accent bg-accent/5">
                  <CardContent className="pt-6">
                    <p className="text-accent-text text-xs font-semibold uppercase tracking-wide mb-1">Monthly Maintenance</p>
                    <h3 className="text-xl font-bold text-primary mb-3">Keep You Approved</h3>
                    <ul className="space-y-2 text-foreground">
                      <li><span className="font-bold">$250/mo</span> — single platform</li>
                      <li><span className="font-bold">$300/mo</span> — dual platform</li>
                      <li><span className="font-bold">$350/mo</span> — multi-platform (up to 3)</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
              <div className="text-center mt-8">
                <Button size="lg" onClick={scrollToForm} className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Get My Free Compliance Review
                </Button>
              </div>
            </div>
          </section>

          <section className="py-16 md:py-20 bg-primary text-primary-foreground text-center">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Get approved to work for {company}</h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="tel:601-647-1201"
                  onClick={trackPhoneClick}
                  className="inline-flex items-center gap-3 bg-accent text-accent-foreground hover:bg-accent/90 transition-colors rounded-lg px-6 py-4 text-xl font-bold shadow-lg"
                >
                  <Phone className="w-6 h-6" />
                  Call 601-647-1201
                </a>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={scrollToForm}
                  className="bg-transparent border-primary-foreground/40 text-primary-foreground hover:bg-primary-foreground hover:text-primary text-base"
                >
                  Use the form instead
                </Button>
              </div>
              <p className="text-xs text-primary-foreground/70 mt-6">
                Cornerstone Risk Management is an independent consultancy. We are not affiliated with, endorsed by, or sponsored by {company} or {platform}®.{" "}
                {platform === "ISNetworld"
                  ? "ISNetworld® is a registered trademark of ISN Software Corporation."
                  : `${platform}® is a trademark of its respective owner.`}
                {owner.source_url && (
                  <>
                    {" "}
                    <a href={owner.source_url} target="_blank" rel="nofollow noopener" className="underline hover:text-primary-foreground">
                      Source
                    </a>
                  </>
                )}
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

export default OwnerPage;
