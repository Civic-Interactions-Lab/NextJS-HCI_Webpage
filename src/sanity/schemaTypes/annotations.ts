import { defineField, defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";

export const annotationType = defineType({
  name: "annotation",
  title: "Annotations",
  type: "document",
  fields: [
    orderRankField({ type: "annotation" }),
    defineField({
      name: "path",
      title: "Path",
      type: "string",
    }),
    defineField({
      name: "position",
      title: "Position",
      type: "object",
      fields: [
        defineField({
          name: "x",
          title: "X",
          type: "number",
        }),
        defineField({
          name: "y",
          title: "Y",
          type: "number",
        }),
        defineField({
          name: "viewportX",
          title: "Viewport X",
          type: "number",
        }),
        defineField({
          name: "viewportY",
          title: "Viewport Y",
          type: "number",
        }),
        defineField({
          name: "scrollX",
          title: "Scroll X",
          type: "number",
        }),
        defineField({
          name: "scrollY",
          title: "Scroll Y",
          type: "number",
        }),
        defineField({
          name: "elementSelector",
          title: "Element Selector",
          type: "string",
        }),
        defineField({
          name: "elementOffsetX",
          title: "Element Offset X",
          type: "number",
        }),
        defineField({
          name: "elementOffsetY",
          title: "Element Offset Y",
          type: "number",
        }),
        defineField({
          name: "viewportWidth",
          title: "Viewport Width",
          type: "number",
        }),
        defineField({
          name: "viewportHeight",
          title: "Viewport Height",
          type: "number",
        }),
      ],
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "text",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
    }),
    defineField({
      name: "timestamp",
      title: "Timestamp",
      type: "datetime",
    }),
    defineField({
      name: "comments",
      title: "Comments",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "content",
              title: "Content",
              type: "text",
            }),
            defineField({
              name: "author",
              title: "Author",
              type: "string",
            }),
            defineField({
              name: "timestamp",
              title: "Timestamp",
              type: "datetime",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "resolved",
      title: "Resolved",
      type: "boolean",
    }),
  ],
});
