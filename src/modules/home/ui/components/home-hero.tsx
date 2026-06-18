"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import { SectionTitle } from "@/components/section-title";

// ─── Data ────────────────────────────────────────────────────────────────────

const RESEARCH_AREAS = [
  { id: "assistive-tech", title: "Assistive Tech", description: "AAC tools to foster self-direction and expressive communication." },
  { id: "computing-education", title: "Computing Education", description: "Studying AI harms and building scaffolding for responsible use." },
  { id: "future-of-work", title: "Future of Work", description: "Tools to build better workplaces and reimagine how we work." },
] as const;

const TITLE_WORDS = [
  { text: "Temple", className: "text-white" },
  { text: "HCI", className: "text-well-red" },
  { text: "Lab", className: "text-white" },
] as const;

const TITLE_CHARS = TITLE_WORDS.flatMap(({ text, className }, wi) => [
  ...text.split("").map((char) => ({ char, className })),
  ...(wi < TITLE_WORDS.length - 1 ? [{ char: " ", className }] : []),
]);

// ─── Animation constants ──────────────────────────────────────────────────────

const CHAR_STAGGER = 8;
const CHAR_RANGE = 260;
const TOP_GAP = 80;
const BOTTOM_GAP = 80;
const EASE_POWER = 4;
const CARD_DELAYS = [0, 0.45, 0.78];
const CARD_EASE_POWERS = [1, EASE_POWER, EASE_POWER];

// ─── Card math helpers ────────────────────────────────────────────────────────

type CardsBox = { top: number; height: number };

const getSlideDistance = (box: CardsBox): number => {
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  return Math.max(Math.min(((vh - box.top) / 2) * 4, vh - box.top - 20), 1);
};

const getCardTop = (box: CardsBox, delayFrac: number, easePower: number, v: number): number => {
  const vh = typeof window !== "undefined" ? window.innerHeight : 800;
  const sd = getSlideDistance(box);
  const dv = Math.max(v - sd * delayFrac, 0);
  const progress = Math.pow(Math.min(dv / Math.max(sd - sd * delayFrac, 1), 1), easePower);
  return v <= sd ? box.top + (vh - sd + TOP_GAP - box.top) * progress : vh - v + TOP_GAP;
};

