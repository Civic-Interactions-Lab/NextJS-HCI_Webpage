import { defineQuery } from "groq";
import { sanityFetch } from "@/sanity/lib/live";
import { People, AlumniProfile } from "../../../../sanity.types";

export type AlumniPerson = People & {
  profile: Pick<AlumniProfile, "nowType" | "now"> | null;
};

export async function getCurrentMembers() {
  const currentPeopleQuery = defineQuery(`
    *[_type == "people" && association == "active"] | order(orderRank)
  `);

  const people = await sanityFetch({ query: currentPeopleQuery });
  return people.data;
}

export async function getAlumni(): Promise<AlumniPerson[]> {
  const alumniPeopleQuery = defineQuery(`
    *[_type == "people" && association == "alumni"] | order(orderRank) {
      ...,
      "profile": *[_type == "alumniProfile" && references(^._id)][0]{ nowType, now }
    }
  `);

  const people = await sanityFetch({ query: alumniPeopleQuery });
  return people.data as AlumniPerson[];
}

export async function getCollaborators() {
  const collaboratorsPeopleQuery = defineQuery(`
    *[_type == "people" && association == "collaborator"] | order(orderRank)
  `);

  const people = await sanityFetch({ query: collaboratorsPeopleQuery });
  return people.data;
}
