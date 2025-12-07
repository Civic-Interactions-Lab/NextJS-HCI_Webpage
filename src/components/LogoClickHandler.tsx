"use client";

import React from "react";
import { usePathname } from "next/navigation";

interface LogoClickHandlerProps {
  children: React.ReactNode;
  className?: string;
}

const LogoClickHandler = ({
  children,
  className = "",
}: LogoClickHandlerProps) => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const handleClick = (e: React.MouseEvent) => {
    if (isHomePage) {
      e.preventDefault();
      const scrollToTop = () => {
        const scrollDuration = 300;
        const scrollStep = -window.scrollY / (scrollDuration / 15);

        const scrollInterval = setInterval(() => {
          if (window.scrollY !== 0) {
            window.scrollBy(0, scrollStep);
          } else {
            clearInterval(scrollInterval);
          }
        }, 15);
      };
      scrollToTop();
    }
  };

  return (
    <div className={className} onClick={handleClick}>
      {children}
    </div>
  );
};

export default LogoClickHandler;
