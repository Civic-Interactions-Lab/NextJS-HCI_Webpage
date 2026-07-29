import { type SchemaTypeDefinition } from "sanity";
import { peopleType } from "@/sanity/schemaTypes/people";
import { newsType } from "@/sanity/schemaTypes/news";
import { faqType } from "@/sanity/schemaTypes/faqType";
import { testimonials } from "@/sanity/schemaTypes/testimonials";
import { researchType } from "@/sanity/schemaTypes/research";
import { sponsorType } from "@/sanity/schemaTypes/sponsors";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    peopleType,
    newsType,
    researchType,
    faqType,
    testimonials,
    sponsorType,
  ],
};
