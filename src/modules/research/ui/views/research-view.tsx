import React from "react";
import Hero from "@/components/Hero";

const ResearchView = () => {
  return (
    <>
      <Hero
        image="/images/cover/442_72A2112.jpg"
        title="Research"
        height="small"
        pathname="/research"
      />

      <div className="container mx-auto px-4 py-8">
        <p>Research page content goes here</p>
      </div>
    </>
  );
};
export default ResearchView;
