import { defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";
import type {
  ValidationContext,
  ConditionalPropertyCallbackContext,
} from "sanity";

export const IMAGE_SECTIONS = {
  // Home page sections
  "home-hero": { title: "Home - Hero Section", defaultType: "single" },
  "home-why-hci": { title: "Home - Why HCI Lab", defaultType: "array" },
  "home-hub-community": {
    title: "Home - Hub Community",
    defaultType: "single",
  },
  "home-feature-projects": {
    title: "Home - Feature Projects",
    defaultType: "array",
  },

  // About page sections
  "about-hero": { title: "About - Hero Section", defaultType: "single" },
  "about-studio-time": { title: "About - Studio Time", defaultType: "single" },
  "about-community-research": {
    title: "About - Community Research",
    defaultType: "array",
  },
  "about-testimonials": {
    title: "About - Testimonials Background",
    defaultType: "single",
  },

  // Projects page sections
  "projects-hero": { title: "Projects - Hero Section", defaultType: "single" },
  "projects-featured": {
    title: "Projects - Featured Gallery",
    defaultType: "array",
  },

  // Join page sections
  "join-hero": { title: "Join - Hero Section", defaultType: "single" },
  "join-application-process": {
    title: "Join - Application Process",
    defaultType: "array",
  },

  // News page sections
  "news-hero": { title: "News - Hero Section", defaultType: "single" },
  "news-featured": { title: "News - Featured Stories", defaultType: "array" },

  // Contact page sections
  "contact-hero": { title: "Contact - Hero Section", defaultType: "single" },
  "contact-office": { title: "Contact - Office Images", defaultType: "array" },
} as const;

export type ImageSectionKey = keyof typeof IMAGE_SECTIONS;

export const imageSettingsType = defineType({
  name: "imageSettings",
  title: "Image Settings",
  type: "document",
  fields: [
    orderRankField({ type: "imageSettings" }),
    {
      name: "sectionKey",
      title: "Section",
      type: "string",
      options: {
        list: Object.entries(IMAGE_SECTIONS).map(([key, config]) => ({
          title: config.title,
          value: key,
        })),
        layout: "dropdown",
      },
      validation: (Rule) => [
        Rule.required(),
        Rule.custom(
          async (sectionKey: ImageSectionKey, context: ValidationContext) => {
            if (!sectionKey) return true;

            // Check for duplicate sections across all documents in the system
            const client = context.getClient({ apiVersion: "2023-01-01" });
            const currentDocId = context.document?._id;

            const existingDocs = await client.fetch(
              `*[_type == "imageSettings" && _id != $currentDocId && sectionKey == $sectionKey]`,
              { currentDocId, sectionKey },
            );

            if (existingDocs.length > 0) {
              const sectionTitle =
                IMAGE_SECTIONS[sectionKey]?.title || sectionKey;
              return `"${sectionTitle}" already exists in the system. You can only edit the existing configuration, not create a new one.`;
            }

            return true;
          },
        ),
      ],
    },
    {
      name: "singleImage",
      title: "Image",
      type: "object",
      hidden: (context: ConditionalPropertyCallbackContext) => {
        const sectionKey = context.document?.sectionKey as ImageSectionKey;
        return (
          !sectionKey || IMAGE_SECTIONS[sectionKey]?.defaultType !== "single"
        );
      },
      fields: [
        {
          name: "asset",
          title: "Image",
          type: "image",
          options: {
            hotspot: true,
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: "imageArray",
      title: "Images",
      type: "array",
      hidden: (context: ConditionalPropertyCallbackContext) => {
        const sectionKey = context.document?.sectionKey as ImageSectionKey;
        return (
          !sectionKey || IMAGE_SECTIONS[sectionKey]?.defaultType !== "array"
        );
      },
      validation: (Rule) => Rule.min(1),
      of: [
        {
          type: "object",
          fields: [
            {
              name: "asset",
              title: "Image",
              type: "image",
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: "alt",
              title: "Alt Text",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: "alt",
              media: "asset",
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      sectionKey: "sectionKey",
      singleImage: "singleImage",
      imageArray: "imageArray",
    },
    prepare(selection) {
      const { sectionKey, singleImage, imageArray } = selection;
      const config = IMAGE_SECTIONS[sectionKey as ImageSectionKey];

      let imageCount = 0;
      const imageType = config?.defaultType || "single";

      if (imageType === "single" && singleImage?.asset) {
        imageCount = 1;
      } else if (imageType === "array" && imageArray) {
        imageCount = imageArray.length;
      }

      return {
        title: config?.title || sectionKey,
        subtitle: `${imageCount} image${imageCount !== 1 ? "s" : ""} • ${imageType}`,
      };
    },
  },
});
