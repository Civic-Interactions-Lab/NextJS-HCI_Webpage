"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/section-title";

const RESEARCH_AREAS = [
  {
    id: "assistive-tech",
    title: "Assistive Tech",
    description:
      "AAC tools to foster self-direction and expressive communication.",
  },
  {
    id: "computing-education",
    title: "Computing Education",
    description:
      "Studying AI harms and building scaffolding for responsible use.",
  },
  {
    id: "future-of-work",
    title: "Future of Work",
    description: "Tools to build better workplaces and reimagine how we work.",
  },
] as const;

const TITLE_WORDS = [
  { text: "Temple", className: "text-white" },
  { text: "HCI", className: "text-well-red" },
  { text: "Lab", className: "text-white" },
] as const;

const TITLE_CHARS = TITLE_WORDS.flatMap((word, wordIndex) => {
  const chars = word.text
    .split("")
    .map((char) => ({ char, className: word.className }));
  return wordIndex < TITLE_WORDS.length - 1
    ? [...chars, { char: " ", className: word.className }]
    : chars;
});

const CHAR_STAGGER = 8;
const CHAR_RANGE = 260;

const easeInCubic = (p: number) => p * p * p;

const AnimatedChar = ({
  scrollY,
  char,
  index,
  className,
}: {
  scrollY: MotionValue<number>;
  char: string;
  index: number;
  className: string;
}) => {
  const start = index * CHAR_STAGGER;

  const progress = useTransform(scrollY, (v) =>
    Math.min(Math.max((v - start) / CHAR_RANGE, 0), 1),
  );

  const y = useTransform(progress, (p) => -340 * easeInCubic(p));
  const x = useTransform(progress, (p) => Math.sin(p * Math.PI) * 22);
  const scale = useTransform(progress, (p) => 1 - 0.65 * easeInCubic(p));
  const opacity = useTransform(progress, (p) => 1 - easeInCubic(p) * 1.1);

  return (
    <motion.span
      style={{ y, x, scale, opacity, display: "inline-block" }}
      className={className}
    >
      {char === " " ? " " : char}
    </motion.span>
  );
};

const HEADING_TEXT = "Check out our research focus";

