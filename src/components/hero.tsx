"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const COVER_MAP: Record<string, string> = {
  "/about": "/images/cover/6-studio.JPG",
  "/about/events": "/images/cover/6-studio.JPG",
  "/about/news": "/images/cover/6-studio.JPG",
  "/about/contact": "/images/cover/6-studio.JPG",
  "/research": "/images/cover/6-studio.JPG",
  "/people": "/images/cover/6-studio.JPG",
  "/people/alumni": "/images/cover/6-studio.JPG",
  "/people/collaborators": "/images/cover/6-studio.JPG",
  "/pathways": "/images/cover/6-studio.JPG",
  "/sponsors": "/images/cover/6-studio.JPG",
  "/sponsors/become": "/images/cover/6-studio.JPG",
  "/join": "/images/cover/6-studio.JPG",
};

const LABEL_OVERRIDES: Record<string, string> = {
  "become": "Become a Sponsor",
};

function capitalize(segment: string) {
  return LABEL_OVERRIDES[segment] ?? segment
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

const Hero = () => {
  const pathname = usePathname();

  const coverImage =
    COVER_MAP[pathname] ??
    COVER_MAP[`/${pathname.split("/").filter(Boolean)[0]}`] ??
    "/images/cover/6-studio.JPG";

  const segments = pathname.split("/").filter(Boolean);
  const parent = segments[0] ? capitalize(segments[0]) : "";
  const child = segments[1] ? capitalize(segments[1]) : null;

  return (
    <div className="relative w-full bg-cover h-[320px] md:h-[360px] lg:h-[400px] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={coverImage}
          alt={child ?? parent ?? "Cover"}
          fill
          className="object-cover"
          style={{ objectPosition: "center 36%" }}
          priority
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 z-10 bg-black/40" />
      <div className="relative z-10 w-full h-full flex flex-col items-start justify-center px-6 md:px-12 pt-16 max-w-7xl mx-auto">
        {child ? (
          <div className="flex flex-col gap-2">
            <Link
              href={`/${segments[0]}`}
              className="font-outfit text-xl md:text-2xl text-white/60 hover:text-white transition-colors w-fit"
            >
              {parent}
            </Link>
            <h1 className="font-oxanium font-medium text-[36px] md:text-[48px] lg:text-[60px] leading-tight text-white">
              {child}
            </h1>
          </div>
        ) : (
          <h1 className="font-oxanium font-medium text-[36px] md:text-[48px] lg:text-[60px] leading-tight text-white">
            {parent}
          </h1>
        )}
      </div>
    </div>
  );
};

export default Hero;
