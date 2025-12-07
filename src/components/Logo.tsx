import React from "react";
import Link from "next/link";
import Image from "next/image";
import LogoClickHandler from "@/components/LogoClickHandler";

interface LogoProps {
  size?: number;
  className?: string;
}

const Logo = ({ size = 48, className = "" }: LogoProps) => {
  return (
    <LogoClickHandler className={className}>
      <Link
        href="/"
        className="flex items-center"
        itemScope
        aria-label="Temple University HCI Lab - Navigate to homepage"
        title="Temple University Human-Computer Interaction Research Lab"
      >
        <div className="flex-shrink-0">
          <Image
            src="/logos/hci-logo.png"
            alt="Temple University HCI Lab logo - Human-Computer Interaction Research Laboratory"
            className="rounded"
            width={size}
            height={size}
            priority
            itemProp="logo"
            role="img"
          />
        </div>
      </Link>
    </LogoClickHandler>
  );
};

export default Logo;
