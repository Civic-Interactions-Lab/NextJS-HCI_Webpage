"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { ReactNode, useMemo } from "react";

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const { isSignedIn } = useUser();
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
  const convex = useMemo(() => {
    if (!isSignedIn || !convexUrl) {
      return null;
    }

    return new ConvexReactClient(convexUrl);
  }, [isSignedIn, convexUrl]);

  if (!convex) {
    return <>{children}</>;
  }

  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
