"use client";

import { useUser } from "@clerk/nextjs";
import AnnotationOverlay from "./AnnotationOverlay";
import { ConvexClientProvider } from "@/providers/ConvexClientProvider";

interface AnnotationOverlayWrapperProps {
  children: React.ReactNode;
}

export default function AnnotationOverlayWrapper({
  children,
}: AnnotationOverlayWrapperProps) {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return <>{children}</>;
  }

  return (
    <ConvexClientProvider>
      <AnnotationOverlay>{children}</AnnotationOverlay>
    </ConvexClientProvider>
  );
}
