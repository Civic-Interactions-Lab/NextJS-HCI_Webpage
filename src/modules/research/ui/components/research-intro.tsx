"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ResearchIntro = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".research-intro-line", {
        opacity: 0,
        y: 40,
        stagger: 0.12,
        duration: 0.8,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          once: true,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="flex flex-col gap-4">
      <p className="research-intro-line font-outfit text-sm font-medium text-well-red uppercase tracking-widest">
        What we explore
      </p>
      <h2 className="research-intro-line font-outfit font-medium text-4xl md:text-5xl lg:text-6xl text-thunder leading-tight">
        AI.{" "}
        <span className="text-well-red">Accessibility.</span>{" "}
        Social Computing.
      </h2>
      <p className="research-intro-line text-p1 text-thunder/70 leading-relaxed max-w-2xl">
        At the Temple HCI Lab, our work in Human-Computer Interaction goes
        beyond AI and data. Our mission is to drive discovery, expand critical
        thinking, and inspire collaboration — creating a lasting impact on how
        people and technology interact.
      </p>
    </div>
  );
};

export default ResearchIntro;
