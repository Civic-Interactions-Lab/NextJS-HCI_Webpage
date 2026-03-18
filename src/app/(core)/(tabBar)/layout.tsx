import { ReactNode, Suspense } from "react";
import TabBarClient from "@/components/TabBarClient";
import Hero from "@/components/Hero";
import { getAboutHeroImage } from "@/sanity/lib/imageSettings/aboutImages";
import { getPeopleHeroImage } from "@/sanity/lib/imageSettings/peopleImages";
import { getSponsorsHeroImage } from "@/sanity/lib/imageSettings/sponsorsImages";
import Loading from "@/components/Loading";

export default async function TabBarLayout({
  children,
}: {
  children: ReactNode;
}) {
  const imageMap = {
    about: await getAboutHeroImage(),
    people: await getPeopleHeroImage(),
    sponsors: await getSponsorsHeroImage(),
  };

  return (
    <Suspense fallback={<Loading />}>
      <Hero imageMap={imageMap} />

      <div className="w-full h-4" />

      <div className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md transition-all duration-300">
        <div className="max-w-6xl mx-auto px-8 md:px-12 py-3">
          <TabBarClient />
        </div>
      </div>

      <div className="flex flex-col flex-1 max-w-6xl mx-auto mt-6 mb-8 px-8 md:px-12">
        <main className="flex-1">{children}</main>
      </div>
    </Suspense>
  );
}
