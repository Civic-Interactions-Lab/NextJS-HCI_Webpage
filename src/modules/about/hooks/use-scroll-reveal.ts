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

type FadeOptions = {
  x?: number;
  y?: number;
  duration?: number;
  ease?: string;
  start?: string;
  once?: boolean;
  trigger?: Trigger;
};

/** Fades a single element in from an offset when it scrolls into view. */
export function useFadeReveal(
  rootRef: RefObject<Element | null>,
  targetRef: RefObject<Element | null>,
  options: FadeOptions = {},
) {
  const {
    x = 0,
    y = 0,
    duration = 0.7,
    ease = "power2.out",
    start = "top 85%",
    once = true,
    trigger,
  } = options;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(targetRef.current, {
        opacity: 0,
        x,
        y,
        duration,
        ease,
        scrollTrigger: { trigger: resolveTrigger(trigger, rootRef), start, once },
      });
    }, rootRef as RefObject<HTMLElement>);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

type SideRevealOptions = {
  distance?: number;
  duration?: number;
  ease?: string;
  start?: string;
  once?: boolean;
  trigger?: Trigger;
};

/** Slides two elements in from opposite sides — the classic left/right reveal. */
export function useSideReveal(
  rootRef: RefObject<Element | null>,
  leftRef: RefObject<Element | null>,
  rightRef: RefObject<Element | null>,
  options: SideRevealOptions = {},
) {
  const {
    distance = 40,
    duration = 0.7,
    ease = "power2.out",
    start = "top 85%",
    once = true,
    trigger,
  } = options;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollTrigger = { trigger: resolveTrigger(trigger, rootRef), start, once };
      gsap.from(leftRef.current, { opacity: 0, x: -distance, duration, ease, scrollTrigger });
      gsap.from(rightRef.current, { opacity: 0, x: distance, duration, ease, scrollTrigger });
    }, rootRef as RefObject<HTMLElement>);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

type StaggerOptions = {
  y?: number;
  stagger?: number;
  duration?: number;
  ease?: string;
  start?: string;
  once?: boolean;
  immediateRender?: boolean;
  trigger?: Trigger;
};

/** Fades a group of matching elements up into view with a stagger delay. */
export function useStaggerReveal(
  rootRef: RefObject<Element | null>,
  selector: string,
  options: StaggerOptions = {},
  deps: unknown[] = [],
) {
  const {
    y = 32,
    stagger = 0.15,
    duration = 0.6,
    ease = "power2.out",
    start = "top 85%",
    once = true,
    immediateRender,
    trigger,
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
  }, deps);
}
