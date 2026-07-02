"use client";

import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Trigger = string | RefObject<Element | null>;

const resolveTrigger = (
  trigger: Trigger | undefined,
  fallback: RefObject<Element | null>,
) => (typeof trigger === "string" ? trigger : (trigger ?? fallback).current);

type StaggerFadeOptions = {
  y?: number;
  stagger?: number;
  duration?: number;
  ease?: string;
  start?: string;
  once?: boolean;
  immediateRender?: boolean;
  trigger?: Trigger;
};

/** Fades in the elements matching `selector` as they scroll into view — used for the
 * repeated ".other-card" / ".featured-video" / ".hero-line" reveal patterns across
 * the research views. */
export function useStaggerFade(
  rootRef: RefObject<Element | null>,
  selector: string,
  options: StaggerFadeOptions = {},
) {
  const {
    y = 30,
    stagger = 0.12,
    duration = 0.7,
    ease = "power2.inOut",
    start = "top bottom",
    once = true,
    immediateRender,
    trigger = selector,
  } = options;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(selector, {
        immediateRender,
        opacity: 0,
        y,
        stagger,
        duration,
        ease,
        scrollTrigger: { trigger: resolveTrigger(trigger, rootRef), start, once },
      });
    }, rootRef as RefObject<HTMLElement>);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
