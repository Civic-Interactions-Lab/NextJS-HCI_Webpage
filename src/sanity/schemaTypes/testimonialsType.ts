import { defineField, defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";

export const testimonialsType = defineType({
  name: "testimonials",
  title: "Testimonials",
  type: "document",
  fields: [
    orderRankField({ type: "testimonials" }),
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      validation: (rule) => rule.required().min(50).max(1000),
      description: "The testimonial quote (50-1000 characters)",
    }),
    defineField({
      name: "person",
      title: "Person",
      type: "reference",
      to: [{ type: "people" }],
      validation: (rule) => rule.required(),
      description: "Reference to the person who gave this testimonial",
    }),
    defineField({
      name: "role",
      title: "Current Role",
      type: "string",
      validation: (rule) => rule.required(),
      description: "Their current position/role (e.g., 'UX Designer at URBN')",
    }),
    defineField({
      name: "isActive",
      title: "Is Active",
      type: "boolean",
      initialValue: true,
      description: "Whether this testimonial should be displayed",
    }),
  ],
  preview: {
    select: {
      quote: "quote",
      personName: "person.name",
      role: "role",
      personImage: "person.img",
      isActive: "isActive",
    },
    prepare({ quote, personName, role, personImage, isActive }) {
      const truncatedQuote =
        quote?.length > 100 ? `${quote.slice(0, 100)}...` : quote;
      const status = isActive ? "" : " (Inactive)";

      return {
        title: personName ? `${personName}${status}` : "New Testimonial",
        subtitle: role ? `${role} • "${truncatedQuote}"` : truncatedQuote,
        media: personImage,
      };
    },
  },
});
