import { SectionHeading } from "@/components/AppTitle";
import Image from "next/image";
import { LinkButton } from "@/components/AppButton";
import TapeTag from "@/components/TapeTag";
import {
  HomeFeaturedProjectsQueryResult,
  FeaturedResearchQueryResult,
} from "../../../../../sanity.types";
import Link from "next/link";
import { getImageSrc } from "@/lib/utils";

interface FeatureProjectsProps {
  featuredProjectsImage: HomeFeaturedProjectsQueryResult;
  research: FeaturedResearchQueryResult;
}

const RecentPapers = ({
  featuredProjectsImage,
  research,
}: FeatureProjectsProps) => {
  const formatAuthors = (
    authors?: FeaturedResearchQueryResult[0]["authors"],
  ) => {
    if (!authors || authors.length === 0) return "";

    return authors
      .map((author) => {
        if (author.authorType === "person") {
          return "Team Member";
        } else {
          return author.name || "Author";
        }
      })
      .filter((name) => name)
      .join(", ");
  };

  const getPrimaryAction = (
    actions?: FeaturedResearchQueryResult[0]["actions"],
  ) => {
    if (!actions || actions.length === 0) return null;
    const priorityOrder = ["pdf", "demo", "code", "talk", "cite"];
    const sortedActions = actions.sort((a, b) => {
      const aIndex = priorityOrder.indexOf(a.label || "");
      const bIndex = priorityOrder.indexOf(b.label || "");
      return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
    });
    return sortedActions[0];
  };

  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
        {/* Left side */}
        <div className="order-2 lg:order-1">
          <div className="relative">
            {/* Image container */}
            <div className="relative shadow-lg">
              <Image
                src={getImageSrc(featuredProjectsImage?.asset)}
                alt={featuredProjectsImage?.alt || ""}
                width={500}
                height={300}
                className="w-full h-64 md:h-80 object-cover"
                sizes="(max-width: 1024px) 100vw, 500px"
              />

              <TapeTag position="bottom-right" rotation={-24} color="black">
                <p className="text-xs md:text-sm font-light font-jetbrains-mono leading-tight wrap-break-word whitespace-normal max-w-40 md:max-w-48 line-clamp-3">
                  {featuredProjectsImage?.alt}
                </p>
              </TapeTag>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="order-1 lg:order-2 pl-0 lg:pl-8 space-y-8">
          {/* Header */}
          <SectionHeading title="RECENT PAPERS" />

          {/* Research cards */}
          <div className="space-y-8">
            {research.map((researchItem) => {
              const primaryAction = getPrimaryAction(researchItem.actions);
              const imageSrc = researchItem.imageUrl?.asset
                ? getImageSrc(researchItem.imageUrl.asset)
                : null;

              return (
                <div
                  key={researchItem._id}
                  className="flex items-center gap-4"
                >
                  {/* Research image or fallback circle */}
                  {imageSrc ? (
                    <Image
                      src={imageSrc}
                      alt={researchItem.title || "Research"}
                      width={64}
                      height={64}
                      className="size-12 md:size-16 rounded-full object-cover shrink-0"
                      sizes="64px"
                    />
                  ) : (
                    <div className="size-12 md:size-16 bg-sky rounded-full shrink-0" />
                  )}

                  <div className="flex-1">
                    {primaryAction?.url ? (
                      <Link
                        href={primaryAction.url}
                        aria-label={researchItem.title}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <h4 className="text-sm md:text-base font-roboto text-gray-900 mb-2 leading-tight underline decoration-gray-300 hover:decoration-gray-600 transition-colors cursor-pointer line-clamp-2">
                          {researchItem.title}
                        </h4>
                      </Link>
                    ) : (
                      <h4 className="text-sm md:text-lg font-roboto text-gray-900 mb-2 leading-tight line-clamp-2">
                        {researchItem.title}
                      </h4>
                    )}
                    <p className="text-gray-600 text-xs md:text-sm line-clamp-1">
                      {formatAuthors(researchItem.authors)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Explore button */}
          <LinkButton
            href="/research"
            text="Explore"
            ariaLabel="Explore HCI Research Projects"
          />
        </div>
      </div>
    </section>
  );
};

export default RecentPapers;
