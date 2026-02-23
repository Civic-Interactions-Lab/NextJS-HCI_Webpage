import React, { Suspense } from "react";
import Hero from "@/components/Hero";
import WhyHCILabSection from "@/modules/home/ui/components/WhyHCILabSection";
import RecentPapers from "@/modules/home/ui/components/RecentPapers";
import HubCommunitySection from "@/modules/home/ui/components/HubCommunitySection";
import RecentNewsSection from "@/modules/home/ui/components/RecentNewsSection";
import { getRecentNews } from "@/sanity/lib/news/getNews";
import CallToActionSection from "@/components/CallToActionSection";
import { getFeaturedResearch } from "@/sanity/lib/research/getResearch";
import {
  getHomeFeaturedProjectsImage,
  getHomeHeroImage,
  getHomeHubCommunityImage,
} from "@/sanity/lib/imageSettings/homeImages";
import Loading from "@/components/Loading";
import QuickIntroduction from "@/modules/home/ui/components/QuickIntroduction";

const HomeView = async () => {
  const heroImage = await getHomeHeroImage();
  const recentNews = await getRecentNews();
  const featuredResearch = await getFeaturedResearch();

  const featuredProjectsImage = await getHomeFeaturedProjectsImage();
  const hubCommunityImage = await getHomeHubCommunityImage();

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Hero
          image={heroImage?.asset}
          alt={heroImage?.alt}
          title="Temple HCI Lab"
          height="large"
          subtitle="Our research lab takes a human-centered approach to using AI, NLP, and Visualization to facilitate learning and empower non-experts to participate in work that has been previously reserved for trained professionals."
          showCTA={true}
        />

        <main className="bg-white max-w-7xl mx-auto w-full overflow-hidden mt-12 pb-20 px-6 md:px-12 space-y-20">
          <QuickIntroduction />

          <RecentPapers
            featuredProjectsImage={featuredProjectsImage}
            research={featuredResearch}
          />

          <HubCommunitySection hubCommunityImage={hubCommunityImage} />

          <RecentNewsSection recentNews={recentNews} />
        </main>

        <CallToActionSection />

        <div className="h-16" />
      </Suspense>
    </>
  );
};

export default HomeView;
