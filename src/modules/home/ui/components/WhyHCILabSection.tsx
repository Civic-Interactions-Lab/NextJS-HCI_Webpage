"use client";

import ImageCarousel from "@/components/ImageCarousel";
import { BorderTitle } from "@/components/AppTitle";
import { LinkButton } from "@/components/AppButton";
import { motion, Variants } from "framer-motion";

const developerImages = [
  {
    src: "https://images.unsplash.com/photo-1573497619860-6d82917e4ec8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGV2ZWxvcGVyJTIwY29uZmVyZW5jZXxlbnwwfHwwfHx8MA%3D%3D",
    alt: "Developer conference presentation with audience",
  },
  {
    src: "https://images.unsplash.com/photo-1573166364839-1bfe9196c23e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGV2ZWxvcGVyJTIwY29uZmVyZW5jZXxlbnwwfHwwfHx8MA%3D%3D",
    alt: "Developers networking at tech conference",
  },
  {
    src: "https://images.unsplash.com/photo-1560439514-0fc9d2cd5e1b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGRldmVsb3BlciUyMGNvbmZlcmVuY2V8ZW58MHx8MHx8fDA%3D",
    alt: "Technology conference stage with speaker",
  },
  {
    src: "https://images.unsplash.com/photo-1582192493926-93f4847e1323?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGRldmVsb3BlciUyMGNvbmZlcmVuY2V8ZW58MHx8MHx8fDA%3D",
    alt: "Developer conference audience and presentation",
  },
  {
    src: "https://images.unsplash.com/photo-1560523160-754a9e25c68f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGRldmVsb3BlciUyMGNvbmZlcmVuY2V8ZW58MHx8MHx8fDA%3D",
    alt: "Tech professionals collaborating at conference",
  },
];

interface WhyHCILabSectionProps {
  images?: Array<{
    src: string;
    alt: string;
  }>;
}

const WhyHCILabSection = ({
  images = developerImages,
}: WhyHCILabSectionProps) => {
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
      <motion.div className="flex flex-col gap-6" variants={slideUpVariants}>
        <BorderTitle title="Why join HCI Lab?" />
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
          images={images}
          height="h-64 md:h-72"
          roundedClassName="rounded-bl-[100px]"
          showPagination={true}
          showNavigation={true}
          title="Developer Conference Gallery"
          description="Images showcasing developer conferences and tech collaboration"
          priority={true}
        />
      </motion.div>
    </motion.div>
  );
};

export default WhyHCILabSection;
