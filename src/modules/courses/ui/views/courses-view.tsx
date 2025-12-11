import React from "react";
import HighlightStatement from "@/components/HighlightStatement";
import CourseList from "@/modules/courses/ui/components/CourseList";
import JobOutcomes from "@/modules/courses/ui/components/JobOutcomes";
import OtherOpportunities from "@/modules/courses/ui/components/OtherOpportunities";

const CoursesView = () => {
  return (
    <>
      <main className="w-full max-w-7xl mx-auto px-6 md:px-12 space-y-8 mb-16">
        <HighlightStatement
          mainText="THE HCI LAB OPENS PATHWAYS"
          subText="for students to explore careers in technology, design, and research. Through hands-on projects, mentorship, and industry connections, students gain the skills and experiences to turn curiosity into impact."
          borderPosition="right"
        />

        <CourseList />

        <JobOutcomes />

        <HighlightStatement
          mainText="OUR LAB STRIVES TO ADVANCE"
          subText="the tech, design, and research communities here in Philadelphia. While we support many students directly, we're often at or nearing capacity for mentorship."
          borderPosition="left"
        />

        <OtherOpportunities />
      </main>
    </>
  );
};
export default CoursesView;
