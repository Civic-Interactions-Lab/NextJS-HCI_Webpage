"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { SectionTitle } from "@/components/section-title";

const ADDRESS = "1925 N 12th St, Philadelphia, PA 19122";
const encoded = encodeURIComponent(ADDRESS);
const mapUrl = `https://www.google.com/maps?q=${encoded}&z=17&output=embed`;

const ContactLocationMap = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="flex flex-col gap-8">
      <SectionTitle>Our Location</SectionTitle>
      <div className="relative" ref={containerRef}>
        <div className="w-full rounded-2xl overflow-hidden shadow-lg border border-gray-300" style={{ height: "400px" }}>
          {inView ? (
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={mapUrl}
              title="Our Location"
              className="w-full h-full"
            />
          ) : (
            <div className="w-full h-full bg-thunder/5 animate-pulse rounded-2xl" />
          )}
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={`https://www.google.com/maps?q=${encoded}`}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 bg-transparent cursor-pointer rounded-lg"
              aria-label="Open in Google Maps"
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Click to open in Google Maps</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </section>
  );
};

export default ContactLocationMap;
