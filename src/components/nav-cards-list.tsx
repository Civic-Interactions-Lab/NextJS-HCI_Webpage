"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { SectionTitle } from "@/components/section-title";

gsap.registerPlugin(ScrollTrigger);

interface NavCardItem {
  label: string;
  href: string;
  tagline: string;
}

interface NavCardsListProps {
  ariaLabel: string;
  items: NavCardItem[];
  /** Link text for each card — defaults to "Learn More". */
  cta?: (item: NavCardItem) => string;
  /** Accessible label suffix for each link — defaults to "— Temple HCI Lab". */
  linkDescription?: (item: NavCardItem) => string;
}

const useNavCardReveal = (rootRef: React.RefObject<HTMLElement | null>) => {
  useEffect(() => {
    if (!rootRef.current?.querySelector(".nav-card")) return;
    const ctx = gsap.context(() => {
      gsap.from(".nav-card", {
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 0.7,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".nav-card",
          start: "top bottom",
          once: true,
        },
      });
    }, rootRef as React.RefObject<HTMLElement>);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

const NavCardsList = ({
  ariaLabel,
  items,
  cta,
  linkDescription,
}: NavCardsListProps) => {
  const ref = useRef<HTMLElement>(null);

  useNavCardReveal(ref);

  return (
    <nav
      ref={ref}
      aria-label={ariaLabel}
      className="border-t border-thunder/8 space-y-16"
    >
      {items.map((item, i) => (
        <Link
          key={item.label}
          href={item.href}
          aria-label={
            linkDescription
              ? linkDescription(item)
              : `Learn more about ${item.label} — Temple HCI Lab`
          }
          className={`nav-card group flex flex-col gap-3 transition-colors ${i % 2 === 1 ? "-mx-6 md:-mx-12 px-6 md:px-12 bg-alabaster" : ""}`}
        >
          <SectionTitle>{item.label}</SectionTitle>
          <p className="text-p1 text-thunder/60 leading-relaxed max-w-xl">
            {item.tagline}
          </p>
          <span className="inline-flex items-center gap-2 font-outfit text-sm font-semibold uppercase tracking-widest text-thunder border border-thunder/20 rounded-full px-4 py-2 w-fit mt-1 group-hover:border-well-red group-hover:text-well-red transition-colors">
            {cta ? cta(item) : "Learn More"}
            <ArrowRight
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </span>
        </Link>
      ))}
    </nav>
  );
};

export default NavCardsList;
