import React from "react";
import HomeView from "@/modules/home/ui/views/home-view";
import AnnotationOverlay from "@/modules/annotations/ui/components/AnnotationOverlay";

const HomePage = () => {
  return (
    <AnnotationOverlay path={"/"}>
      <HomeView />
    </AnnotationOverlay>
  );
};
export default HomePage;
