"use client";

import CourseList from "@/modules/pathways/ui/components/course-list";
import JobOutcomes from "@/modules/pathways/ui/components/job-outcomes";
import OtherOpportunities from "@/modules/pathways/ui/components/other-opportunities";
import ViewIntroHeader from "@/components/view-intro-header";

const PathwaysView = () => (
  <div className="space-y-20">
    <ViewIntroHeader
      label="Temple HCI Lab"
      titlePrefix="Explore Human-Centered"
      titleAccent="Technology."
      body="The Temple HCI Lab helps students explore careers in technology, design, research, and AI. Whether you are curious about user experience design, data visualization, artificial intelligence, or academic research, there are multiple ways to get involved."
      imageSrc="/images/cover/HCI_OpenHouse-5.jpg"
      imageAlt="HCI Lab studio"
    />

    <CourseList />
    <JobOutcomes />
    <OtherOpportunities />
  </div>
);

export default PathwaysView;
