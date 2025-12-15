"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const TabBarClient = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSub = searchParams.get("sub");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getTabBarItems = () => {
    switch (pathname) {
      case "/about":
        return [
          { label: "About", path: "/about", isMain: true },
          { label: "News", path: "/about?sub=news" },
          { label: "Events", path: "/about?sub=events" },
          { label: "Contact Us", path: "/about?sub=contact-us" },
        ];
      case "/people":
        return [
          { label: "Current Members", path: "/people", isMain: true },
          { label: "Alumni", path: "/people?sub=alumni" },
          { label: "Collaborators", path: "/people?sub=collaborators" },
        ];
      case "/sponsors":
        return [
          { label: "Our Sponsors", path: "/sponsors", isMain: true },
          {
            label: "Interested in sponsoring?",
            path: "/sponsors?sub=interested-in-sponsoring",
          },
        ];
      default:
        return [];
    }
  };

  const tabItems = getTabBarItems();

  const isActive = (item: { path: string; isMain?: boolean }) => {
    if (item.isMain) {
      return pathname === item.path.split("?")[0] && !currentSub;
    }

    const itemSub = new URLSearchParams(item.path.split("?")[1] || "").get(
      "sub",
    );
    return currentSub === itemSub;
  };

  if (tabItems.length === 0) {
    return null;
  }

  const activeItem = tabItems.find((item) => isActive(item));

  return (
    <>
      {/* Mobile Tab Selector */}
      <div className="md:hidden relative w-full mb-6">
        <div className="flex items-start overflow-hidden">
          {/* Container that expands horizontally */}
          <div
            className={`flex transition-all duration-300 ease-in-out ${
              isMobileMenuOpen ? "gap-2" : "gap-0"
            }`}
            style={{
              width: isMobileMenuOpen ? `${tabItems.length * 120}px` : "auto",
            }}
          >
            <Button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`
                shrink-0 p-3 text-xs rounded-full font-jetbrains-mono font-bold! transition-all duration-300 cursor-pointer
                bg-primary-red-800 text-white border border-gray-600 hover:bg-primary-red-800/80
              `}
            >
              {activeItem?.label || "Select Tab"}
            </Button>

            {/* Other Tabs - Slide in from left */}
            {tabItems
              .filter((item) => !isActive(item))
              .map((item, index) => (
                <Link
                  key={index}
                  href={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`
                    shrink-0 transition-all duration-300 ease-in-out
                    ${
                      isMobileMenuOpen
                        ? "opacity-100 translate-x-0 scale-100 pointer-events-auto"
                        : "opacity-0 -translate-x-4 scale-95 pointer-events-none"
                    }
                  `}
                  style={{
                    transitionDelay: isMobileMenuOpen
                      ? `${index * 50}ms`
                      : "0ms",
                  }}
                >
                  <Button
                    variant="outline"
                    className="p-3 text-xs rounded-full font-jetbrains-mono font-bold transition-colors border border-gray-600 hover:bg-primary-red-800/60 hover:text-white! cursor-pointer"
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
          </div>
        </div>
      </div>

      {/* Tab Bar - Desktop */}
      <div className="hidden md:block sticky top-0 left-0 right-0 flex-1 w-full text-center p-3 space-x-6">
        {tabItems.map((item, index) => (
          <Link key={index} href={item.path}>
            <Button
              className={`
              py-3 px-4 rounded-full font-jetbrains-mono text-base xl:text-lg font-bold transition-colors border border-gray-600 cursor-pointer
              ${
                isActive(item)
                  ? "bg-primary-red-800! text-blue! hover:bg-primary-red-800/80!"
                  : "bg-white text-gray-800! hover:bg-primary-red-800/60 hover:text-white!"
              }
            `}
            >
              {item.label}
            </Button>
          </Link>
        ))}
      </div>
    </>
  );
};

export default TabBarClient;
