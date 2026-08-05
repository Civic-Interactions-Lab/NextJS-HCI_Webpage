import { defineField, defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";

export const eventType = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    orderRankField({ type: "event" }),
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
      name: "location",
      title: "Location",
      type: "string",
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
          { title: "Social", value: "Social" },
          { title: "Hackathon", value: "Hackathon" },
          { title: "Conference", value: "Conference" },
          { title: "Showcase", value: "Showcase" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Mark as the featured upcoming event (only one can be featured at a time)",
      initialValue: false,
      validation: (rule) =>
        rule.custom(async (featured, context) => {
          if (!featured) return true;

          // Check for featured limit across all documents in the system
          const client = context.getClient({ apiVersion: "2023-05-03" });
          const currentDocId = context.document?._id;

          // Handle both draft and published document IDs
          const currentPublishedId = currentDocId?.replace(/^drafts\./, "");
          const currentDraftId = currentDocId?.startsWith("drafts.")
            ? currentDocId
            : `drafts.${currentDocId}`;

          const existingFeatured = await client.fetch(
            `*[_type == "event" &&
        featured == true &&
        _id != $currentDocId &&
        _id != $currentPublishedId &&
        _id != $currentDraftId][0]`,
            {
              currentDocId,
              currentPublishedId,
              currentDraftId,
            },
          );

          if (existingFeatured) {
            return `Another event "${existingFeatured.title}" is already featured.`;
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
        title: title || "Untitled Event",
        subtitle: `${date || "No date"}${featured ? " • ⭐ FEATURED" : ""}`,
        media,
      };
    },
  },
});
