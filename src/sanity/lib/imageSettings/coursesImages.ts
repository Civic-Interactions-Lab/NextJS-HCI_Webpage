import { defineQuery } from "groq";
import { sanityFetch } from "@/sanity/lib/live";

export async function getCoursesHeroImage() {
  const coursesHeroQuery = defineQuery(`
    *[_type == "imageSettings" && sectionKey == "courses-hero"][0].singleImage
  `);

  const image = await sanityFetch({ query: coursesHeroQuery });
  return image.data;
}
