"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface ViewIntroHeaderProps {
  label: string;
  titlePrefix: string;
  titleAccent: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
  ctaLabel?: string;
  ctaHref?: string;
}

const ViewIntroHeader = ({
  label,
  titlePrefix,
  titleAccent,
  body,
  imageSrc,
  imageAlt,
  ctaLabel,
  ctaHref,
}: ViewIntroHeaderProps) => {
  const isExternal =
    ctaHref?.startsWith("http") || ctaHref?.startsWith("mailto:");

  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
      <motion.div
        className="flex flex-col gap-4 flex-1"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <p className="font-outfit text-sm font-medium text-well-red uppercase tracking-widest">
          {label}
        </p>
        <h2 className="font-outfit font-medium text-4xl md:text-5xl lg:text-6xl text-thunder leading-tight">
          {titlePrefix} <span className="text-well-red">{titleAccent}</span>
        </h2>
        <p className="text-p1 text-thunder/65 leading-relaxed">{body}</p>

        {ctaLabel && ctaHref && (
          <Link
            href={ctaHref}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            aria-label={`${ctaLabel} — ${label}`}
            className="inline-flex items-center gap-2 font-outfit text-sm font-semibold uppercase tracking-widest text-well-red hover:opacity-70 transition-opacity w-fit mt-2"
          >
            {ctaLabel} <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        )}
      </motion.div>

      <motion.div
        className="w-full lg:w-[460px] shrink-0 h-[260px] lg:h-[340px] rounded-2xl overflow-hidden"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={520}
          height={480}
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  );
};

export default ViewIntroHeader;
