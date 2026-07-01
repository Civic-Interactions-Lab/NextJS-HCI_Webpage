"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SectionTitle } from "@/components/section-title";
import CourseCard from "./course-card";
import { COURSES, fadeUp, stagger, courseGridViewport } from "@/modules/pathways/constants";

const CourseList = () => (
  <section
    aria-label="Undergraduate courses offered by the Temple HCI Lab pathway"
    className="flex flex-col gap-8"
  >
    {/* Intro text */}
    <div className="flex flex-col gap-4 max-w-2xl">
      <SectionTitle>Start with a Course</SectionTitle>
      <p className="text-p1 text-thunder/65 leading-relaxed">
        Many students begin their journey in human-computer interaction (HCI),
        user experience (UX) design, artificial intelligence (AI), and data
        visualization through our undergraduate courses. These classes introduce
        students to the principles of designing human-centered technology while
        building practical skills that are valued in industry and research
        careers.
      </p>
      <p className="text-p1 text-thunder/65 leading-relaxed">
        Students learn skills in UX design, user research, AI literacy, data
        storytelling, and human-centered technology development. Many students
        use these courses as a pathway into undergraduate research, internships,
        leadership opportunities, and careers in technology.
      </p>
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
        viewport={courseGridViewport}
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
