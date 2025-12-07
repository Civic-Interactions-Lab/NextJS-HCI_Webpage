import { defineField, defineType } from "sanity";

export const peopleType = defineType({
  name: "people",
  title: "People",
  type: "document",
  fields: [
    // Hero Images Section
    defineField({
      name: "heroImages",
      title: "Hero Images",
      type: "object",
      fields: [
        defineField({
          name: "heroes",
          title: "Hero Images",
          description: "Multiple hero background images that will rotate/cycle",
          type: "array",
          of: [
            {
              type: "object",
              name: "heroImage",
              title: "Hero Image",
              fields: [
                defineField({
                  name: "src",
                  title: "Hero Image",
                  type: "image",
                  validation: (rule) => rule.required(),
                  options: {
                    hotspot: true,
                  },
                }),
                defineField({
                  name: "alt",
                  title: "Alt Text",
                  type: "string",
                  description: "Descriptive text for accessibility",
                  validation: (rule) => rule.required(),
                }),
                defineField({
                  name: "title",
                  title: "Title/Caption",
                  type: "string",
                  description: "Optional title or caption for the image",
                }),
              ],
              preview: {
                select: {
                  title: "title",
                  alt: "alt",
                  media: "src",
                },
                prepare({ title, alt, media }) {
                  return {
                    title: title || alt || "Hero Image",
                    media,
                  };
                },
              },
            },
          ],
        }),
      ],
    }),

    // Team Members Section
    defineField({
      name: "teamMembers",
      title: "Team Members",
      type: "array",
      of: [
        {
          type: "object",
          name: "teamMember",
          title: "Team Member",
          fields: [
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
        },
      ],
    }),
  ],
  preview: {
    select: {
      teamMembers: "teamMembers",
    },
    prepare({ teamMembers }) {
      const count = teamMembers?.length || 0;
      return {
        title: "People",
        subtitle: `${count} team member${count !== 1 ? "s" : ""}`,
      };
    },
  },
});
