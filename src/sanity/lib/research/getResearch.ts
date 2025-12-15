import { defineQuery } from "groq";
import { sanityFetch } from "@/sanity/lib/live";

export async function getGenAIEducationResearch() {
  const genAIEducationQuery = defineQuery(`
    *[_type == "research" && category == "Gen AI & Education"] | order(orderRank)
  `);

  const research = await sanityFetch({ query: genAIEducationQuery });
  return research.data;
}

export async function getAccessibilityTechnologyResearch() {
  const accessibilityTechQuery = defineQuery(`
    *[_type == "research" && category == "Accessibility Technology"] | order(orderRank)
  `);

  const research = await sanityFetch({ query: accessibilityTechQuery });
  return research.data;
}

export async function getSocialComputingResearch() {
  const socialComputingQuery = defineQuery(`
    *[_type == "research" && category == "Social Computing"] | order(orderRank)
  `);

  const research = await sanityFetch({ query: socialComputingQuery });
  return research.data;
}
