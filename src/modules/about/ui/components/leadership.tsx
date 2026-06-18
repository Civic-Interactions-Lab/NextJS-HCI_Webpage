"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionTitle } from "@/components/section-title";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { number: "30+", desc: "students have traveled to present their work" },
  { number: "10+", desc: "students have traveled internationally" },
];

const Leadership = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        opacity: 0, x: -40, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 85%", once: true },
      });
      gsap.from(imgRef.current, {
        opacity: 0, x: 40, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 85%", once: true },
      });
      gsap.from(".leadership-stat", {
        opacity: 0, y: 20, stagger: 0.15, duration: 0.5, ease: "power2.out",
        scrollTrigger: { trigger: textRef.current, start: "top 80%", once: true },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
      {/* Text + stats */}
      <div ref={textRef} className="flex flex-col gap-6 order-1">
        <SectionTitle>Leadership</SectionTitle>
        <p className="text-p1 text-thunder/75 leading-relaxed">
          Students learn to lead their own projects and make important decisions about the direction
          of their work. They get opportunities to present at major conferences as posters and talks.
        </p>

        <div className="flex flex-col gap-3 pt-1">
          {STATS.map(({ number, desc }) => (
            <div key={number} className="leadership-stat flex gap-4 items-center border-l-4 border-well-red pl-4 py-1">
              <span className="font-outfit font-bold text-3xl text-well-red shrink-0 leading-none">{number}</span>
              <p className="text-p2 text-thunder/70">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Image */}
      <div ref={imgRef} className="order-2">
        <div className="md:rotate-1 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/images/cover/6-studio.JPG"
            alt="HCI Lab students at a conference"
            width={600}
            height={400}
            className="w-full h-64 md:h-80 object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Leadership;
