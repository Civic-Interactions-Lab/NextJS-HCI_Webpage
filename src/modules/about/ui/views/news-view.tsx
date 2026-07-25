import NewsTimeline from "@/modules/about/ui/components/news-timeline";
import CtaBanner from "@/components/cta-banner";
import { getAllNews } from "@/sanity/lib/news/getNews";

export default async function NewsView() {
  const allNews = await getAllNews();

  return (
    <div className="space-y-32">
      <NewsTimeline allNews={allNews} />
      <CtaBanner
        label="Share your story"
        title="Want to upload to HCI News?"
        body="Have news to share? Whether it's a project update, publication, event highlight, or personal accomplishment, we'd love to feature it. Submit your update and we'll celebrate your work with the community."
        ctaLabel="Fill out this form"
        ctaHref="/"
      />
    </div>
  );
};
