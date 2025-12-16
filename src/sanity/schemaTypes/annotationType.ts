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
      name: "category",
      title: "Issue Category",
      type: "string",
      options: {
        list: [
          { title: "Content", value: "content" },
          { title: "Bug", value: "bug" },
          { title: "Color", value: "color" },
          { title: "Transition", value: "transition" },
          { title: "Layout", value: "layout" },
          { title: "Performance", value: "performance" },
          { title: "Accessibility", value: "accessibility" },
          { title: "Other", value: "other" },
        ],
      },
      initialValue: "other",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "comments",
      title: "Conversation",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "content",
              title: "Comment Content",
              type: "text",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "author",
              title: "Comment Author",
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
  ],
  orderings: [
    {
      title: "Created Date, New",
      name: "createdAtDesc",
      by: [{ field: "createdAt", direction: "desc" }],
    },
    {
      title: "Category",
      name: "categoryAsc",
      by: [{ field: "category", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "content",
      subtitle: "author.name",
      category: "category",
      commentCount: "comments",
    },
    prepare({ title, subtitle, category, commentCount }) {
      const categoryEmojis = {
        content: "📝",
        bug: "🐛",
        color: "🎨",
        transition: "✨",
        layout: "📐",
        performance: "⚡",
        accessibility: "♿",
        other: "💭",
      };

      const count = commentCount?.length || 0;
      const commentText =
        count > 0 ? ` • ${count} comment${count === 1 ? "" : "s"}` : "";

      return {
        title: title?.length > 50 ? `${title.slice(0, 50)}...` : title,
        subtitle: `${categoryEmojis[category as keyof typeof categoryEmojis] || "💭"} ${subtitle || "Anonymous"} • ${category}${commentText}`,
      };
    },
  },
});
