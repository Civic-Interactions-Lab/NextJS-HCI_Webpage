import { defineQuery } from "groq";
import { sanityFetch } from "@/sanity/lib/live";

export async function getCurrentMembers() {
  const query = defineQuery(`
    *[_type == "people" && status == "active"] | order(name asc)
  `);

  const people = await sanityFetch({ query });
  return people.data;
}

export async function getAlumni() {
  const query = defineQuery(`
    *[_type == "people" && status == "alumni"] | order(end desc, name asc)
  `);

  const people = await sanityFetch({ query });
  return people.data;
}

export async function getCollaborators() {
  const query = defineQuery(`
    *[_type == "people" && status == "collaborator"] | order(name asc)
  `);

  const people = await sanityFetch({ query });
  return people.data;
}
