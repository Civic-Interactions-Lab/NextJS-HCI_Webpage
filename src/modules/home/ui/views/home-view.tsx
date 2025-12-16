import React, { Suspense } from "react";
import Hero from "@/components/Hero";
import HCITagsHero from "@/modules/home/ui/components/HCITagsHero";
import WhyHCILabSection from "@/modules/home/ui/components/WhyHCILabSection";
import FeatureProjects from "@/modules/home/ui/components/FeatureProjects";
import HubCommunitySection from "@/modules/home/ui/components/HubCommunitySection";
import RecentNewsSection from "@/modules/home/ui/components/RecentNewsSection";
import { getRecentNews } from "@/sanity/lib/news/getNews";
import CallToActionSection from "@/components/CallToActionSection";
import { getFeaturedResearch } from "@/sanity/lib/research/getResearch";
import {
  getHomeFeaturedProjectsImage,
  getHomeHeroImage,
  getHomeHubCommunityImage,
  getHomeWhyHCIImages,
} from "@/sanity/lib/imageSettings/homeImages";
import { Loader } from "lucide-react";

const HomeView = async () => {
  const heroImage = await getHomeHeroImage();
  const recentNews = await getRecentNews();
  const featuredResearch = await getFeaturedResearch();

  const whyHCILabImages = await getHomeWhyHCIImages();
  const featuredProjectsImage = await getHomeFeaturedProjectsImage();
  const hubCommunityImage = await getHomeHubCommunityImage();

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
    </>
  );
};

export default HomeView;
