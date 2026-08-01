"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionTitle } from "@/components/section-title";
import { useSideReveal } from "@/modules/about/hooks/use-scroll-reveal";

const StudioTime = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useSideReveal(rootRef, imgRef, textRef);

  return (
    <section
      ref={rootRef}
      className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center"
    >
      {/* Image */}
      <div ref={imgRef} className="order-2 md:order-1">
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/images/cover/studio-1.jpg"
            alt="Studio Time — students collaborating in the HCI Lab, Temple University, Philadelphia, Pennsylvania"
            width={600}
            height={400}
            className="w-full h-64 md:h-80 object-cover"
          />
        </div>
      </div>

      {/* Text */}
      <div ref={textRef} className="order-1 md:order-2 flex flex-col gap-5">
        <SectionTitle>Collaboration</SectionTitle>
        <p className="text-p1 text-thunder/75 leading-relaxed">
          <span className="font-medium text-thunder">Studio Time</span> is a
          collaborative weekly activity where students bring ideas to life
          through hands-on design, prototyping, and user testing.
        </p>
        <p className="text-p1 text-thunder/75 leading-relaxed">
          It is an opportunity to share feedback, build friendships, and learn
          from others in a safe, inclusive environment.
        </p>
        <Link
          href="/about/events"
          aria-label="Learn more about Studio Time and other Temple HCI Lab events"
          className="group inline-flex items-center gap-1.5 font-outfit text-sm font-semibold uppercase tracking-widest text-thunder border border-thunder/20 rounded-full px-4 py-2 hover:border-well-red hover:text-well-red transition-colors w-fit mt-2"
        >
          Learn More{" "}
          <ArrowRight
            className="w-4 h-4 transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>
    </section>
  );
};

export default StudioTime;
