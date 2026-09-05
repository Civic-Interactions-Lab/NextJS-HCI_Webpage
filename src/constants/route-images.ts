export type RouteImage = {
  src: string;
  alt: string;
};

export const ROUTE_IMAGES: Record<string, RouteImage> = {
  "/about": {
    src: "/images/cover/hci-logo-2.jpg",
    alt: "Temple HCI Lab Logo, Open House, Temple University, Philadelphia, PA",
  },
  "/about/events": {
    src: "/images/cover/open-house-1.jpg",
    alt: "Temple HCI Lab open house event, Philadelphia, PA",
  },
  "/about/news": {
    src: "/images/cover/news.jpg",
    alt: "Researchers from Temple University College of Science and Technology recently received $1.5 million, Temple University, Philadelphia, PA",
  },
  "/about/contact": {
    src: "/images/cover/studio-2.jpeg",
    alt: "Temple HCI Lab studio time, Temple University, Philadelphia, PA",
  },
  "/research": {
    src: "/images/cover/research-1.jpg",
    alt: "Temple HCI Lab research poster in SERC, Temple University, Philadelphia, PA",
  },
  "/research/gen-ai-education": {
    src: "/images/cover/research-5.jpg",
    alt: "Kush Patel presenting his research poster in SERC, Temple University, Philadelphia, PA",
  },
  "/research/accessibility-technology": {
    src: "/images/cover/research-6.jpg",
    alt: "Cindy Zastudil, Accessibility technology research, at a conference, Temple HCI Lab",
  },
  "/research/future-of-work": {
    src: "/images/cover/research-3.jpg",
    alt: "Kenneth Angelikas presenting his research poster in SERC, Temple HCI Lab",
  },
  "/people": {
    src: "/images/cover/open-house-2.jpg",
    alt: "Temple HCI Lab open house event, Temple University, Philadelphia, PA",
  },
  "/people/alumni": {
    src: "/images/cover/group-5.jpg",
    alt: "Temple HCI Lab alumni group photo, Temple University, Philadelphia, PA",
  },
  "/people/collaborators": {
    src: "/images/cover/news-1.jpg",
    alt: "Temple HCI Lab collaborators, Temple University, Philadelphia, PA",
  },
  "/pathways": {
    src: "/images/cover/open-house-6.jpg",
    alt: "Temple HCI Lab open house event, Temple University, Philadelphia, PA",
  },
  "/sponsors": {
    src: "/images/cover/hci-logo-1.jpg",
    alt: "Temple HCI Lab Logo, Temple University, Philadelphia, PA",
  },
  "/sponsors/become": {
    src: "/images/cover/open-house-4.jpg",
    alt: "Temple HCI Lab open house event, Temple University, Philadelphia, PA",
  },
  "/join": {
    src: "/images/cover/open-house-5.jpg",
    alt: "Temple HCI Lab open house event, Temple University, Philadelphia, PA",
  },
};

export const DEFAULT_ROUTE_IMAGE: RouteImage = {
  src: "/images/cover/open-house-6.jpg",
  alt: "Temple HCI Lab open house event, Temple University, Philadelphia, PA",
};

export const getRouteImage = (href: string): RouteImage =>
  ROUTE_IMAGES[href] ??
  ROUTE_IMAGES[`/${href.split("/").filter(Boolean)[0]}`] ??
  DEFAULT_ROUTE_IMAGE;
