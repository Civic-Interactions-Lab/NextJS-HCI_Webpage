import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionLinkProps {
  href: string;
  children: React.ReactNode;
  light?: boolean;
}

export function SectionLink({
  href,
  children,
  light = false,
}: SectionLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 label-5 hover:gap-3 transition-all min-h-10 rounded-full border px-4 ${
        light
          ? "text-white border-white/25 hover:border-white/60"
          : "text-well-red border-well-red/25 hover:border-well-red/60"
      }`}
    >
      {children} <ArrowRight className="w-4 h-4" />
    </Link>
  );
}
