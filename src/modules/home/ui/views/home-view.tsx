"use client";

import React, { Suspense, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Hero from "@/components/Hero";
import HCITagsHero from "@/modules/home/ui/components/HCITagsHero";
import WhyHCILabSection from "@/modules/home/ui/components/WhyHCILabSection";
import FeatureProjects from "@/modules/home/ui/components/FeatureProjects";
import HubCommunitySection from "@/modules/home/ui/components/HubCommunitySection";
import RecentNewsSection from "@/modules/home/ui/components/RecentNewsSection";
import CallToActionSection from "@/components/CallToActionSection";
import { Loader } from "lucide-react";
import FeedbackToggle from "@/modules/annotation/ui/components/FeedbackToggle";
import FeedbackOverlay from "@/modules/annotation/ui/views/FeedbackOverlay";

interface HomeViewProps {
  heroImage: any;
  recentNews: any;
  featuredResearch: any;
  whyHCILabImages: any;
  featuredProjectsImage: any;
  hubCommunityImage: any;
}

const HomeView: React.FC<HomeViewProps> = ({
  heroImage,
  recentNews,
  featuredResearch,
  whyHCILabImages,
  featuredProjectsImage,
  hubCommunityImage,
}) => {
  const [isFeedbackEnabled, setIsFeedbackEnabled] = useState(false);
  const pathname = usePathname();

  const toggleFeedback = () => {
    setIsFeedbackEnabled(!isFeedbackEnabled);
  };

  // Disable feedback mode when pressing Escape or navigating away
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFeedbackEnabled) {
        setIsFeedbackEnabled(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isFeedbackEnabled]);

  // Reset feedback mode on route change
  useEffect(() => {
    setIsFeedbackEnabled(false);
  }, [pathname]);

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Hero
          image={heroImage?.asset}
          alt={heroImage?.alt}
          title="Temple HCI Lab"
          height="large"
          subtitle="Our research lab takes a human-centered approach to using AI, NLP, and Visualization to facilitate learning and empower non-experts to participate in work that has been previously reserved for trained professionals."
          showCTA={true}
        />

        <main className="bg-white max-w-7xl mx-auto w-full overflow-hidden mt-8 pb-12 px-6 md:px-12 space-y-6">
          <HCITagsHero />

          <WhyHCILabSection images={whyHCILabImages} />

          <FeatureProjects
            featuredProjectsImage={featuredProjectsImage}
            research={featuredResearch}
          />

          <HubCommunitySection hubCommunityImage={hubCommunityImage} />

          <RecentNewsSection recentNews={recentNews} />
        </main>

        <CallToActionSection />

        <div className="h-10" />
      </Suspense>

      {/* Feedback System */}
      <FeedbackToggle isEnabled={isFeedbackEnabled} onToggle={toggleFeedback} />

      <FeedbackOverlay
        pageUrl={pathname}
        isEnabled={isFeedbackEnabled}
        onToggle={toggleFeedback}
      />
    </>
  );
};

export default HomeView;
