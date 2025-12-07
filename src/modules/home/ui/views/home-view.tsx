import React from "react";
import Hero from "@/components/Hero";

const HomeView = () => {
  return (
    <>
      <Hero
        image="/images/cover/6-studio.JPG"
        title="Temple HCI Lab"
        height="large"
        subtitle="Our research lab takes a human-centered approach to using AI, NLP, and Visualization to facilitate learning and empower non-experts to participate in work that has been previously reserved for trained professionals."
        showCTA={true}
        pathname="/"
      />

      <div className="container mx-auto px-4 py-8">
        <h2>Welcome to HCI Lab</h2>
        <p>Home page content goes here</p>
      </div>
    </>
  );
};

export default HomeView;
