"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { SectionTitle } from "@/components/section-title";
import { useSideReveal } from "@/modules/about/hooks/use-scroll-reveal";

const FindUs = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useSideReveal(rootRef, imgRef, textRef);

  return (
    <section
      ref={rootRef}
      className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center"
    >
      <div ref={imgRef} className="order-2 md:order-1">
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="https://templenews-media.s3.amazonaws.com/wp-content/uploads/2024/04/22204052/IMG_7342-678x381.jpeg"
            alt="HCI Lab at Science Education and Research Center (SERC), Temple University, Philadelphia, Pennsylvania"
            width={600}
            height={400}
            className="w-full h-64 md:h-80 object-cover"
            priority
          />
        </div>
      </div>

      <div ref={textRef} className="order-1 md:order-2 flex flex-col gap-5">
        <SectionTitle>Find Us at SERC</SectionTitle>
        <p className="text-p1 text-thunder/75 leading-relaxed">
          The HCI Lab meets in the{" "}
          <span className="font-medium text-thunder">
            College of Science and Technology
          </span>{" "}
          at Temple University, inside the Science Education and Research Center
          (SERC) building.
        </p>
        <div className="flex flex-col gap-0.5 text-p1 text-thunder/75">
          <p className="font-medium text-thunder">Temple University HCI Lab</p>
          <p>1925 N 12th St (SERC 301)</p>
          <p>Philadelphia, PA 19122</p>
        </div>
        <Link
          href="https://maps.app.goo.gl/LtyYfGsqPRWU51me7"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Get directions and parking info for the Temple HCI Lab at SERC"
          className="group inline-flex items-center gap-1.5 font-outfit text-sm font-medium text-well-red hover:text-well-red/70 transition-colors w-fit mt-1"
        >
          <MapPin className="w-4 h-4" aria-hidden="true" /> Directions &amp;
          Parking
        </Link>
      </div>
    </section>
  );
};

export default FindUs;
