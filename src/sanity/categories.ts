// Plain data (no Sanity imports) so the public site can use it without loading the studio code.
export const blogCategories = [
  { title: "Environment", value: "environment" },
  { title: "Humanitarian", value: "humanitarian" },
  { title: "Field Notes", value: "field-notes" },
  { title: "News", value: "news" },
  { title: "Events", value: "events" },
];

export function categoryLabel(value?: string) {
  return blogCategories.find((c) => c.value === value)?.title ?? "Story";
}

// Job opening types for the Careers section.
export const jobTypes = [
  { title: "Full time", value: "full-time" },
  { title: "Part time", value: "part-time" },
  { title: "Contract", value: "contract" },
  { title: "Internship", value: "internship" },
];

export function jobTypeLabel(value?: string) {
  return jobTypes.find((t) => t.value === value)?.title ?? "Role";
}

