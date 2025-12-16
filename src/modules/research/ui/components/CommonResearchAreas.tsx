import React from "react";
import { Accordion } from "@/components/ui/accordion";
import {
  getGenAIEducationResearch,
  getAccessibilityTechnologyResearch,
  getSocialComputingResearch,
} from "@/sanity/lib/research/getResearch";
import {
  AccessibilityTechnologyAccordion,
  GenAIEducationAccordion,
  SocialComputingAccordion,
} from "@/modules/research/ui/components/ResearchAccordionItem";

const CommonResearchAreas = async () => {
  const [genAIResearch, accessibilityResearch, socialComputingResearch] =
    await Promise.all([
      getGenAIEducationResearch(),
      getAccessibilityTechnologyResearch(),
      getSocialComputingResearch(),
    ]);

  return (
    <>
      <h1 className="font-semibold text-gray-900 text-2xl! md:text-3xl! xl:text-4xl! mb-8 font-outfit">
        Explore common research areas in our lab
      </h1>

      <div className="px-0 md:px-6 mb-16">
        <Accordion
          type="single"
          collapsible
          className="space-y-6"
          defaultValue="research-1"
        >
          <GenAIEducationAccordion research={genAIResearch} index={0} />
          <AccessibilityTechnologyAccordion
            research={accessibilityResearch}
            index={1}
          />
          <SocialComputingAccordion
            research={socialComputingResearch}
            index={2}
          />
        </Accordion>
      </div>
    </>
  );
};

export default CommonResearchAreas;
