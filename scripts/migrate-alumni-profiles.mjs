// One-time migration: copy the old `people.now` free-text field (for alumni)
// into new, linked `alumniProfile` documents, before that field is fully
// retired from the dataset.
//
// Usage:
//   1. Create a Sanity API token with write access at
//      https://sanity.io/manage -> your project -> API -> Tokens.
//   2. Run:
//      SANITY_API_WRITE_TOKEN=<token> node --env-file=.env.local scripts/migrate-alumni-profiles.mjs
//
// Safe to re-run: it skips any person that already has a linked
// alumniProfile document, so running it twice will not create duplicates.
// Add --dry-run to only print what would be created, without writing anything.

import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;
const dryRun = process.argv.includes("--dry-run");

if (!projectId || !dataset) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET. Run with --env-file=.env.local.",
  );
  process.exit(1);
}
if (!token && !dryRun) {
  console.error(
    "Missing SANITY_API_WRITE_TOKEN. Create a write-capable token in sanity.io/manage, or pass --dry-run to preview only.",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-12-07",
  token,
  useCdn: false,
});

async function run() {
  // Note: `now` was removed from the `people` schema definition, but the
  // raw field may still be present on existing documents in the dataset
  // until they're re-saved, so this raw GROQ query can still read it.
  const alumniWithNow = await client.fetch(
    `*[_type == "people" && association == "alumni" && defined(now)]{ _id, name, now }`,
  );

  console.log(`Found ${alumniWithNow.length} alumni with an existing "now" value.`);

  const existingProfiles = await client.fetch(
    `*[_type == "alumniProfile"]{ "personId": person._ref }`,
  );
  const alreadyMigrated = new Set(existingProfiles.map((p) => p.personId));

  let created = 0;
  let skipped = 0;

  for (const person of alumniWithNow) {
    if (alreadyMigrated.has(person._id)) {
      skipped++;
      continue;
    }

    console.log(
      `${dryRun ? "[dry-run] Would create" : "Creating"} alumniProfile for "${person.name}" (${person._id}): now="${person.now}"`,
    );

    if (!dryRun) {
      await client.create({
        _type: "alumniProfile",
        person: { _type: "reference", _ref: person._id },
        now: person.now,
        // nowType intentionally left blank — fill in by hand (Working/
        // Studying/Other), since it can't be reliably inferred from
        // freeform text.
      });
    }
    created++;
  }

  console.log(
    `Done. ${created} profile(s) ${dryRun ? "would be" : ""} created, ${skipped} already had a profile and were skipped.`,
  );
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
