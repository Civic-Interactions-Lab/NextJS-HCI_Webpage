"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface HeroImage {
  src: string;
  alt: string;
  title: string;
}

interface HeroClientProps {
  heroImages: HeroImage[];
}

const TRANSITION_DELAY = 10000;

const HeroClient = ({ heroImages }: HeroClientProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (heroImages.length > 1) {
      const interval = setInterval(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
          setCount(count + 1);
          setIsTransitioning(false);
        }, 100);
      }, TRANSITION_DELAY);

      return () => clearInterval(interval);
    }
  }, [heroImages, currentImageIndex, count]);

  const changeToImage = (index: number) => {
    if (index === currentImageIndex || isTransitioning) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentImageIndex(index);
      setCount(count + 1);
      setIsTransitioning(false);
    }, 100);
  };

  const slideVariants = {
    enter: { x: "100%", opacity: 1, zIndex: 1 },
    center: { x: 0, opacity: 1, zIndex: 2 },
    exit: { x: "-100%", opacity: 1, zIndex: 1 },
  };

  const transition = {
    duration: 1,
    ease: [0.45, 0.05, 0.55, 0.95] as const,
  };

  return (
    <>
      {/* Animated image transitions */}
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
              src={heroImages[currentImageIndex].src}
              alt={heroImages[currentImageIndex].alt}
              fill
              className="object-cover"
              style={{ objectPosition: "center 36%" }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot Indicators */}
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
    </>
  );
};

export default HeroClient;
