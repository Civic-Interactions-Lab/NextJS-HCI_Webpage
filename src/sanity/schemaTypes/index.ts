import { type SchemaTypeDefinition } from "sanity";
import { peopleType } from "@/sanity/schemaTypes/people";
import { newsType } from "@/sanity/schemaTypes/news";
import { projectType } from "@/sanity/schemaTypes/projects";
import { faqType } from "@/sanity/schemaTypes/faqType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [peopleType, newsType, projectType, faqType],
};
