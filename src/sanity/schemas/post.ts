import { defineArrayMember, defineField, defineType } from "sanity";
import { blogCategories } from "../categories";


/**
 * A blog post. Everything the V4ME team needs to publish a story from the
 * studio: title, cover photo, category, a short summary and the body.
 */
export const post = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required().max(110),
    }),
    defineField({
      name: "slug",
      title: "Web address",
      description: "Click Generate. This becomes the end of the post's link, e.g. /blog/tree-planting-in-kuje",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Short summary",
      description: "One or two sentences shown on the blog list and when the link is shared.",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(220),
    }),
    defineField({
      name: "coverImage",
      title: "Cover photo",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Describe the photo",
          description: "For people using screen readers, e.g. 'Volunteers planting seedlings at a school in Kuje'",
          type: "string",
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: { list: blogCategories, layout: "radio" },
      initialValue: "field-notes",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      initialValue: "V4ME Team",
    }),
    defineField({
      name: "publishedAt",
      title: "Publish date",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Feature this post at the top of the blog",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "body",
      title: "Story",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading", value: "h2" },
            { title: "Subheading", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [
              defineArrayMember({
                name: "link",
                type: "object",
                title: "Link",
                fields: [defineField({ name: "href", type: "url", title: "URL" })],
              }),
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", type: "string", title: "Describe the photo" }),
            defineField({ name: "caption", type: "string", title: "Caption" }),
          ],
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    { title: "Newest first", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", media: "coverImage", date: "publishedAt", category: "category" },
    prepare({ title, media, date, category }) {
      const when = date ? new Date(date).toLocaleDateString("en-GB", { dateStyle: "medium" }) : "No date";
      const label = blogCategories.find((c) => c.value === category)?.title ?? "";
      return { title, media, subtitle: [label, when].filter(Boolean).join(" · ") };
    },
  },
});
