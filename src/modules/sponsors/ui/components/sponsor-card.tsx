"use client";

import Image from "next/image";
import { Sponsors } from "../../../../../sanity.types";
import { SectionTitle } from "@/components/section-title";
import { getImageSrc } from "@/lib/utils";

const formatDateRange = (startDate?: string, endDate?: string): string => {
  if (!startDate || !endDate) return "";
  const start = new Date(startDate);
  const end = new Date(endDate);
  return `${start.getMonth() + 1}/${start.getFullYear()} – ${end.getMonth() + 1}/${end.getFullYear()}`;
};

const formatAmount = (amount?: number, currency?: string): string => {
  if (!amount) return "";
  const symbols: Record<string, string> = { USD: "$", EUR: "€", GBP: "£", CAD: "C$" };
  return `${symbols[currency || "USD"] || "$"}${amount.toLocaleString()}`;
};

const SponsorCard = ({ sponsor }: { sponsor: Sponsors }) => {
  const card = (
    <div className="flex flex-col gap-3">
      {/* Name outside the card */}
      <SectionTitle>{sponsor.name}</SectionTitle>

      {/* Card body */}
      <div className="rounded-2xl border border-thunder/10 bg-white shadow-sm hover:shadow-md hover:border-thunder/20 transition-all duration-200 overflow-hidden p-5 flex flex-col gap-4">
        {/* Logo + description */}
        <div className="flex gap-4 items-start">
          <div className="shrink-0 w-20 h-14 relative rounded-xl overflow-hidden bg-alabaster flex items-center justify-center p-2">
            <Image
              src={getImageSrc(sponsor.logo)}
              alt={sponsor.altText || sponsor.name || "Sponsor"}
              fill
              className="object-contain"
              loading="lazy"
            />
          </div>
          {sponsor.description && (
            <p className="text-p1 text-thunder/65 leading-relaxed flex-1 min-w-0">
              {sponsor.description}
            </p>
          )}
        </div>

        {/* Grants */}
        {sponsor.grants && sponsor.grants.length > 0 && (
          <div className="flex flex-col gap-3 pt-3 border-t border-thunder/8">
            {sponsor.grants.map((grant, i) => (
              <div key={grant._key || i} className="flex gap-3 items-start">
                <div className="w-1.5 h-1.5 rounded-full bg-well-red mt-2 shrink-0" />
                <div className="flex flex-col gap-0.5">
                  {grant.title && (
                    <p className="font-outfit font-medium text-sm text-thunder leading-snug">
                      &ldquo;{grant.title}&rdquo;
                    </p>
                  )}
                  {grant.grantNumber && (
                    <p className="text-[11px] text-thunder/50">#{grant.grantNumber}</p>
                  )}
                  {(grant.startDate || grant.amount) && (
                    <p className="text-[11px] text-thunder/50">
                      {formatDateRange(grant.startDate, grant.endDate)}
                      {grant.startDate && grant.amount ? " · " : ""}
                      {formatAmount(grant.amount, grant.currency)}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  if (sponsor.url) {
    return (
      <a href={sponsor.url} target="_blank" rel="noopener noreferrer" className="block">
        {card}
      </a>
    );
  }

  return card;
};

export default SponsorCard;
