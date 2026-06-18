import NewsTimeline from "@/modules/about/ui/components/news-timeline";
import UploadNews from "@/modules/about/ui/components/UploadNews";
import { getAllNews } from "@/sanity/lib/news/getNews";

const NewsView = async () => {
  const allNews = await getAllNews();

  return (
    <div className="space-y-16">
      <NewsTimeline allNews={allNews} />
      <UploadNews />
    </div>
  );
};

export default NewsView;
