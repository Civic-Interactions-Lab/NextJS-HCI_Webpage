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
      name: "roles",
      title: "Roles",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Assistant Professor", value: "pi" },
          { title: "PhD Student", value: "phd" },
          { title: "Masters Student", value: "ms" },
          { title: "Undergraduate", value: "ug" },
          { title: "High School", value: "hs" },
        ],
      },
    }),
    defineField({
      name: "status",
      title: "Status",
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
  ],
  preview: {
    select: {
      name: "name",
      status: "status",
      media: "img",
    },
    prepare({ name, status, media }) {
      return {
        title: name || "New Team Member",
        subtitle: status,
        media,
      };
    },
  },
});
