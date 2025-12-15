"use client";

import ImageCarousel from "@/components/ImageCarousel";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

const BecomeASponsorView = () => {
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

  const sponsorshipTiers = [
    {
      id: "supporter",
      title: "Supporter ($1,000)",
      description:
        "Sponsors a student's research stipend or conference trip. Name listed on website + annual report.",
      buttonText: "Become a Supporter!",
    },
    {
      id: "partner",
      title: "Partner ($2,000)",
      subtitle: "Includes Supporter perks",
      description:
        "Logo on lab merch + access to students' emails (w/ their consent) + invitation to meet students.",
      buttonText: "Become a Partner!",
    },
    {
      id: "champion",
      title: "Champion ($5,000)",
      subtitle: "Includes Partner perks",
      description:
        "Sponsor spotlight post + exclusive recruiting session + option to name a student award at the annual ACM dinner that we host.",
      buttonText: "Become a Champion!",
    },
    {
      id: "visionary",
      title: "Visionary ($10,000+)",
      subtitle:
        "Includes Champion perks + custom partnership (e.g., consulting project, sponsored fellowship, or event).",
      description:
        "At this level, we could consider consulting projects where they give us a problem and we have a few students work on that problem. It would provide financial support for those students. Prices would need to align with expectations.",
      buttonText: "Become a Visionary!",
    },
  ];

  const heroImages = [
    {
      src: "/images/cover/3-studio.jpg",
      alt: "HCI Lab students working on research projects",
    },
    {
      src: "/images/cover/NC_09802.jpg",
      alt: "HCI Lab students working on research projects",
    },
    {
      src: "/images/cover/NC_05301.jpg",
      alt: "HCI Lab students working on research projects",
    },
  ];

  return (
    <div>
      <h3 className="font-outfit font-semibold text-2xl md:text-3xl">
        At the HCI Lab, sponsors don&apos;t just support research — they help
        shape future innovators.
      </h3>
      {/* Hero Section */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center mt-0 md:mt-12 mb-16"
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
          <p className="text-sm md:text-base text-gray-700 leading-relaxed">
            Your sponsorship provides the resources and opportunities that allow
            undergraduate students to take on real world challenges, design
            technology that serves people, and grow as future leaders in
            human-computer interaction. Unlike traditional recruiting settings,
            sponsors get to see students&apos; ideas, skills, and research in
            action — a true preview of the next generation of UX and HCI talent.
          </p>
          <p className="text-sm md:text-lg xl:text-xl text-gray-700 leading-relaxed font-semibold">
            Discover how you can contribute and make an impact!
          </p>
        </motion.div>

        <motion.div className="relative" variants={slideUpVariants}>
          <ImageCarousel
            images={heroImages}
            height="h-64 md:h-72"
            roundedClassName="rounded-bl-[100px]"
            title="Sponsor Impact Section"
            priority={true}
          />
        </motion.div>
      </motion.div>

      {/* Sponsorship Tiers */}
      <motion.div
        className="max-w-6xl mx-auto space-y-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        transition={{
          staggerChildren: 0.3,
        }}
      >
        {sponsorshipTiers.map((tier) => (
          <motion.div
            key={tier.id}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center"
            variants={slideUpVariants}
          >
            <div className="relative">
              <div className="w-full h-64 md:h-72 relative rounded-lg overflow-hidden bg-gray-200">
                <Image
                  src="/images/cover/NC_09802.jpg"
                  alt="HCI Lab sponsorship opportunity"
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                  {tier.title}
                </h3>
                {tier.subtitle && (
                  <p className="text-sm md:text-base text-gray-600 font-medium mb-3">
                    {tier.subtitle}
                  </p>
                )}
                <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                  {tier.description}
                </p>
              </div>

              <div className="mt-4">
                <button className="inline-flex items-center px-6 py-2 border-2 border-black bg-white text-black font-medium text-lg rounded-full hover:bg-black hover:text-white transition-colors duration-200">
                  {tier.buttonText}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default BecomeASponsorView;
