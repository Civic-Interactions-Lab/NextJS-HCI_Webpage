import { defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Projects",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "datetime",
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "url",
      description: "Link to paper, publication, or project page",
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
      name: "description",
      title: "Description",
      type: "text",
      description: "Brief description of the project",
    }),
    defineField({
      name: "authors",
      title: "Authors",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "authorType",
              title: "Author Type",
              type: "string",
              options: {
                list: [
                  { title: "Team Member", value: "person" },
                  { title: "External Author", value: "name" },
                ],
                layout: "radio",
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "person",
              title: "Team Member",
              type: "reference",
              to: [{ type: "people" }],
              hidden: ({ parent }) => parent?.authorType !== "person",
              validation: (rule) =>
                rule.custom((person, context) => {
                  const authorType = (context.parent as { authorType?: string })
                    ?.authorType;
                  if (authorType === "person" && !person) {
                    return "Please select a team member";
                  }
                  return true;
                }),
            }),
            defineField({
              name: "name",
              title: "Author Name",
              type: "string",
              hidden: ({ parent }) => parent?.authorType !== "name",
              validation: (rule) =>
                rule.custom((name, context) => {
                  const authorType = (context.parent as { authorType?: string })
                    ?.authorType;
                  if (authorType === "name" && !name) {
                    return "Please enter the author's name";
                  }
                  return true;
                }),
            }),
          ],
          preview: {
            select: {
              authorType: "authorType",
              personName: "person.name",
              name: "name",
            },
            prepare({ authorType, personName, name }) {
              const displayName = authorType === "person" ? personName : name;
              const type = authorType === "person" ? "Team Member" : "External";
              return {
                title: displayName || "Unnamed Author",
                subtitle: type,
              };
            },
          },
        },
      ],
      validation: (rule) =>
        rule.min(1).error("At least one author is required"),
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "HCI", value: "hci" },
          { title: "AI/ML", value: "ai-ml" },
          { title: "Education", value: "education" },
          { title: "Social Computing", value: "social-computing" },
          { title: "Accessibility", value: "accessibility" },
          { title: "UX Research", value: "ux-research" },
          { title: "Data Science", value: "data-science" },
        ],
      },
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Published", value: "published" },
          { title: "In Review", value: "review" },
          { title: "In Progress", value: "progress" },
          { title: "Draft", value: "draft" },
        ],
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      date: "date",
      media: "imageUrl",
      status: "status",
    },
    prepare({ title, date, media, status }) {
      const dateStr = date ? new Date(date).getFullYear() : "No date";
      return {
        title: title || "Untitled Project",
        subtitle: `${dateStr} • ${status || "No status"}`,
        media,
      };
    },
  },
});
