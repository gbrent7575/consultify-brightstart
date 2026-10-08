import type { ReactNode } from "react";
import { Link } from "react-router-dom";

const SITE = /^https?:\/\/(www\.)?contractorcompliancepros\.com/i;

function link(text: string, href: string, key: string | number): ReactNode {
  if (href.startsWith("/") || SITE.test(href)) {
    const to = href.replace(SITE, "") || "/";
    return <Link key={key} to={to} className="text-primary underline">{text}</Link>;
  }
  return <a key={key} href={href} target="_blank" rel="noopener" className="text-primary underline break-words">{text}</a>;
}

/** Inline: **bold**, [text](url), [n] citations. Text only. */
export function inline(text: string): ReactNode[] {
  const re = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\)|\[\d+\])/g;
  return text.split(re).filter(Boolean).map((part, i) => {
    let m = /^\*\*([^*]+)\*\*$/.exec(part);
    if (m) return <strong key={i}>{inline(m[1])}</strong>;
    m = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(part);
    if (m) return link(m[1], m[2], i);
    m = /^\[(\d+)\]$/.exec(part);
    if (m) return (
      <sup key={i}>
        <a href={`#source-${m[1]}`} aria-label={`Source ${m[1]}`} className="text-primary underline">{part}</a>
      </sup>
    );
    return part;
  });
}

function withBreaks(lines: string[]): ReactNode[] {
  return lines.flatMap((l, i) => (i ? [<br key={`b${i}`} />, ...inline(l)] : inline(l)));
}

const cells = (row: string) => row.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());
const isSep = (row: string) => /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|?\s*$/.test(row);

export default function GuideBody({ text }: { text: string }) {
  const lines = text.replace(/\r\n?/g, "\n").split("\n");
  const out: ReactNode[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const k = out.length;
    if (!line.trim()) { i++; continue; }
    if (line.startsWith("### ")) {
      out.push(<h3 key={k} className="text-xl font-serif font-bold text-primary mt-8">{inline(line.slice(4))}</h3>); i++; continue;
    }
    if (line.startsWith("## ")) {
      out.push(<h2 key={k} className="text-2xl font-serif font-bold text-primary mt-10">{inline(line.slice(3))}</h2>); i++; continue;
    }
    if (line.trim().startsWith("|") && i + 1 < lines.length && isSep(lines[i + 1])) {
      const head = cells(line);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) rows.push(cells(lines[i++]));
      out.push(
        <div key={k} className="overflow-x-auto">
          <table className="w-full border-collapse border border-border text-sm">
            <thead className="bg-secondary/50">
              <tr>{head.map((c, j) => <th key={j} className="border border-border px-3 py-2 text-left font-bold text-primary">{inline(c)}</th>)}</tr>
            </thead>
            <tbody>
              {rows.map((r, ri) => (
                <tr key={ri}>{r.map((c, j) => <td key={j} className="border border-border px-3 py-2 align-top">{inline(c)}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }
    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) items.push(lines[i++].slice(2));
      out.push(<ul key={k} className="list-disc pl-6 space-y-2">{items.map((t, j) => <li key={j}>{inline(t)}</li>)}</ul>);
      continue;
    }
    if (/^\d+\. /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i])) items.push(lines[i++].replace(/^\d+\. /, ""));
      out.push(<ol key={k} className="list-decimal pl-6 space-y-2">{items.map((t, j) => <li key={j}>{inline(t)}</li>)}</ol>);
      continue;
    }
    const para: string[] = [];
    while (
      i < lines.length && lines[i].trim() && !/^(#{2,3} |- |\d+\. )/.test(lines[i]) &&
      !(lines[i].trim().startsWith("|") && i + 1 < lines.length && isSep(lines[i + 1]))
    ) para.push(lines[i++]);
    out.push(<p key={k}>{withBreaks(para)}</p>);
  }
  return <div className="space-y-4 text-foreground leading-relaxed">{out}</div>;
}

/** Source text: bare https URLs become links, rest stays text. */
export function SourceText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(https:\/\/[^\s)]+)/g).map((p, i) =>
        p.startsWith("https://") ? (
          <a key={i} href={p} target="_blank" rel="noopener" className="text-primary underline break-words">{p}</a>
        ) : p,
      )}
    </>
  );
}
