"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionTitle } from "@/components/section-title";
import ImageCarousel from "@/components/image-carousel";

gsap.registerPlugin(ScrollTrigger);

const PLACEHOLDER_IMAGES = Array.from({ length: 5 }, (_, i) => ({
  src: "/images/cover/6-studio.JPG",
  alt: `Lab values — HCI Lab community ${i + 1}`,
}));

const LabValues = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        opacity: 0, x: -40, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 85%", once: true },
      });
      gsap.from(carouselRef.current, {
        opacity: 0, x: 40, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 85%", once: true },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
      <div ref={textRef} className="flex flex-col gap-6">
        <SectionTitle>Lab Values</SectionTitle>
        <p className="text-p1 text-thunder/75 leading-relaxed">
          Our lab is built on values that guide how we learn, create, and work together. We
          prioritize collaboration, curiosity, and inclusivity — ensuring every member feels
          supported and empowered to contribute their ideas.
        </p>
        <p className="text-p1 text-thunder/75 leading-relaxed">
          We believe in designing with empathy, questioning with intention, and pursuing research
          that makes a positive impact on people and technology.
        </p>
      </div>

      <div ref={carouselRef}>
        <ImageCarousel
          images={PLACEHOLDER_IMAGES}
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
