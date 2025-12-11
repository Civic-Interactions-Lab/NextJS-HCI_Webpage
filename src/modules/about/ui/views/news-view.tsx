import React from "react";
import NewsTimeline from "@/modules/about/ui/components/NewsTimeline";
import UploadNews from "@/modules/about/ui/components/UploadNews";

const NewsView = () => {
  return (
    <>
      <NewsTimeline />

      <UploadNews />
    </>
  );
};
export default NewsView;
