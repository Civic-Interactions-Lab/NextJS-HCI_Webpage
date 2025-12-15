import { defineField, defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";

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
      description:
        "Mark as featured research (maximum 2 can be featured at a time)",
      initialValue: false,
      validation: (rule) =>
        rule.custom(async (featured, context) => {
          if (!featured) return true;

          const { document, getClient } = context;
          const client = getClient({ apiVersion: "2023-05-03" });

          const query = `*[_type == "research" && featured == true && _id != $currentId]`;
          const existingFeatured = await client.fetch(query, {
            currentId: document?._id || "",
          });

          if (existingFeatured && existingFeatured.length >= 2) {
            return `Maximum of 2 research items can be featured. Currently featured: ${existingFeatured.map((item: { title: string }) => item.title).join(", ")}`;
          }

          return true;
        }),
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
