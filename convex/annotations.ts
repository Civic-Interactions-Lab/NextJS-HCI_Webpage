import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getAnnotationsForPage = query({
  args: {
    path: v.string(),
  },
  handler: async (ctx, args) => {
    const annotations = await ctx.db
      .query("annotations")
      .withIndex("by_path", (q) => q.eq("path", args.path))
      .order("desc")
      .collect();

    // Get comments for each annotation
    return await Promise.all(
      annotations.map(async (annotation) => {
        const comments = await ctx.db
          .query("comments")
          .withIndex("by_annotation", (q) =>
            q.eq("annotationId", annotation._id),
          )
          .order("asc")
          .collect();

        return {
          ...annotation,
          comments,
        };
      }),
    );
  },
});

export const createAnnotation = mutation({
  args: {
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
    author: v.string(),
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
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("annotations", {
      path: args.path,
      position: args.position,
      content: args.content,
      authorId: args.authorId,
      author: args.author,
      category: args.category,
      timestamp: Date.now(),
      resolved: false,
    });
  },
});

export const addComment = mutation({
  args: {
    annotationId: v.id("annotations"),
    content: v.string(),
    author: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("comments", {
      annotationId: args.annotationId,
      content: args.content,
      author: args.author,
      timestamp: Date.now(),
    });
  },
});

export const toggleResolved = mutation({
  args: {
    annotationId: v.id("annotations"),
    authorId: v.string(),
  },
  handler: async (ctx, args) => {
    const annotation = await ctx.db.get(args.annotationId);
    if (!annotation) {
      throw new Error("Annotation not found");
    }

    if (annotation.authorId !== args.authorId) {
      throw new Error("Only the annotation creator can resolve it");
    }

    await ctx.db.patch(args.annotationId, {
      resolved: !annotation.resolved,
    });
  },
});

export const deleteAnnotation = mutation({
  args: {
    annotationId: v.id("annotations"),
    authorId: v.string(),
  },
  handler: async (ctx, args) => {
    const annotation = await ctx.db.get(args.annotationId);
    if (!annotation) {
      throw new Error("Annotation not found");
    }

    if (annotation.authorId !== args.authorId) {
      throw new Error("Only the annotation creator can delete it");
    }

    const comments = await ctx.db
      .query("comments")
      .withIndex("by_annotation", (q) =>
        q.eq("annotationId", args.annotationId),
      )
      .collect();

    for (const comment of comments) {
      await ctx.db.delete(comment._id);
    }

    // Delete the annotation
    await ctx.db.delete(args.annotationId);
  },
});
