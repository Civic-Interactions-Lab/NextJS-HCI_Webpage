"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const COVER_MAP: Record<string, string> = {
  "/":                     "/images/cover/6-studio.JPG",
  "/about":                "/images/cover/6-studio.JPG",
  "/about/events":         "/images/cover/6-studio.JPG",
  "/about/news":           "/images/cover/6-studio.JPG",
  "/about/contact":        "/images/cover/6-studio.JPG",
  "/research":             "/images/cover/6-studio.JPG",
  "/people":               "/images/cover/6-studio.JPG",
  "/people/alumni":        "/images/cover/6-studio.JPG",
  "/people/collaborators": "/images/cover/6-studio.JPG",
  "/courses":              "/images/cover/6-studio.JPG",
  "/sponsors":             "/images/cover/6-studio.JPG",
  "/sponsors/become":      "/images/cover/6-studio.JPG",
  "/join":                 "/images/cover/6-studio.JPG",
};

function capitalize(segment: string) {
  return segment
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

const Hero = () => {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const coverImage =
    COVER_MAP[pathname] ??
    COVER_MAP[`/${pathname.split("/").filter(Boolean)[0]}`] ??
    "/images/cover/6-studio.JPG";

  if (isHome) {
    return (
      <div className="relative w-screen h-[400px] md:h-[450px] lg:h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={coverImage}
            alt="Temple HCI Lab"
            fill
            className="object-cover"
            style={{ objectPosition: "center 36%" }}
            priority
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 z-10 bg-black/50" />
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 md:px-12 gap-6 pt-16">
          <h1 className="font-oxanium font-medium text-[64px] md:text-[90px] lg:text-[110px] leading-tight text-white text-center">
            Temple HCI Lab
          </h1>
          <p className="text-p1 text-white/80 max-w-2xl text-center">
            Our research lab takes a human-centered approach to using AI, NLP, and Visualization to facilitate learning and empower non-experts to participate in work that has been previously reserved for trained professionals.
          </p>
          <Link href="/about">
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white! bg-transparent! text-white hover:bg-white! hover:text-black px-8 rounded-full"
            >
              Learn more about us
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const segments = pathname.split("/").filter(Boolean);
  const parent = segments[0] ? capitalize(segments[0]) : "";
  const child = segments[1] ? capitalize(segments[1]) : null;

  return (
    <div className="relative w-screen mx-auto bg-cover h-[320px] md:h-[360px] lg:h-[400px] overflow-hidden">
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
            <span className="text-p1 text-white/60">{parent}</span>
            <h1 className="font-oxanium font-medium text-[36px] md:text-[48px] lg:text-[60px] leading-tight text-white">{child}</h1>
          </div>
        ) : (
          <h1 className="font-oxanium font-medium text-[36px] md:text-[48px] lg:text-[60px] leading-tight text-white">{parent}</h1>
        )}
      </div>
    </div>
  );
};

export default Hero;