const HomeHero = () => {
  const [mounted, setMounted] = useState(false);
  const [cardsBox, setCardsBox] = useState<{
    top: number;
    height: number;
  } | null>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  useLayoutEffect(() => {
    if (!cardsRef.current) return;
    const measure = () => {
      if (!cardsRef.current) return;
      const rect = cardsRef.current.getBoundingClientRect();
      setCardsBox({ top: rect.top, height: rect.height });
    };
    measure();

    const raf1 = requestAnimationFrame(() => requestAnimationFrame(measure));
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(measure);
    }

    const observer = new ResizeObserver(measure);
    observer.observe(cardsRef.current);
    if (titleRef.current) observer.observe(titleRef.current);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf1);
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollY } = useScroll();

  const heroHeight = useTransform(scrollY, (v) => {
    const vh = typeof window !== "undefined" ? window.innerHeight : 800;
    return Math.max(vh - v, 0);
  });

  const titleScale = useTransform(scrollY, [0, 320], [1, 0.55]);

  const introX = useTransform(scrollY, [0, 300], [0, 220]);
  const introOpacity = useTransform(scrollY, [0, 280], [1, 0]);

  const TOP_GAP = 80;
  const BOTTOM_GAP = 80;

  const getSlideDistance = () => {
    if (!cardsBox) return 1;
    const vh = typeof window !== "undefined" ? window.innerHeight : 800;
    const room = vh - cardsBox.top;
    const SLOWDOWN = 4;
    return Math.max(Math.min((room / 2) * SLOWDOWN, room - 20), 1);
  };

  const EASE_POWER = 4;

  const DELAY_FRACTION_1 = 0;
  const DELAY_FRACTION_2 = 0.45;
  const DELAY_FRACTION_3 = 0.78;

  const LEAD_LINEAR_WEIGHT = 1;

  const getCardTop1 = (v: number) => {
    if (!cardsBox) return 0;
    const vh = typeof window !== "undefined" ? window.innerHeight : 800;
    const topStart = cardsBox.top;
    const slideDistance = getSlideDistance();
    const topEnd = vh - slideDistance + TOP_GAP;
    const delay = slideDistance * DELAY_FRACTION_1;

    if (v <= slideDistance) {
      const dv = Math.max(v - delay, 0);
      const denom = Math.max(slideDistance - delay, 1);
      const linear = Math.min(dv / denom, 1);
      const eased = Math.pow(linear, EASE_POWER);
      const progress =
        LEAD_LINEAR_WEIGHT * linear + (1 - LEAD_LINEAR_WEIGHT) * eased;
      return topStart + (topEnd - topStart) * progress;
    }
    return vh - v + TOP_GAP;
  };

  const getCardTop2 = (v: number) => {
    if (!cardsBox) return 0;
    const vh = typeof window !== "undefined" ? window.innerHeight : 800;
    const topStart = cardsBox.top;
    const slideDistance = getSlideDistance();
    const topEnd = vh - slideDistance + TOP_GAP;
    const delay = slideDistance * DELAY_FRACTION_2;

    if (v <= slideDistance) {
      const dv = Math.max(v - delay, 0);
      const denom = Math.max(slideDistance - delay, 1);
      const progress = Math.pow(Math.min(dv / denom, 1), EASE_POWER);
      return topStart + (topEnd - topStart) * progress;
    }
    return vh - v + TOP_GAP;
  };

  const getCardTop3 = (v: number) => {
    if (!cardsBox) return 0;
    const vh = typeof window !== "undefined" ? window.innerHeight : 800;
    const topStart = cardsBox.top;
    const slideDistance = getSlideDistance();
    const topEnd = vh - slideDistance + TOP_GAP;
    const delay = slideDistance * DELAY_FRACTION_3;

    if (v <= slideDistance) {
      const dv = Math.max(v - delay, 0);
      const denom = Math.max(slideDistance - delay, 1);
      const progress = Math.pow(Math.min(dv / denom, 1), EASE_POWER);
      return topStart + (topEnd - topStart) * progress;
    }
    return vh - v + TOP_GAP;
  };

  const cardTop1 = useTransform(scrollY, getCardTop1);
  const cardTop2 = useTransform(scrollY, getCardTop2);
  const cardTop3 = useTransform(scrollY, getCardTop3);
  const cardTops = [cardTop1, cardTop2, cardTop3];

  const headingY = useTransform([heroHeight, cardTop1], ([hb, ct]: number[]) =>
    Math.min(hb - 60, ct - 72),
  );

  const headingOpacity = useTransform(scrollY, (v) => {
    const sd = getSlideDistance();
    const fadeOutStart = sd * 0.2;
    const fadeOutEnd = sd * 0.45;
    if (v <= fadeOutStart) return 1;
    if (v <= fadeOutEnd)
      return 1 - (v - fadeOutStart) / (fadeOutEnd - fadeOutStart);
    return 0;
  });

  const getCardBg1 = (v: number) => {
    const slideDistance = getSlideDistance();
    const delay = slideDistance * DELAY_FRACTION_1;
    const dv = Math.max(v - delay, 0);
    const denom = Math.max(slideDistance - delay, 1);
    const linear = Math.min(dv / denom, 1);
    const eased = Math.pow(linear, EASE_POWER);
    const progress =
      LEAD_LINEAR_WEIGHT * linear + (1 - LEAD_LINEAR_WEIGHT) * eased;
    const r = Math.round(170 * progress);
    const g = Math.round(44 * progress);
    const b = Math.round(69 * progress);
    const a = 0.45 + (1 - 0.45) * progress;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  };

  const getCardBg2 = (v: number) => {
    const slideDistance = getSlideDistance();
    const delay = slideDistance * DELAY_FRACTION_2;
    const dv = Math.max(v - delay, 0);
    const denom = Math.max(slideDistance - delay, 1);
    const progress = Math.pow(Math.min(dv / denom, 1), EASE_POWER);
    const r = Math.round(170 * progress);
    const g = Math.round(44 * progress);
    const b = Math.round(69 * progress);
    const a = 0.45 + (1 - 0.45) * progress;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  };

  const getCardBg3 = (v: number) => {
    const slideDistance = getSlideDistance();
    const delay = slideDistance * DELAY_FRACTION_3;
    const dv = Math.max(v - delay, 0);
    const denom = Math.max(slideDistance - delay, 1);
    const progress = Math.pow(Math.min(dv / denom, 1), EASE_POWER);
    const r = Math.round(170 * progress);
    const g = Math.round(44 * progress);
    const b = Math.round(69 * progress);
    const a = 0.45 + (1 - 0.45) * progress;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  };

  const cardBg1 = useTransform(scrollY, getCardBg1);
  const cardBg2 = useTransform(scrollY, getCardBg2);
  const cardBg3 = useTransform(scrollY, getCardBg3);
  const cardBgs = [cardBg1, cardBg2, cardBg3];

  const cardsGrid = (
    <div className="grid grid-cols-3 gap-2 md:gap-4">
      {RESEARCH_AREAS.map((area) => (
        <Link
          key={area.id}
          href="/research"
          className="group flex flex-col gap-1 md:gap-3 bg-black/45 backdrop-blur-md border border-white/10 rounded-xl p-2.5 md:p-5 hover:border-well-red/40 hover:bg-black/60 transition-all"
        >
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-oxanium font-semibold text-white text-base md:text-xl leading-snug group-hover:text-well-red transition-colors">
              {area.title}
            </h3>
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-white/50 transition-all group-hover:translate-x-1 group-hover:text-well-red shrink-0" />
          </div>
          <p className="text-sm md:text-p1 text-white/55 leading-snug">
            {area.description}
          </p>
          <span className="font-oxanium text-xs md:text-sm font-medium text-well-red inline-flex items-center gap-1 mt-1">
            See more <ArrowRight className="w-3 h-3" />
          </span>
        </Link>
      ))}
    </div>
  );

  const cardsGridVisible = (
    <div className="grid grid-cols-3 gap-2 md:gap-4">
      {RESEARCH_AREAS.map((area, index) => (
        <motion.div
          key={area.id}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
            delay: 0.2 + index * 0.15,
          }}
        >
          <motion.div
            style={{ backgroundColor: cardBgs[index], y: cardTops[index] }}
            className="group backdrop-blur-md border border-white/10 rounded-xl hover:border-white/30 transition-colors"
          >
            <Link
              href="/research"
              className="flex flex-col gap-1 md:gap-3 p-2.5 md:p-5"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-oxanium font-semibold text-white text-base md:text-xl leading-snug">
                  {area.title}
                </h3>
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-white/50 transition-all group-hover:translate-x-1 group-hover:text-white shrink-0" />
              </div>
              <p className="text-sm md:text-p1 text-white/70 leading-snug">
                {area.description}
              </p>
              <span className="font-oxanium text-xs md:text-sm font-medium text-white/80 inline-flex items-center gap-1 mt-1">
                See more <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <>
      <motion.div
        style={mounted ? { height: heroHeight } : undefined}
        className="fixed top-0 left-0 w-screen h-screen overflow-hidden z-10"
      >
        <div className="absolute inset-0">
          <Image
            src="/images/cover/NC_05301.jpg"
            alt="Temple HCI Lab"
            fill
            className="object-cover"
            style={{ objectPosition: "center 36%" }}
            priority
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-b from-black/15 via-black/20 to-black/95" />

        <div className="absolute top-28 md:top-32 left-0 w-full px-6 md:px-12 z-10">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:justify-between gap-6">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                ref={titleRef}
                style={{ scale: titleScale }}
                className="origin-bottom-left"
              >
                <h1 className="font-oxanium font-semibold leading-none tracking-tight">
                  {TITLE_CHARS.map((c, index) => (
                    <AnimatedChar
                      key={index}
                      scrollY={scrollY}
                      char={c.char}
                      index={index}
                      className={`text-[40px] font-outfit! md:text-[64px] lg:text-[88px] leading-[0.88] ${c.className}`}
                    />
                  ))}
                </h1>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 120 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
              className="shrink-0"
            >
              <motion.div
                style={{ x: introX, opacity: introOpacity }}
                className="max-w-xs md:max-w-lg flex flex-col gap-4 bg-black/50 border border-white/10 rounded-2xl p-4 md:p-5"
              >
                <p className="text-p3 text-white/90 leading-relaxed">
                  Our research lab takes a human-centered approach to using AI,
                  NLP, and Visualization to facilitate learning and empower
                  non-experts to participate in work that has been previously
                  reserved for trained professionals.
                </p>
                <Button
                  asChild
                  variant="outline"
                  size="default"
                  className="self-start border-2 border-white! bg-transparent! text-white hover:bg-white! hover:text-black px-6 rounded-full"
                >
                  <Link href="/about">Learn more about us</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="relative z-10 h-full flex flex-col justify-end">
          <div className="max-w-7xl w-full mx-auto px-6 md:px-12 pb-16 md:pb-28 flex flex-col gap-4 md:gap-6">
            <div ref={cardsRef} className="invisible pointer-events-none">
              {cardsGrid}
            </div>
          </div>
        </div>
      </motion.div>

      {mounted && cardsBox && (
        <motion.div
          style={{ top: 0, left: 0, width: "100vw" }}
          className="fixed z-20"
        >
          <div className="max-w-7xl w-full mx-auto px-6 md:px-12 relative">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.5 }}
              style={{ y: headingY }}
              className="absolute top-0 left-6 md:left-12"
            >
              <motion.div style={{ opacity: headingOpacity }}>
                <SectionTitle light>{HEADING_TEXT}</SectionTitle>
              </motion.div>
            </motion.div>
            {cardsGridVisible}
          </div>
        </motion.div>
      )}

      <div style={{ height: "100vh" }} className="shrink-0" />
      <div
        style={{
          height: cardsBox ? TOP_GAP + cardsBox.height + BOTTOM_GAP : 0,
        }}
        className="shrink-0"
      />
    </>
  );
};

export default HomeHero;
