import React from "react";
import CommunityResearch from "@/modules/about/ui/components/CommunityResearch";
import StudioTime from "@/modules/about/ui/components/StudioTime";
import TestimonialList from "@/modules/about/ui/components/TestimonialList";
import LearningOutcomes from "@/modules/about/ui/components/LearningOutcomes";
import LabValues from "@/modules/about/ui/components/LabValues";
import {
  getAboutLabValuesImages,
  getAboutLeadershipImage,
  getAboutStudioTimeImage,
} from "@/sanity/lib/imageSettings/aboutImages";
import HighlightStatement from "@/components/HighlightStatement";
import Leadership from "@/modules/about/ui/components/Leadership";

const AboutView = async () => {
  const studioTimeImage = await getAboutStudioTimeImage();
  const labValuesImages = await getAboutLabValuesImages();
  const leadershipImage = await getAboutLeadershipImage();

  return (
    <div className="space-y-16">
      <HighlightStatement
        mainText="THE Temple HCI Lab"
        subText="is the largest undergraduate research lab at Temple University. Located in the College of Science and Technology (CST) within the Department of Computer and Information Sciences, the lab brings together students from computer science, psychology, education, and design to study technology, learning, and human-centered computing."
        borderPosition="left"
      />

      <CommunityResearch />

      <StudioTime studioTimeImage={studioTimeImage} />

      <Leadership leadershipImage={leadershipImage} />

      <TestimonialList />

      <LearningOutcomes />

      <LabValues images={labValuesImages} />
    </div>
  );
};

export default AboutView;
