"use client";

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
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
            orderableDocumentListDeskItem({
              type: "people",
              title: "People",
              S,
              context,
              icon: User,
            }),

            orderableDocumentListDeskItem({
              type: "news",
              title: "News",
              S,
              context,
              icon: NewspaperIcon,
            }),

            orderableDocumentListDeskItem({
              type: "project",
              title: "Projects",
              S,
              context,
              icon: ChartBarIncreasing,
            }),

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
          ]);
      },
    }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
