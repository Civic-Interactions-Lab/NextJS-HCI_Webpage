"use client";

import ImageCarousel from "@/components/ImageCarousel";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import TierLegend from "@/modules/sponsors/ui/components/TierLegend";

interface FilterState {
  tiers: string[];
}

const BecomeASponsorView = () => {
  const [filters, setFilters] = useState<FilterState>({
    tiers: [],
  });

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
    },
    {
      id: "partner",
      title: "Partner ($2,000)",
      subtitle: "Includes Supporter perks",
      description:
        "Logo on lab merch + access to students' emails (w/ their consent) + invitation to meet students.",
    },
    {
      id: "champion",
      title: "Champion ($5,000)",
      subtitle: "Includes Partner perks",
      description:
        "Sponsor spotlight post + option to name a student award at the annual ACM dinner that we host.",
    },
    // {
    //   id: "visionary",
    //   title: "Visionary ($10,000+)",
    //   subtitle:
    //     "Includes Champion perks + custom partnership (e.g., consulting project, sponsored fellowship, or event).",
    //   description:
    //     "At this level, we could consider consulting projects where they give us a problem and we have a few students work on that problem. It would provide financial support for those students. Prices would need to align with expectations.",
    // },
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

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  // Filter sponsorship tiers based on selected filters
  const filteredTiers =
    filters.tiers.length > 0
      ? sponsorshipTiers.filter((tier) => filters.tiers.includes(tier.id))
      : sponsorshipTiers;

  return (
    <section>
      {/* Main Heading */}
      <div className="mb-8">
        <h1 className="font-outfit font-bold text-3xl md:text-4xl lg:text-5xl leading-tight mb-8">
          At the HCI Lab, sponsors don&apos;t just support research — they help
          shape future innovators.
        </h1>

        {/* Hero Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            staggerChildren: 0.2,
          }}
        >
          <motion.div
            className="flex flex-col gap-4"
            variants={slideUpVariants}
          >
            <p className="text-base text-gray-700 leading-relaxed">
              Your sponsorship provides the resources and opportunities that
              allow undergraduate students to take on real world challenges,
              design technology that serves people, and grow as future leaders
              in human-computer interaction. Unlike traditional recruiting
              settings, sponsors get to see students&apos; ideas, skills, and
              research in action — a true preview of the next generation of UX
              and HCI talent.
            </p>
            <p className="text-lg text-gray-900 font-semibold">
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

        {/* Tier Legend */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={slideUpVariants}
        >
          <TierLegend onFilterChange={handleFilterChange} />
        </motion.div>
      </div>

      {/* Sponsorship Tiers */}
      <motion.div
        className="space-y-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        transition={{
          staggerChildren: 0.2,
        }}
      >
        {filteredTiers.map((tier) => (
          <motion.div
            key={tier.id}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8"
            variants={slideUpVariants}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 items-start">
              <div className="relative">
                <div className="w-full h-48 relative rounded-lg overflow-hidden bg-gray-200">
                  <Image
                    src="/images/cover/NC_09802.jpg"
                    alt="HCI Lab sponsorship opportunity"
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="md:col-span-2 space-y-3">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 font-outfit">
                    {tier.title}
                  </h3>
                  {tier.subtitle && (
                    <p className="text-sm md:text-base text-gray-600 font-medium mb-3">
                      {tier.subtitle}
                    </p>
                  )}
                </div>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed font-outfit">
                  {tier.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default BecomeASponsorView;
