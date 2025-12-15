"use client";

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "@/sanity/env";
import { schema } from "@/sanity/schemaTypes";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import {
  ChartBarIncreasing,
  CircleQuestionMark,
  Globe,
  ImagesIcon,
  MicroscopeIcon,
  NewspaperIcon,
  User,
  UserRoundCheck,
} from "lucide-react";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({
      structure: (S, context) => {
        return S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("People")
              .icon(User)
              .child(
                S.list()
                  .title("People")
                  .items([
                    orderableDocumentListDeskItem({
                      type: "people",
                      title: "All People",
                      id: "all-people",
                      S,
                      context,
                    }),
                    S.divider(),
                    orderableDocumentListDeskItem({
                      type: "people",
                      title: "Active",
                      filter: 'association == "active"',
                      id: "active-people",
                      S,
                      context,
                    }),
                    orderableDocumentListDeskItem({
                      type: "people",
                      title: "Alumni",
                      filter: 'association == "alumni"',
                      id: "alumni-people",
                      S,
                      context,
                    }),
                    orderableDocumentListDeskItem({
                      type: "people",
                      title: "Collaborator",
                      filter: 'association == "collaborator"',
                      id: "collaborator-people",
                      S,
                      context,
                    }),
                  ]),
              ),

            orderableDocumentListDeskItem({
              type: "news",
              title: "News",
              S,
              context,
              icon: NewspaperIcon,
            }),

            S.listItem()
              .title("Research")
              .icon(MicroscopeIcon)
              .child(
                S.list()
                  .title("Research")
                  .items([
                    orderableDocumentListDeskItem({
                      type: "research",
                      title: "All Research",
                      id: "all-research",
                      S,
                      context,
                    }),
                    orderableDocumentListDeskItem({
                      type: "research",
                      title: "Featured Research",
                      filter: "featured == true",
                      id: "featured-research",
                      S,
                      context,
                    }),
                    S.divider(),
                    orderableDocumentListDeskItem({
                      type: "research",
                      title: "Gen AI & Education",
                      filter: 'category == "Gen AI & Education"',
                      id: "genai-research",
                      S,
                      context,
                    }),
                    orderableDocumentListDeskItem({
                      type: "research",
                      title: "Accessibility Technology",
                      filter: 'category == "Accessibility Technology"',
                      id: "accessibility-research",
                      S,
                      context,
                    }),
                    orderableDocumentListDeskItem({
                      type: "research",
                      title: "Social Computing",
                      filter: 'category == "Social Computing"',
                      id: "social-research",
                      S,
                      context,
                    }),
                  ]),
              ),

            orderableDocumentListDeskItem({
              type: "faq",
              title: "FAQs",
              S,
              context,
              icon: CircleQuestionMark,
            }),

            orderableDocumentListDeskItem({
              type: "testimonials",
              title: "Testimonials",
              S,
              context,
              icon: UserRoundCheck,
            }),

            orderableDocumentListDeskItem({
              type: "imageSettings",
              title: "Image Settings",
              S,
              context,
              icon: ImagesIcon,
            }),

            orderableDocumentListDeskItem({
              type: "conference",
              title: "Conference",
              S,
              context,
              icon: Globe,
            }),
          ]);
      },
    }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
