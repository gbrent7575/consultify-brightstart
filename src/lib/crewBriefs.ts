import { OWNER_ENGINE_URL } from "@/lib/owners";

export interface CrewBrief {
  month_start: string;
  topic: string;
  summary: string;
  pdf_url: string;
  publish_on: string;
}

export async function fetchCrewBriefs(): Promise<CrewBrief[]> {
  const res = await fetch(`${OWNER_ENGINE_URL}?action=crew_briefs`);
  const json = await res.json();
  return json?.ok && Array.isArray(json.briefs) ? json.briefs : [];
}
