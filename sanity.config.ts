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
  CalendarIcon,
  CircleDollarSignIcon,
  CircleQuestionMark,
  MessageCircleQuestionMark,
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
              .title("Events")
              .icon(CalendarIcon)
              .child(
                S.list()
                  .title("Events")
                  .items([
                    orderableDocumentListDeskItem({
                      type: "event",
                      title: "Featured Events",
                      filter: "featured == true",
                      id: "featured-events",
                      S,
                      context,
                    }),
                    S.divider(),
                    orderableDocumentListDeskItem({
                      type: "event",
                      title: "Social",
                      filter: 'category == "Social"',
                      id: "social-events",
                      S,
                      context,
                    }),
                    orderableDocumentListDeskItem({
                      type: "event",
                      title: "Hackathon",
                      filter: 'category == "Hackathon"',
                      id: "hackathon-events",
                      S,
                      context,
                    }),
                    orderableDocumentListDeskItem({
                      type: "event",
                      title: "Conference",
                      filter: 'category == "Conference"',
                      id: "conference-events",
                      S,
                      context,
                    }),
                    orderableDocumentListDeskItem({
                      type: "event",
                      title: "Showcase",
                      filter: 'category == "Showcase"',
                      id: "showcase-events",
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
                      title: "Future of Work",
                      filter: 'category == "Future of Work"',
                      id: "future-of-work-research",
                      S,
                      context,
                    }),
                  ]),
              ),

            S.listItem()
              .title("Questions")
              .icon(MessageCircleQuestionMark)
              .child(
                S.list()
                  .title("Questions")
                  .items([
                    S.listItem()
                      .title("Pending")
                      .child(
                        S.documentList()
                          .title("Pending Questions")
                          .filter('_type == "question" && status == "pending"')
                          .defaultOrdering([{ field: "_createdAt", direction: "desc" }]),
                      ),
                    S.listItem()
                      .title("Answered")
                      .child(
                        S.documentList()
                          .title("Answered Questions")
                          .filter('_type == "question" && status == "answered"')
                          .defaultOrdering([{ field: "answeredAt", direction: "desc" }]),
                      ),
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
