"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { PersonStanding } from "lucide-react";

const TopicLogoAccessibility = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const orbit1Ref = useRef<HTMLDivElement>(null);
  const orbit2Ref = useRef<HTMLDivElement>(null);
  const orbit3Ref = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Slow ring rotation
      gsap.to(ringRef.current, {
        rotation: 360,
        duration: 12,
        repeat: -1,
        ease: "none",
        transformOrigin: "center center",
      });

      // Orbit 1 — fast, inner radius
      gsap.to(orbit1Ref.current, {
        rotation: 360,
        duration: 5,
        repeat: -1,
        ease: "none",
        transformOrigin: "center center",
      });

      // Orbit 2 — medium, outer radius, reverse
      gsap.to(orbit2Ref.current, {
        rotation: -360,
        duration: 8,
        repeat: -1,
        ease: "none",
        transformOrigin: "center center",
      });

      // Orbit 3 — slow, mid radius
      gsap.to(orbit3Ref.current, {
        rotation: 360,
        duration: 11,
        repeat: -1,
        ease: "none",
        transformOrigin: "center center",
      });

      // Pulse ring: expands and fades out on repeat
      gsap.to(pulseRef.current, {
        scale: 1.8,
        opacity: 0,
        duration: 2.5,
        repeat: -1,
        ease: "power1.out",
        transformOrigin: "center center",
      });

      // Subtle logo breath
      gsap.to(logoRef.current, {
        scale: 1.04,
        duration: 2.8,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="relative w-full h-72 md:h-96 flex items-center justify-center select-none overflow-hidden"
    >
      {/* Pulse ring */}
      <div
        ref={pulseRef}
        className="absolute w-36 h-36 rounded-full border border-sky/40"
      />

      {/* Dashed outer ring that rotates */}
      <div
        ref={ringRef}
        className="absolute w-64 h-64 rounded-full"
        style={{ border: "1.5px dashed rgba(14,165,233,0.25)" }}
      />

      {/* Orbit track 1 (inner) */}
      <div
        ref={orbit1Ref}
        className="absolute w-40 h-40"
        style={{ borderRadius: "50%" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-sky/70" />
      </div>

      {/* Orbit track 2 (outer, reverse) */}
      <div
        ref={orbit2Ref}
        className="absolute w-64 h-64"
        style={{ borderRadius: "50%" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-thunder/30" />
      </div>

      {/* Orbit track 3 (mid) */}
      <div
        ref={orbit3Ref}
        className="absolute w-52 h-52"
        style={{ borderRadius: "50%" }}
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-sky/50" />
      </div>

      {/* Logo */}
      <div
        ref={logoRef}
        className="relative z-10 w-28 h-28 rounded-3xl bg-sky-500 flex items-center justify-center drop-shadow-2xl"
      >
        <PersonStanding className="w-16 h-16 text-white" />
      </div>
    </div>
  );
};

export default TopicLogoAccessibility;
