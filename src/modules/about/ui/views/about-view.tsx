import React from "react";
import CommunityResearchApproach from "@/modules/about/ui/components/CommunityResearchApproach";
import StudioTime from "@/modules/about/ui/components/StudioTime";
import TestimonyList from "@/modules/about/ui/components/TestimonyList";
import LearningOutcomes from "@/modules/about/ui/components/LearningOutcomes";
import LabValues from "@/modules/about/ui/components/LabValues";

const AboutView = () => {
  return (
    <>
      <CommunityResearchApproach />

      <StudioTime />

      <TestimonyList />

      <LearningOutcomes />

      <LabValues />
    </>
  );
};

export default AboutView;
