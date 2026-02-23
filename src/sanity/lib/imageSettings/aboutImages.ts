import { defineQuery } from "groq";
import { sanityFetch } from "@/sanity/lib/live";

// Hero Image Section
export async function getAboutHeroImage() {
  const aboutHeroQuery = defineQuery(`
    *[_type == "imageSettings" && sectionKey == "about-hero"][0].singleImage
  `);

  const image = await sanityFetch({ query: aboutHeroQuery });
  return image.data;
}

// Main About Content
export async function getAboutStudioTimeImage() {
  const aboutStudioTimeQuery = defineQuery(`
    *[_type == "imageSettings" && sectionKey == "about-studio-time"][0].singleImage
  `);

  const image = await sanityFetch({ query: aboutStudioTimeQuery });
  return image.data;
}

export async function getAboutLeadershipImage() {
  const aboutLeadershipQuery = defineQuery(`
    *[_type == "imageSettings" && sectionKey == "about-leadership"][0].singleImage
  `);

  const image = await sanityFetch({ query: aboutLeadershipQuery });
  return image.data;
}

export async function getAboutLabValuesImages() {
  const aboutLabValuesQuery = defineQuery(`
    *[_type == "imageSettings" && sectionKey == "about-lab-values"][0].imageArray
  `);

  const images = await sanityFetch({ query: aboutLabValuesQuery });
  return images.data;
}

// Events Content
export async function getAboutEventOwlHacksImages() {
  const aboutEventOwlHacksQuery = defineQuery(`
    *[_type == "imageSettings" && sectionKey == "events-owl-hacks"][0].imageArray
  `);

  const images = await sanityFetch({ query: aboutEventOwlHacksQuery });
  return images.data;
}

export async function getAboutEventOpenHouseImages() {
  const aboutEventOpenHouseQuery = defineQuery(`
    *[_type == "imageSettings" && sectionKey == "events-open-house"][0].imageArray
  `);

  const images = await sanityFetch({ query: aboutEventOpenHouseQuery });
  return images.data;
}

export async function getAboutEventSocialImages() {
  const aboutEventSocialQuery = defineQuery(`
    *[_type == "imageSettings" && sectionKey == "events-social"][0].imageArray
  `);

  const images = await sanityFetch({ query: aboutEventSocialQuery });
  return images.data;
}

export async function getAboutConferenceTravelImage() {
  const aboutConferenceTravelQuery = defineQuery(`
    *[_type == "imageSettings" && sectionKey == "events-conference"][0].singleImage
  `);

  const image = await sanityFetch({ query: aboutConferenceTravelQuery });
  return image.data;
}

// Contact Us Content
export async function getAboutSercImage() {
  const aboutSercQuery = defineQuery(`
    *[_type == "imageSettings" && sectionKey == "contact-serc"][0].singleImage
  `);

  const image = await sanityFetch({ query: aboutSercQuery });
  return image.data;
}
