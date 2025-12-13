import { defineQuery } from "groq";
import { sanityFetch } from "@/sanity/lib/live";

export async function getPeopleHeroImage() {
  const peopleHeroQuery = defineQuery(`
    *[_type == "imageSettings" && sectionKey == "people-hero"][0].singleImage
  `);

  const image = await sanityFetch({ query: peopleHeroQuery });
  return image.data;
}
