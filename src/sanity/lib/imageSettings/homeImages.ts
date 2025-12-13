import { defineQuery } from "groq";
import { sanityFetch } from "@/sanity/lib/live";

export async function getHomeHeroImage() {
  const homeHeroQuery = defineQuery(`
    *[_type == "imageSettings" && sectionKey == "home-hero"][0].singleImage
  `);

  const image = await sanityFetch({ query: homeHeroQuery });
  return image.data;
}

export async function getHomeWhyHCIImages() {
  const homeWhyHCIQuery = defineQuery(`
    *[_type == "imageSettings" && sectionKey == "home-why-hci"][0].imageArray
  `);

  const images = await sanityFetch({ query: homeWhyHCIQuery });
  return images.data;
}

export async function getHomeFeaturedProjectsImage() {
  const homeFeaturedProjectsQuery = defineQuery(`
    *[_type == "imageSettings" && sectionKey == "home-featured-projects"][0].singleImage
  `);

  const image = await sanityFetch({ query: homeFeaturedProjectsQuery });
  return image.data;
}

export async function getHomeHubCommunityImage() {
  const homeHubCommunityQuery = defineQuery(`
    *[_type == "imageSettings" && sectionKey == "home-hub-community"][0].singleImage
  `);

  const image = await sanityFetch({ query: homeHubCommunityQuery });
  return image.data;
}
