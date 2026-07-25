import Link from "next/link";
import Image from "next/image";
import Logo from "@/components/logo";

import { NAV_ITEMS } from "@/constants/nav";

const SOCIAL = [
  { iconUrl: "/logos/insta.webp", href: "https://www.instagram.com/templehci/", label: "Instagram" },
  { iconUrl: "/logos/linkedin.webp", href: "https://www.linkedin.com/company/temple-hci-lab/posts/?feedView=all", label: "LinkedIn" },
  { iconUrl: "/logos/twitter.png", href: "https://x.com/templehci?lang=en", label: "Twitter" },
];

const Footer = () => {
  return (
    <footer className="bg-thunder text-white" role="contentinfo" aria-label="Site footer">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-14">

        {/* Top row: brand + nav columns */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

          {/* Brand */}
          <div className="flex flex-col gap-4 shrink-0 lg:w-56">
            <Logo size={44} />
            <p className="font-outfit text-base text-white/50 leading-relaxed">
              The largest undergraduate research lab at Temple University.
            </p>
            <div className="flex gap-4 mt-1">
              {SOCIAL.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${s.label}`}
                  className="hover:opacity-70 transition-opacity"
                >
                  <Image src={s.iconUrl} alt={s.label} width={22} height={22} className="size-[22px] object-contain" />
                </Link>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="hidden lg:block w-px bg-white/10 self-stretch" />

          {/* Nav columns */}
          <nav
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 flex-1"
            aria-label="Footer navigation"
          >
            {NAV_ITEMS.map((item) => (
              <div key={item.href} className="flex flex-col gap-3">
                <Link
                  href={item.href}
                  className="font-outfit font-semibold text-base text-white hover:text-well-red transition-colors"
                >
                  {item.label}
                </Link>
                {item.children && item.children.length > 0 && (
                  <ul className="flex flex-col gap-2">
                    {item.children.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          className="font-outfit text-sm text-white/45 hover:text-white/80 transition-colors leading-snug"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-outfit text-sm text-white/30">
            © {new Date().getFullYear()} Temple University HCI Lab. All rights reserved.
          </p>
          <p className="font-outfit text-sm text-white/20">
            College of Science and Technology · Philadelphia, PA
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
