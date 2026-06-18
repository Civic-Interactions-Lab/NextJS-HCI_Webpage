"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionTitle } from "@/components/section-title";

gsap.registerPlugin(ScrollTrigger);

const StudioTime = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imgRef.current, {
        opacity: 0, x: -40, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 85%", once: true },
      });
      gsap.from(textRef.current, {
        opacity: 0, x: 40, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 85%", once: true },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
      {/* Image */}
      <div ref={imgRef} className="order-2 md:order-1">
        <div className="md:-rotate-2 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/images/cover/6-studio.JPG"
            alt="Studio Time — students collaborating in the HCI Lab"
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
          <span className="font-medium text-thunder">Studio Time</span> is a collaborative weekly
          activity where students bring ideas to life through hands-on design, prototyping, and
          user testing.
        </p>
        <p className="text-p1 text-thunder/75 leading-relaxed">
          It is an opportunity to share feedback, build friendships, and learn from others in a
          safe, inclusive environment.
        </p>
        <Link
          href="/about/events"
          className="group inline-flex items-center gap-1.5 label-5 text-well-red hover:text-well-red/70 transition-colors w-fit mt-2"
        >
          Learn More <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
};

export default StudioTime;
