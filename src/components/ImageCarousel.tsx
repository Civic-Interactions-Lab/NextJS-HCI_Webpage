"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface ImageCarouselProps {
  images: Array<{
    src: string;
    alt: string;
    width?: number;
    height?: number;
  }>;
  height?: string;
  className?: string;
  roundedClassName?: string;
  showPagination?: boolean;
  showNavigation?: boolean;
  // SEO props
  title?: string;
  priority?: boolean;
}

const ImageCarousel = ({
  images,
  height = "h-72",
  className = "",
  roundedClassName = "",
  showPagination = true,
  showNavigation = true,
  title = "Temple HCI Lab Gallery",
  priority = false,
}: ImageCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const isFirst = current === 1;
  const isLast = current === count;

  if (!images || images.length === 0) {
    return (
      <div
        className={`${height} rounded-3xl bg-gray-200 flex items-center justify-center ${className}`}
      >
        <span className="text-gray-500">No images available</span>
      </div>
    );
  }

  const altText = (originalAlt: string) => {
    if (
      originalAlt.toLowerCase().includes("temple") ||
      originalAlt.toLowerCase().includes("hci")
    ) {
      return originalAlt;
    }
    return `${originalAlt} - Temple University HCI Lab`;
  };

  return (
    <div className={`relative ${className}`}>
      {/* SEO: Hidden title and description */}
      <h3 className="sr-only">{title}</h3>

      <div className={`overflow-hidden ${roundedClassName}`}>
        <Carousel setApi={setApi} className="w-full" aria-label={title}>
          <CarouselContent>
            {images.slice(0, 5).map((image, index) => (
              <CarouselItem key={index}>
                <Card className="border-0 py-0 shadow-none">
                  <CardContent className="p-0">
                    <div className={`relative ${height}`}>
                      <Image
                        src={image.src}
                        alt={altText(image.alt)}
                        fill
                        className="object-cover"
                        priority={priority && index === 0} // Prioritize first image if above fold
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={85}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkbHB0eH/xAAVAQEBAQAAAAAAAAAAAAAAAAAAAQIF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R7Dbytkh+aZQ+HUz6MF"
                        onError={() => {
                          console.warn(`Failed to load image: ${image.src}`);
                        }}
                      />
                      <span className="sr-only">{altText(image.alt)}</span>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation arrows */}
          {showNavigation && images.length > 1 && (
            <>
              {!isFirst && (
                <CarouselPrevious
                  className="left-4 size-10 bg-white/90! hover:bg-white! rounded-full cursor-pointer"
                  aria-label="Previous image"
                />
              )}
              {!isLast && (
                <CarouselNext
                  className="right-4 size-10 bg-white/90! hover:bg-white! rounded-full! cursor-pointer"
                  aria-label="Next image"
                />
              )}
            </>
          )}
        </Carousel>
      </div>

      {/* Pagination dots */}
      {showPagination && images.length > 1 && (
        <div className="mt-6 flex items-center justify-center gap-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <Button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "size-4 rounded-full! p-0! transition-all duration-200 hover:scale-110",
                current === index + 1
                  ? "bg-gray-600! shadow-md"
                  : "bg-gray-300! hover:bg-gray-400!",
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
