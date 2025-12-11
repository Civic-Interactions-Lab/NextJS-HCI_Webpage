import { defineField, defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";

export const faqType = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    orderRankField({ type: "faq" }),
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "defaultOpen",
      title: "Default Open",
      type: "boolean",
      description: "Should this FAQ item be expanded by default?",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      question: "question",
    },
    prepare({ question }) {
      return {
        title: question || "New FAQ",
      };
    },
  },
});
