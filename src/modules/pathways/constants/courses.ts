export interface Course {
  code: string;
  name: string;
  description: string;
  instructor?: string;
  href?: string;
}

export const COURSES: Course[] = [
  {
    code: "CIS 1014",
    name: "AI for Everyone",
    description:
      "A non-technical introduction to artificial intelligence, exploring how AI shapes everyday life, society, and careers across industries.",
    instructor: "Dr. Stephen MacNeil",
  },
  {
    code: "CIS 3603",
    name: "User Experience Design",
    description:
      "Learn the full UX design process — from user research and wireframing to prototyping and usability testing — applied to real-world products.",
    instructor: "Kyle Romain",
  },
  {
    code: "CIS 3655",
    name: "Human-AI Interaction",
    description:
      "Examines how people interact with AI systems and how to design AI tools that are explainable, trustworthy, and human-centered.",
    instructor: "Dr. Stephen MacNeil",
  },
  {
    code: "CIS 3755",
    name: "Introduction to Data Visualization",
    description:
      "Covers principles of visual communication, data storytelling, and hands-on creation of interactive charts and dashboards.",
    instructor: "Dr. Stephen MacNeil",
  },
  {
    code: "CIS 2082/4282",
    name: "Special Topics in Computing",
    description:
      "An exploration of emerging areas at the intersection of technology and society, with topics varying by semester.",
    instructor: "Dr. Stephen MacNeil",
  },
  {
    code: "CIS 4398",
    name: "Independent Research",
    description:
      "Supervised undergraduate research working with Dr. Stephen MacNeil. Students typically work in groups with other undergraduates and graduate students. Undergraduates are encouraged to lead their own projects with the help of others.",
    instructor: "Ian Applebaum",
  },
];
