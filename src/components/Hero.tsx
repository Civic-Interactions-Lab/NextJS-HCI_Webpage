"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

// interface HeroImage {
//   src: string;
//   alt: string;
//   title: string;
// }

interface HeroProps {
  image?: string | SanityImageSource | null;
  alt?: string;
  title?: string;
  height?: "small" | "large";
  subtitle?: string;
  showCTA?: boolean;
  searchParams?: { [key: string]: string | string[] | undefined };
  pathname?: string;
}

// const TRANSITION_DELAY = 10000;

const Hero = ({
  image,
  alt,
  title,
  height = "small",
  subtitle,
  showCTA = false,
  searchParams,
  pathname = "/",
}: HeroProps) => {
  // Multiple images functionality - commented out for now
  // const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // const [isTransitioning, setIsTransitioning] = useState(false);
  // const [count, setCount] = useState(0);

  const heightClass =
    height === "large"
      ? "h-[500px] md:h-[600px] lg:h-[700px]"
      : "h-[400px] md:h-[450px] lg:h-[500px]";

  const subSection = searchParams?.sub as string;
  const formattedSubSection = subSection
    ? subSection
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : null;

  const isHomePage = pathname === "/";
  const showBreadcrumb = subSection && title;

  const getImageSrc = (
    img: string | SanityImageSource | null | undefined,
  ): string => {
    if (!img) return "/images/cover/442_72A2112.jpg"; // fallback
    if (typeof img === "string") {
      return img.startsWith("/") ? img : `/${img}`;
    }
    // It's a Sanity image
    return urlFor(img).url();
  };

  // const getHeroImages = (): HeroImage[] => {
  //   if (pathname === "/people") {
  //     return [
  //       {
  //         src: getImageSrc(image),
  //         alt: "Research team collaboration",
  //         title: "",
  //       },
  //       {
  //         src: "/images/cover/442_72A2112.jpg",
  //         alt: "Lab meeting discussion",
  //         title: "",
  //       },
  //       {
  //         src: "/images/cover/NC_05301.jpg",
  //         alt: "Student presentations",
  //         title: "",
  //       },
  //     ];
  //   }
  //   return [{ src: getImageSrc(image), alt: title || "Hero background", title: "" }];
  // };
  //
  // const heroImages = getHeroImages();
  // const currentImage = heroImages[0];

  // Auto-transition effect for multiple images - commented out
  // useEffect(() => {
  //   if (heroImages.length > 1) {
  //     const interval = setInterval(() => {
  //       setIsTransitioning(true);
  //       setTimeout(() => {
  //         setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
  //         setCount(count + 1);
  //         setIsTransitioning(false);
  //       }, 100);
  //     }, TRANSITION_DELAY);

  //     return () => clearInterval(interval);
  //   }
  // }, [heroImages.length, currentImageIndex, count]);

  // Multiple images functionality - commented out
  // const changeToImage = (index: number) => {
  //   if (index === currentImageIndex || isTransitioning) return;

  //   setIsTransitioning(true);
  //   setTimeout(() => {
  //     setCurrentImageIndex(index);
  //     setCount(count + 1);
  //     setIsTransitioning(false);
  //   }, 100);
  // };

  // const slideVariants = {
  //   enter: { x: "100%", opacity: 1, zIndex: 1 },
  //   center: { x: 0, opacity: 1, zIndex: 2 },
  //   exit: { x: "-100%", opacity: 1, zIndex: 1 },
  // };

  // const transition = {
  //   duration: 1,
  //   ease: [0.45, 0.05, 0.55, 0.95] as const,
  // };

  return (
    <div
      className={`relative w-screen mx-auto bg-cover ${heightClass} overflow-hidden`}
    >
      {/* Simple single image display */}
      <div className="absolute inset-0">
        <Image
          src={getImageSrc(image)}
          alt={alt || "Hero background"}
          fill
          className="object-cover"
          style={{
            objectPosition: "center 36%",
          }}
          priority
          sizes="100vw"
        />
      </div>

      {/* Animated image transitions - commented out for multiple images
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence custom={currentImageIndex}>
          <motion.div
            key={currentImageIndex}
            className="absolute inset-0"
            variants={slideVariants}
            initial={count === 0 ? "center" : "enter"}
            animate="center"
            exit="exit"
            transition={transition}
          >
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              fill
              className="object-cover"
              style={{
                objectPosition: "center 36%",
              }}
              priority
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
      </div>
      */}

      <div
        className={`absolute inset-0 z-10 ${isHomePage ? "bg-black/50" : "bg-black/40"}`}
      />

      {/* Dot Indicators - commented out for single image display
      {heroImages.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 items-center z-20">
          {heroImages.map((_, index) => (
            <Button
              key={index}
              onClick={() => changeToImage(index)}
              disabled={isTransitioning}
              variant="ghost"
              className={`
                !p-0 !m-0 !rounded-full !size-3 !bg-white transition-all duration-300 ease-out transform
                ${
                  index === currentImageIndex
                    ? "scale-125 !border-2 !border-black shadow-[0_0_0_1px_white]"
                    : "scale-100 opacity-80 hover:opacity-100"
                }
                ${isTransitioning ? "cursor-not-allowed opacity-60" : "cursor-pointer"}
              `}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
      */}

      <div className="relative z-10 w-full h-full flex flex-col max-w-7xl mx-auto pt-16 md:pt-20 lg:pt-0">
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
                  <span className="font-semibold">{formattedSubSection}</span>
                </p>
              )}
              <h1
                className={`text-white leading-tight ${
                  height === "large"
                    ? "!text-5xl md:!text-7xl xl:!text-[110px] font-semibold"
                    : "md:!text-6xl !text-4xl font-bold"
                }`}
              >
                {showBreadcrumb ? formattedSubSection : title}
              </h1>
            </div>
            {height === "large" && (
              <div className="flex flex-col items-center lg:items-start lg:ml-8 w-full lg:w-auto">
                {subtitle && (
                  <p className="text-base md:text-xl text-white max-w-xl font-medium mb-4 md:mb-6 leading-relaxed text-center lg:text-left">
                    {subtitle}
                  </p>
                )}
                {showCTA && (
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-sm md:text-base border-2 !border-white !bg-transparent text-white hover:!bg-white hover:text-black px-6 md:px-8"
                  >
                    Learn more about us
                  </Button>
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
