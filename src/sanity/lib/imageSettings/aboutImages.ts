import { defineQuery } from "groq";
import { sanityFetch } from "@/sanity/lib/live";

export async function getAboutHeroImage() {
  const aboutHeroQuery = defineQuery(`
    *[_type == "imageSettings" && sectionKey == "about-hero"][0].singleImage
  `);

  const image = await sanityFetch({ query: aboutHeroQuery });
  return image.data;
}

export async function getAboutStudioTimeImage() {
  const aboutStudioTimeQuery = defineQuery(`
    *[_type == "imageSettings" && sectionKey == "about-studio-time"][0].singleImage
  `);

  const image = await sanityFetch({ query: aboutStudioTimeQuery });
  return image.data;
}

export async function getAboutLabValuesImages() {
  const aboutLabValuesQuery = defineQuery(`
    *[_type == "imageSettings" && sectionKey == "about-lab-values"][0].imageArray
  `);

  const images = await sanityFetch({ query: aboutLabValuesQuery });
  return images.data;
}

export async function getAboutEventOwlHacksImages() {
  const aboutEventOwlHacksQuery = defineQuery(`
    *[_type == "imageSettings" && sectionKey == "events-owl-hacks"][0].imageArray
  `);

  const images = await sanityFetch({ query: aboutEventOwlHacksQuery });
  return images.data;
}
