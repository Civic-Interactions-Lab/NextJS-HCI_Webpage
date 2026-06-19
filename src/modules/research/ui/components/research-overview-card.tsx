import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ResearchOverviewCardProps {
  label: string;
  tagline: string;
  href: string;
  accent: string;
}

const ResearchOverviewCard = ({ label, tagline, href, accent }: ResearchOverviewCardProps) => (
  <Link
    href={href}
    className="overview-card group flex flex-col overflow-hidden rounded-2xl bg-white border border-thunder/8 shadow-sm hover:shadow-lg hover:border-well-red/30 transition-all duration-300"
  >
    <div className="relative h-44 w-full shrink-0 overflow-hidden">
      <Image
        src="/images/cover/6-studio.JPG"
        alt={label}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-thunder/20" />
      <span className={`absolute top-4 left-4 inline-block w-2.5 h-2.5 rounded-full ${accent}`} />
    </div>
    <div className="flex flex-col gap-3 p-6 flex-1">
      <p className="font-outfit font-medium text-xl text-thunder group-hover:text-well-red leading-snug transition-colors duration-200">
        {label}
      </p>
      <p className="text-p2 text-thunder/65 leading-relaxed flex-1">{tagline}</p>
      <span className="inline-flex items-center gap-1.5 font-outfit text-sm font-medium text-well-red group-hover:gap-3 transition-all mt-1">
        Learn more <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </span>
    </div>
  </Link>
);

export default ResearchOverviewCard;
