import React from "react";
import { getFAQs } from "@/sanity/lib/faq/getFAQs";
import { Faq } from "../../../../../sanity.types";
import { Accordion } from "@/components/ui/accordion";
import AnimatedAccordionItem from "@/components/AnimatedAccordionItem";
import CallToActionSection from "@/components/call-to-action-section";

const JoinView = async () => {
  const faqs = await getFAQs();

  const defaultOpenFaq = faqs?.find((faq: Faq) => faq.defaultOpen);
  const defaultValue = defaultOpenFaq ? defaultOpenFaq.question : undefined;

  return (
    <>
      <main className="w-full max-w-7xl mx-auto px-6 md:px-12 space-y-6 mb-16">
        <h1 className="font-bold text-gray-900 !text-2xl md:!text-3xl xl:!text-4xl mb-8 font-outfit">
          Any questions before joining?
        </h1>

        <div className="">
          <Accordion
            type="single"
            collapsible
            className="space-y-6"
            defaultValue={defaultValue}
          >
            {faqs?.map((faq, index) => (
              <AnimatedAccordionItem
                key={faq._id}
                topic={faq.question}
                content={faq.answer}
                index={index}
              />
            ))}
          </Accordion>
        </div>
      </main>

      <CallToActionSection />

      <div className="h-10" />
    </>
  );
};

export default JoinView;
