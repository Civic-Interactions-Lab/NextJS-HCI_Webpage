export type NavSubItem = {
  label: string;
  href: string;
  image?: string;
  description?: string;
};

export type NavItem = {
  label: string;
  href: string;
  description?: string;
  children?: NavSubItem[];
};

export const NAV_ITEMS: NavItem[] = [
  {
    label: "About",
    href: "/about",
    description: "Learn about our mission, values, and the people behind the lab.",
    children: [
      { label: "Events", href: "/about/events", image: "/images/cover/HCI_OpenHouse-5.jpg", description: "Workshops, open houses, and community gatherings." },
      { label: "News", href: "/about/news", description: "Latest updates and announcements from the lab." },
      { label: "Contact", href: "/about/contact", description: "Get in touch with our team." },
    ],
  },
  {
    label: "Research",
    href: "/research",
    description: "Human-centered research across AI, accessibility, and social systems.",
    children: [
      { label: "Gen AI & Education", href: "/research/gen-ai-education", image: "/images/cover/HCI_OpenHouse-5.jpg", description: "Generative AI tools that support teaching and learning." },
      { label: "Accessibility Technology", href: "/research/accessibility-technology", description: "Inclusive design and assistive tech for everyone." },
      { label: "Future of Work", href: "/research/future-of-work", description: "How people collaborate and thrive through technology." },
    ],
  },
  {
    label: "People",
    href: "/people",
    description: "Meet the current members driving HCI research at Temple.",
    children: [
      { label: "Alumni", href: "/people/alumni", image: "/images/cover/HCI_OpenHouse-5.jpg", description: "Former members who have shaped the lab." },
      { label: "Collaborators", href: "/people/collaborators", description: "External partners and research collaborators." },
    ],
  },
  { label: "Pathways", href: "/pathways" },
  {
    label: "Sponsors",
    href: "/sponsors",
    description: "Organizations that support our research and mission.",
    children: [
      { label: "Become a Sponsor", href: "/sponsors/become", image: "/images/cover/HCI_OpenHouse-5.jpg", description: "Partner with the HCI Lab and support the next generation." },
    ],
  },
  { label: "Join", href: "/join" },
];
