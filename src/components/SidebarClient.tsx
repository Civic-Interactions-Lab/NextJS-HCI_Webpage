"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface SidebarClientProps {
  pathname?: string; // Fallback from server
}

const SidebarClient = ({ pathname: serverPathname }: SidebarClientProps) => {
  // Use client-side hooks for accurate pathname and search params
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentSub = searchParams.get("sub");

  const getSidebarItems = () => {
    switch (pathname) {
      case "/about":
        return [
          { label: "About", path: "/about", isMain: true },
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
            path: "/sponsors?sub=become-our-sponsor",
          },
        ];
      default:
        return [];
    }
  };

  const sidebarItems = getSidebarItems();

  const isActive = (item: { path: string; isMain?: boolean }) => {
    if (item.isMain) {
      // Main item is active when we're on the base path with no sub param
      return pathname === item.path.split("?")[0] && !currentSub;
    }

    // Sub-item is active when the sub param matches
    const itemSub = new URLSearchParams(item.path.split("?")[1] || "").get(
      "sub",
    );
    return currentSub === itemSub;
  };

  // Don't render anything if no sidebar items (prevents layout shift)
  if (sidebarItems.length === 0) {
    return null;
  }

  return (
    <aside className="hidden md:block w-80 shrink-0 overflow-hidden">
      <div className="sticky">
        <nav className="border border-gray-200 bg-white rounded-lg overflow-hidden w-full md:w-auto">
          <div className="p-2">
            {sidebarItems.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className={`
                  block w-full text-left px-4 py-3 text-base rounded-md transition-colors mb-1 truncate
                  ${
                    isActive(item)
                      ? "bg-primary-red-800 !text-primary-red-foreground font-medium"
                      : "bg-white !text-gray-800 hover:bg-gray-50"
                  }
                  ${index !== sidebarItems.length - 1 ? "border-b" : ""}
                `}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default SidebarClient;
