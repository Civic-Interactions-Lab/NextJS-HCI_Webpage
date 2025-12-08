import { defineQuery } from "groq";
import { sanityFetch } from "@/sanity/lib/live";

export async function getProjects() {
  const projectQuery = defineQuery(`
    *[_type == "project"] | order(date desc)[0...2] {
      ...,
      authors[] {
        authorType,
        authorType == "person" => {
          "name": person->name
        },
        authorType == "name" => {
          name
        }
      }
    }
  `);

  const projects = await sanityFetch({ query: projectQuery });
  return projects.data;
}

export async function getProjectsOrdered() {
  const projectOrderedQuery = defineQuery(`
    *[_type == "project"] | order(orderRank)[0...2] {
      ...,
      authors[] {
        authorType,
        authorType == "person" => {
          "name": person->name
        },
        authorType == "name" => {
          name
        }
      }
    }
  `);

  const projects = await sanityFetch({ query: projectOrderedQuery });
  return projects.data;
}
