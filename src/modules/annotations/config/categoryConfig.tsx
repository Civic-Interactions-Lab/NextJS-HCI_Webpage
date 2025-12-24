import {
  FileText,
  Bug,
  Palette,
  Sparkles,
  Layout,
  Zap,
  Accessibility,
  MessageCircle,
} from "lucide-react";

export type CategoryType =
  | "content"
  | "bug"
  | "color"
  | "transition"
  | "layout"
  | "performance"
  | "accessibility"
  | "other";

export const categoryConfig = {
  content: {
    label: "Content",
    icon: FileText,
    color: "bg-blue-500",
    borderColor: "border-blue-500",
    textColor: "text-blue-500",
  },
  bug: {
    label: "Bug",
    icon: Bug,
    color: "bg-red-500",
    borderColor: "border-red-500",
    textColor: "text-red-500",
  },
  color: {
    label: "Color",
    icon: Palette,
    color: "bg-purple-500",
    borderColor: "border-purple-500",
    textColor: "text-purple-500",
  },
  transition: {
    label: "Transition",
    icon: Sparkles,
    color: "bg-yellow-500",
    borderColor: "border-yellow-500",
    textColor: "text-yellow-500",
  },
  layout: {
    label: "Layout",
    icon: Layout,
    color: "bg-green-500",
    borderColor: "border-green-500",
    textColor: "text-green-500",
  },
  performance: {
    label: "Performance",
    icon: Zap,
    color: "bg-orange-500",
    borderColor: "border-orange-500",
    textColor: "text-orange-500",
  },
  accessibility: {
    label: "Accessibility",
    icon: Accessibility,
    color: "bg-indigo-500",
    borderColor: "border-indigo-500",
    textColor: "text-indigo-500",
  },
  other: {
    label: "Other",
    icon: MessageCircle,
    color: "bg-gray-500",
    borderColor: "border-gray-500",
    textColor: "text-gray-500",
  },
} as const;
