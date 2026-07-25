"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CommunityResearch from "@/modules/about/ui/components/community-research";

gsap.registerPlugin(ScrollTrigger);

const AboutIntro = () => {
  const introRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(introRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: introRef.current,
          start: "top 90%",
          once: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={introRef}
      className="flex flex-col md:flex-row gap-10 md:gap-16 items-start"
    >
      {/* Left col: intro text + community research */}
      <div className="flex-1 flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <p className="font-outfit text-sm font-medium text-well-red uppercase tracking-widest">
            The Temple HCI Lab
          </p>
          <h2 className="font-outfit font-medium text-4xl md:text-5xl text-thunder leading-tight">
            Research. Community.{" "}
            <span className="text-well-red">Human-Centered</span> Computing.
          </h2>
          <p className="text-p1 text-thunder/75 leading-relaxed">
            The Temple HCI Lab is a community of researchers, designers, and students working together to understand how technology shapes people&apos;s lives and to create more human-centered futures. Founded and directed by Dr. Stephen MacNeil, the lab brings together students across disciplines to pursue collaborative research, develop new technologies, and investigate the opportunities and challenges created by emerging technologies. Our work is guided by a commitment to interdisciplinary collaboration, participatory design, and empowering students to become independent researchers.
          </p>
        </div>

        <CommunityResearch />
      </div>

      {/* Right col: vertical video */}
      <figure className="flex justify-center w-full md:w-auto shrink-0 m-0">
        <div className="relative aspect-9/16 w-[220px] md:w-[300px] rounded-2xl overflow-hidden shadow-xl">
          <video
            src="/videos/hci.mov"
            aria-label="Overview video of the Temple University Human-Computer Interaction Lab"
            title="Temple University HCI Lab overview"
            className="w-full h-full object-cover"
            controls
            playsInline
            preload="metadata"
          />
        </div>
      </figure>
    </div>
  );
};

export default AboutIntro;
