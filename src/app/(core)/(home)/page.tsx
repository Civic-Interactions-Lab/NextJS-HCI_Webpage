import React, { Suspense } from "react";
import { getRecentNews } from "@/sanity/lib/news/getNews";
import { getFeaturedResearch } from "@/sanity/lib/research/getResearch";
import {
  getHomeFeaturedProjectsImage,
  getHomeHeroImage,
  getHomeHubCommunityImage,
  getHomeWhyHCIImages,
} from "@/sanity/lib/imageSettings/homeImages";
import HomeView from "@/modules/home/ui/views/home-view";
import { Loader } from "lucide-react";

const HomePageServer = async () => {
  const [
    heroImage,
    recentNews,
    featuredResearch,
    whyHCILabImages,
    featuredProjectsImage,
    hubCommunityImage,
  ] = await Promise.all([
    getHomeHeroImage(),
    getRecentNews(),
    getFeaturedResearch(),
    getHomeWhyHCIImages(),
    getHomeFeaturedProjectsImage(),
    getHomeHubCommunityImage(),
  ]);

  return (
    <Suspense fallback={<Loader />}>
      <HomeView
        heroImage={heroImage}
        recentNews={recentNews}
        featuredResearch={featuredResearch}
        whyHCILabImages={whyHCILabImages}
        featuredProjectsImage={featuredProjectsImage}
        hubCommunityImage={hubCommunityImage}
      />
    </Suspense>
  );
};

export default HomePageServer;
