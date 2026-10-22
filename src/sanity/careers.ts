import { groq, type PortableTextBlock } from "next-sanity";
import { client } from "./client";
export { jobTypes, jobTypeLabel } from "./categories";

export type Job = {
  _id: string;
  title: string;
  type: string;
  location: string;
  summary: string;
  details?: PortableTextBlock[];
  deadline?: string;
  applyEmail?: string;
};

/** Open roles whose closing date (if any) hasn't passed, newest first. */
export async function getOpenJobs(): Promise<Job[]> {
  const c = client;
  if (!c) return [];
  try {
    const jobs = await c.fetch<Job[]>(
      groq`*[_type == "job" && isOpen != false && (!defined(deadline) || deadline >= $today)] | order(_createdAt desc) {
        _id, title, type, location, summary, details, deadline, applyEmail
      }`,
      { today: new Date().toISOString().slice(0, 10) },
      { next: { revalidate: 60 } },
    );
    return jobs ?? [];
  } catch (err) {
    console.error("[sanity] Could not load job openings:", err instanceof Error ? err.message : err);
    return [];
  }
}
