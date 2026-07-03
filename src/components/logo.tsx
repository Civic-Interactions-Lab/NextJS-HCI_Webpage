"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface LogoProps {
  size?: number;
  className?: string;
}

const Logo = ({ size = 48, className = "" }: LogoProps) => {
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <Link
      href="/"
      className={`flex items-center shrink-0 ${className}`}
      onClick={handleClick}
      aria-label="Temple University HCI Lab - Navigate to homepage"
    >
      <Image
        src="/logos/hci-logo.png"
        alt="Temple HCI Lab"
        className="rounded"
        width={size}
        height={size}
        priority
      />
    </Link>
  );
};

export default Logo;
