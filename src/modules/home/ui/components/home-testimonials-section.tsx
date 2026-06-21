"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { SectionTitle } from "@/components/section-title";
import { SectionLink } from "@/components/section-link";
import { getImageSrc } from "@/lib/utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Testimonial = { _id: string; quote: string | null; role: string | null; person: { name: string | null; img: any } | null };

interface Props { testimonials: Testimonial[] }

const QUOTE_COLORS  = ["text-well-red", "text-gold", "text-sky", "text-grass"];
const SIDE_SCALE    = 0.82;
const SIDE_OPACITY  = 0.45;
const SIDE_MAX_H    = 440;
const QUOTE_SIDE_H  = 176; // ~6 lines at text-p1 leading-relaxed
const QUOTE_FULL_H  = 600;
const GAP = 28;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const circSlot = (i: number, active: number, n: number): number => {
  const raw = ((i - active) % n + n) % n;
  return raw <= Math.floor(n / 2) ? raw : raw - n;
};

const slotX = (slot: number, cardW: number): number => {
  const sideW = cardW * SIDE_SCALE;
  const s = Math.max(-2, Math.min(2, slot));
  if (s === 0) return 0;
  const sign = Math.sign(s);
  return Math.abs(s) === 1
    ? sign * (cardW / 2 + GAP + sideW / 2)
    : sign * (cardW / 2 + GAP + sideW + GAP + sideW / 2);
};