const getCardBg = (box: CardsBox, delayFrac: number, easePower: number, v: number): string => {
  const sd = getSlideDistance(box);
  const dv = Math.max(v - sd * delayFrac, 0);
  const progress = Math.pow(Math.min(dv / Math.max(sd - sd * delayFrac, 1), 1), easePower);
  return `rgba(${Math.round(170 * progress)}, ${Math.round(44 * progress)}, ${Math.round(69 * progress)}, ${0.45 + 0.55 * progress})`;
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const ResearchCardContent = ({ area }: { area: (typeof RESEARCH_AREAS)[number] }) => (
  <>
    <h3 className="font-oxanium font-semibold text-white text-base md:text-xl leading-snug">{area.title}</h3>
    <p className="text-sm md:text-p1 text-white/70 leading-snug">{area.description}</p>
    <span className="font-oxanium text-xs md:text-sm font-medium text-white/80 inline-flex items-center gap-1 mt-1">
      See more <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
    </span>
  </>
);

const GhostGrid = () => (
  <div className="grid grid-cols-3 gap-2 md:gap-4">
    {RESEARCH_AREAS.map((area) => (
      <Link key={area.id} href="/research" className="group flex flex-col gap-1 md:gap-3 bg-black/45 backdrop-blur-md border border-white/10 rounded-xl p-2.5 md:p-5">
        <ResearchCardContent area={area} />
      </Link>
    ))}
  </div>
);

const AnimatedGrid = () => (
  <div className="grid grid-cols-3 gap-2 md:gap-4">
    {RESEARCH_AREAS.map((area, index) => (
      <div key={area.id} data-gsap-card={index} style={{ opacity: 0 }} className="group backdrop-blur-md border border-white/10 rounded-xl hover:border-white/30 transition-colors">
        <Link href="/research" className="flex flex-col gap-1 md:gap-3 p-2.5 md:p-5">
          <ResearchCardContent area={area} />
        </Link>
      </div>
    ))}
  </div>
);

// ─── Component ────────────────────────────────────────────────────────────────

const HomeHero = () => {
  const [mounted, setMounted] = useState(false);
  const [cardsBox, setCardsBox] = useState<CardsBox | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<HTMLHeadingElement>(null);
  const introBoxRef = useRef<HTMLDivElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);
  const rollingLogoRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  // Hero shrinks as user scrolls
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const update = () => { el.style.height = `${Math.max(window.innerHeight - window.scrollY, 0)}px`; };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);

  // Title scales down on scroll
  useEffect(() => {
    if (!titleRef.current) return;
    gsap.set(titleRef.current, { transformOrigin: "bottom left" });
    const ctx = gsap.context(() => {
      gsap.to(titleRef.current, { scale: 0.55, ease: "none", scrollTrigger: { trigger: document.body, start: "top top", end: "+=320", scrub: true } });
    });
    return () => ctx.revert();
  }, []);

  // Title chars cascade out on scroll
  useEffect(() => {
    if (!charsRef.current) return;
    const chars = charsRef.current.querySelectorAll<HTMLSpanElement>(".title-char");
    if (!chars.length) return;
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: { trigger: document.body, start: "top top", end: `+=${CHAR_RANGE + (chars.length - 1) * CHAR_STAGGER}`, scrub: true },
      }).to(chars, { duration: CHAR_RANGE, y: -340, scale: 0.35, opacity: 0, ease: "power3.in", stagger: CHAR_STAGGER });
    });
    return () => ctx.revert();
  }, []);

  // Intro box: clip-path reveal from right, then scroll-out
  useEffect(() => {
    if (!introBoxRef.current) return;
    const el = introBoxRef.current;
    gsap.set(el, { visibility: "visible", clipPath: "inset(0 0 0 100%)", opacity: 1, x: 0 });

    if (window.scrollY < 20) {
      gsap.to(el, { clipPath: "inset(0 0 0 0%)", duration: 0.9, ease: "power3.inOut", delay: 0.2 });
    } else {
      gsap.set(el, { clipPath: "inset(0 0 0 0%)" });
    }

    const st = ScrollTrigger.create({
      trigger: document.documentElement, start: "top top", end: "+=300", scrub: true,
      onUpdate: (self) => gsap.set(el, { x: self.progress * 220, opacity: 1 - self.progress }),
    });
    return () => st.kill();
  }, []);

  // Cards: entrance + scroll-driven position & color
  useEffect(() => {
    if (!mounted || !cardsBox) return;
    let scrollCleanup: (() => void) | null = null;
    const timer = setTimeout(() => {
      const cards = Array.from(document.querySelectorAll<HTMLDivElement>("[data-gsap-card]"));
      if (cards.length !== 3) return;
      const top = (i: number, v: number) => getCardTop(cardsBox, CARD_DELAYS[i], CARD_EASE_POWERS[i], v);
      const bg = (i: number, v: number) => getCardBg(cardsBox, CARD_DELAYS[i], CARD_EASE_POWERS[i], v);
      const sv = window.scrollY;
      const heroH = window.innerHeight;
      const setPointer = (card: HTMLDivElement, scrollY: number) => {
        // Disable pointer events once hero is scrolled out of view
        card.style.pointerEvents = scrollY < heroH ? "auto" : "none";
      };
      cards.forEach((card, i) => {
        gsap.set(card, { backgroundColor: bg(i, sv) });
        if (sv < 20) {
          // Normal entrance animation when at (or very near) the top
          gsap.fromTo(card, { opacity: 0, y: top(i, sv) + 50 }, {
            opacity: 1, y: top(i, sv), duration: 0.9, ease: "power3.out", delay: 0.3 + i * 0.12, overwrite: true,
            onComplete: () => setPointer(card, window.scrollY),
          });
        } else {
          // Page loaded mid-scroll: place cards immediately at the correct position
          gsap.set(card, { opacity: 1, y: top(i, sv) });
          setPointer(card, sv);
        }
      });
      const handleScroll = () => {
        const v = window.scrollY;
        cards.forEach((card, i) => {
          gsap.set(card, { y: top(i, v), backgroundColor: bg(i, v) });
          setPointer(card, v);
        });
      };
      window.addEventListener("scroll", handleScroll, { passive: true });
      scrollCleanup = () => window.removeEventListener("scroll", handleScroll);
    }, 50);
    return () => { clearTimeout(timer); scrollCleanup?.(); };
  }, [mounted, cardsBox]);

  // Rolling logo reveals the title text
  useEffect(() => {
    const container = titleContainerRef.current;
    const logoWrapper = rollingLogoRef.current;
    if (!container || !logoWrapper) return;
    const rect = container.getBoundingClientRect();
    const logoSize = logoWrapper.offsetWidth;
    const startX = -(rect.left + logoSize);
    const endX = rect.width + logoSize;
    const totalRotation = ((endX - startX) / ((logoSize / 2) * 0.55)) * (180 / Math.PI);
    gsap.set(container, { visibility: "visible", clipPath: "inset(0 100% 0 0)" });
    gsap.set(logoWrapper, { x: startX, y: Math.max(0, (rect.height - logoSize) / 2), scale: 0.2, rotation: 0, opacity: 1 });
    const tl = gsap.timeline({ delay: 0.2 });
    tl.to(logoWrapper, {
      x: endX, scale: 1, rotation: totalRotation, duration: 1.5, ease: "power2.inOut",
      onUpdate() {
        const x = gsap.getProperty(logoWrapper, "x") as number;
        const s = gsap.getProperty(logoWrapper, "scaleX") as number;
        container.style.clipPath = `inset(0 ${Math.max(0, rect.width - x - (logoSize * s) / 2)}px 0 0)`;
      },
      onComplete: () => { container.style.clipPath = "none"; },
    }, 0);
    tl.to(logoWrapper, { opacity: 0, duration: 0.25 }, "-=0.3");
    return () => { tl.kill(); if (container) gsap.set(container, { clearProps: "clipPath,visibility" }); };
  }, []);

  // Heading: y position tracks hero + fade out on scroll
  useEffect(() => {
    const el = headingRef.current;
    if (!mounted || !cardsBox || !el) return;
    gsap.to(el, { opacity: 1, duration: 0.4, delay: 0.5, ease: "power2.out" });
    const update = () => {
      const v = window.scrollY;
      const hb = Math.max(window.innerHeight - v, 0);
      const ct = getCardTop(cardsBox, CARD_DELAYS[0], CARD_EASE_POWERS[0], v);
      gsap.set(el, { y: Math.min(hb - 60, ct - 72), ...(v > 0 && { opacity: Math.max(0, 1 - v / 60) }) });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, [mounted, cardsBox]);

  // Cards placeholder measurement
  useLayoutEffect(() => {
    if (!cardsRef.current) return;
    const measure = () => {
      if (!cardsRef.current || !heroRef.current) return;
      // Hero height shrinks when scrollY > 0, collapsing the ghost grid to top:0.
      // Temporarily restore full height so getBoundingClientRect is always accurate.
      const saved = heroRef.current.style.height;
      heroRef.current.style.height = `${window.innerHeight}px`;
      const r = cardsRef.current.getBoundingClientRect();
      heroRef.current.style.height = saved;
      setCardsBox({ top: r.top, height: r.height });
    };
    measure();
    const raf = requestAnimationFrame(() => requestAnimationFrame(measure));
    if (typeof document !== "undefined" && "fonts" in document) document.fonts.ready.then(measure);
    const observer = new ResizeObserver(measure);
    observer.observe(cardsRef.current);
    if (titleRef.current) observer.observe(titleRef.current);
    window.addEventListener("resize", measure);
    return () => { cancelAnimationFrame(raf); observer.disconnect(); window.removeEventListener("resize", measure); };
  }, []);

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <>
      <div ref={heroRef} className="fixed top-0 left-0 w-screen h-screen overflow-hidden z-10 pointer-events-none">
        <div className="absolute inset-0">
          <Image src="/images/cover/NC_05301.jpg" alt="Temple HCI Lab" fill className="object-cover" style={{ objectPosition: "center 36%" }} priority sizes="100vw" />
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-black/15 via-black/20 to-black/95" />

        <div className="absolute top-28 md:top-32 left-0 w-full px-6 md:px-12 z-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:justify-between gap-6">

            {/* Title with rolling logo entrance */}
            <div ref={titleRef} className="origin-bottom-left relative">
              <div ref={rollingLogoRef} className="absolute pointer-events-none z-10 opacity-0" style={{ top: 0, left: 0 }}>
                <Image src="/logos/hci-logo.png" alt="" width={88} height={88} className="rounded-md" />
              </div>
              <div ref={titleContainerRef} className="invisible">
                <h1 ref={charsRef} className="font-oxanium font-semibold leading-none tracking-tight">
                  {TITLE_CHARS.map((c, index) => (
                    <span key={index} className={`title-char inline-block text-[40px] font-outfit! md:text-[64px] lg:text-[88px] leading-[0.88] ${c.className}`}>
                      {c.char === " " ? " " : c.char}
                    </span>
                  ))}
                </h1>
              </div>
            </div>

            {/* Intro box */}
            <div ref={introBoxRef} className="shrink-0 max-w-xs md:max-w-lg flex flex-col gap-4 bg-black/50 border border-white/10 rounded-2xl p-4 md:p-5 pointer-events-auto invisible">
              <p className="text-p3 text-white/90 leading-relaxed">
                Our research lab takes a human-centered approach to using AI, NLP, and Visualization to facilitate
                learning and empower non-experts to participate in work that has been previously reserved for trained professionals.
              </p>
              <Link href="/about" className="group self-start inline-flex items-center gap-1.5 font-oxanium font-medium text-sm text-white/90 hover:text-white border border-white/60 hover:border-white px-6 py-2 rounded-full transition-colors">
                Learn more about us <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

          </div>
        </div>

        {/* Ghost grid — invisible, used only to measure card positions */}
        <div className="relative z-10 h-full flex flex-col justify-end pointer-events-none">
          <div className="max-w-7xl w-full mx-auto px-6 md:px-12 pb-16 md:pb-28">
            <div ref={cardsRef} className="invisible pointer-events-none">
              <GhostGrid />
            </div>
          </div>
        </div>
      </div>

      {/* Animated overlay: heading label + research cards */}
      {mounted && cardsBox && (
        <div className="fixed top-0 left-0 w-screen z-20 pointer-events-none">
          <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative">
            <div ref={headingRef} className="absolute top-0 left-6 md:left-12 opacity-0">
              <SectionTitle light>Check out our research focus</SectionTitle>
            </div>
            <AnimatedGrid />
          </div>
        </div>
      )}

      <div style={{ height: "100vh" }} className="shrink-0" />
      <div style={{ height: cardsBox ? TOP_GAP + cardsBox.height + BOTTOM_GAP : 0 }} className="shrink-0" />
    </>
  );
};

export default HomeHero;
