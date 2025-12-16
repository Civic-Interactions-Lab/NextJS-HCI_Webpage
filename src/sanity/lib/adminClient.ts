import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "a3jazrf8",
  dataset: "hci-production",
  apiVersion: "2025-12-16",
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_API_ADMIN_TOKEN,
});
