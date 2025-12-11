import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";

interface SponsorData {
  id: string;
  name: string;
  logo: string;
  url: string;
  altText: string;
  description: string;
  grants: Grant[];
}

interface Grant {
  title: string;
  grantNumber?: string;
  dateRange: string;
  amount: string;
}

interface SponsorCardProps {
  sponsor: SponsorData;
  index: number;
}

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
        <div className="flex relative">
          {/* Left side - Image */}
          <div
            onClick={handleCardClick}
            className="flex-shrink-0 w-32 lg:w-40 p-4 flex items-start justify-center bg-white cursor-pointer"
          >
            <div className="relative w-full h-24 lg:h-32">
              <Image
                src={sponsor.logo}
                alt={sponsor.altText}
                fill
                className="object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          {/* Right side - Content */}
          <div className="flex-1 flex flex-col min-h-[120px] lg:min-h-[144px]">
            {/* Top content */}
            <div className="p-4 pb-2 flex-1">
              <div onClick={handleCardClick} className="cursor-pointer">
                <h3 className="text-sm lg:text-base font-semibold text-gray-800 leading-tight text-left">
                  {sponsor.name}
                </h3>
              </div>
            </div>

            {/* Learn More / Show Less Button */}
            <div className="px-4 pb-4 flex justify-end">
              <button
                onClick={handleToggleExpansion}
                className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 transition-colors duration-200"
              >
                <span className="hidden sm:inline">
                  {isExpanded ? "Show less" : "Learn more"}
                </span>
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
                  className="border-t border-gray-200 bg-gray-50"
                >
                  <div className="p-4 text-left">
                    <p className="text-sm text-gray-600 mb-4">
                      {sponsor.description}
                    </p>

                    <div className="space-y-3">
                      {sponsor.grants.map((grant, grantIndex) => (
                        <div
                          key={`${sponsor.id}-grant-${grantIndex}`}
                          className="flex items-start space-x-3"
                        >
                          <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm font-semibold text-gray-900 leading-tight mb-1">
                              &quot;{grant.title}&quot;
                            </h4>
                            {grant.grantNumber && (
                              <p className="text-xs text-gray-600 mb-1">
                                ({grant.grantNumber})
                              </p>
                            )}
                            <p className="text-xs text-gray-700">
                              {grant.dateRange}, {grant.amount}
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
