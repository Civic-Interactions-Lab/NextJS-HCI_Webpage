import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface CtaBannerProps {
  label: string;
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
}

const CtaBanner = ({ label, title, body, ctaLabel, ctaHref }: CtaBannerProps) => {
  const isExternal = ctaHref.startsWith("http") || ctaHref.startsWith("mailto:");

  return (
    <section aria-label={label} className="-mx-6 md:-mx-12 bg-alabaster px-6 md:px-12 py-14">
      <div className="flex flex-col items-center gap-5 text-center max-w-2xl mx-auto">
        <p className="font-outfit text-sm font-medium text-well-red uppercase tracking-widest">
          {label}
        </p>
        <h2 className="font-outfit font-medium text-3xl md:text-4xl text-thunder leading-tight">
          {title}
        </h2>
        <p className="text-p1 text-thunder/70 leading-relaxed">{body}</p>
        <Link
          href={ctaHref}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          aria-label={`${ctaLabel} — ${title}`}
          className="group inline-flex items-center gap-2 font-outfit font-medium text-sm text-white bg-well-red hover:bg-well-red/90 px-6 py-3 rounded-full transition-colors mt-2"
        >
          {ctaLabel}
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
};

export default CtaBanner;
