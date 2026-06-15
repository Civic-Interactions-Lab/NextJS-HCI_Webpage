"use client";

import { usePathname } from "next/navigation";
import CallToActionSection from "@/components/CallToActionSection";

export default function HomeCta() {
  const pathname = usePathname();
  if (pathname !== "/") return null;
  return <CallToActionSection />;
}
