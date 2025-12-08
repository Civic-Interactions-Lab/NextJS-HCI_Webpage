import { defineQuery } from "groq";
import { sanityFetch } from "@/sanity/lib/live";

export async function getProjects() {
  const query = defineQuery(`
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

  const projects = await sanityFetch({ query });
  return projects.data;
}

export async function getProjectsOrdered() {
  const query = defineQuery(`
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

  const projects = await sanityFetch({ query });
  return projects.data;
}
