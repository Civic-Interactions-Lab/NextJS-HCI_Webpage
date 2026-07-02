export type HeroSlide = {
  image: string;
  alt: string;
  position: string;
  content?: { text: string; cta: string; href: string };
};

export const SLIDES: HeroSlide[] = [
  {
    image: "/images/cover/group.jpg",
    alt: "Temple HCI Lab members gathered together",
    position: "center 36%",
  },
  {
    image: "/images/cover/NC_09802.jpg",
    alt: "HCI Lab research materials and documentation",
    position: "center 30%",
    content: {
      text: "Our research lab takes a human-centered approach to using AI, NLP, and Visualization to facilitate learning and empower non-experts to participate in work that has been previously reserved for trained professionals.",
      cta: "Learn more about us",
      href: "#intro",
    },
  },
  {
    image: "/images/cover/NC_05301.jpg",
    alt: "Students collaborating at the Temple HCI Lab",
    position: "center 40%",
    content: {
      text: "We love helping students build the skills and confidence to design, lead, and innovate within their own communities — collaborating with organizations like ACM, TUDev, OwlByte, and OwlHacks to turn ideas into real-world impact.",
      cta: "A Hub for Communities",
      href: "#hub",
    },
  },
  {
    image: "/images/cover/HCI_OpenHouse-38.jpg",
    alt: "Temple HCI Lab open house event with students and faculty",
    position: "center 30%",
    content: {
      text: "Stay up to date with the latest publications, awards, and highlights from the Temple HCI Lab — from conference talks to student achievements.",
      cta: "Recent News",
      href: "#news",
    },
  },
];
