"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { SLIDES, RESEARCH_AREAS } from "@/modules/home/constants";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionTitle } from "@/components/section-title";

gsap.registerPlugin(ScrollTrigger);

const TOP_GAP = 80;
const BOTTOM_GAP = 80;
const MIN_CARDS_SLIDE_GAP = 24;
const EASE_POWER = 4;
const CARD_DELAYS = [0, 0.45, 0.78];
const CARD_EASE_POWERS = [1, EASE_POWER, EASE_POWER];

type CardsBox = { top: number; height: number; minSafeTop: number };

const getSlideDistance = (box: CardsBox, vh: number): number =>
  Math.max(Math.min(((vh - box.top) / 2) * 4, vh - box.top - 20), 1);

const getProgress = (
  box: CardsBox,
  delayFrac: number,
  easePower: number,
  v: number,
  vh: number,
): number => {
  const sd = getSlideDistance(box, vh);
  const dv = Math.max(v - sd * delayFrac, 0);
  return Math.pow(
    Math.min(dv / Math.max(sd - sd * delayFrac, 1), 1),
    easePower,
  );
};

const getCardTop = (
  box: CardsBox,
  delayFrac: number,
  easePower: number,
  v: number,
  vh: number,
): number => {
  const sd = getSlideDistance(box, vh);
  const progress = getProgress(box, delayFrac, easePower, v, vh);
  return v <= sd
    ? box.top + (vh - sd + TOP_GAP - box.top) * progress
    : vh - v + TOP_GAP;
};

const getCardBg = (
  box: CardsBox,
  delayFrac: number,
  easePower: number,
  v: number,
  vh: number,
): string => {
  const progress = getProgress(box, delayFrac, easePower, v, vh);
  return `rgba(${Math.round(170 * progress)}, ${Math.round(44 * progress)}, ${Math.round(69 * progress)}, ${0.45 + 0.55 * progress})`;
};

const ResearchCardContent = ({
  area,
  compact,
}: {
  area: (typeof RESEARCH_AREAS)[number];
  compact?: boolean;
}) => (
  <>
    <p
      className={`font-oxanium font-semibold text-white leading-snug ${
        compact ? "text-sm md:text-base" : "text-sm md:text-2xl"
      }`}
    >
      {area.title}
    </p>
    <p
      className={`text-white/70 leading-snug ${
        compact ? "text-[10px] md:text-xs" : "text-[10px] md:text-base"
      }`}
    >
      {area.description}
    </p>
    <div className="flex items-end justify-between gap-1 md:gap-2 mt-auto">
      <span
        className={`font-oxanium font-medium text-white/80 inline-flex items-center gap-0.5 whitespace-nowrap rounded-full border border-white/25 group-hover:border-white/60 group-hover:text-white transition-colors ${
          compact
            ? "text-[9px] md:text-xs px-1.5 py-0.5 md:px-2.5 md:py-1"
            : "text-[9px] md:text-sm px-1.5 py-0.5 md:px-3 md:py-1.5"
        }`}
      >
        See more{" "}
        <ArrowRight className="w-2 h-2 md:w-3 md:h-3 transition-transform group-hover:translate-x-1" />
      </span>
      <area.Icon
        className={`text-white/60 shrink-0 ${
          compact ? "w-4 h-4 md:w-7 md:h-7" : "w-4 h-4 md:w-12 md:h-12"
        }`}
      />
    </div>
  </>
);

const ResearchGrid = ({
  animated,
  compact,
}: {
  animated?: boolean;
  compact?: boolean;
}) => (
  <div
    className={`grid grid-cols-3 gap-2 ${compact ? "md:gap-2" : "md:gap-4"}`}
  >
    {RESEARCH_AREAS.map((area, index) =>
      animated ? (
        <div
          key={area.id}
          data-gsap-card={index}
          style={{ opacity: 0 }}
          className="group backdrop-blur-md border border-white/10 rounded-xl hover:border-white/30 transition-colors"
        >
          <Link
            href={area.href}
            className={`flex flex-col gap-2 p-3 ${
              compact ? "md:gap-2 md:p-4" : "md:gap-3 md:p-7"
            }`}
          >
            <ResearchCardContent area={area} compact={compact} />
          </Link>
        </div>
      ) : (
        <Link
          key={area.id}
          href={area.href}
          className={`group flex flex-col gap-2 bg-black/45 backdrop-blur-md border border-white/10 rounded-xl p-3 ${
            compact ? "md:gap-2 md:p-4" : "md:gap-3 md:p-7"
          }`}
        >
          <ResearchCardContent area={area} compact={compact} />
        </Link>
      ),
    )}
  </div>
);

