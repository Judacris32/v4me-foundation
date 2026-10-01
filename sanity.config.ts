"use client";

/**
 * The V4ME blog editor, served at /studio.
 * Log in with the account that owns the Sanity project to write and publish posts.
 */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./src/sanity/schemas";
import { apiVersion, dataset, projectId } from "./src/sanity/env";

export default defineConfig({
  name: "v4me",
  title: "V4ME Blog",
  basePath: "/studio",
  projectId: projectId || "missing-project-id",
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("V4ME")
          .items([S.documentTypeListItem("post").title("Blog posts")]),
    }),
  ],
  document: {
    // Only blog posts can be created from the "+" button.
    newDocumentOptions: (prev) => prev.filter((item) => item.templateId === "post"),
  },
  apiVersion,
});
