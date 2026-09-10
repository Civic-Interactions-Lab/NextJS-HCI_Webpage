import { defineField, defineType } from "sanity";

export const alumniProfileType = defineType({
  name: "alumniProfile",
  title: "Alumni Profile",
  type: "document",
  fields: [
    defineField({
      name: "person",
      title: "Person",
      type: "reference",
      to: [{ type: "people" }],
      validation: (rule) => rule.required(),
      options: {
        filter: 'association == "alumni"',
      },
      description: "The alumnus this profile belongs to.",
    }),
    defineField({
      name: "nowType",
      title: "Current Status Type",
      type: "string",
      description: "Are they currently working, studying, or something else? Shown as a badge on alumni cards.",
      options: {
        list: [
          { title: "Working", value: "working" },
          { title: "Studying", value: "studying" },
          { title: "Other", value: "other" },
        ],
      },
    }),
    defineField({
      name: "now",
      title: "Current Position",
      type: "string",
      description:
        "Where they currently work or study, e.g. 'Software Engineer at Google' or 'PhD Candidate at MIT'.",
    }),
    // Future: donation-related fields land here, not on the `people` type.
  ],
  preview: {
    select: {
      name: "person.name",
      now: "now",
      media: "person.img",
    },
    prepare({ name, now, media }) {
      return {
        title: name || "Alumni Profile",
        subtitle: now,
        media,
      };
    },
  },
});
