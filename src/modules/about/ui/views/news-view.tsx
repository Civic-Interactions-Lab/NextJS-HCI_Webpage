import React from "react";
import NewsTimeline from "@/modules/about/ui/components/NewsTimeline";
import UploadNews from "@/modules/about/ui/components/UploadNews";
import { getAllNews } from "@/sanity/lib/news/getNews";

const NewsView = async () => {
  const allNews = await getAllNews();

  return (
    <>
      <NewsTimeline allNews={allNews} />

      <UploadNews />
    </>
  );
};
export default NewsView;
