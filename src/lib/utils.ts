import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { urlFor } from "@/sanity/lib/image";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateString?: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

export const getImageSrc = (
  img: string | SanityImageSource | null | undefined,
): string => {
  if (!img) return "/images/cover/hci-logo-1.jpg"; // fallback
  if (typeof img === "string") {
    return img.startsWith("/") ? img : `/${img}`;
  }

  return urlFor(img).url();
};
