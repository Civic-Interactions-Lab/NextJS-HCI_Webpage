import React from "react";
import Hero from "@/components/Hero";

const CoursesView = () => {
  return (
    <>
      <Hero
        image="/images/cover/HCI_OpenHouse-5.jpg"
        title="Pathways"
        height="small"
        pathname="/courses"
      />

      <div className="container mx-auto px-4 py-8">
        <p>Courses page content goes here</p>
      </div>
    </>
  );
};
export default CoursesView;
