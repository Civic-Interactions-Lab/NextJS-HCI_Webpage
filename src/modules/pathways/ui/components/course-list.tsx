"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { SectionTitle } from "@/components/section-title";
import CourseCard, { type Course } from "./course-card";
import { fadeUp, stagger, motionViewport } from "@/lib/motion-tokens";

const COURSES: Course[] = [
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

const CourseList = () => (
  <section
    aria-label="Undergraduate courses offered by the Temple HCI Lab pathway"
    className="flex flex-col gap-8"
  >
    {/* Intro text + photo */}
    <div className="flex flex-col md:flex-row gap-8 md:gap-12 md:items-center">
      <div className="flex flex-col gap-4 flex-1">
        <SectionTitle>Start with a Course</SectionTitle>
        <p className="text-p1 text-thunder/65 leading-relaxed">
          Many students begin their journey in human-computer interaction (HCI),
          user experience (UX) design, artificial intelligence (AI), and data
          visualization through our undergraduate courses. These classes
          introduce students to the principles of designing human-centered
          technology while building practical skills that are valued in industry
          and research careers.
        </p>
        <p className="text-p1 text-thunder/65 leading-relaxed">
          Students learn skills in UX design, user research, AI literacy, data
          storytelling, and human-centered technology development. Many students
          use these courses as a pathway into undergraduate research,
          internships, leadership opportunities, and careers in technology.
        </p>
      </div>
      <div className="shrink-0 w-full md:w-64 lg:w-72 h-72 md:h-80 rounded-2xl overflow-hidden">
        <Image
          src="/images/people/macneil.jpg"
          alt="Dr. Stephen MacNeil won an award, Temple University, Philadelphia, PA"
          width={300}
          height={380}
          className="w-full h-full object-cover object-top"
        />
      </div>
    </div>

    {/* Featured courses grid */}
    <div>
      <p className="font-outfit text-sm font-medium text-thunder/40 uppercase tracking-widest mb-5">
        Featured Courses
      </p>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        initial="hidden"
        whileInView="visible"
        viewport={motionViewport}
        variants={stagger}
      >
        {COURSES.map((course) => (
          <motion.div key={course.code} variants={fadeUp}>
            <CourseCard course={course} />
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-6 text-center">
        <Link
          href="https://stevemacn.github.io/courses"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View the full Temple HCI Lab undergraduate course catalog"
          className="font-outfit text-sm font-medium text-well-red hover:underline"
        >
          View full course catalog →
        </Link>
      </div>
    </div>
  </section>
);

export default CourseList;
