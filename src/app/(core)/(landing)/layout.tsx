import React, { Suspense } from "react";
import Hero from "@/components/Hero";
import { getJoinHeroImage } from "@/sanity/lib/imageSettings/joinImages";
import { getResearchHeroImage } from "@/sanity/lib/imageSettings/researchImages";
import { getCoursesHeroImage } from "@/sanity/lib/imageSettings/coursesImages";
import Loading from "@/components/Loading";

export default async function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const imageMap = {
    join: await getJoinHeroImage(),
    research: await getResearchHeroImage(),
    courses: await getCoursesHeroImage(),
  };

  return (
    <>
      <Suspense fallback={<Loading />}>
        <Hero imageMap={imageMap} />
        <main className="flex-1 flex flex-col overflow-hidden mt-12">
          {children}
        </main>
      </Suspense>
    </>
  );
}
