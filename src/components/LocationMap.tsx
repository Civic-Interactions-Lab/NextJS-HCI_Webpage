"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface LocationMapProps {
  address?: string;
  coordinates?: { lat: number; lng: number };
  placeName?: string;
  title?: string;
  height?: string;
  zoom?: number;
  className?: string;
  showTitle?: boolean;
}

const LocationMap = ({
  address,
  coordinates,
  placeName,
  title = "Our Location",
  height = "400px",
  zoom = 17,
  className = "",
  showTitle = true,
}: LocationMapProps) => {
  const location = coordinates
    ? `${coordinates.lat},${coordinates.lng}`
    : address || "";

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

  if (!location) {
    return (
      <div
        className={`bg-gray-100 rounded-lg flex items-center justify-center ${className}`}
        style={{ height }}
      >
        <p className="text-gray-500">Location not provided</p>
      </div>
    );
  }

  const encodedLocation = encodeURIComponent(location);
  const mapUrl = `https://www.google.com/maps?q=${encodedLocation}&z=${zoom}&output=embed`;

  return (
    <div className={`w-full ${className}`}>
      {showTitle && (
        <div className="mb-3 font-outfit">
          <h3 className="text-base md:text-lg font-bold text-primary-red-800">
            {title}
          </h3>
          {placeName && (
            <h4 className="ext-base md:text-lg font-medium text-gray-800">
              {placeName}
            </h4>
          )}
          <p className="text-sm text-gray-600 mt-1">{location}</p>
        </div>
      )}
      <div className="relative" ref={containerRef}>
        <div
          className="w-full rounded-2xl overflow-hidden shadow-lg border border-gray-300"
          style={{ height }}
        >
          {inView ? (
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={mapUrl}
              title={title}
              className="w-full h-full"
            />
          ) : (
            <div className="w-full h-full bg-thunder/5 animate-pulse rounded-2xl" />
          )}
        </div>

        {/* Overlay to open map in new tab */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={`https://www.google.com/maps?q=${encodedLocation}`}
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
    </div>
  );
};

export default LocationMap;
