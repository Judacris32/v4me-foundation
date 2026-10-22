import { defineArrayMember, defineField, defineType } from "sanity";
import { jobTypes } from "../categories";

/**
 * A job or internship opening, shown in the Careers section on Get Involved.
 * Switch "Open for applications" off (or let the closing date pass) and it
 * disappears from the site without being deleted.
 */
export const job = defineType({
  name: "job",
  title: "Job opening",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Role title",
      description: "e.g. Programs Officer, Communications Intern",
      type: "string",
      validation: (rule) => rule.required().max(90),
    }),
    defineField({
      name: "type",
      title: "Type of role",
      type: "string",
      options: { list: jobTypes, layout: "radio" },
      initialValue: "full-time",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      description: "e.g. Abuja, Remote, Hybrid (Abuja)",
      type: "string",
      initialValue: "Abuja",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Short summary",
      description: "One or two sentences shown on the card before someone opens it.",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(260),
    }),
    defineField({
      name: "details",
      title: "Full description",
      description: "Responsibilities, requirements, what we offer. Use bullet lists for easy reading.",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Subheading", value: "h3" },
          ],
          marks: { decorators: [{ title: "Bold", value: "strong" }, { title: "Italic", value: "em" }] },
        }),
      ],
    }),
    defineField({
      name: "deadline",
      title: "Closing date",
      description: "Optional. The role hides itself the day after this date.",
      type: "date",
    }),
    defineField({
      name: "applyEmail",
      title: "Send applications to",
      description: "Leave empty to use the main V4ME email.",
      type: "string",
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: "isOpen",
      title: "Open for applications",
      description: "Switch off to hide this role from the website.",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "title", type: "type", location: "location", open: "isOpen" },
    prepare({ title, type, location, open }) {
      const label = jobTypes.find((t) => t.value === type)?.title ?? "";
      return { title, subtitle: [open === false ? "Closed" : "Open", label, location].filter(Boolean).join(" · ") };
    },
  },
});