const TestimonialsSection = ({ testimonials }: Props) => {
  const [active, setActive] = useState(0);
  const activeRef  = useRef(0);
  const cardsRef   = useRef<(HTMLDivElement | null)[]>([]);
  const animating  = useRef(false);
  const n = testimonials.length;

  const updateCards = useCallback((newActive: number, animate: boolean) => {
    const cards = cardsRef.current.filter((c): c is HTMLDivElement => c !== null);
    if (!cards.length) return;
    const cardW = cards[0].offsetWidth;

    cards.forEach((card, i) => {
      const slot    = circSlot(i, newActive, n);
      const abs     = Math.abs(slot);
      const targetX = slotX(slot, cardW);
      const scale   = abs === 0 ? 1 : SIDE_SCALE;
      const opacity = abs === 0 ? 1 : abs === 1 ? SIDE_OPACITY : 0;
      const zIndex  = abs === 0 ? 10 : abs === 1 ? 5 : 0;

      const quoteEl   = card.querySelector<HTMLElement>("[data-quote]");
      const quoteEndH = abs === 0 ? QUOTE_FULL_H : QUOTE_SIDE_H;

      if (!animate) {
        card.style.maxHeight = abs === 0 ? "2000px" : `${SIDE_MAX_H}px`;
        if (quoteEl) quoteEl.style.maxHeight = `${quoteEndH}px`;
        gsap.set(card, { x: targetX, scale, opacity, zIndex });
        return;
      }

      const startH      = parseFloat(card.style.maxHeight) || SIDE_MAX_H;
      const endH        = abs === 0 ? 2000 : SIDE_MAX_H;
      const quoteStartH = parseFloat(quoteEl?.style.maxHeight ?? "") || QUOTE_SIDE_H;

      gsap.to(card, {
        x: targetX, scale, opacity, zIndex,
        duration: 0.75,
        ease: "power3.inOut",
        overwrite: "auto",
        onUpdate() {
          card.style.maxHeight = `${lerp(startH, endH, this.ratio)}px`;
          if (quoteEl) quoteEl.style.maxHeight = `${lerp(quoteStartH, quoteEndH, this.ratio)}px`;
        },
      });
    });

    if (animate) setTimeout(() => { animating.current = false; }, 780);
  }, [n]);

  const goTo = useCallback((newActive: number) => {
    if (animating.current) return;
    const cards = cardsRef.current.filter((c): c is HTMLDivElement => c !== null);
    if (!cards.length) return;
    const cardW   = cards[0].offsetWidth;
    const wrapped = ((newActive % n) + n) % n;

    // Pre-snap wrap-around cards so they enter from the correct side
    cards.forEach((card, i) => {
      const oldSlot    = circSlot(i, activeRef.current, n);
      const newSlotVal = circSlot(i, wrapped, n);
      const crosses    = oldSlot !== 0 && newSlotVal !== 0 && Math.sign(oldSlot) !== Math.sign(newSlotVal);
      if (crosses) {
        gsap.set(card, { x: slotX(Math.sign(newSlotVal) * 2, cardW), opacity: 0, zIndex: 0 });
      }
    });

    animating.current  = true;
    activeRef.current  = wrapped;
    setActive(wrapped);
    updateCards(wrapped, true);
  }, [n, updateCards]);

  useEffect(() => {
    const cards = cardsRef.current.filter((c): c is HTMLDivElement => c !== null);
    if (!cards.length) return;
    cards.forEach((card) => {
      card.style.maxHeight = `${SIDE_MAX_H}px`;
      gsap.set(card, { xPercent: -50, yPercent: -50, x: 0, opacity: 0, zIndex: 0 });
    });
    const raf = requestAnimationFrame(() => {
      activeRef.current = 0;
      setActive(0);
      updateCards(0, false);
    });
    const onResize = () => updateCards(activeRef.current, false);
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, [testimonials, updateCards]);

  if (!testimonials.length) return null;

  return (
    <section className="w-full space-y-8">
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-2">
          <SectionTitle>What People Say</SectionTitle>
          <SectionLink href="/people">Meet the people</SectionLink>
        </div>

        {n > 1 && (
          <div className="flex gap-2 shrink-0 pb-1">
            {([[-1, ChevronLeft, "Previous testimonial"], [1, ChevronRight, "Next testimonial"]] as const).map(([dir, Icon, label]) => (
              <button
                key={dir}
                onClick={() => goTo(active + dir)}
                aria-label={label}
                className="w-10 h-10 rounded-full border border-thunder/20 flex items-center justify-center text-thunder/60 hover:border-thunder/60 hover:text-thunder transition-colors"
              >
                <Icon className="w-5 h-5" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Ghost: invisible in-flow element that sets the container height
          to the active card's natural size. */}
      <div className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="invisible pointer-events-none flex flex-col gap-4 rounded-2xl p-6 md:p-8
                     w-[65vw] md:w-[380px] lg:w-[420px] mx-auto"
        >
          <Quote className="w-6 h-6 opacity-0" />
          <p className="text-p1 leading-relaxed">{testimonials[active]?.quote}</p>
          <div className="flex items-center gap-3 pt-4 border-t border-thunder/10">
            <div className="w-10 h-10 rounded-full shrink-0" />
            <div>
              <p className="label-4">Name</p>
              <p className="text-p3">Role</p>
            </div>
          </div>
        </div>

        {testimonials.map((t, i) => {
          const imgSrc = t.person?.img ? getImageSrc(t.person.img) : null;
          return (
            <div
              key={t._id}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="absolute top-1/2 left-1/2 overflow-hidden
                         w-[65vw] md:w-[380px] lg:w-[420px]
                         flex flex-col gap-4 bg-alabaster rounded-2xl p-6 md:p-8"
              style={{ willChange: "transform, opacity" }}
            >
              <Quote className={`w-6 h-6 shrink-0 ${QUOTE_COLORS[i % QUOTE_COLORS.length]}`} fill="currentColor" strokeWidth={0} />
              <p data-quote className="text-p1 text-thunder/80 leading-relaxed overflow-hidden">
                {t.quote}
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-thunder/10 mt-auto">
                {imgSrc ? (
                  <Image
                    src={imgSrc}
                    alt={t.person?.name || ""}
                    width={40}
                    height={40}
                    className="w-10 h-10 rounded-full object-cover shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-thunder/15 shrink-0" />
                )}
                <div>
                  <p className="label-4 text-thunder">{t.person?.name}</p>
                  <p className="text-p3 text-thunder/55">{t.role}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TestimonialsSection;
