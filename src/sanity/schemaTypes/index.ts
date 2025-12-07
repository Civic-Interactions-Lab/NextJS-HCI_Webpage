import { type SchemaTypeDefinition } from "sanity";
import { peopleType } from "@/sanity/schemaTypes/people";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [peopleType],
};
