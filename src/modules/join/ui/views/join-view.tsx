import React from "react";
import Hero from "@/components/Hero";

const JoinView = () => {
  return (
    <>
      <Hero
        image="/images/cover/IMG_3673.jpg"
        title="Join Us"
        height="small"
        pathname="/join"
      />

      <div className="container mx-auto px-4 py-8">
        <p>Join page content goes here</p>
      </div>
    </>
  );
};
export default JoinView;
