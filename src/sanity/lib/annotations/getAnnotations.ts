import { client } from "@/sanity/lib/adminClient";

export async function getAnnotationsForPage(path: string) {
  try {
    const query = `*[_type == "annotation" && path == $path] | order(timestamp desc)`;
    return await client.fetch(query, { path });
  } catch (error) {
    console.error("Error fetching annotations:", error);
    throw new Error("Failed to fetch annotations");
  }
}
