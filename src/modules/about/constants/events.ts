export const EVENTS_GALLERY = [
  { src: "/images/cover/6-studio.JPG", caption: "OwlHacks 2024", rotate: "-rotate-2" },
  { src: "/images/cover/6-studio.JPG", caption: "HCI Open House", rotate: "rotate-1" },
  { src: "/images/cover/6-studio.JPG", caption: "CHI 2024 — Honolulu", rotate: "-rotate-1" },
  { src: "/images/cover/6-studio.JPG", caption: "Studio Showcase", rotate: "rotate-2" },
  { src: "/images/cover/6-studio.JPG", caption: "CSCW 2023", rotate: "-rotate-1" },
  { src: "/images/cover/6-studio.JPG", caption: "Spring Social", rotate: "rotate-1" },
];

export const UPCOMING_EVENTS = [
  {
    title: "HCI Open House",
    date: "Mar 15",
    year: "2025",
    location: "SERC 306",
    tag: "Social",
    description:
      "An open invitation to see the lab in action — meet researchers, explore projects, and find out how to join.",
  },
  {
    title: "OwlHacks",
    date: "Apr 5–6",
    year: "2025",
    location: "SERC 306",
    tag: "Hackathon",
    description:
      "Temple's flagship hackathon — 24 hours of human-centered design challenges led by HCI Lab members.",
  },
  {
    title: "CHI 2025",
    date: "Apr 26",
    year: "2025",
    location: "SERC 306",
    tag: "Conference",
    description:
      "Lab members present peer-reviewed research at the world's top HCI conference.",
  },
  {
    title: "Studio Showcase",
    date: "May 10",
    year: "2025",
    location: "SERC 306",
    tag: "Showcase",
    description:
      "Students present their semester projects in a gallery-style showcase open to all.",
  },
];

export const EVENT_TAG_BG: Record<string, string> = {
  Social: "bg-well-red text-white",
  Hackathon: "bg-gold text-thunder",
  Conference: "bg-sky text-white",
  Showcase: "bg-grass text-white",
};
