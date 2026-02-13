import { defineField, defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";

const MAX_FEATURED_RESEARCH = 3;

export const researchType = defineType({
  name: "research",
  title: "Research",
  type: "document",
  fields: [
    orderRankField({ type: "research" }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Gen AI & Education", value: "Gen AI & Education" },
          {
            title: "Accessibility Technology",
            value: "Accessibility Technology",
          },
          { title: "Social Computing", value: "Social Computing" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "authors",
      title: "Authors",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "authorType",
              title: "Author Type",
              type: "string",
              options: {
                list: [
                  { title: "Team Member", value: "person" },
                  { title: "External Author", value: "name" },
                ],
                layout: "radio",
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "person",
              title: "Team Member",
              type: "reference",
              to: [{ type: "people" }],
              hidden: ({ parent }) => parent?.authorType !== "person",
              validation: (rule) =>
                rule.custom((person, context) => {
                  const authorType = (context.parent as { authorType?: string })
                    ?.authorType;
                  if (authorType === "person" && !person) {
                    return "Please select a team member";
                  }
                  return true;
                }),
            }),
            defineField({
              name: "name",
              title: "Author Name",
              type: "string",
              hidden: ({ parent }) => parent?.authorType !== "name",
              validation: (rule) =>
                rule.custom((name, context) => {
                  const authorType = (context.parent as { authorType?: string })
                    ?.authorType;
                  if (authorType === "name" && !name) {
                    return "Please enter the author's name";
                  }
                  return true;
                }),
            }),
          ],
          preview: {
            select: {
              authorType: "authorType",
              personName: "person.name",
              name: "name",
            },
            prepare({ authorType, personName, name }) {
              const displayName = authorType === "person" ? personName : name;
              const type = authorType === "person" ? "Team Member" : "External";
              return {
                title: displayName || "Unnamed Author",
                subtitle: type,
              };
            },
          },
        },
      ],
      validation: (rule) =>
        rule.min(1).error("At least one author is required"),
    }),
    defineField({
      name: "imageUrl",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "actions",
      title: "Actions",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              options: {
                list: [
                  { title: "PDF", value: "pdf" },
                  { title: "Demo", value: "demo" },
                  { title: "Code", value: "code" },
                  { title: "Cite", value: "cite" },
                  { title: "Talk", value: "talk" },
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {
              label: "label",
              url: "url",
            },
            prepare({ label, url }) {
              return {
                title: label || "Untitled Action",
                subtitle: url || "No URL",
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: `Mark as featured research (maximum ${MAX_FEATURED_RESEARCH} can be featured at a time)`,
      initialValue: false,
      validation: (rule) => [
        rule.custom(async (featured, context) => {
          if (!featured) return true;

          // Check for maximum featured limit across all documents in the system
          const client = context.getClient({ apiVersion: "2023-01-01" });
          const currentDocId = context.document?._id;

          // Handle both draft and published document IDs
          const currentPublishedId = currentDocId?.replace(/^drafts\./, "");
          const currentDraftId = currentDocId?.startsWith("drafts.")
            ? currentDocId
            : `drafts.${currentDocId}`;

          const existingFeatured = await client.fetch(
            `*[_type == "research" && 
            featured == true && 
            _id != $currentDocId && 
            _id != $currentPublishedId && 
            _id != $currentDraftId]`,
            {
              currentDocId,
              currentPublishedId,
              currentDraftId,
            },
          );

          if (
            existingFeatured &&
            existingFeatured.length >= MAX_FEATURED_RESEARCH
          ) {
            return `Maximum of ${MAX_FEATURED_RESEARCH} research items can be featured. Currently featured: ${existingFeatured.map((item: { title: string }) => item.title).join(", ")}`;
          }

          return true;
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "imageUrl",
      featured: "featured",
      category: "category",
    },
    prepare({ title, media, featured, category }) {
      const subtitle = [
        category || "No category",
        featured ? "⭐ FEATURED" : "",
      ]
        .filter(Boolean)
        .join(" • ");

      return {
        title: title || "Untitled Research",
        subtitle,
        media,
      };
    },
  },
});
