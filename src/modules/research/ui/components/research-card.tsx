import { Code, FileText, Mic, Share2, SquarePlay } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Research } from "../../../../../sanity.types";
import { getImageSrc } from "@/lib/utils";

const ICON_MAP: Record<string, React.ReactNode> = {
  pdf:  <FileText  size={12} aria-hidden="true" />,
  code: <Code      size={12} aria-hidden="true" />,
  demo: <SquarePlay size={12} aria-hidden="true" />,
  talk: <Mic       size={12} aria-hidden="true" />,
  cite: <Share2    size={12} aria-hidden="true" />,
};

const CARD_CLASSNAME =
  "research-card h-full flex flex-col bg-white rounded-2xl shadow-sm border border-thunder/15 overflow-hidden hover:shadow-lg hover:border-thunder/25 transition-all duration-200";

const ResearchCard = ({ research }: { research: Research }) => {
  const validActions = (research.actions ?? []).filter(
    (a): a is typeof a & { url: string; label: string } => !!a.url && !!a.label
  );
  const primaryAction =
    validActions.find((a) => a.label === "pdf") ?? validActions[0];

  const content = (
    <>
      <div className="relative h-44 w-full shrink-0">
        <Image
          src={getImageSrc(research.imageUrl)}
          alt={research.title || "Temple HCI Lab research project"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-3 p-5 flex-1">
        <h3 className="font-outfit font-medium text-base text-thunder leading-snug">
          {research.title}
        </h3>
        <p className="text-p2 text-thunder/65 leading-relaxed line-clamp-4">
          {research.description}
        </p>

        {validActions.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1 mt-auto">
            {validActions.map((action) => (
              <span
                key={action._key}
                className="inline-flex items-center gap-1.5 font-outfit text-xs font-medium px-3 py-1 rounded-full text-thunder/70"
              >
                {ICON_MAP[action.label.toLowerCase()]}
                {action.label}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );

  if (primaryAction) {
    return (
      <Link
        href={primaryAction.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Read ${research.title} — Temple HCI Lab research`}
        className={CARD_CLASSNAME}
      >
        {content}
      </Link>
    );
  }

  return <article className={CARD_CLASSNAME}>{content}</article>;
};

export default ResearchCard;
