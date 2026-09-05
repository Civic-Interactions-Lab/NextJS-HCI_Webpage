import { defineField, defineType } from "sanity";

export const questionType = defineType({
  name: "question",
  title: "Question",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "targetPerson",
      title: "Asked to",
      type: "reference",
      to: [{ type: "people" }],
      description: "Leave blank if the question was addressed to anyone (@everyone in Slack).",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Answered", value: "answered" },
        ],
      },
      initialValue: "pending",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Answer",
      type: "text",
      description: "Filled in once someone replies in the Slack thread.",
    }),
    defineField({
      name: "answeredBy",
      title: "Answered by",
      type: "reference",
      to: [{ type: "people" }],
      description: "Matched from the Slack replier's user ID — only resolves to someone whose People entry has a Slack User ID set.",
    }),
    defineField({
      name: "answeredAt",
      title: "Answered at",
      type: "datetime",
    }),
    defineField({
      name: "slackThreadTs",
      title: "Slack thread timestamp",
      type: "string",
      readOnly: true,
      description: "Internal — the Slack message `ts` this question was posted as, used to match incoming replies back to this document.",
    }),
  ],
  preview: {
    select: {
      question: "question",
      status: "status",
      targetName: "targetPerson.name",
    },
    prepare({ question, status, targetName }) {
      return {
        title: question || "Untitled Question",
        subtitle: `${targetName ? `To ${targetName}` : "To anyone"} • ${status}`,
      };
    },
  },
});
