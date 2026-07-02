import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionLinkProps {
  href: string;
  children: React.ReactNode;
  light?: boolean;
}

export function SectionLink({ href, children, light = false }: SectionLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 label-5 hover:gap-3 transition-all min-h-11 ${
        light ? "text-white" : "text-well-red"
      }`}
    >
      {children} <ArrowRight className="w-4 h-4" />
    </Link>
  );
}
