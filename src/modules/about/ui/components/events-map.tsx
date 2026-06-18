"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "mapbox-gl/dist/mapbox-gl.css";
import { Map, Marker } from "react-map-gl/mapbox-legacy";
import { SectionTitle } from "@/components/section-title";

gsap.registerPlugin(ScrollTrigger);

// SERC Building, Temple University — 1925 N 12th St, Philadelphia, PA 19122
const LAB_LNG = -75.1495;
const LAB_LAT = 39.9816;

const EventsMap = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(textRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 85%",
          once: true,
        },
      });
      gsap.from(".map-container", {
        opacity: 0,
        y: 40,
        duration: 0.6,
        delay: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 85%",
          once: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="flex flex-col gap-6">
      <div ref={textRef}>
        <SectionTitle>Where to Find Us</SectionTitle>
      </div>

      <div className="map-container w-full h-[400px] rounded-2xl overflow-hidden shadow-lg">
        <Map
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          initialViewState={{
            longitude: LAB_LNG,
            latitude: LAB_LAT,
            zoom: 15,
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/mapbox/light-v11"
        >
          <Marker longitude={LAB_LNG} latitude={LAB_LAT} anchor="bottom">
            <div className="flex flex-col items-center gap-1">
              <div className="w-4 h-4 rounded-full bg-well-red shadow-lg border-2 border-white" />
              <div className="w-0.5 h-3 bg-well-red/60 rounded-full" />
            </div>
          </Marker>
        </Map>
      </div>

      <div className="flex flex-col gap-1">
        <p className="label-5 text-thunder uppercase tracking-wide">
          HCI Mailing Address
        </p>
        <p className="text-p2 text-thunder/70">
          Temple University HCI Lab · 1925 N 12th St (SERC 301) ·
          Philadelphia, PA 19122
        </p>
      </div>
    </section>
  );
};

export default EventsMap;
