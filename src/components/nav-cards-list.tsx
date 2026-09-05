"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { SectionTitle } from "@/components/section-title";
import { getRouteImage } from "@/constants/route-images";

gsap.registerPlugin(ScrollTrigger);

interface NavCardItem {
  label: string;
  href: string;
  tagline: string;
}

interface NavCardsListProps {
  ariaLabel: string;
  items: NavCardItem[];
  ctaVariant?: "learnMore" | "view";
  linkDescriptionVariant?: "default" | "research";
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
  ctaVariant = "learnMore",
  linkDescriptionVariant = "default",
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
      {items.map((item, i) => {
        const routeImage = getRouteImage(item.href);

        return (
          <Link
            key={item.label}
            href={item.href}
            aria-label={
              linkDescription
                ? linkDescription(item)
                : linkDescriptionVariant === "research"
                  ? `Learn more about ${item.label} research at the Temple HCI Lab`
                  : `Learn more about ${item.label} — Temple HCI Lab`
            }
            className={`nav-card group flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-10 transition-colors ${i % 2 === 1 ? "-mx-6 md:-mx-12 px-6 md:px-12" : ""}`}
          >
            <div className="flex flex-col gap-3">
              <SectionTitle>{item.label}</SectionTitle>
              <p className="text-p1 text-thunder/60 leading-relaxed max-w-xl">
                {item.tagline}
              </p>
              <span className="inline-flex items-center gap-2 font-outfit text-sm font-semibold uppercase tracking-widest text-thunder border border-thunder/20 rounded-full px-4 py-2 w-fit mt-1 group-hover:border-well-red group-hover:text-well-red transition-colors">
                {ctaVariant === "view" ? `View ${item.label}` : "Learn More"}
                <ArrowRight
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </div>

            <div className="hidden lg:block relative w-48 h-32 xl:w-64 xl:h-40 shrink-0 rounded-2xl overflow-hidden">
              <Image
                src={routeImage.src}
                alt={routeImage.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </Link>
        );
      })}
    </nav>
  );
};

export default NavCardsList;
