import { defineField, defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";

export const peopleType = defineType({
  name: "people",
  title: "People",
  type: "document",
  fields: [
    orderRankField({ type: "people" }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      description: "Personal website or profile URL",
    }),
    defineField({
      name: "img",
      title: "Profile Image",
      type: "image",
      description: "Profile photo",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Assistant Professor", value: "assistant_professor" },
          { title: "PhD Student", value: "phd_student" },
          { title: "Master Student", value: "master_student" },
          { title: "Undergraduate", value: "undergraduate" },
          { title: "High School", value: "highschool" },
        ],
      },
    }),
    defineField({
      name: "areas",
      title: "Areas",
      type: "string",
      options: {
        list: [
          { title: "Research Lead", value: "research_lead" },
          {
            title: "Undergraduate Researcher",
            value: "undergraduate_researcher",
          },
          { title: "Operations Team", value: "operations_team" },
        ],
      },
    }),
    defineField({
      name: "accomplishments",
      title: "Accomplishments",
      type: "string",
      options: {
        list: [
          { title: "Published", value: "published" },
          { title: "First Author", value: "first_author" },
        ],
      },
    }),
    defineField({
      name: "association",
      title: "Association",
      type: "string",
      validation: (rule) => rule.required(),
      options: {
        list: [
          { title: "Active", value: "active" },
          { title: "Alumni", value: "alumni" },
          { title: "Collaborator", value: "collaborator" },
        ],
      },
    }),
    defineField({
      name: "start",
      title: "Start Year",
      type: "number",
      description: "Year joined the team",
    }),
    defineField({
      name: "end",
      title: "End Year",
      type: "number",
      description: "Year left the team (if applicable)",
    }),
    defineField({
      name: "affiliation",
      title: "Affiliation",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "now",
      title: "Current Status",
      type: "string",
      description: "Where they are now (for alumni)",
    }),
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      description: "An optional quote from this person (max 100 words)",
      validation: (rule) =>
        rule.custom((value) => {
          if (!value) return true;
          const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
          return wordCount <= 100
            ? true
            : `Quote must be 100 words or fewer (currently ${wordCount})`;
        }),
    }),
    defineField({
      name: "slackUserId",
      title: "Slack User ID",
      type: "string",
      description:
        "This person's Slack member ID (e.g. U0123ABC456), used to tag them in #q&a and to match their replies back to a question. Leave blank if they don't have Slack access or shouldn't be tagged.",
    }),
  ],
  preview: {
    select: {
      name: "name",
      association: "association",
      media: "img",
    },
    prepare({ name, association, media }) {
      return {
        title: name || "New Team Member",
        subtitle: association,
        media,
      };
    },
  },
});
