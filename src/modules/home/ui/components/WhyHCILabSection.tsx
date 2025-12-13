"use client";

import ImageCarousel from "@/components/ImageCarousel";
import { BorderHeading } from "@/components/AppTitle";
import { LinkButton } from "@/components/AppButton";
import { motion, Variants } from "framer-motion";
import { HomeWhyHCIQueryResult } from "../../../../../sanity.types";
import { getImageSrc } from "@/lib/utils";

interface WhyHCILabSectionProps {
  images?: HomeWhyHCIQueryResult;
}

const WhyHCILabSection = ({ images }: WhyHCILabSectionProps) => {
  const slideUpVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const convertSanityImages = (sanityImages?: HomeWhyHCIQueryResult) => {
    if (!sanityImages) return [];

    return sanityImages.map((img) => ({
      src: getImageSrc(img?.asset),
      alt: img.alt || "",
    }));
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center mt-0 md:mt-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        staggerChildren: 0.2,
      }}
    >
      <motion.div
        className="flex flex-col gap-6 mb-0 md:mb-3"
        variants={slideUpVariants}
      >
        <BorderHeading title="Why join HCI Lab?" />
        <p className="text-sm md:text-lg xl:text-xl text-gray-700 leading-relaxed">
          Being part of a research lab builds real-world skills, from critical
          thinking to teamwork. Students gain mentorship and hands-on
          experience, while job opportunities open doors to future careers in
          academia, healthcare, and industry.
        </p>
        <LinkButton
          href="/about"
          ariaLabel="Learn more about HCI Lab"
          text="Learn More"
        />
      </motion.div>

      <motion.div className="relative" variants={slideUpVariants}>
        <ImageCarousel
          images={convertSanityImages(images)}
          height="h-64 md:h-72"
          roundedClassName="rounded-bl-[100px]"
          showPagination={true}
          showNavigation={true}
          title="Why HCI Lab? Section"
          priority={true}
        />
      </motion.div>
    </motion.div>
  );
};

export default WhyHCILabSection;
