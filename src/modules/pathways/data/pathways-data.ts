export interface Course {
  code: string;
  name: string;
  description: string;
  href?: string;
}

export const COURSES: Course[] = [
  {
    code: "CIS 1014",
    name: "AI for Everyone",
    description:
      "A non-technical introduction to artificial intelligence, exploring how AI shapes everyday life, society, and careers across industries.",
  },
  {
    code: "CIS 3603",
    name: "User Experience Design",
    description:
      "Learn the full UX design process — from user research and wireframing to prototyping and usability testing — applied to real-world products.",
  },
  {
    code: "CIS 3655",
    name: "Human-AI Interaction",
    description:
      "Examines how people interact with AI systems and how to design AI tools that are explainable, trustworthy, and human-centered.",
  },
  {
    code: "CIS 3755",
    name: "Introduction to Data Visualization",
    description:
      "Covers principles of visual communication, data storytelling, and hands-on creation of interactive charts and dashboards.",
  },
  {
    code: "CIS 4398",
    name: "Projects in CS",
    description:
      "A capstone-style course where students tackle real client projects, applying software engineering and design skills in team settings.",
  },
];

export const COMPANIES = [
  { name: "Google",    logo: "/logos/google.webp",   href: "https://google.com" },
  { name: "Microsoft", logo: "/logos/microsoft.png",  href: "https://microsoft.com" },
  { name: "SAP",       logo: "/logos/sap.png",        href: "https://sap.com" },
  { name: "Comcast",   logo: "/logos/comcast.png",    href: "https://corporate.comcast.com/" },
  { name: "JP Morgan", logo: "/logos/jpmorgan.png",   href: "https://jpmorgan.com" },
];

export const UNIVERSITIES = [
  { name: "UMich",        logo: "/logos/umich.png",      href: "https://umich.edu" },
  { name: "UCSD",         logo: "/logos/ucsd.png",       href: "https://ucsd.edu" },
  { name: "MIT",          logo: "/logos/mit.png",        href: "https://mit.edu" },
  { name: "Georgia Tech", logo: "/logos/gtech.png",      href: "https://gatech.edu" },
  { name: "Harvard",      logo: "/logos/harvard.png",    href: "https://harvard.edu" },
  { name: "UIUC",         logo: "/logos/Illinoisu.png",  href: "https://illinois.edu" },
];

export const ORGANIZATIONS = [
  {
    name: "OwlHacks",
    logo: "https://d112y698adiu2z.cloudfront.net/photos/production/challenge_photos/002/962/488/datas/original.PNG",
    href: "https://www.owlhacks.com",
  },
  {
    name: "ACM",
    logo: "https://www.owlhacks.com/endorsement_logo/ACM.svg",
    href: "https://acm.temple.edu",
  },
  {
    name: "TUDev",
    logo: "https://cis.temple.edu/assets/img/thumbnail/student-org-tudev.jpg",
    href: "https://tudev.org",
  },
  {
    name: "Code for Philly",
    logo: "https://spiritnews.org/wp-content/uploads/2016/05/code-for-philly-copy.jpg",
    href: "https://codeforphilly.org",
  },
  {
    name: "PhillyCHI",
    logo: "https://images.squarespace-cdn.com/content/63b43c38ed9f2c0a9819b8d3/dce92198-d18a-4d74-812b-8185895f30fe/Logo+Horizotal+BW+1.png?format=1500w&content-type=image%2Fpng",
    href: "https://phillychi.org",
  },
];
