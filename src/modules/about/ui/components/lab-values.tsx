"use client";

import { useRef } from "react";
import { SectionTitle } from "@/components/section-title";
import ImageCarousel from "@/components/image-carousel";
import { LAB_VALUES_IMAGES } from "@/modules/about/constants";
import { useSideReveal } from "@/modules/about/hooks/use-scroll-reveal";

const LabValues = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useSideReveal(rootRef, textRef, carouselRef);

  return (
    <section ref={rootRef} className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
      <div ref={textRef} className="flex flex-col gap-6">
        <SectionTitle>Lab Values</SectionTitle>
        <p className="text-p1 text-thunder/75 leading-relaxed">
          Our lab is built on values that guide how we learn, create, and work together. We prioritize collaboration, curiosity, and inclusivity, ensuring every member feels supported and empowered to contribute their ideas.
        </p>
        <p className="text-p1 text-thunder/75 leading-relaxed">
          We believe in designing with empathy, questioning with intention, and pursuing research that makes a positive impact on people and technology.
        </p>
      </div>

      <div ref={carouselRef}>
        <ImageCarousel
          images={LAB_VALUES_IMAGES}
          height="h-64 md:h-80"
          roundedClassName="rounded-tl-[80px]"
          showPagination
          showNavigation
          title="Lab Values Gallery"
          priority
        />
      </div>
    </section>
  );
};

export default LabValues;
