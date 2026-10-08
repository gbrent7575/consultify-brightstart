import type { Owner } from "@/lib/owners";

function citations(text: string) {
  return text.split(/(\[\d+\])/g).map((part, i) => {
    const match = /^\[(\d+)\]$/.exec(part);
    return match ? (
      <sup key={i}>
        <a href={`#source-${match[1]}`} aria-label={`Source ${match[1]}`} className="text-primary underline">{part}</a>
      </sup>
    ) : part;
  });
}

function blocks(text: string) {
  const result: { kind: "paragraph" | "list"; lines: string[] }[] = [];
  for (const line of text.replace(/\r\n?/g, "\n").split("\n")) {
    if (!line.trim()) {
      result.push({ kind: "paragraph", lines: [] });
      continue;
    }
    const kind = line.startsWith("- ") ? "list" : "paragraph";
    const previous = result[result.length - 1];
    const content = kind === "list" ? line.slice(2) : line;
    if (previous?.kind === kind) previous.lines.push(content);
    else result.push({ kind, lines: [content] });
  }
  return result.filter((block) => block.lines.length > 0);
}

export default function OwnerRequirements({ owner }: { owner: Owner }) {
  if (!owner.requirements_md) return null;
  const sources = [...(owner.requirements_sources ?? [])].sort((a, b) => a.n - b.n);
  const date = owner.requirements_reviewed_on
    ? new Date(`${owner.requirements_reviewed_on}T00:00:00Z`)
    : null;
  const reviewed = date && !Number.isNaN(date.getTime())
    ? date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" })
    : null;

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-2xl md:text-4xl font-serif font-bold text-primary text-center mb-10">
          What {owner.company} asks of contractors
        </h2>
        <div className="space-y-4 text-foreground">
          {blocks(owner.requirements_md).map((block, i) => block.kind === "list" ? (
            <ul key={i} className="list-disc pl-6 space-y-2">
              {block.lines.map((line, j) => <li key={j}>{citations(line)}</li>)}
            </ul>
          ) : <p key={i}>{citations(block.lines.join("\n"))}</p>)}
        </div>
        {owner.requirements_scope && (
          <div className="border border-border rounded-lg bg-secondary/30 p-5 mt-8">
            <h3 className="font-bold text-primary mb-2">Who it applies to</h3>
            <p className="text-foreground whitespace-pre-line">{owner.requirements_scope}</p>
          </div>
        )}
        {sources.length > 0 && (
          <div className="mt-8 text-sm">
            <h3 className="font-bold text-primary mb-3">Sources</h3>
            <ol className="list-decimal pl-6 space-y-2">
              {sources.map((source) => (
                <li key={source.n} id={`source-${source.n}`} value={source.n} className="scroll-mt-24 break-words">
                  <a href={source.url} target="_blank" rel="noopener" className="text-primary underline">{source.label}</a>
                </li>
              ))}
            </ol>
          </div>
        )}
        {reviewed && <p className="text-sm text-muted-foreground mt-6">Last reviewed: {reviewed}</p>}
      </div>
    </section>
  );
}