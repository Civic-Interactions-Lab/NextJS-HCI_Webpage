"use client";

import { motion } from "framer-motion";
import { SectionTitle } from "@/components/section-title";
import CourseCard from "./course-card";
import { COURSES } from "@/modules/pathways/data/pathways-data";

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const CourseList = () => (
  <div className="flex flex-col gap-8">
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
        viewport={{ once: true, amount: 0.1 }}
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      >
        {COURSES.map((course) => (
          <motion.div key={course.code} variants={cardVariants}>
            <CourseCard course={course} />
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-6 text-center">
        <a
          href="https://stevemacn.github.io/courses"
          target="_blank"
          rel="noopener noreferrer"
          className="font-outfit text-sm font-medium text-well-red hover:underline"
        >
          View full course catalog →
        </a>
      </div>
    </div>
  </div>
);

export default CourseList;
