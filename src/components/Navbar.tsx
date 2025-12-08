"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Logo from "@/components/Logo";
import { navItems } from "@/constants/navItems";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? "backdrop-blur-md bg-black/40 shadow-lg" : "bg-transparent"
      }`}
    >
      <div
        className={`flex items-center justify-between px-6 md:px-12 max-w-7xl mx-auto transition-all duration-300 ${
          isScrolled ? "py-3" : "py-6"
        }`}
      >
        {/* Logo and Mobile Menu */}
        <div className="flex items-center justify-between gap-4 w-full">
          {/* Logo */}
          <div
            className={`transition-all duration-300 ${isScrolled ? "scale-75" : "scale-100"}`}
          >
            <Logo size={48} />
          </div>

          {/* Mobile Hamburger Menu */}
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button
                className={`group md:hidden flex items-center justify-center !bg-transparent !border-2 transition-all duration-300 ${
                  isScrolled
                    ? "size-8 !border-white/70 hover:!bg-black/60"
                    : "size-10 !border-white hover:!bg-white"
                }`}
                variant="outline"
                size="icon"
                aria-label={
                  isOpen ? "Close navigation menu" : "Open navigation menu"
                }
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                <div
                  className={`relative flex items-center justify-center transition-all duration-300 ${
                    isScrolled ? "size-6" : "size-8"
                  }`}
                >
                  <Menu
                    className={`absolute text-white transition-all duration-300 ${
                      isScrolled ? "size-4" : "size-5"
                    } ${
                      isScrolled
                        ? "group-hover:text-white"
                        : "group-hover:text-black"
                    } ${
                      isOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
                    }`}
                    aria-hidden="true"
                  />
                  <X
                    className={`absolute text-white transition-all duration-300 ${
                      isScrolled ? "size-4" : "size-5"
                    } ${
                      isScrolled
                        ? "group-hover:text-white"
                        : "group-hover:text-black"
                    } ${
                      isOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
                    }`}
                    aria-hidden="true"
                  />
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="w-48 p-2 md:hidden mr-6"
              id="mobile-menu"
              role="menu"
              aria-label="Navigation menu"
            >
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-1">
                  {navItems?.map((item) => (
                    <NavigationMenuItem key={item.path} className="w-full">
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.path}
                          onClick={() => setIsOpen(false)}
                          className="!text-black !bg-transparent !text-base font-roboto transition-colors hover:!bg-black/10 px-3 py-1 rounded-md block w-full"
                          role="menuitem"
                          aria-label={
                            item?.linkDescription ||
                            `Navigate to ${item?.label || item.path}`
                          }
                        >
                          {item.label}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
        </div>

        {/* Desktop Navigation Menu */}
        <NavigationMenu className="hidden md:block">
          <NavigationMenuList
            className={`transition-all duration-300 ${
              isScrolled ? "gap-1" : "gap-2"
            }`}
          >
            {navItems?.map((item) => (
              <NavigationMenuItem key={item.path}>
                <NavigationMenuLink asChild>
                  <Link
                    href={item.path}
                    className={`!text-white !bg-transparent mx-1 xl:mx-2 !font-medium font-roboto transition-all duration-300 rounded-md whitespace-nowrap block ${
                      isScrolled
                        ? "!text-base px-2 py-1 hover:!bg-black/60"
                        : "!text-lg px-3 py-2 hover:!bg-black/20"
                    }`}
                    aria-label={
                      item?.linkDescription ||
                      `Navigate to ${item?.label || item.path}`
                    }
                  >
                    {item.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
};

export default NavBar;
