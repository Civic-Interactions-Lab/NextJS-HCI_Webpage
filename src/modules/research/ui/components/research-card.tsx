import { Code, FileText, Mic, Share2, SquarePlay } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Research } from "../../../../../sanity.types";
import { getImageSrc } from "@/lib/utils";

const ICON_MAP: Record<string, React.ReactNode> = {
  pdf:  <FileText  size={12} />,
  code: <Code      size={12} />,
  demo: <SquarePlay size={12} />,
  talk: <Mic       size={12} />,
  cite: <Share2    size={12} />,
};

const ResearchCard = ({ research }: { research: Research }) => (
  <div className="research-card bg-white rounded-2xl shadow-sm border border-thunder/15 overflow-hidden hover:shadow-lg hover:border-thunder/25 transition-all duration-200">
    <div className="relative h-44 w-full">
      <Image
        src={getImageSrc(research.imageUrl)}
        alt={research.title || "Research project"}
        fill
        className="object-cover"
      />
    </div>

    <div className="flex flex-col gap-3 p-5">
      <p className="font-outfit font-medium text-base text-thunder leading-snug">
        {research.title}
      </p>
      <p className="text-p2 text-thunder/65 leading-relaxed line-clamp-4">
        {research.description}
      </p>

      {research.actions && research.actions.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {research.actions.map((action) =>
            action.url && action.label ? (
              <Link
                key={action._key}
                href={action.url}
                className="inline-flex items-center gap-1.5 font-outfit text-xs font-medium px-3 py-1 rounded-full bg-alabaster text-thunder/70 hover:bg-well-red hover:text-white transition-colors"
              >
                {ICON_MAP[action.label.toLowerCase()]}
                {action.label}
              </Link>
            ) : null
          )}
        </div>
      )}
    </div>
  </div>
);

export default ResearchCard;
