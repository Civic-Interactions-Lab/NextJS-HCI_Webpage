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
