import { ArrowRight } from "lucide-react";
import Link from "next/link";

const PeopleJoinBanner = () => (
  <div className="-mx-6 md:-mx-12 bg-alabaster px-6 md:px-12 py-14">
    <div className="flex flex-col items-center gap-5 text-center max-w-2xl mx-auto">
      <p className="font-outfit text-sm font-medium text-well-red uppercase tracking-widest">
        Join the Lab
      </p>
      <h2 className="font-outfit font-medium text-3xl md:text-4xl text-thunder leading-tight">
        Interested in becoming our member?
      </h2>
      <p className="text-p1 text-thunder/70 leading-relaxed">
        We&apos;re always looking for curious, driven students to join our
        research community. PhD, masters, undergrad — all welcome.
      </p>
      <Link
        href="/join"
        className="group inline-flex items-center gap-2 font-outfit font-medium text-sm text-white bg-well-red hover:bg-well-red/90 px-6 py-3 rounded-full transition-colors mt-2"
      >
        Apply Now
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  </div>
);

export default PeopleJoinBanner;
