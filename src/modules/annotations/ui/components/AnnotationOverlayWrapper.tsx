"use client";

import AnnotationOverlay from "./AnnotationOverlay";
import { ConvexClientProvider } from "@/providers/ConvexClientProvider";

interface AnnotationOverlayWrapperProps {
  children: React.ReactNode;
  enabled?: boolean;
}

export default function AnnotationOverlayWrapper({
  children,
  enabled = false,
}: AnnotationOverlayWrapperProps) {
  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <ConvexClientProvider>
      <AnnotationOverlay>{children}</AnnotationOverlay>
    </ConvexClientProvider>
  );
}
