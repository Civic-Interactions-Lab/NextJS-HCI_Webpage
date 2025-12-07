import React from "react";
import Logo from "@/components/Logo";
import Link from "next/link";
import Image from "next/image";
import { navItems } from "@/constants/navItems";

const socialLinks = [
  {
    iconUrl: "/logos/insta.webp",
    href: "https://www.instagram.com/templehci/",
    label: "Instagram",
  },
  {
    iconUrl: "/logos/linkedin.webp",
    href: "https://www.linkedin.com/company/temple-hci-lab/posts/?feedView=all",
    label: "LinkedIn",
  },
  {
    iconUrl: "/logos/twitter.png",
    href: "https://x.com/templehci?lang=en",
    label: "Twitter",
  },
];

const Footer = () => {
  return (
    <footer
      className="bg-[#292727] text-white p-6 sm:p-8 md:p-12"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-12">
          {/* Logo */}
          <Logo size={48} />

          {/* Navigation Links */}
          <nav
            className="grid grid-cols-2 gap-x-8 sm:gap-x-12 gap-y-2 text-center sm:text-left"
            aria-label="Footer navigation"
          >
            {navItems?.map((link) => (
              <Link
                key={link.label}
                href={link.path}
                className="!text-white font-outfit text-lg font-medium hover:!text-red-500 transition-colors"
                title={link.linkDescription || `Navigate to ${link.label} page`}
                aria-label={
                  link.linkDescription || `Navigate to ${link.label} page`
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Social Media Icons */}
        <div
          className="flex gap-6 sm:gap-8 items-center"
          role="group"
          aria-label="Social media links"
        >
          {socialLinks.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg hover:opacity-80 transition-opacity size-10"
              aria-label={`Follow us on ${social.label}`}
            >
              <Image
                src={social.iconUrl}
                alt={`${social.label} icon`}
                width={24}
                height={24}
                className="object-cover size-full"
                loading="lazy"
              />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
