"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { BrainCircuit } from "lucide-react";

const TopicLogoGenAI = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const ring1Ref = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);
  const ring3Ref = useRef<HTMLDivElement>(null);
  const dot1Ref = useRef<HTMLDivElement>(null);
  const dot2Ref = useRef<HTMLDivElement>(null);
  const dot3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to(ring1Ref.current, { y: -10, duration: 3.2, yoyo: true, repeat: -1, ease: "sine.inOut" });
    gsap.to(ring2Ref.current, { y: 8, duration: 2.8, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 0.4 });
    gsap.to(dot1Ref.current, { y: -8, duration: 2.4, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 0.2 });
    gsap.to(dot2Ref.current, { y: 10, duration: 3.5, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 0.7 });
    gsap.to(dot3Ref.current, { y: -6, duration: 2.9, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 1.1 });

    const container = containerRef.current;
    const logo = logoRef.current;
    if (!container || !logo) return;

    const qLogoX = gsap.quickTo(logo, "x", { duration: 0.5, ease: "power3" });
    const qLogoY = gsap.quickTo(logo, "y", { duration: 0.5, ease: "power3" });
    const qLogoRx = gsap.quickTo(logo, "rotationX", { duration: 0.6, ease: "power3" });
    const qLogoRy = gsap.quickTo(logo, "rotationY", { duration: 0.6, ease: "power3" });
    const qR1X = gsap.quickTo(ring1Ref.current, "x", { duration: 0.9, ease: "power2" });
    const qR1Y = gsap.quickTo(ring1Ref.current, "y", { duration: 0.9, ease: "power2" });
    const qR2X = gsap.quickTo(ring2Ref.current, "x", { duration: 1.1, ease: "power2" });
    const qR2Y = gsap.quickTo(ring2Ref.current, "y", { duration: 1.1, ease: "power2" });
    const qR3X = gsap.quickTo(ring3Ref.current, "x", { duration: 0.7, ease: "power2" });
    const qR3Y = gsap.quickTo(ring3Ref.current, "y", { duration: 0.7, ease: "power2" });
    const qD1X = gsap.quickTo(dot1Ref.current, "x", { duration: 0.6, ease: "power2" });
    const qD1Y = gsap.quickTo(dot1Ref.current, "y", { duration: 0.6, ease: "power2" });
    const qD2X = gsap.quickTo(dot2Ref.current, "x", { duration: 0.75, ease: "power2" });
    const qD2Y = gsap.quickTo(dot2Ref.current, "y", { duration: 0.75, ease: "power2" });

    const handleMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
      const dy = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
      qLogoX(dx * 28); qLogoY(dy * 28);
      qLogoRy(dx * 12); qLogoRx(-dy * 12);
      qR1X(dx * -18); qR1Y(dy * -18);
      qR2X(dx * -10); qR2Y(dy * -10);
      qR3X(dx * -24); qR3Y(dy * -24);
      qD1X(dx * 20); qD1Y(dy * 20);
      qD2X(dx * -14); qD2Y(dy * -14);
    };

    const handleLeave = () => {
      qLogoX(0); qLogoY(0); qLogoRx(0); qLogoRy(0);
      qR1X(0); qR1Y(0); qR2X(0); qR2Y(0); qR3X(0); qR3Y(0);
      qD1X(0); qD1Y(0); qD2X(0); qD2Y(0);
    };

    container.addEventListener("mousemove", handleMove);
    container.addEventListener("mouseleave", handleLeave);
    return () => {
      container.removeEventListener("mousemove", handleMove);
      container.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="relative w-full h-72 md:h-96 flex items-center justify-center select-none overflow-hidden"
      style={{ perspective: "800px" }}
    >
      <div ref={ring1Ref} className="absolute w-72 h-72 rounded-full border border-well-red/12" />
      <div ref={ring2Ref} className="absolute w-52 h-52 rounded-full border border-thunder/8" />
      <div ref={ring3Ref} className="absolute w-36 h-36 rounded-full border-2 border-well-red/20" />
      <div ref={dot1Ref} className="absolute top-10 right-12 w-3 h-3 rounded-full bg-well-red/40" />
      <div ref={dot2Ref} className="absolute bottom-12 left-10 w-2 h-2 rounded-full bg-thunder/20" />
      <div ref={dot3Ref} className="absolute top-1/2 left-8 w-1.5 h-1.5 rounded-full bg-well-red/30" />
      <div
        ref={logoRef}
        className="relative z-10 w-28 h-28 rounded-3xl bg-well-red flex items-center justify-center drop-shadow-2xl"
        style={{ transformStyle: "preserve-3d" }}
      >
        <BrainCircuit className="w-16 h-16 text-white" />
      </div>
    </div>
  );
};

export default TopicLogoGenAI;
