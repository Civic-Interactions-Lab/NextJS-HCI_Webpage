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
      scrollY: number;
    };
  };
  category:
    | "content"
    | "bug"
    | "color"
    | "transition"
    | "layout"
    | "performance"
    | "accessibility"
    | "other";
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
        y: data.position.y + data.position.viewport.scrollY, // Store document-relative position
        viewport: {
          width: data.position.viewport.width,
          height: data.position.viewport.height,
          scrollY: data.position.viewport.scrollY,
        },
      },
      category: data.category,
      comments: [],
      createdAt: new Date().toISOString(),
    };

    return await client.create(annotation);
  } catch (error) {
    console.error("Error creating annotation:", error);
    throw new Error("Failed to create annotation");
  }
}

export async function getAnnotationsForPage(pageUrl: string) {
  try {
    const query = `*[_type == "annotation" && pageUrl == $pageUrl] | order(createdAt desc)`;
    return await client.fetch(query, { pageUrl });
  } catch (error) {
    console.error("Error fetching annotations:", error);
    throw new Error("Failed to fetch annotations");
  }
}

export async function addCommentToAnnotation(
  annotationId: string,
  comment: {
    content: string;
    author: {
      name: string;
      email?: string;
      avatar?: string;
    };
  },
) {
  try {
    const commentData = {
      content: comment.content,
      author: comment.author,
      createdAt: new Date().toISOString(),
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
