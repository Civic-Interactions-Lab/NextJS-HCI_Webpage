import { defineQuery } from "groq";
import { sanityFetch } from "@/sanity/lib/live";

export async function getFeaturedResearch() {
  const featuredResearchQuery = defineQuery(`
    *[_type == "research" && featured == true] | order(orderRank)
  `);

  const research = await sanityFetch({ query: featuredResearchQuery });
  return research.data;
}

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

export async function getFutureOfWorkResearch() {
  const futureOfWorkQuery = defineQuery(`
    *[_type == "research" && category == "Future of Work"] | order(orderRank)
  `);

  const research = await sanityFetch({ query: futureOfWorkQuery });
  return research.data;
}
