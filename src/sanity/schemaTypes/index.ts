import { type SchemaTypeDefinition } from "sanity";
import { peopleType } from "@/sanity/schemaTypes/people";
import { newsType } from "@/sanity/schemaTypes/news";
import { faqType } from "@/sanity/schemaTypes/faqType";
import { testimonialsType } from "@/sanity/schemaTypes/testimonialsType";
import { imageSettingsType } from "@/sanity/schemaTypes/imageSettings";
import { conferenceType } from "@/sanity/schemaTypes/conferenceType";
import { researchType } from "@/sanity/schemaTypes/research";
import { sponsorType } from "@/sanity/schemaTypes/sponsors";
import { annotationType } from "@/sanity/schemaTypes/annotations";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    peopleType,
    newsType,
    researchType,
    faqType,
    testimonialsType,
    imageSettingsType,
    conferenceType,
    sponsorType,
    annotationType,
  ],
};
