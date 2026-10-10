export interface CrewBrief {
  month_start: string;
  topic: string;
  summary: string;
  pdf_url: string;
  publish_on: string;
}

export const CREW_BRIEFS_URL =
  "https://mtsfjulztuhezppqfydr.supabase.co/functions/v1/crew-briefs";

export async function fetchCrewBriefs(): Promise<CrewBrief[]> {
  const res = await fetch(CREW_BRIEFS_URL);
  const json = await res.json();
  return json?.ok && Array.isArray(json.briefs) ? json.briefs : [];
}
