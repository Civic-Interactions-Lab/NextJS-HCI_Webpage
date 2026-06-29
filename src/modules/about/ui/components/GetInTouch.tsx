"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Mail, Users } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionTitle } from "@/components/section-title";

gsap.registerPlugin(ScrollTrigger);

const GetInTouch = () => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-card", {
        opacity: 0, y: 32, stagger: 0.15, duration: 0.6, ease: "power2.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 85%", once: true },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="flex flex-col gap-10">
      <SectionTitle>Get In Touch</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="contact-card flex flex-col gap-4 p-8 bg-alabaster rounded-2xl border border-thunder/8">
          <Mail className="w-8 h-8 text-well-red" />
          <div className="flex flex-col gap-1">
            <p className="font-outfit font-semibold text-lg text-thunder">Email Us</p>
            <p className="text-p1 text-thunder/70">
              Reach out with questions about the lab, research, or collaborations.
            </p>
          </div>
          <Link
            href="mailto:hcilab@temple.edu"
            className="group inline-flex items-center gap-1.5 font-outfit text-sm font-medium text-well-red hover:text-well-red/70 transition-colors w-fit"
          >
            hcilab@temple.edu{" "}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="contact-card flex flex-col gap-4 p-8 bg-alabaster rounded-2xl border border-thunder/8">
          <Users className="w-8 h-8 text-well-red" />
          <div className="flex flex-col gap-1">
            <p className="font-outfit font-semibold text-lg text-thunder">Join the Lab</p>
            <p className="text-p1 text-thunder/70">
              Undergraduates interested in HCI research — we&apos;d love to hear from you.
            </p>
          </div>
          <Link
            href="/join"
            className="group inline-flex items-center gap-1.5 font-outfit text-sm font-medium text-well-red hover:text-well-red/70 transition-colors w-fit"
          >
            Learn more{" "}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
