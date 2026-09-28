export type OwnerPlatform = "ISNetworld" | "Veriforce" | "Avetta";

export interface Owner {
  slug: string;
  company: string;
  platform: OwnerPlatform;
  announced_on: string | null;
  source_url: string | null;
  industry: string | null;
  page_title: string;
  page_meta: string;
  page_h1: string;
  page_intro: string;
  live_since: string;
}

export const OWNER_ENGINE_URL =
  "https://mtsfjulztuhezppqfydr.supabase.co/functions/v1/owner-engine";

export async function fetchOwnerPages(): Promise<Owner[]> {
  const res = await fetch(`${OWNER_ENGINE_URL}?action=pages`);
  const json = await res.json();
  return json?.ok && Array.isArray(json.pages) ? json.pages : [];
}

export async function fetchOwnerPage(slug: string): Promise<Owner | null> {
  const res = await fetch(
    `${OWNER_ENGINE_URL}?action=pages&slug=${encodeURIComponent(slug)}`,
  );
  const json = await res.json();
  return json?.ok ? json.page ?? null : null;
}