const HomeHero = () => {
  const [cardsBox, setCardsBox] = useState<CardsBox | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isCompact, setIsCompact] = useState(false);
  const autoSlideRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isPausedRef = useRef(false);

  useEffect(() => {
    const update = () => setIsCompact(window.innerHeight < 850);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const restartAutoSlide = () => {
    if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    autoSlideRef.current = setInterval(() => {
      if (!isPausedRef.current) setActiveSlide((s) => (s + 1) % SLIDES.length);
    }, 5000);
  };

  const goToSlide = (i: number) => {
    setActiveSlide(i);
    restartAutoSlide();
  };

  useEffect(() => {
    restartAutoSlide();
    return () => {
      if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    };
  }, []);

  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const rollingLogoRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const bgStripRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);

  // Hero shrinks as user scrolls
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const update = () => {
      el.style.height = `${Math.max(window.innerHeight - window.scrollY, 0)}px`;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Title simple fade-out on scroll
  useEffect(() => {
    if (!titleRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(titleRef.current, {
        opacity: 0,
        y: -24,
        ease: "power1.in",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "+=280",
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  // Cards: entrance + scroll-driven position & color
  useEffect(() => {
    if (!cardsBox) return;
    let scrollCleanup: (() => void) | null = null;
    const timer = setTimeout(() => {
      const cards = Array.from(
        document.querySelectorAll<HTMLDivElement>("[data-gsap-card]"),
      );
      if (cards.length !== 3) return;
      const top = (i: number, v: number, vh: number) =>
        getCardTop(cardsBox, CARD_DELAYS[i], CARD_EASE_POWERS[i], v, vh);
      const bg = (i: number, v: number, vh: number) =>
        getCardBg(cardsBox, CARD_DELAYS[i], CARD_EASE_POWERS[i], v, vh);
      const sv = window.scrollY;
      const heroH = window.innerHeight;
      const setPointer = (card: HTMLDivElement, scrollY: number) => {
        card.style.pointerEvents = scrollY < heroH ? "auto" : "none";
      };
      cards.forEach((card, i) => {
        gsap.set(card, { backgroundColor: bg(i, sv, heroH) });
        if (sv < 20) {
          gsap.fromTo(
            card,
            { opacity: 0, y: top(i, sv, heroH) + 50 },
            {
              opacity: 1,
              y: top(i, sv, heroH),
              duration: 0.9,
              ease: "power3.out",
              delay: 0.3 + i * 0.12,
              overwrite: true,
              onComplete: () => setPointer(card, window.scrollY),
            },
          );
        } else {
          gsap.set(card, { opacity: 1, y: top(i, sv, heroH) });
          setPointer(card, sv);
        }
      });
      const handleScroll = () => {
        const v = window.scrollY;
        const vh = window.innerHeight;
        cards.forEach((card, i) => {
          gsap.killTweensOf(card);
          gsap.set(card, {
            opacity: 1,
            y: top(i, v, vh),
            backgroundColor: bg(i, v, vh),
          });
          setPointer(card, v);
        });
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      scrollCleanup = () => window.removeEventListener("scroll", handleScroll);
    }, 50);
    return () => {
      clearTimeout(timer);
      scrollCleanup?.();
    };
  }, [cardsBox]);

  // Rolling logo reveals the title text (desktop) / simple fade-up (mobile)
  useEffect(() => {
    const container = titleContainerRef.current;
    const logoWrapper = rollingLogoRef.current;
    if (!container || !logoWrapper) return;

    if (window.innerWidth < 768) {
      gsap.set(container, {
        visibility: "visible",
        clipPath: "none",
        opacity: 0,
        y: 24,
      });
      gsap.to(container, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        delay: 0.2,
      });
      return;
    }

    const rect = container.getBoundingClientRect();
    const logoSize = logoWrapper.offsetWidth;
    const startX = -(rect.left + logoSize);
    const endX = rect.width + logoSize;
    const totalRotation =
      ((endX - startX) / ((logoSize / 2) * 0.55)) * (180 / Math.PI);
    gsap.set(container, {
      visibility: "visible",
      clipPath: "inset(0 100% 0 0)",
    });
    gsap.set(logoWrapper, {
      x: startX,
      y: Math.max(0, (rect.height - logoSize) / 2),
      scale: 0.2,
      rotation: 0,
      opacity: 1,
    });
    const tl = gsap.timeline({ delay: 0.2 });
    tl.to(
      logoWrapper,
      {
        x: endX,
        scale: 1,
        rotation: totalRotation,
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate() {
          const x = gsap.getProperty(logoWrapper, "x") as number;
          const s = gsap.getProperty(logoWrapper, "scaleX") as number;
          container.style.clipPath = `inset(0 ${Math.max(0, rect.width - x - (logoSize * s) / 2)}px 0 0)`;
        },
        onComplete: () => {
          container.style.clipPath = "none";
        },
      },
      0,
    );
    tl.to(logoWrapper, { opacity: 0, duration: 0.25 }, "-=0.3");
    return () => {
      tl.kill();
      if (container) gsap.set(container, { clearProps: "clipPath,visibility" });
    };
  }, []);

  // Heading: y position tracks hero + fade out on scroll
  useEffect(() => {
    const el = headingRef.current;
    const strip = bgStripRef.current;
    const dots = dotsRef.current;
    if (!cardsBox || !el) return;
    (
      [
        [el, 0.5],
        [strip, 0.5],
        [dots, 0.7],
      ] as [Element | null, number][]
    ).forEach(([target, delay]) => {
      if (target)
        gsap.to(target, {
          opacity: 1,
          duration: 0.4,
          delay,
          ease: "power2.out",
        });
    });
    const update = () => {
      const v = window.scrollY;
      const vh = window.innerHeight;
      const hb = Math.max(vh - v, 0);
      const ct = getCardTop(
        cardsBox,
        CARD_DELAYS[0],
        CARD_EASE_POWERS[0],
        v,
        vh,
      );
      const headingOffset = window.innerWidth < 768 ? 40 : 72;
      const headingY = Math.max(
        Math.min(hb - 60, ct - headingOffset),
        cardsBox.minSafeTop + MIN_CARDS_SLIDE_GAP,
      );
      const fadeOpacity = v > 0 ? Math.max(0, 1 - v / 60) : 1;
      gsap.set(el, { y: headingY, opacity: fadeOpacity });
      if (strip)
        gsap.set(strip, { y: headingY - 16, opacity: v > 0 ? fadeOpacity : 1 });
      if (dots) gsap.set(dots, { opacity: v > 0 ? fadeOpacity : 1 });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [cardsBox]);

  // Cards placeholder measurement
  useLayoutEffect(() => {
    if (!cardsRef.current) return;
    const measure = () => {
      if (!cardsRef.current || !heroRef.current) return;
      const saved = heroRef.current.style.height;
      heroRef.current.style.height = `${window.innerHeight}px`;
      const r = cardsRef.current.getBoundingClientRect();
      const slideContentEls = Array.from(
        document.querySelectorAll<HTMLElement>("[data-hero-slide-content]"),
      );
      if (titleContainerRef.current) slideContentEls.push(titleContainerRef.current);
      const maxSlideBottom = slideContentEls.reduce(
        (max, el) => Math.max(max, el.getBoundingClientRect().bottom),
        0,
      );
      const headingHeight = headingRef.current?.getBoundingClientRect().height ?? 0;
      const safeCardTop =
        maxSlideBottom +
        MIN_CARDS_SLIDE_GAP +
        headingHeight +
        MIN_CARDS_SLIDE_GAP;
      heroRef.current.style.height = saved;
      setCardsBox({
        top: Math.max(r.top, safeCardTop),
        height: r.height,
        minSafeTop: maxSlideBottom,
      });
    };
    measure();
    const raf = requestAnimationFrame(() => requestAnimationFrame(measure));
    if (typeof document !== "undefined" && "fonts" in document)
      document.fonts.ready.then(measure);
    const observer = new ResizeObserver(measure);
    observer.observe(cardsRef.current);
    if (titleRef.current) observer.observe(titleRef.current);
    if (headingRef.current) observer.observe(headingRef.current);
    document
      .querySelectorAll<HTMLElement>("[data-hero-slide-content]")
      .forEach((el) => observer.observe(el));
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <section
      aria-label="Temple HCI Lab hero carousel"
      aria-roledescription="carousel"
    >
      <div
        ref={heroRef}
        className="fixed top-0 left-0 w-screen h-screen overflow-hidden z-10 pointer-events-none"
      >
        {/* Crossfading background images — full screen on desktop, top half on mobile */}
        <div className="absolute top-0 left-0 right-0 h-1/2 md:inset-0 md:h-auto md:bottom-0">
          {SLIDES.map((slide, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-opacity duration-700 ease-in-out"
              style={{ opacity: activeSlide === i ? 1 : 0 }}
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                className="object-cover"
                style={{ objectPosition: slide.position }}
                priority={i === 0}
                sizes="100vw"
              />
            </div>
          ))}
        </div>
        {/* Mobile: gradient from transparent at top to solid black at 50%, stays black below */}
        <div
          className="md:hidden absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.1) 15%, rgba(0,0,0,0.9) 40%, rgba(0,0,0,1) 50%, rgba(0,0,0,1) 100%)",
          }}
        />
        {/* Desktop: original subtle gradient */}
        <div className="hidden md:block absolute inset-0 bg-linear-to-b from-black/15 via-black/20 to-black/95" />

        {/* Slide 0: Title */}
        <div
          className="absolute top-1/2 md:top-0 bottom-[30%] md:bottom-0 left-0 right-0 flex items-center justify-center px-6 md:px-12 z-10 transition-all duration-500"
          style={{
            opacity: activeSlide === 0 ? 1 : 0,
            transform:
              activeSlide === 0 ? "translateX(0)" : "translateX(-28px)",
            pointerEvents: activeSlide === 0 ? "auto" : "none",
          }}
        >
          <div className="flex flex-col items-center gap-4">
            {/* Title with rolling logo entrance */}
            <div ref={titleRef} className="origin-bottom-center relative">
              <div
                ref={rollingLogoRef}
                className="absolute pointer-events-none z-10 opacity-0"
                style={{ top: 0, left: 0 }}
              >
                <Image
                  src="/logos/hci-logo.png"
                  alt="Temnple HCI Lab Logo"
                  aria-hidden="true"
                  width={88}
                  height={88}
                  className="rounded-md"
                />
              </div>
              <div ref={titleContainerRef} className="invisible text-center">
                <h1
                  className={`font-oxanium font-semibold leading-[0.88] tracking-tight ${
                    isCompact
                      ? "text-[40px] md:text-[48px] lg:text-[64px]"
                      : "text-[68px] md:text-[80px] lg:text-[112px]"
                  }`}
                >
                  <span className="font-outfit! text-white">Temple </span>
                  <span className="font-outfit! text-well-red">HCI</span>
                  <span className="font-outfit! text-white"> Lab</span>
                </h1>
              </div>
            </div>
          </div>
        </div>

        {SLIDES.map((slide, i) =>
          slide.content ? (
            <div
              key={i}
              aria-hidden={activeSlide !== i}
              className="absolute top-1/2 md:top-32 bottom-[30%] md:bottom-auto left-0 right-0 w-full px-5 md:px-12 z-10 transition-all duration-500 flex items-center md:block"
              style={{
                opacity: activeSlide === i ? 1 : 0,
                transform:
                  activeSlide === i ? "translateX(0)" : "translateX(28px)",
                pointerEvents: activeSlide === i ? "auto" : "none",
              }}
            >
              <div className="max-w-7xl mx-auto flex justify-start md:justify-end">
                <div
                  data-hero-slide-content
                  onMouseEnter={() => {
                    isPausedRef.current = true;
                  }}
                  onMouseLeave={() => {
                    isPausedRef.current = false;
                  }}
                  className={`w-full flex md:bg-black/50 md:backdrop-blur-md md:border md:border-white/10 md:rounded-2xl ${
                    isCompact
                      ? "md:max-w-sm flex-col gap-2 md:p-3"
                      : "md:max-w-md flex-col gap-3 md:p-5"
                  }`}
                >
                  <p
                    className={`text-white/90 leading-relaxed ${
                      isCompact ? "text-xs" : "text-sm"
                    }`}
                  >
                    {slide.content.text}
                  </p>
                  <a
                    href={slide.content.href}
                    aria-label={slide.content.cta}
                    className={`group self-start inline-flex items-center gap-1.5 font-oxanium font-medium text-white/90 hover:text-white border border-white/60 hover:border-white rounded-full transition-colors ${
                      isCompact ? "text-xs px-4 py-1.5" : "text-sm px-6 py-2"
                    }`}
                  >
                    {slide.content.cta}{" "}
                    <ArrowRight
                      className="w-4 h-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>
            </div>
          ) : null,
        )}

        {/* Slide navigation chevrons */}
        <div className="flex absolute inset-x-0 top-[25%] md:top-1/2 -translate-y-1/2 justify-between px-3 z-20 pointer-events-none">
          <button
            onClick={() =>
              goToSlide((activeSlide - 1 + SLIDES.length) % SLIDES.length)
            }
            aria-label="Previous slide"
            className="pointer-events-auto w-10 h-10 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm border border-white/15 text-white transition-all hover:bg-black/60 hover:border-white/40"
          >
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>
          <button
            onClick={() => goToSlide((activeSlide + 1) % SLIDES.length)}
            aria-label="Next slide"
            className="pointer-events-auto w-10 h-10 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm border border-white/15 text-white transition-all hover:bg-black/60 hover:border-white/40"
          >
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Ghost grid — invisible, used only to measure card positions */}
        <div className="relative z-10 h-full flex flex-col justify-end pointer-events-none">
          <div
            className={`max-w-7xl w-full mx-auto px-6 md:px-12 ${
              isCompact ? "pb-12 md:pb-14" : "pb-24 md:pb-28"
            }`}
          >
            <div ref={cardsRef} className="invisible pointer-events-none">
              <ResearchGrid compact={isCompact} />
            </div>
          </div>
        </div>
      </div>

      {/* Animated overlay: heading label + research cards */}
      {cardsBox && (
        <div className="fixed top-0 left-0 w-screen z-20 pointer-events-none">
          {/* Full-width bg strip behind heading + cards */}
          <div
            ref={bgStripRef}
            className="absolute left-0 w-full bg-linear-to-t from-black/70 via-black/30 to-transparent opacity-0"
            style={{ height: cardsBox.height + 104 }}
          />
          <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative">
            <div
              ref={headingRef}
              className="absolute top-0 left-6 md:left-12 opacity-0 hidden md:block"
            >
              <SectionTitle light>Check out our research focus</SectionTitle>
            </div>
            <ResearchGrid animated compact={isCompact} />
          </div>

          {/* Page indicator dots — below research cards, fades on scroll */}
          <div
            ref={dotsRef}
            className="flex absolute left-1/2 -translate-x-1/2 gap-2 opacity-0"
            style={{ top: cardsBox.top + cardsBox.height + 48 }}
          >
            {SLIDES.map((slide, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                aria-label={`Go to slide ${i + 1}${slide.content ? `: ${slide.content.cta}` : ""}`}
                aria-current={activeSlide === i ? "true" : undefined}
                className={`pointer-events-auto rounded-full transition-all duration-300 ${
                  activeSlide === i
                    ? "w-5 h-1.5 bg-white"
                    : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      <div style={{ height: "100vh" }} className="shrink-0" />
      <div
        style={{
          height: cardsBox ? TOP_GAP + cardsBox.height + BOTTOM_GAP : 0,
        }}
        className="shrink-0"
      />
    </section>
  );
};

export default HomeHero;
