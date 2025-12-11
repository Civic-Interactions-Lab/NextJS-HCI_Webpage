import React from "react";
import CommonResearchAreas from "@/modules/research/ui/components/CommonResearchAreas";
import ResearchAtHci from "@/modules/research/ui/components/ResearchAtHCI";

const ResearchView = () => {
  return (
    <>
      <main className="w-full max-w-7xl mx-auto px-6 md:px-12 space-y-12 mb-16">
        <ResearchAtHci />

        <CommonResearchAreas />
      </main>
    </>
  );
};
export default ResearchView;
