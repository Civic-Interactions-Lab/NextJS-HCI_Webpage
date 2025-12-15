import { defineField, defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";

export const conferenceType = defineType({
  name: "conference",
  title: "Conference",
  type: "document",
  fields: [
    orderRankField({ type: "conference" }),
    defineField({
      name: "name",
      title: "Conference Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "City, Country (e.g., New York City, USA)",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "coordinates",
      title: "Coordinates",
      type: "object",
      description: "Geographic coordinates for map display",
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: "lat",
          title: "Latitude",
          type: "number",
          validation: (rule) =>
            rule
              .required()
              .min(-90)
              .max(90)
              .error("Latitude must be between -90 and 90"),
        }),
        defineField({
          name: "lng",
          title: "Longitude",
          type: "number",
          validation: (rule) =>
            rule
              .required()
              .min(-180)
              .max(180)
              .error("Longitude must be between -180 and 180"),
        }),
      ],
    }),
    defineField({
      name: "image",
      title: "Conference Image",
      type: "image",
      description:
        "Representative image for the conference/location (optional)",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "link",
      title: "Conference Url",
      type: "url",
      description: "Details about the conference (optional)",
    }),
    defineField({
      name: "dates",
      title: "Conference Dates",
      type: "string",
      description: "e.g., 'May 14-18, 2024'",
    }),
    defineField({
      name: "abbreviation",
      title: "Abbreviation",
      type: "string",
      description: "Short name/abbreviation (e.g., CHI, CSCW, UIST)",
    }),
  ],
  preview: {
    select: {
      name: "name",
      location: "location",
      media: "image",
    },
    prepare({ name, location, media }) {
      const subtitle = `${name} - ${location}`;
      return {
        title: name || "New Conference",
        subtitle,
        media,
      };
    },
  },
});
