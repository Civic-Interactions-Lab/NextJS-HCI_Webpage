"use client";

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import {
  ChartBarIncreasing,
  CircleQuestionMark,
  NewspaperIcon,
  User,
} from "lucide-react";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
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
          ]);
      },
    }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
