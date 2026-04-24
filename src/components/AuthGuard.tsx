"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const STORAGE_KEY = "hci_site_verified_at";
const EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

export default function AuthGuard({
  children,
  enabled,
}: {
  children: React.ReactNode;
  enabled: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [verified, setVerified] = useState(!enabled);

  useEffect(() => {
    if (!enabled) {
      setVerified(true);
      return;
    }

    const raw = localStorage.getItem(STORAGE_KEY);

    if (raw) {
      const timestamp = parseInt(raw, 10);
      if (!isNaN(timestamp) && Date.now() - timestamp < EXPIRY_MS) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setVerified(true);
        return;
      }
    }

    // Not verified or expired — redirect to verify page
    router.replace(`/verify?from=${encodeURIComponent(pathname)}`);
  }, [enabled, router, pathname]);

  if (!verified) return null;

  return <>{children}</>;
}
