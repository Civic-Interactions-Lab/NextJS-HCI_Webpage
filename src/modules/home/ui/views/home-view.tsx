import HomeHero from "@/modules/home/ui/components/home-hero";
import HomeIntro from "@/modules/home/ui/components/home-intro";
import RecentPapers from "@/modules/home/ui/components/recent-papers";
import HubCommunitySection from "@/modules/home/ui/components/hub-community-section";
import RecentNewsSection from "@/modules/home/ui/components/recent-news-section";
import TestimonialsSection from "@/modules/home/ui/components/home-testimonials-section";
import { getRecentNews } from "@/sanity/lib/news/getNews";
import { getFeaturedResearch } from "@/sanity/lib/research/getResearch";
import { getTestimonials } from "@/sanity/lib/testimonials/getTestimonials";

const HomeView = async () => {
  const [recentNews, featuredResearch, testimonials] = await Promise.all([
    getRecentNews(),
    getFeaturedResearch(),
    getTestimonials(),
  ]);

  return (
    <>
      <HomeHero />
      <main className="bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 pb-20 space-y-20">
          <HomeIntro />
          <RecentPapers research={featuredResearch} />
          <HubCommunitySection />
          <TestimonialsSection testimonials={testimonials} />
          <RecentNewsSection recentNews={recentNews} />
        </div>
      </main>
    </>
  );
};

export default HomeView;
