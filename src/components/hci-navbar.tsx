"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import Logo from "@/components/Logo";

type NavSubItem = {
  label: string;
  href: string;
  image?: string;
  description?: string;
};

type NavItem = {
  label: string;
  href: string;
  description?: string;
  children?: NavSubItem[];
};

const NAV_ITEMS: NavItem[] = [
  {
    label: "About",
    href: "/about",
    description: "Learn about our mission, values, and the people behind the lab.",
    children: [
      {
        label: "Events",
        href: "/about/events",
        image: "/images/cover/6-studio.JPG",
        description: "Workshops, open houses, and community gatherings.",
      },
      {
        label: "News",
        href: "/about/news",
        description: "Latest updates and announcements from the lab.",
      },
      {
        label: "Contact",
        href: "/about/contact",
        description: "Get in touch with our team.",
      },
    ],
  },
  {
    label: "Research",
    href: "/research",
    description: "Human-centered research across AI, accessibility, and social systems.",
    children: [
      {
        label: "Gen AI & Education",
        href: "/research/gen-ai-education",
        image: "/images/cover/6-studio.JPG",
        description: "Generative AI tools that support teaching and learning.",
      },
      {
        label: "Accessibility Technology",
        href: "/research/accessibility-technology",
        description: "Inclusive design and assistive tech for everyone.",
      },
      {
        label: "Future of Work",
        href: "/research/future-of-work",
        description: "How people collaborate and thrive through technology.",
      },
    ],
  },
  {
    label: "People",
    href: "/people",
    description: "Meet the current members driving HCI research at Temple.",
    children: [
      {
        label: "Alumni",
        href: "/people/alumni",
        image: "/images/cover/6-studio.JPG",
        description: "Former members who have shaped the lab.",
      },
      {
        label: "Collaborators",
        href: "/people/collaborators",
        description: "External partners and research collaborators.",
      },
    ],
  },
  { label: "Courses", href: "/courses" },
  {
    label: "Sponsors",
    href: "/sponsors",
    description: "Organizations that support our research and mission.",
    children: [
      {
        label: "Become a Sponsor",
        href: "/sponsors/become",
        image: "/images/cover/6-studio.JPG",
        description: "Partner with the HCI Lab and support the next generation.",
      },
    ],
  },
  { label: "Join", href: "/join" },
];

export default function HciNavbar() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const t = Math.min(Math.max(scrollY / 80, 0), 1);
  const bgOpacity = t * t * (3 - 2 * t);
  const gradientOpacity = 1 - bgOpacity;
  const isLight = bgOpacity > 0.5;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-shadow duration-300"
        style={{
          backgroundColor: `rgba(255, 255, 255, ${bgOpacity * 0.85})`,
          boxShadow: bgOpacity > 0.1 ? `0 1px 8px rgba(0,0,0,${bgOpacity * 0.08})` : "none",
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-black/80 via-black/40 to-transparent pointer-events-none -z-10"
          style={{ opacity: gradientOpacity }}
        />
        <div className="flex items-center justify-between px-6 md:px-12 h-[68px]">
          <div className="flex items-center gap-3">
            <Logo size={40} />
            <span
              className={`font-outfit font-medium text-lg pointer-events-none transition-colors duration-300 ${isLight ? "text-thunder" : "text-white"}`}
              style={{ opacity: Math.min(Math.max((scrollY - 280) / 160, 0), 1) }}
            >
              Temple HCI Lab
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <div key={item.href} className="relative">
                {item.children ? (
                  <button
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === item.href ? null : item.href,
                      )
                    }
                    className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors font-outfit font-medium text-lg ${
                      isLight ? "hover:bg-thunder/8" : "hover:bg-white/10"
                    } ${
                      isActive(item.href)
                        ? "text-well-red"
                        : isLight ? "text-thunder/70 hover:text-thunder" : "text-white/90 hover:text-white"
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        openDropdown === item.href ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`block px-3 py-2 rounded-md transition-colors font-outfit font-medium text-lg ${
                      isLight ? "hover:bg-thunder/8" : "hover:bg-white/10"
                    } ${
                      isActive(item.href)
                        ? "text-well-red"
                        : isLight ? "text-thunder/70 hover:text-thunder" : "text-white/90 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}

                {/* Desktop Dropdown Panel */}
                {item.children && openDropdown === item.href && (
                  <div className={`absolute top-full mt-2 min-w-[560px] bg-thunder/95 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl overflow-hidden ${item.href === "/about" ? "left-0" : "right-0"}`}>
                    <div className="flex">
                      {/* Featured card — main route */}
                      <Link
                        href={item.href}
                        onClick={() => setOpenDropdown(null)}
                        className="shrink-0 w-64 group"
                      >
                        <div className="relative h-28 overflow-hidden">
                          <Image
                            src={item.children[0].image ?? "/images/cover/6-studio.JPG"}
                            alt={item.label}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/30" />
                        </div>
                        <div className="p-3">
                          <p className="label-5 text-white">{item.label}</p>
                          {item.description && (
                            <p className="text-p3 text-white/60 mt-0.5">{item.description}</p>
                          )}
                        </div>
                      </Link>

                      {/* All children */}
                      <div className="w-px bg-white/10 my-3" />
                      <div className="flex flex-col justify-start gap-1 p-4 flex-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setOpenDropdown(null)}
                            className="flex flex-col px-2 py-1.5 rounded-md hover:bg-white/10 transition-colors group"
                          >
                            <span className="label-5 text-white/80 group-hover:text-white transition-colors">{child.label}</span>
                            {child.description && (
                              <span className="text-p3 text-white/40 group-hover:text-white/60 transition-colors mt-0.5">{child.description}</span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            className={`md:hidden p-2 rounded-md transition-colors ${isLight ? "text-thunder hover:bg-thunder/8" : "text-white hover:bg-white/10"}`}
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Full-Screen Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-thunder overflow-y-auto md:hidden">
          <div className="flex items-center justify-between px-6 h-16 border-b border-white/10">
            <Logo size={40} />
            <button
              className="text-white p-2 rounded-md hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="px-6 py-2">
            {NAV_ITEMS.map((item) => (
              <div key={item.href} className="border-b border-white/10">
                {item.children ? (
                  <>
                    <div className="flex items-center justify-between py-4">
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`label-4 transition-colors ${isActive(item.href) ? "text-well-red" : "text-white"}`}
                      >
                        {item.label}
                      </Link>
                      <button
                        onClick={() =>
                          setOpenAccordion(
                            openAccordion === item.href ? null : item.href,
                          )
                        }
                        className="p-1 text-white/60 hover:text-white transition-colors"
                        aria-label={`Toggle ${item.label} submenu`}
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            openAccordion === item.href ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>
                    {openAccordion === item.href && (
                      <div className="pb-3 pl-4 flex flex-col gap-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="flex flex-col py-2 pl-3 border-l border-white/20 hover:border-white/50 transition-colors group"
                          >
                            <span className="text-p2 text-white/70 group-hover:text-white transition-colors">{child.label}</span>
                            {child.description && (
                              <span className="text-p3 text-white/40 group-hover:text-white/60 transition-colors mt-0.5">{child.description}</span>
                            )}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block py-4 label-4 transition-colors ${
                      isActive(item.href) ? "text-well-red" : "text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
