"use client";

import ImageCarousel from "@/components/ImageCarousel";
import { BorderHeading } from "@/components/AppTitle";
import { AboutLabValuesQueryResult } from "../../../../../sanity.types";
import { getImageSrc } from "@/lib/utils";

interface LabValuesProps {
  images?: AboutLabValuesQueryResult;
}

const LabValues = ({ images }: LabValuesProps) => {
  const convertSanityImages = (sanityImages?: AboutLabValuesQueryResult) => {
    if (!sanityImages) return [];

    return sanityImages.map((img) => ({
      src: getImageSrc(img?.asset),
      alt: img.alt || "",
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center mt-0 md:mt-12">
      <div className="flex flex-col gap-6">
        <BorderHeading title="Lab Values" />
        <p className="text-sm md:text-lg xl:text-xl text-gray-700 leading-relaxed">
          Our lab is built on values that guide how we learn, create, and work
          together. We prioritize collaboration, curiosity, and
          inclusivity—ensuring every member feels supported and empowered to
          contribute their ideas. We believe in designing with empathy,
          questioning with intention, and pursuing research that makes a
          positive impact on people and technology. These values shape our
          culture, strengthen our community, and drive the meaningful work we do
          every day.
        </p>
      </div>

      <div className="relative">
        <ImageCarousel
          images={convertSanityImages(images)}
          height="h-64 md:h-80"
          roundedClassName="rounded-tl-[100px]"
          showPagination={true}
          showNavigation={true}
          title="Lab Values Gallery"
          priority={true}
        />
      </div>
    </div>
  );
};

export default LabValues;
