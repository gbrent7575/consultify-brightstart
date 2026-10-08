import { OWNER_ENGINE_URL } from "@/lib/owners";

export interface Guide {
  slug: string;
  platform: string | null;
  title: string;
  meta_description: string;
  h1: string;
  body_md: string;
  sources: { n: number; text: string }[];
  disclaimer: string | null;
  reviewed_on: string | null;
  approved_at: string;
}

export async function fetchGuides(): Promise<Guide[]> {
  const res = await fetch(`${OWNER_ENGINE_URL}?action=guides`);
  const json = await res.json();
  return json?.ok && Array.isArray(json.guides) ? json.guides : [];
}

export async function fetchGuide(slug: string): Promise<Guide | null> {
  const res = await fetch(`${OWNER_ENGINE_URL}?action=guides&slug=${encodeURIComponent(slug)}`);
  const json = await res.json();
  return json?.ok ? json.guide ?? null : null;
}
