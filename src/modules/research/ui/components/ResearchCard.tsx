import { Code, FileText, Mic, Share2, SquarePlay } from "lucide-react";
import { ResearchProject } from "@/modules/research/ui/components/ResearchAccordionItem";
import Image from "next/image";
import Link from "next/link";

interface ResearchCardProps {
  research: ResearchProject;
}

export function ResearchCard({ research }: ResearchCardProps) {
  const renderIcon = (label: string) => {
    switch (label) {
      case "PDF":
        return <FileText size={12} />;
      case "Code":
        return <Code size={12} />;
      case "Demo":
        return <SquarePlay size={12} />;
      case "Talk":
        return <Mic size={12} />;
      case "Cite":
        return <Share2 size={12} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="w-full h-48 overflow-hidden">
        <Image
          src={research.image}
          alt={research.title}
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

        <p className="text-gray-600 text-sm mb-4 leading-relaxed">
          {research.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {research.actions.map((action, actionIndex) => (
            <Link
              key={actionIndex}
              href={action.url}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200"
            >
              {renderIcon(action.label)}
              <span>{action.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
