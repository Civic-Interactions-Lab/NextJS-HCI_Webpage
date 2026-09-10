import { defineField, defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";
import { PERSON_STATUS_LABELS } from "@/modules/people/constants/person-status";

export const testimonials = defineType({
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
      personAssociation: "person.association",
      personStatus: "person.status",
      personAffiliation: "person.affiliation",
      personImage: "person.img",
      isActive: "isActive",
    },
    prepare({
      quote,
      personName,
      personAssociation,
      personStatus,
      personAffiliation,
      personImage,
      isActive,
    }) {
      const truncatedQuote =
        quote?.length > 100 ? `${quote.slice(0, 100)}...` : quote;
      const activeSuffix = isActive ? "" : " (Inactive)";

      // Best-effort preview only — this can't do the reverse-reference
      // lookup into `alumniProfile` that the live site's query does, so
      // alumni just show "Alumni" here rather than their "now" text.
      const statusLabel =
        personStatus &&
        PERSON_STATUS_LABELS[personStatus as keyof typeof PERSON_STATUS_LABELS];
      const roleHint =
        personAssociation === "alumni"
          ? "Alumni"
          : [statusLabel, personAffiliation && `at ${personAffiliation}`]
              .filter(Boolean)
              .join(" ") || undefined;

      return {
        title: personName ? `${personName}${activeSuffix}` : "New Testimonial",
        subtitle: roleHint ? `${roleHint} • "${truncatedQuote}"` : truncatedQuote,
        media: personImage,
      };
    },
  },
});
