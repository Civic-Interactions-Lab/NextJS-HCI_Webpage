import Link from "next/link";
import Image from "next/image";
import { SectionHeading } from "@/components/AppTitle";
import { News } from "../../../../../sanity.types";
import { formatDate, getImageSrc } from "@/lib/utils";
import { LinkButton } from "@/components/AppButton";

interface RecentNewsSectionProps {
  recentNews: News[];
}

const RecentNewsSection = ({ recentNews }: RecentNewsSectionProps) => {
  const orderedNews = [...recentNews].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;

    const dateA = a.date ? new Date(a.date).getTime() : 0;
    const dateB = b.date ? new Date(b.date).getTime() : 0;
    return dateB - dateA;
  });

  return (
    <section className="w-full">
      {/* Desktop Layout - 4 column grid */}
      <div className="hidden md:grid md:grid-cols-4 md:gap-6 md:h-48 lg:h-64 xl:h-72">
        <div className="bg-deep-red text-white p-4 flex items-end">
          <div>
            <p className="text-4xl xl:text-5xl font-bold leading-tight font-outfit">
              recent
            </p>
            <p className="text-4xl xl:text-5xl font-bold leading-tight font-outfit">
              news
            </p>
          </div>
        </div>

        {orderedNews.map((newsItem) => (
          <a
            key={newsItem._id}
            href={newsItem.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden bg-gray-900 cursor-pointer size-full hidden lg:block"
          >
            {newsItem.imageUrl && (
              <Image
                src={getImageSrc(newsItem.imageUrl)}
                alt=""
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 1280px) 33vw, 320px"
              />
            )}

            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300" />

            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <div className="flex items-end space-x-3 mb-1.5">
                {newsItem.featured && (
                  <div className="bg-well-red text-white text-xs font-medium px-2 py-1 rounded w-fit">
                    FEATURED
                  </div>
                )}
                <p className="text-sm text-white underline">
                  {formatDate(newsItem.date)}
                </p>
              </div>
              <h3 className="text-white font-semibold text-lg leading-tight line-clamp-3">
                {newsItem.title}
              </h3>
            </div>
          </a>
        ))}

        <div className="col-span-3 space-y-8 w-full flex-1 flex-col lg:hidden">
          {orderedNews.map((newsItem) => {
            const imageSrc = newsItem.imageUrl
              ? getImageSrc(newsItem.imageUrl)
              : null;

            return (
              <div
                key={newsItem._id}
                className="hover:scale-105 transition-all duration-300 border-2 border-transparent"
              >
                <Link
                  href={newsItem.link || ""}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="flex items-start gap-4">
                    {/* News image or fallback */}
                    {imageSrc ? (
                      <Image
                        src={imageSrc}
                        alt={newsItem.title || "News"}
                        width={64}
                        height={64}
                        className="size-12 md:size-16 object-cover shrink-0"
                        sizes="64px"
                      />
                    ) : (
                      <div className="size-12 md:size-16 bg-gray-400 shrink-0" />
                    )}

                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <p className="font-semibold text-gray-900 text-sm hover:text-primary-red transition-colors flex-1 line-clamp-2">
                          {newsItem.title}
                        </p>
                        {newsItem.featured && (
                          <div className="border-well-red border-2 text-well-red text-xs font-medium px-2 py-1 rounded-full shrink-0">
                            FEATURED
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-gray-600">
                        {formatDate(newsItem.date)}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden space-y-12">
        <div className="flex items-center justify-between">
          <SectionHeading title="Recent News" />

          <LinkButton
            href="/about?sub=news"
            text="Explore"
            ariaLabel="Read more about HCI Lab news"
          />
        </div>

        {orderedNews.map((newsItem) => (
          <div
            key={newsItem._id}
            className="hover:scale-105 transition-all duration-300 border-2 border-transparent"
          >
            <Link
              href={newsItem.link || ""}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="font-semibold text-gray-900 text-sm hover:text-primary-red transition-colors flex-1 line-clamp-2">
                  {newsItem.title}
                </p>
                {newsItem.featured && (
                  <div className="border-well-red border-2 text-well-red text-[10px] font-medium px-1.5 py-0.5 rounded-full shrink-0">
                    FEATURED
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-600">
                {formatDate(newsItem.date)}
              </p>
            </Link>
          </div>
        ))}
      </div>

      <div className="hidden md:flex justify-end mt-24 lg:mt-8">
        <LinkButton
          href="/about?sub=news"
          text="Explore"
          ariaLabel="Read more about HCI Lab news"
        />
      </div>
    </section>
  );
};

export default RecentNewsSection;
