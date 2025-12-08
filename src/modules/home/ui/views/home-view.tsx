import React from "react";
import Hero from "@/components/Hero";
import HCITagsHero from "@/modules/home/ui/components/HCITagsHero";
import WhyHCILabSection from "@/modules/home/ui/components/WhyHCILabSection";
import FeatureProjects from "@/modules/home/ui/components/FeatureProjects";
import HubCommunitySection from "@/modules/home/ui/components/HubCommunitySection";
import RecentNewsSection from "@/modules/home/ui/components/RecentNewsSection";

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

      <div className="bg-white max-w-7xl mx-auto w-full overflow-hidden mt-6 pb-12 px-6 md:px-12 space-y-6">
        <HCITagsHero />

        <WhyHCILabSection />

        <FeatureProjects />

        <HubCommunitySection />

        <RecentNewsSection />
      </div>
    </>
  );
};

export default HomeView;
