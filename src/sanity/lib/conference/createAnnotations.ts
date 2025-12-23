import { client } from "@/sanity/lib/adminClient";

export async function createAnnotation(annotationData: {
  path: string;
  position: {
    x: number;
    y: number;
    viewportX: number;
    viewportY: number;
    scrollX: number;
    scrollY: number;
    elementSelector?: string;
    elementOffsetX?: number;
    elementOffsetY?: number;
    viewportWidth: number;
    viewportHeight: number;
  };
  content: string;
  author: string;
  timestamp: string;
  comments: { content: string; author: string; timestamp: string }[];
  resolved: boolean;
}) {
  try {
    return await client.create({
      _type: "annotation",
      ...annotationData,
    });
  } catch (error) {
    console.error("Error creating annotation:", error);
    throw new Error("Failed to create annotation");
  }
}

export async function addCommentToAnnotation(
  annotationId: string,
  comment: {
    content: string;
    author: string;
    timestamp: string;
  },
) {
  try {
    const commentData = {
      content: comment.content,
      author: comment.author,
      timestamp: comment.timestamp,
    };
    return await client
      .patch(annotationId)
      .setIfMissing({ comments: [] })
      .append("comments", [commentData])
      .commit();
  } catch (error) {
    console.error("Error adding comment to annotation:", error);
    throw new Error("Failed to add comment");
  }
}
