import { ReactNode } from "react";
import TabBarClient from "@/components/TabBarClient";
import Hero from "@/components/Hero";
import { getAboutHeroImage } from "@/sanity/lib/imageSettings/aboutImages";
import { getPeopleHeroImage } from "@/sanity/lib/imageSettings/peopleImages";
import { getSponsorsHeroImage } from "@/sanity/lib/imageSettings/sponsorsImages";

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
    <>
      <Hero imageMap={imageMap} />
      <div className="flex flex-col flex-1 max-w-7xl mx-auto mt-6 mb-12 px-8 md:px-12 space-y-6">
        <TabBarClient />
        <main className="flex-1">{children}</main>
      </div>
    </>
  );
}
