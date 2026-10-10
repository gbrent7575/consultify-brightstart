import { Helmet } from "react-helmet-async";
import NavigationNew from "@/components/NavigationNew";
import FooterNew from "@/components/FooterNew";
import TrademarkNotice from "@/components/TrademarkNotice";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const title = "Contractor Compliance Case Studies | Cornerstone Risk Management";
const description = "Two real 2024 results: a Mississippi fab shop compliant in ISNetworld® in 9 days, and a Louisiana contractor's F grades fixed within 24 hours.";
const url = "https://contractorcompliancepros.com/case-studies";

const studies = [
  {
    id: "fab-shop",
    title: "Zero to compliant in 9 days",
    subtitle: "A Mississippi welding and fabrication shop · about 40 employees · 2024",
    sections: [
      {
        heading: "The problem",
        text: "The shop's second-largest customer told them to subscribe to ISNetworld®. They signed up as soon as the first email came. Then they got stuck. They didn't know where to start or what information the site wanted. More emails kept coming, and they were afraid they'd lose a major customer over paperwork.",
      },
      {
        heading: "What we did",
        bullets: [
          "Took over the account setup and built a plan the same week.",
          "Wrote about 20 written safety programs to match the customer's requirements.",
          "Uploaded the required documents and completed the questionnaires with their input.",
          "Laid out a training plan to bring their employees up to speed.",
        ],
      },
      {
        heading: "The result",
        bullets: [
          "Compliant in about 9 days from start to finish, with an A or Acceptable grade.",
          "Employee training was finished over the following few weeks.",
          "They never lost a day of work with that customer.",
          "That customer has since grown into their largest.",
        ],
      },
      {
        heading: "The takeaway",
        text: "Getting a platform account started and compliant is the hard part. We can take that burden off your plate so you keep working while it gets done.",
      },
    ],
  },
  {
    id: "roustabout",
    title: "Straight F's overnight, fixed in 24 hours",
    subtitle: "A central Louisiana roustabout contractor · about 125 employees · 2024",
    sections: [
      {
        heading: "The problem",
        text: "This contractor had run compliant ISNetworld® and Veriforce® accounts in-house for years. After they uploaded their year-end OSHA logs, every grade dropped to F. Nobody could figure out why. One of their employees recommended us.",
      },
      {
        heading: "What we found",
        text: "Their logs were over-reported:",
        bullets: [
          "Several cases on the log did not meet OSHA's criteria for a recordable injury and never belonged there.",
          "On the one legitimate recordable case, the days away from work were overcounted.",
        ],
        after: "Both errors pushed their injury rates higher than their actual record.",
      },
      {
        heading: "What we did",
        bullets: [
          "Walked them through correcting the logs to match OSHA's recordkeeping rules.",
          "Re-uploaded the corrected logs.",
          "Trained their team on recordkeeping and reporting going forward.",
        ],
      },
      {
        heading: "The result",
        bullets: [
          "Grades were back to A or Acceptable within 24 hours of uploading the corrected logs.",
          "We now manage their compliance accounts and help with claims management.",
        ],
      },
      {
        heading: "The takeaway",
        text: "Know what OSHA actually counts as recordable, and manage every claim from day one. A first-aid case logged as a recordable costs you the same grade as a real one.",
      },
    ],
  },
];

const CaseStudies = () => (
  <>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:url" content={url} />
    </Helmet>
    <div className="min-h-screen flex flex-col">
      <NavigationNew solidFromStart />
      <main className="flex-grow pt-28 bg-background">
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">Case Studies</h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-12">Two real client results from 2024. Both clients are anonymized.</p>
            <div className="space-y-8">
              {studies.map((study) => (
                <Card key={study.id} id={study.id} className="border-border scroll-mt-36">
                  <CardContent className="p-6 md:p-8">
                    <h2 className="text-3xl font-serif font-bold text-primary mb-3">{study.title}</h2>
                    <p className="text-muted-foreground mb-8">{study.subtitle}</p>
                    <div className="space-y-6">
                      {study.sections.map((section) => (
                        <section key={section.heading}>
                          <h3 className="text-xl font-semibold text-primary mb-2">{section.heading}</h3>
                          {section.text && <p className="text-muted-foreground leading-relaxed">{section.text}</p>}
                          {section.bullets && (
                            <ul className="list-disc pl-5 space-y-2 text-muted-foreground leading-relaxed mt-2">
                              {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                            </ul>
                          )}
                          {"after" in section && <p className="text-muted-foreground leading-relaxed mt-2">{section.after}</p>}
                        </section>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center my-12">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 whitespace-normal h-auto py-3">
                <a href="/#lead-form">Request a free compliance review</a>
              </Button>
            </div>
            <TrademarkNotice />
          </div>
        </section>
      </main>
      <FooterNew />
    </div>
  </>
);

export default CaseStudies;