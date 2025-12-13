import React from "react";
import CommunityResearchApproach from "@/modules/about/ui/components/CommunityResearchApproach";
import StudioTime from "@/modules/about/ui/components/StudioTime";
import TestimonialList from "@/modules/about/ui/components/TestimonialList";
import LearningOutcomes from "@/modules/about/ui/components/LearningOutcomes";
import LabValues from "@/modules/about/ui/components/LabValues";
import {
  getAboutLabValuesImages,
  getAboutStudioTimeImage,
} from "@/sanity/lib/imageSettings/aboutImages";

const AboutView = async () => {
  const studioTimeImage = await getAboutStudioTimeImage();
  const labValuesImages = await getAboutLabValuesImages();

  return (
    <>
      <CommunityResearchApproach />

      <StudioTime studioTimeImage={studioTimeImage} />

      <TestimonialList />

      <LearningOutcomes />

      <LabValues images={labValuesImages} />
    </>
  );
};

export default AboutView;
