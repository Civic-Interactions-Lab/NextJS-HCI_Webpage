import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Course } from "@/modules/pathways/constants";

const CourseCard = ({ course }: { course: Course }) => (
  <article className="rounded-2xl bg-white border border-thunder/10 hover:shadow-md hover:border-thunder/20 transition-all duration-200 p-6 flex flex-col gap-3 h-full">
    <p className="font-outfit text-xs font-medium text-well-red uppercase tracking-widest">
      {course.code}
    </p>
    <h3 className="font-outfit font-medium text-base text-thunder leading-snug">
      {course.name}
    </h3>
    <p className="text-p2 text-thunder/60 leading-relaxed flex-1">
      {course.description}
    </p>
    {course.href && (
      <Link
        href={course.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${course.name} (${course.code}) course details — a Temple HCI Lab pathway course`}
        className="inline-flex items-center gap-1 font-outfit text-xs font-medium text-well-red hover:underline mt-1"
      >
        View course <ArrowRight className="w-3 h-3" aria-hidden="true" />
      </Link>
    )}
  </article>
);

export default CourseCard;
