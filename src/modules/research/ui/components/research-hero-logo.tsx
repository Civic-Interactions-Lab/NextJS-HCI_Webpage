"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

const ResearchHeroLogo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const ring1Ref = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);
  const ring3Ref = useRef<HTMLDivElement>(null);
  const dot1Ref = useRef<HTMLDivElement>(null);
  const dot2Ref = useRef<HTMLDivElement>(null);
  const dot3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const logo = logoRef.current;
    const ring1 = ring1Ref.current;
    const ring2 = ring2Ref.current;
    const ring3 = ring3Ref.current;
    const dot1 = dot1Ref.current;
    const dot2 = dot2Ref.current;
    const dot3 = dot3Ref.current;
    if (!container || !logo) return;

    // Idle float animation on rings
    gsap.to(ring1, { y: -10, duration: 3.2, yoyo: true, repeat: -1, ease: "sine.inOut" });
    gsap.to(ring2, { y: 8, duration: 2.8, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 0.4 });
    gsap.to(dot1, { y: -8, duration: 2.4, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 0.2 });
    gsap.to(dot2, { y: 10, duration: 3.5, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 0.7 });
    gsap.to(dot3, { y: -6, duration: 2.9, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 1.1 });

    // quickTo targets for parallax
    const qLogoX = gsap.quickTo(logo, "x", { duration: 0.5, ease: "power3" });
    const qLogoY = gsap.quickTo(logo, "y", { duration: 0.5, ease: "power3" });
    const qLogoRx = gsap.quickTo(logo, "rotationX", { duration: 0.6, ease: "power3" });
    const qLogoRy = gsap.quickTo(logo, "rotationY", { duration: 0.6, ease: "power3" });

    const qR1X = gsap.quickTo(ring1, "x", { duration: 0.9, ease: "power2" });
    const qR1Y = gsap.quickTo(ring1, "y", { duration: 0.9, ease: "power2" });
    const qR2X = gsap.quickTo(ring2, "x", { duration: 1.1, ease: "power2" });
    const qR2Y = gsap.quickTo(ring2, "y", { duration: 1.1, ease: "power2" });
    const qR3X = gsap.quickTo(ring3, "x", { duration: 0.7, ease: "power2" });
    const qR3Y = gsap.quickTo(ring3, "y", { duration: 0.7, ease: "power2" });
    const qD1X = gsap.quickTo(dot1, "x", { duration: 0.6, ease: "power2" });
    const qD1Y = gsap.quickTo(dot1, "y", { duration: 0.6, ease: "power2" });
    const qD2X = gsap.quickTo(dot2, "x", { duration: 0.75, ease: "power2" });
    const qD2Y = gsap.quickTo(dot2, "y", { duration: 0.75, ease: "power2" });
    const qD3X = gsap.quickTo(dot3, "x", { duration: 0.85, ease: "power2" });
    const qD3Y = gsap.quickTo(dot3, "y", { duration: 0.85, ease: "power2" });

    const handleMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
      const dy = (e.clientY - (rect.top + rect.height / 2)) / rect.height;

      // Logo: most movement + tilt
      qLogoX(dx * 28);
      qLogoY(dy * 28);
      qLogoRy(dx * 12);
      qLogoRx(-dy * 12);

      // Rings: counter-move (parallax depth)
      qR1X(dx * -18);
      qR1Y(dy * -18);
      qR2X(dx * -10);
      qR2Y(dy * -10);
      qR3X(dx * -24);
      qR3Y(dy * -24);

      // Accent dots
      qD1X(dx * 20);
      qD1Y(dy * 20);
      qD2X(dx * -14);
      qD2Y(dy * -14);
      qD3X(dx * 16);
      qD3Y(dy * 16);
    };

    const handleLeave = () => {
      qLogoX(0); qLogoY(0); qLogoRx(0); qLogoRy(0);
      qR1X(0); qR1Y(0);
      qR2X(0); qR2Y(0);
      qR3X(0); qR3Y(0);
      qD1X(0); qD1Y(0);
      qD2X(0); qD2Y(0);
      qD3X(0); qD3Y(0);
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
      {/* Outermost ring */}
      <div
        ref={ring1Ref}
        className="absolute w-80 h-80 rounded-full border border-well-red/10"
      />

      {/* Middle ring */}
      <div
        ref={ring2Ref}
        className="absolute w-56 h-56 rounded-full border border-thunder/8"
      />

      {/* Inner accent ring */}
      <div
        ref={ring3Ref}
        className="absolute w-40 h-40 rounded-full border-2 border-well-red/20"
      />

      {/* Accent dot — top right */}
      <div
        ref={dot1Ref}
        className="absolute top-10 right-12 w-3 h-3 rounded-full bg-well-red/40"
      />

      {/* Accent dot — bottom left */}
      <div
        ref={dot2Ref}
        className="absolute bottom-12 left-10 w-2 h-2 rounded-full bg-thunder/20"
      />

      {/* Accent dot — mid left */}
      <div
        ref={dot3Ref}
        className="absolute top-1/2 left-8 w-1.5 h-1.5 rounded-full bg-well-red/30"
      />

      {/* Logo */}
      <div
        ref={logoRef}
        className="relative z-10 drop-shadow-2xl"
        style={{ transformStyle: "preserve-3d" }}
      >
        <Image
          src="/logos/hci-logo.png"
          alt="Temple HCI Lab"
          width={128}
          height={128}
          className="rounded-3xl"
          priority
        />
      </div>
    </div>
  );
};

export default ResearchHeroLogo;
