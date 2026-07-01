"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EventsIntro = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".intro-line", {
        opacity: 0,
        y: 50,
        stagger: 0.12,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      aria-label="Temple HCI Lab events overview"
      className="flex flex-col gap-4"
    >
      <p className="intro-line font-outfit text-sm font-medium text-well-red uppercase tracking-widest">
        What we do together
      </p>
      <h2 className="intro-line font-outfit font-medium text-4xl md:text-5xl lg:text-6xl text-thunder leading-tight">
        Hackathons.{" "}
        <span className="text-well-red">Open</span>{" "}
        Houses. Showcases.
      </h2>
      <p className="intro-line text-p1 text-thunder/70 leading-relaxed max-w-2xl">
        Events at the Temple HCI Lab are where community happens — from
        overnight hackathons and open houses to conference travel and
        end-of-semester showcases. There&apos;s always something going on.
      </p>
    </section>
  );
};

export default EventsIntro;
