import { Code, FileText, Mic, Share2, SquarePlay } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Research } from "../../../../../sanity.types";
import { getImageSrc } from "@/lib/utils";
import { useState } from "react";

interface ResearchCardProps {
  research: Research;
}

export function ResearchCard({ research }: ResearchCardProps) {
  const [expanded, setExpanded] = useState(false);

  const renderIcon = (label: string) => {
    switch (label.toLowerCase()) {
      case "pdf":
        return <FileText size={12} />;
      case "code":
        return <Code size={12} />;
      case "demo":
        return <SquarePlay size={12} />;
      case "talk":
        return <Mic size={12} />;
      case "cite":
        return <Share2 size={12} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="w-full h-48 overflow-hidden">
        <Image
          src={getImageSrc(research.imageUrl)}
          alt={research.title || "Research project"}
          width={500}
          height={500}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <div className="mb-3">
          <h4 className="font-semibold text-gray-900 text-base leading-tight">
            {research.title}
          </h4>
        </div>

        <p
          className="text-gray-600 text-sm mb-2 leading-relaxed line-clamp-6"
          style={expanded ? { WebkitLineClamp: "unset", display: "block" } : {}}
        >
          {research.description}
        </p>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-primary-red-900 text-sm mb-4 hover:underline"
        >
          {expanded ? "Show less" : "Read more"}
        </button>

        <div className="flex flex-wrap gap-2">
          {research.actions?.map((action) =>
            action.url && action.label ? (
              <Link
                key={action._key}
                href={action.url}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200"
              >
                {renderIcon(action.label)}
                <span>{action.label}</span>
              </Link>
            ) : null,
          )}
        </div>
      </div>
    </div>
  );
}
