import React, { Suspense } from "react";
import RecentPapers from "@/modules/home/ui/components/RecentPapers";
import HubCommunitySection from "@/modules/home/ui/components/HubCommunitySection";
import RecentNewsSection from "@/modules/home/ui/components/RecentNewsSection";
import { getRecentNews } from "@/sanity/lib/news/getNews";
import { getFeaturedResearch } from "@/sanity/lib/research/getResearch";
import {
  getHomeFeaturedProjectsImage,
  getHomeHubCommunityImage,
} from "@/sanity/lib/imageSettings/homeImages";
import Loading from "@/components/Loading";
import QuickIntroduction from "@/modules/home/ui/components/QuickIntroduction";

const HomeView = async () => {
  const recentNews = await getRecentNews();
  const featuredResearch = await getFeaturedResearch();

  const featuredProjectsImage = await getHomeFeaturedProjectsImage();
  const hubCommunityImage = await getHomeHubCommunityImage();

  return (
    <>
      <Suspense fallback={<Loading />}>
        <main className="bg-white overflow-hidden space-y-20">
          <QuickIntroduction />

          <RecentPapers
            featuredProjectsImage={featuredProjectsImage}
            research={featuredResearch}
          />

          <HubCommunitySection hubCommunityImage={hubCommunityImage} />

          <RecentNewsSection recentNews={recentNews} />
        </main>
      </Suspense>
    </>
  );
};

export default HomeView;
