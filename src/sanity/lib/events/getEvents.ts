import { defineQuery } from "groq";
import { sanityFetch } from "@/sanity/lib/live";

export async function getUpcomingEvents() {
  const upcomingEventsQuery = defineQuery(`
    *[_type == "event" && date >= now()] | order(date asc)
  `);

  const events = await sanityFetch({ query: upcomingEventsQuery });
  return events.data;
}

export async function getPastEvents() {
  const pastEventsQuery = defineQuery(`
    *[_type == "event" && date < now()] | order(date desc)
  `);

  const events = await sanityFetch({ query: pastEventsQuery });
  return events.data;
}
