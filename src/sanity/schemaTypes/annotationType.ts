import { defineField, defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";

export const annotationType = defineType({
  name: "annotation",
  title: "Page Annotation",
  type: "document",
  fields: [
    orderRankField({ type: "annotation" }),
    defineField({
      name: "pageUrl",
      title: "Page URL",
      type: "string",
      validation: (rule) => rule.required(),
      description: "The URL/path where this annotation appears",
    }),
    defineField({
      name: "content",
      title: "Comment Content",
      type: "text",
      validation: (rule) => rule.required().min(1).max(500),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "object",
      fields: [
        defineField({
          name: "name",
          title: "Name",
          type: "string",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "email",
          title: "Email",
          type: "string",
        }),
        defineField({
          name: "avatar",
          title: "Avatar",
          type: "url",
        }),
      ],
    }),
    defineField({
      name: "position",
      title: "Position on Page",
      type: "object",
      fields: [
        defineField({
          name: "x",
          title: "X Coordinate",
          type: "number",
          validation: (rule) => rule.required().min(0),
        }),
        defineField({
          name: "y",
          title: "Y Coordinate",
          type: "number",
          validation: (rule) => rule.required().min(0),
        }),
        defineField({
          name: "viewport",
          title: "Viewport Info",
          type: "object",
          fields: [
            defineField({
              name: "width",
              title: "Viewport Width",
              type: "number",
            }),
            defineField({
              name: "height",
              title: "Viewport Height",
              type: "number",
            }),
            defineField({
              name: "scrollY",
              title: "Scroll Position",
              type: "number",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Open", value: "open" },
          { title: "In Progress", value: "in-progress" },
          { title: "Resolved", value: "resolved" },
          { title: "Rejected", value: "rejected" },
        ],
      },
      initialValue: "open",
    }),
    defineField({
      name: "priority",
      title: "Priority",
      type: "string",
      options: {
        list: [
          { title: "Low", value: "low" },
          { title: "Medium", value: "medium" },
          { title: "High", value: "high" },
          { title: "Critical", value: "critical" },
        ],
      },
      initialValue: "medium",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "replies",
      title: "Replies",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "content",
              title: "Reply Content",
              type: "text",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "author",
              title: "Reply Author",
              type: "object",
              fields: [
                defineField({ name: "name", title: "Name", type: "string" }),
                defineField({ name: "email", title: "Email", type: "string" }),
                defineField({ name: "avatar", title: "Avatar", type: "url" }),
              ],
            }),
            defineField({
              name: "createdAt",
              title: "Created At",
              type: "datetime",
              initialValue: () => new Date().toISOString(),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "updatedAt",
      title: "Updated At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  orderings: [
    {
      title: "Created Date, New",
      name: "createdAtDesc",
      by: [{ field: "createdAt", direction: "desc" }],
    },
    {
      title: "Status",
      name: "statusAsc",
      by: [{ field: "status", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "content",
      subtitle: "author.name",
      status: "status",
      priority: "priority",
    },
    prepare({ title, subtitle, status, priority }) {
      const statusEmojis = {
        open: "🔵",
        "in-progress": "🟡",
        resolved: "✅",
        rejected: "❌",
      };

      return {
        title: title?.length > 50 ? `${title.slice(0, 50)}...` : title,
        subtitle: `${statusEmojis[status as keyof typeof statusEmojis] || "🔵"} ${subtitle || "Anonymous"} • ${priority}`,
      };
    },
  },
});
