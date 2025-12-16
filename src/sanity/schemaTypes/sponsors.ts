import { defineField, defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";

export const sponsorType = defineType({
  name: "sponsors",
  title: "Sponsors",
  type: "document",
  fields: [
    orderRankField({ type: "sponsor" }),
    defineField({
      name: "name",
      title: "Sponsor Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "url",
      title: "Website URL",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "altText",
      title: "Logo Alt Text",
      type: "string",
      description: "Accessibility description for the logo",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "grants",
      title: "Grants",
      type: "array",
      of: [
        defineField({
          name: "grant",
          title: "Grant",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Grant Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "grantNumber",
              title: "Grant Number",
              type: "string",
              description: "Optional grant number or identifier",
            }),
            defineField({
              name: "startDate",
              title: "Start Date",
              type: "date",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "endDate",
              title: "End Date",
              type: "date",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "amount",
              title: "Grant Amount",
              type: "number",
              validation: (rule) => rule.required().positive(),
            }),
            defineField({
              name: "currency",
              title: "Currency",
              type: "string",
              options: {
                list: [
                  { title: "USD ($)", value: "USD" },
                  { title: "EUR (€)", value: "EUR" },
                  { title: "GBP (£)", value: "GBP" },
                  { title: "CAD (C$)", value: "CAD" },
                ],
              },
              initialValue: "USD",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "url",
              title: "Grant URL",
              type: "url",
            }),
          ],
          preview: {
            select: {
              title: "title",
              grantNumber: "grantNumber",
              amount: "amount",
              currency: "currency",
              startDate: "startDate",
              endDate: "endDate",
            },
            prepare({
              title,
              grantNumber,
              amount,
              currency,
              startDate,
              endDate,
            }) {
              const formatAmount = (amount: number, currency: string) => {
                const currencySymbols: Record<string, string> = {
                  USD: "$",
                  EUR: "€",
                  GBP: "£",
                  CAD: "C$",
                };
                const symbol = currencySymbols[currency] || "$";
                return `${symbol}${amount?.toLocaleString() || "0"}`;
              };

              const formatDateRange = (start: string, end: string) => {
                if (!start || !end) return "";
                const startYear = new Date(start).getFullYear();
                const endYear = new Date(end).getFullYear();
                return `${startYear} - ${endYear}`;
              };

              const dateRange = formatDateRange(startDate, endDate);
              const formattedAmount = formatAmount(amount, currency);

              return {
                title: title || "Untitled Grant",
                subtitle: `${grantNumber ? `${grantNumber} • ` : ""}${formattedAmount}${dateRange ? ` • ${dateRange}` : ""}`,
              };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      name: "name",
      media: "logo",
      grants: "grants",
    },
    prepare({ name, media, grants }) {
      const grantCount = grants ? grants.length : 0;
      return {
        title: name || "Untitled Sponsor",
        subtitle: `${grantCount} grant${grantCount !== 1 ? "s" : ""}`,
        media,
      };
    },
  },
});
