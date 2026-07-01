"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Fades in the ".people-nav-card" links shared across the people views. */
export function useNavCardReveal(rootRef: RefObject<Element | null>) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".people-nav-card", {
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 0.7,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".people-nav-card",
          start: "top bottom",
          once: true,
        },
      });
    }, rootRef as RefObject<HTMLElement>);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
