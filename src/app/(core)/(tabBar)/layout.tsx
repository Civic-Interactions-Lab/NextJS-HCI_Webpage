import { ReactNode, Suspense } from "react";
import TabBarClient from "@/components/TabBarClient";
import Hero from "@/components/Hero";
import { getAboutHeroImage } from "@/sanity/lib/imageSettings/aboutImages";
import { getPeopleHeroImage } from "@/sanity/lib/imageSettings/peopleImages";
import { getSponsorsHeroImage } from "@/sanity/lib/imageSettings/sponsorsImages";
import { Loader2 } from "lucide-react";

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
      <Suspense fallback={<Loading />}>
        <Hero imageMap={imageMap} />

        <div className="flex flex-col flex-1 max-w-7xl mx-auto mt-6 mb-12 px-8 md:px-12 space-y-6">
          <TabBarClient />
          <main className="flex-1">{children}</main>
        </div>
      </Suspense>
    </>
  );
}

const Loading = () => {
  return (
    <div className="flex items-center justify-center flex-1 min-h-screen">
      <Loader2 className="animate-spin" />
    </div>
  );
};
