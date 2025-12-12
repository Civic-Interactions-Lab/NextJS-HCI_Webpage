import { defineField, defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";

export const newsType = defineType({
  name: "news",
  title: "News",
  type: "document",
  fields: [
    orderRankField({ type: "news" }),
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
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "url",
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
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Collaborations", value: "Collaborations" },
          { title: "Grants / Awards", value: "Grants / Awards" },
          { title: "Conference Talk", value: "Conference Talk" },
          { title: "Published Papers", value: "Published Papers" },
          { title: "Alumni", value: "Alumni" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Mark as featured news (only one can be featured at a time)",
      initialValue: false,
      validation: (rule) =>
        rule.custom(async (featured, context) => {
          if (!featured) return true;

          const { document, getClient } = context;
          const client = getClient({ apiVersion: "2023-05-03" });

          const query = `*[_type == "news" && featured == true && _id != $currentId][0]`;
          const existingFeatured = await client.fetch(query, {
            currentId: document?._id || "",
          });

          if (existingFeatured) {
            return `Another news item "${existingFeatured.title}" is already featured.`;
          }

          return true;
        }),
    }),
  ],
  preview: {
    select: {
      title: "title",
      date: "date",
      media: "imageUrl",
      featured: "featured",
    },
    prepare({ title, date, media, featured }) {
      return {
        title: title || "Untitled News",
        subtitle: `${date || "No date"}${featured ? " • ⭐ FEATURED" : ""}`,
        media,
      };
    },
  },
});
