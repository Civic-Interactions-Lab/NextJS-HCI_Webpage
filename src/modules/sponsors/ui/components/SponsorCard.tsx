import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Sponsors } from "../../../../../sanity.types";
import { getImageSrc } from "@/lib/utils";

interface SponsorCardProps {
  sponsor: Sponsors;
  index: number;
}

const formatDateRange = (startDate?: string, endDate?: string): string => {
  if (!startDate || !endDate) return "Date not specified";

  const start = new Date(startDate);
  const end = new Date(endDate);

  const startMonth = start.getMonth() + 1;
  const startYear = start.getFullYear();
  const endMonth = end.getMonth() + 1;
  const endYear = end.getFullYear();

  return `${startMonth}/${startYear} - ${endMonth}/${endYear}`;
};

const formatAmount = (amount?: number, currency?: string): string => {
  if (!amount) return "$0";

  const currencySymbols: Record<string, string> = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    CAD: "C$",
  };

  const symbol = currencySymbols[currency || "USD"] || "$";
  return `${symbol}${amount.toLocaleString()}`;
};

const SponsorCard = ({ sponsor, index }: SponsorCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (sponsor.url) {
      window.open(sponsor.url, "_blank", "noopener,noreferrer");
    }
  };

  const handleToggleExpansion = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut", delay: index * 0.05 }}
      className="mb-6 md:mb-8"
    >
      <Card className="h-full border-gray-300 shadow-lg transition-shadow duration-200 hover:shadow-xl overflow-hidden">
        <div className="flex relative px-4">
          <div
            onClick={handleCardClick}
            className="shrink-0 w-32 lg:w-40 p-4 flex items-start justify-center bg-white cursor-pointer"
          >
            <div className="relative w-full h-24 lg:h-32">
              <Image
                src={getImageSrc(sponsor.logo)}
                alt={sponsor.altText || "Sponsor logo"}
                fill
                className="object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="flex-1 flex flex-col min-h-[120px] lg:min-h-36">
            {/* Top content */}
            <div className="p-4 pb-2 flex-1">
              <div onClick={handleCardClick} className="cursor-pointer">
                <h3 className="text-base md:text-lg font-semibold text-gray-800 leading-tight text-left mb-2 font-outfit">
                  {sponsor.name}
                </h3>
                <p className="text-sm md:text-base text-gray-600 mb-4 font-outfit!">
                  {sponsor.description}
                </p>
              </div>
            </div>

            {/* Learn More / Show Less Button */}
            <div className="px-4 pb-4 flex justify-end">
              <button
                onClick={handleToggleExpansion}
                className="flex items-center gap-1 text-xs md:text-sm font-medium text-primary-red-800 hover:text-primary-red-950 transition-colors duration-200 cursor-pointer"
              >
                <span>{isExpanded ? "Show less" : "Learn more"}</span>
                {isExpanded ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>
            </div>

            {/* Expanded Content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: 1,
                    height: "auto",
                    transition: { duration: 0.3, ease: "easeOut" },
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                    transition: { duration: 0.2, ease: "easeIn" },
                  }}
                  className="border-t border-gray-200"
                >
                  <div className="p-4 text-left">
                    <div className="space-y-3">
                      {sponsor.grants?.map((grant, grantIndex) => (
                        <div
                          key={`${sponsor._id}-grant-${grantIndex}`}
                          className="flex items-start space-x-3"
                        >
                          <div className="size-3 bg-primary-red-900 mt-1 shrink-0" />
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm font-semibold text-gray-900 leading-tight mb-1 font-outfit md:text-base">
                              &quot;{grant.title}&quot;
                            </h4>
                            {grant.grantNumber && (
                              <p className="text-xs md:text-sm text-gray-600 mb-1 font-outfit!">
                                #{grant.grantNumber}
                              </p>
                            )}
                            <p className="text-xs md:text-sm text-gray-700 font-outfit!">
                              {formatDateRange(grant.startDate, grant.endDate)},{" "}
                              {formatAmount(grant.amount, grant.currency)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default SponsorCard;
