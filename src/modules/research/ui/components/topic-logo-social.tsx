"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { WandSparkles } from "lucide-react";

const TopicLogoSocial = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const ripple1Ref = useRef<HTMLDivElement>(null);
  const ripple2Ref = useRef<HTMLDivElement>(null);
  const ripple3Ref = useRef<HTMLDivElement>(null);
  const ring1Ref = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);
  const idleTween = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Idle: gentle breath on logo
      idleTween.current = gsap.to(logoRef.current, {
        scale: 1.05,
        duration: 2.6,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      // Idle: rings float alternately
      gsap.to(ring1Ref.current, { y: -8, duration: 3, yoyo: true, repeat: -1, ease: "sine.inOut" });
      gsap.to(ring2Ref.current, { y: 8, duration: 3.5, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 0.6 });

      // Staggered idle ripples (subtle, always running)
      const idleRipple = (el: HTMLDivElement | null, delay: number) => {
        if (!el) return;
        gsap.set(el, { scale: 1, opacity: 0.3 });
        gsap.to(el, {
          scale: 1.9,
          opacity: 0,
          duration: 3,
          delay,
          repeat: -1,
          repeatDelay: 1.5,
          ease: "power1.out",
          transformOrigin: "center center",
        });
      };

      idleRipple(ripple1Ref.current, 0);
      idleRipple(ripple2Ref.current, 1);
      idleRipple(ripple3Ref.current, 2);
    }, containerRef);

    // Hover: burst all ripples simultaneously, faster
    const container = containerRef.current;
    const handleEnter = () => {
      [ripple1Ref, ripple2Ref, ripple3Ref].forEach((r, i) => {
        if (!r.current) return;
        gsap.killTweensOf(r.current);
        gsap.fromTo(
          r.current,
          { scale: 1, opacity: 0.5 },
          {
            scale: 2.2,
            opacity: 0,
            duration: 1.2,
            delay: i * 0.2,
            ease: "power2.out",
            onComplete: () => {
              // resume idle after burst
              gsap.set(r.current, { scale: 1, opacity: 0.3 });
              gsap.to(r.current, {
                scale: 1.9, opacity: 0,
                duration: 3, delay: i * 1,
                repeat: -1, repeatDelay: 1.5,
                ease: "power1.out",
                transformOrigin: "center center",
              });
            },
          }
        );
      });
    };

    container?.addEventListener("mouseenter", handleEnter);
    return () => {
      ctx.revert();
      container?.removeEventListener("mouseenter", handleEnter);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="relative w-full h-72 md:h-96 flex items-center justify-center select-none overflow-hidden cursor-pointer"
    >
      {/* Idle ripple rings */}
      <div ref={ripple1Ref} className="absolute w-32 h-32 rounded-full border border-emerald-500/40" />
      <div ref={ripple2Ref} className="absolute w-32 h-32 rounded-full border border-emerald-500/30" />
      <div ref={ripple3Ref} className="absolute w-32 h-32 rounded-full border border-emerald-500/20" />

      {/* Static background rings */}
      <div ref={ring1Ref} className="absolute w-64 h-64 rounded-full border border-thunder/8" />
      <div ref={ring2Ref} className="absolute w-48 h-48 rounded-full border border-emerald-500/15" />

      {/* Logo */}
      <div
        ref={logoRef}
        className="relative z-10 w-28 h-28 rounded-3xl bg-emerald-600 flex items-center justify-center drop-shadow-2xl"
      >
        <WandSparkles className="w-16 h-16 text-white" />
      </div>
    </div>
  );
};

export default TopicLogoSocial;
