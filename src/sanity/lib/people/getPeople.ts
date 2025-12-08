import { defineQuery } from "groq";
import { sanityFetch } from "@/sanity/lib/live";

export async function getCurrentMembers() {
  const currentPeopleQuery = defineQuery(`
    *[_type == "people" && status == "active"] | order(name asc)
  `);

  const people = await sanityFetch({ query: currentPeopleQuery });
  return people.data;
}

export async function getAlumni() {
  const alumniPeopleQuery = defineQuery(`
    *[_type == "people" && status == "alumni"] | order(end desc, name asc)
  `);

  const people = await sanityFetch({ query: alumniPeopleQuery });
  return people.data;
}

export async function getCollaborators() {
  const collaboratorsPeopleQuery = defineQuery(`
    *[_type == "people" && status == "collaborator"] | order(name asc)
  `);

  const people = await sanityFetch({ query: collaboratorsPeopleQuery });
  return people.data;
}
