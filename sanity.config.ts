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
  CircleDollarSignIcon,
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

            S.listItem()
              .title("News")
              .icon(NewspaperIcon)
              .child(
                S.list()
                  .title("News")
                  .items([
                    orderableDocumentListDeskItem({
                      type: "news",
                      title: "All News",
                      id: "all-news",
                      S,
                      context,
                    }),
                    orderableDocumentListDeskItem({
                      type: "news",
                      title: "Featured News",
                      filter: "featured == true",
                      id: "featured-news",
                      S,
                      context,
                    }),
                    S.divider(),
                    orderableDocumentListDeskItem({
                      type: "news",
                      title: "Collaborations",
                      filter: 'category == "Collaborations"',
                      id: "collaborations-news",
                      S,
                      context,
                    }),
                    orderableDocumentListDeskItem({
                      type: "news",
                      title: "Grants / Awards",
                      filter: 'category == "Grants / Awards"',
                      id: "grants-awards-news",
                      S,
                      context,
                    }),
                    orderableDocumentListDeskItem({
                      type: "news",
                      title: "Conference Talk",
                      filter: 'category == "Conference Talk"',
                      id: "conference-talk-news",
                      S,
                      context,
                    }),
                    orderableDocumentListDeskItem({
                      type: "news",
                      title: "Published Papers",
                      filter: 'category == "Published Papers"',
                      id: "published-papers-news",
                      S,
                      context,
                    }),
                    orderableDocumentListDeskItem({
                      type: "news",
                      title: "Alumni",
                      filter: 'category == "Alumni"',
                      id: "alumni-news",
                      S,
                      context,
                    }),
                  ]),
              ),

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

            S.listItem()
              .title("Image Settings")
              .icon(ImagesIcon)
              .child(
                S.list()
                  .title("Image Settings")
                  .items([
                    orderableDocumentListDeskItem({
                      type: "imageSettings",
                      title: "All Image Settings",
                      id: "all-image-settings",
                      S,
                      context,
                    }),
                    S.divider(),
                    orderableDocumentListDeskItem({
                      type: "imageSettings",
                      title: "Home Page",
                      filter: 'sectionKey match "home-*"',
                      id: "home-image-settings",
                      S,
                      context,
                    }),
                    orderableDocumentListDeskItem({
                      type: "imageSettings",
                      title: "About Page",
                      filter:
                        'sectionKey match "about-*" || sectionKey match "events-*" || sectionKey == "contact-serc"',
                      id: "about-image-settings",
                      S,
                      context,
                    }),
                    orderableDocumentListDeskItem({
                      type: "imageSettings",
                      title: "Research Page",
                      filter: 'sectionKey match "research-*"',
                      id: "research-image-settings",
                      S,
                      context,
                    }),
                    orderableDocumentListDeskItem({
                      type: "imageSettings",
                      title: "People Page",
                      filter: 'sectionKey match "people-*"',
                      id: "people-image-settings",
                      S,
                      context,
                    }),
                    orderableDocumentListDeskItem({
                      type: "imageSettings",
                      title: "Courses Page",
                      filter: 'sectionKey match "courses-*"',
                      id: "courses-image-settings",
                      S,
                      context,
                    }),
                    orderableDocumentListDeskItem({
                      type: "imageSettings",
                      title: "Sponsors Page",
                      filter: 'sectionKey match "sponsors-*"',
                      id: "sponsors-image-settings",
                      S,
                      context,
                    }),
                    orderableDocumentListDeskItem({
                      type: "imageSettings",
                      title: "Join Page",
                      filter: 'sectionKey match "join-*"',
                      id: "join-image-settings",
                      S,
                      context,
                    }),
                  ]),
              ),

            orderableDocumentListDeskItem({
              type: "conference",
              title: "Conference",
              S,
              context,
              icon: Globe,
            }),

            orderableDocumentListDeskItem({
              type: "sponsors",
              title: "Sponsors",
              S,
              context,
              icon: CircleDollarSignIcon,
            }),
          ]);
      },
    }),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
