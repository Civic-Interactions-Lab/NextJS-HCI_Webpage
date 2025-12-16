import { defineQuery } from "groq";
import { sanityFetch } from "@/sanity/lib/live";

export async function getConferences() {
  const conferencesQuery = defineQuery(`
    *[_type == "conference"]
  `);

  const conferences = await sanityFetch({ query: conferencesQuery });
  return conferences.data;
}
