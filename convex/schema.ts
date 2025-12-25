import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  annotations: defineTable({
    path: v.string(),
    position: v.object({
      x: v.number(),
      y: v.number(),
      viewportX: v.number(),
      viewportY: v.number(),
      scrollX: v.number(),
      scrollY: v.number(),
      elementSelector: v.optional(v.string()),
      elementOffsetX: v.optional(v.number()),
      elementOffsetY: v.optional(v.number()),
      viewportWidth: v.number(),
      viewportHeight: v.number(),
    }),
    content: v.string(),
    authorId: v.string(),
    authorName: v.string(),
    authorImageUrl: v.optional(v.string()),
    timestamp: v.number(),
    resolved: v.boolean(),
    category: v.union(
      v.literal("content"),
      v.literal("bug"),
      v.literal("color"),
      v.literal("transition"),
      v.literal("layout"),
      v.literal("performance"),
      v.literal("accessibility"),
      v.literal("other"),
    ),
  })
    .index("by_path", ["path"])
    .index("by_timestamp", ["timestamp"]),

  comments: defineTable({
    annotationId: v.id("annotations"),
    content: v.string(),
    authorId: v.string(),
    authorName: v.string(),
    authorImageUrl: v.optional(v.string()),
    timestamp: v.number(),
  })
    .index("by_annotation", ["annotationId"])
    .index("by_timestamp", ["timestamp"]),
});
