import { Button } from "@/components/ui/button";
import Image from "next/image";
import HeroClient from "@/components/HeroClient";

interface HeroProps {
  image?: string;
  title?: string;
  height?: "small" | "large";
  subtitle?: string;
  showCTA?: boolean;
  searchParams?: { [key: string]: string | string[] | undefined };
  pathname?: string;
}

const Hero = ({
  image = "/images/cover/442_72A2112.jpg",
  title,
  height = "small",
  subtitle,
  showCTA = false,
  searchParams,
  pathname = "/",
}: HeroProps) => {
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

  const getImagePath = (imagePath: string) => {
    return imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  };

  const getHeroImages = () => {
    if (pathname === "/people") {
      return [
        {
          src: image,
          alt: "Research team collaboration",
          title: "",
        },
        {
          src: "/images/cover/442_72A2112.jpg",
          alt: "Lab meeting discussion",
          title: "",
        },
        {
          src: "/images/cover/NC_05301.jpg",
          alt: "Student presentations",
          title: "",
        },
      ];
    }
    return [{ src: image, alt: title || "Hero background", title: "" }];
  };

  const heroImages = getHeroImages();
  const currentImage = heroImages[0]; // Start with first image for server render

  return (
    <div
      className={`relative w-screen mx-auto bg-cover ${heightClass} overflow-hidden`}
    >
      {/* Server-rendered initial image for SEO */}
      <div className="absolute inset-0">
        <Image
          src={getImagePath(currentImage.src)}
          alt={currentImage.alt}
          fill
          className="object-cover"
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

      {/* Client component for interactive features */}
      {heroImages.length > 1 && <HeroClient heroImages={heroImages} />}

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
