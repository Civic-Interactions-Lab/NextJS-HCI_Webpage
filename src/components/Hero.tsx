"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import {
  AboutHeroQueryResult,
  CoursesHeroQueryResult,
  JoinHeroQueryResult,
  PeopleHeroQueryResult,
  ResearchHeroQueryResult,
  SponsorsHeroQueryResult,
} from "../../sanity.types";
import { getImageSrc } from "@/lib/utils";
import Link from "next/link";

interface HeroProps {
  imageMap?: {
    about?: AboutHeroQueryResult;
    research?: ResearchHeroQueryResult;
    people?: PeopleHeroQueryResult;
    courses?: CoursesHeroQueryResult;
    sponsors?: SponsorsHeroQueryResult;
    join?: JoinHeroQueryResult;
  };
  image?: string | SanityImageSource | null;
  alt?: string;
  title?: string;
  height?: "small" | "large";
  subtitle?: string;
  showCTA?: boolean;
}

const Hero = ({
  imageMap,
  image: fallbackImage,
  alt: fallbackAlt,
  title: fallbackTitle,
  height = "small",
  subtitle,
  showCTA = false,
}: HeroProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const getHeroData = () => {
    if (pathname.startsWith("/about")) {
      return {
        image: imageMap?.about?.asset,
        alt: imageMap?.about?.alt,
        title: "About",
      };
    } else if (pathname.startsWith("/people")) {
      return {
        image: imageMap?.people?.asset,
        alt: imageMap?.people?.alt,
        title: "People",
      };
    } else if (pathname.startsWith("/sponsors")) {
      return {
        image: imageMap?.sponsors?.asset,
        alt: imageMap?.sponsors?.alt,
        title: "Sponsors",
      };
    } else if (pathname.startsWith("/courses")) {
      return {
        image: imageMap?.courses?.asset,
        alt: imageMap?.courses?.alt,
        title: "Courses",
      };
    } else if (pathname.startsWith("/join")) {
      return {
        image: imageMap?.join?.asset,
        alt: imageMap?.join?.alt,
        title: "Join",
      };
    } else if (pathname.startsWith("/research")) {
      return {
        image: imageMap?.research?.asset,
        alt: imageMap?.research?.alt,
        title: "Research",
      };
    }

    return {
      image: fallbackImage,
      alt: fallbackAlt,
      title: fallbackTitle,
    };
  };

  const { image, alt, title } = getHeroData();

  const heightClass =
    height === "large"
      ? "h-[400px] md:h-[450px] lg:h-[500px]"
      : "h-[300px] md:h-[350px] lg:h-[400px]";

  const subSection = searchParams.get("sub");
  const formattedSubSection = subSection
    ? subSection
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : null;

  const isHomePage = pathname === "/";
  const showBreadcrumb = subSection && title;

  return (
    <div
      className={`relative w-screen mx-auto bg-cover ${heightClass} overflow-hidden`}
    >
      <div className="absolute inset-0">
        <Image
          src={getImageSrc(image)}
          alt={alt || "Hero background"}
          fill
          className="object-cover"
          fetchPriority="high"
          quality={60}
          style={{
            objectPosition: "center 36%",
          }}
          priority
          sizes="100vw"
        />
      </div>

      <div
        className={`absolute inset-0 z-10 ${isHomePage ? "bg-black/50" : "bg-black/40"}`}
      />

      <div className="relative z-10 w-full h-full flex flex-col max-w-7xl mx-auto pt-12 md:pt-14 lg:pt-0">
        {title && (
          <div
            className={`flex-1 flex w-full items-center justify-center px-6 md:px-8 lg:px-16 py-8 ${
              height === "large"
                ? "flex-col lg:flex-row gap-6 lg:gap-0"
                : "flex-row justify-start"
            }`}
          >
            <div
              className={`w-full ${height === "large" ? "lg:flex-1" : "flex-1"} ${
                height === "large" ? "text-center lg:text-left" : "text-left"
              }`}
            >
              {showBreadcrumb && (
                <p className="text-white text-base md:text-lg mb-2">
                  {title} /{" "}
                  <span className="font-semibold font-outfit">
                    {formattedSubSection}
                  </span>
                </p>
              )}
              <h1
                className={`text-white leading-tight ${
                  height === "large"
                    ? "text-4xl! md:text-6xl! xl:text-[110px]! font-semibold"
                    : "md:text-6xl! text-4xl! font-bold font-outfit"
                }`}
              >
                {showBreadcrumb ? formattedSubSection : title}
              </h1>
            </div>
            {height === "large" && (
              <div className="flex flex-col items-center lg:items-start lg:ml-8 w-full lg:w-auto">
                {subtitle && (
                  <p className="text-base md:text-[20px] text-white max-w-xl font-medium mb-4 md:mb-6 leading-relaxed text-center lg:text-left font-outfit">
                    {subtitle}
                  </p>
                )}
                {showCTA && (
                  <Link href="/about">
                    <Button
                      variant="outline"
                      size="lg"
                      className="text-sm md:text-base border-2 border-white! bg-transparent! text-white hover:bg-white! hover:text-black px-4 md:px-8 rounded-full h-8! md:h-10!"
                    >
                      Learn more about us
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
