"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CallToActionSection = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const logoDesktopRef = useRef<HTMLDivElement>(null);
  const logoMobileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 85%",
          once: true,
        },
      });

      gsap.set(rootRef.current, { opacity: 0, y: 50 });
      gsap.set(titleRef.current, { opacity: 0, y: 20 });
      gsap.set(btnRef.current, { opacity: 0, y: 20 });
      gsap.set(barRef.current, { scaleX: 0, transformOrigin: "left" });
      gsap.set(logoDesktopRef.current, { opacity: 0, x: 30, rotate: -10 });
      gsap.set(logoMobileRef.current, { opacity: 0, scale: 0.8 });

      tl.to(rootRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })
        .to(titleRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.4")
        .to(logoDesktopRef.current, { opacity: 1, x: 0, rotate: 0, duration: 0.8, ease: "power2.out" }, "-=0.5")
        .to(logoMobileRef.current, { opacity: 0.3, scale: 1, duration: 1, ease: "power2.out" }, "-=0.8")
        .to(btnRef.current, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.4")
        .to(barRef.current, { scaleX: 1, duration: 0.8, ease: "power2.out" }, "-=0.2");
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="w-full bg-well-red overflow-hidden">
      <div className="flex w-full justify-between items-center pl-0 md:pl-8 h-48 md:h-56 relative max-w-7xl mx-auto">
        <div ref={textRef} className="flex-1 flex-col w-full justify-center items-center md:items-start text-center md:text-left px-16 ml-0 md:ml-6 md:px-0 z-10">
          <p ref={titleRef} className="text-2xl md:text-4xl text-white font-medium font-outfit mb-4">
            Interested in joining?
          </p>

          <div ref={btnRef}>
            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLScuzv5spPPiuG0sSvb7KFvMucBhJtgParffTVDwC7dWefcCMQ/viewform"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="border-3 border-white rounded-sm px-8 md:px-16 py-1.5 w-fit mb-8 mx-auto md:mx-0 cursor-pointer hover:bg-white hover:text-well-red text-sm md:text-lg text-white font-medium font-outfit transition-colors duration-300 ease-in-out">
                Apply to Join Us
              </div>
            </Link>
          </div>

          <div ref={barRef} className="w-full h-3 md:h-4 bg-[#FF5E7E]" />
        </div>

        {/* Desktop Logo */}
        <div ref={logoDesktopRef} className="hidden md:block">
          <Image
            src="/logos/hci-logo-white.png"
            alt="Temple University HCI Lab logo"
            className="size-96 shrink-0"
            width={384}
            height={384}
            loading="eager"
            decoding="sync"
          />
        </div>

        {/* Mobile Logo */}
        <div ref={logoMobileRef} className="block md:hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Image
            src="/logos/hci-logo-white.png"
            alt="Temple University HCI Lab logo"
            className="size-48 shrink-0"
            width={192}
            height={192}
            loading="eager"
            decoding="sync"
          />
        </div>
      </div>
    </div>
  );
};

export default CallToActionSection;
