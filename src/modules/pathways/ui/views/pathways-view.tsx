"use client";

import CourseList from "@/modules/pathways/ui/components/course-list";
import HackathonSection from "@/modules/pathways/ui/components/hackathon-section";
import AiMajorSection from "@/modules/pathways/ui/components/ai-major-section";
import JobOutcomes from "@/modules/pathways/ui/components/job-outcomes";
import OtherOpportunities from "@/modules/pathways/ui/components/other-opportunities";
import ViewIntroHeader from "@/components/view-intro-header";

export default function PathwaysView() {
  return (
    <>
      <ViewIntroHeader
        label="Temple HCI Lab"
        titlePrefix="Explore Human-Centered"
        titleAccent="Technology."
        body="The Temple HCI Lab helps students explore careers in technology, design, research, and AI. Whether you are curious about user experience design, data visualization, artificial intelligence, or academic research, there are multiple ways to get involved."
        imageSrc="/images/cover/studio-2.jpeg"
        imageAlt="HCI Lab studio"
      />

      <CourseList />
      <HackathonSection />
      <AiMajorSection />
      <JobOutcomes />
      <OtherOpportunities />
    </>
  );
}
