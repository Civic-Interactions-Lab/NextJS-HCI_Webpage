import React from "react";
import CommunityResearchApproach from "@/modules/about/ui/components/CommunityResearchApproach";
import StudioTime from "@/modules/about/ui/components/StudioTime";
import TestimonialList from "@/modules/about/ui/components/TestimonialList";
import LearningOutcomes from "@/modules/about/ui/components/LearningOutcomes";
import LabValues from "@/modules/about/ui/components/LabValues";

const AboutView = () => {
  return (
    <>
      <CommunityResearchApproach />

      <StudioTime />

      <TestimonialList />

      <LearningOutcomes />

      <LabValues />
    </>
  );
};

export default AboutView;
