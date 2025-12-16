import { client } from "@/sanity/lib/adminClient";

interface CreateAnnotationData {
  pageUrl: string;
  content: string;
  author: {
    name: string;
    email?: string;
    avatar?: string;
  };
  position: {
    x: number;
    y: number;
    viewport: {
      width: number;
      height: number;
    };
  };
  priority: "low" | "medium" | "high" | "critical";
  tags: string[];
  status: "open" | "in-progress" | "resolved" | "rejected";
}

export async function createAnnotation(data: CreateAnnotationData) {
  try {
    const annotation = {
      _type: "annotation",
      pageUrl: data.pageUrl,
      content: data.content,
      author: {
        name: data.author.name,
        email: data.author.email || null,
        avatar: data.author.avatar || null,
      },
      position: {
        x: data.position.x,
        y: data.position.y,
        viewport: {
          width: data.position.viewport.width,
          height: data.position.viewport.height,
        },
      },
      status: data.status,
      priority: data.priority,
      tags: data.tags,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return await client.create(annotation);
  } catch (error) {
    console.error("Error creating annotation:", error);
    throw new Error("Failed to create annotation");
  }
}

export async function getAnnotationsForPage(pageUrl: string) {
  try {
    const query = `*[_type == "annotation" && pageUrl == $pageUrl] | order(_createdAt desc)`;
    return await client.fetch(query, { pageUrl });
  } catch (error) {
    console.error("Error fetching annotations:", error);
    throw new Error("Failed to fetch annotations");
  }
}

export async function updateAnnotationStatus(
  annotationId: string,
  status: "open" | "in-progress" | "resolved" | "rejected",
) {
  try {
    const result = await client
      .patch(annotationId)
      .set({
        status,
        updatedAt: new Date().toISOString(),
      })
      .commit();
    return result;
  } catch (error) {
    console.error("Error updating annotation status:", error);
    throw new Error("Failed to update annotation status");
  }
}

export async function addReplyToAnnotation(
  annotationId: string,
  reply: {
    content: string;
    author: {
      name: string;
      email?: string;
      avatar?: string;
    };
  },
) {
  try {
    const replyData = {
      content: reply.content,
      author: reply.author,
      createdAt: new Date().toISOString(),
    };

    return await client
      .patch(annotationId)
      .setIfMissing({ replies: [] })
      .append("replies", [replyData])
      .set({ updatedAt: new Date().toISOString() })
      .commit();
  } catch (error) {
    console.error("Error adding reply to annotation:", error);
    throw new Error("Failed to add reply");
  }
}
