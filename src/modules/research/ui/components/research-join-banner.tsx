import { ArrowRight } from "lucide-react";
import Link from "next/link";

const ResearchJoinBanner = () => (
  <div className="-mx-6 md:-mx-12 bg-alabaster px-6 md:px-12 py-14">
    <div className="flex flex-col items-center gap-5 text-center max-w-2xl mx-auto">
      <p className="font-outfit text-sm font-medium text-well-red uppercase tracking-widest">
        Get involved
      </p>
      <h2 className="font-outfit font-medium text-3xl md:text-4xl text-thunder leading-tight">
        Interested in joining our research?
      </h2>
      <p className="text-p1 text-thunder/70 leading-relaxed">
        The Temple HCI Lab welcomes undergraduate and graduate students who are
        passionate about human-centered design, AI, accessibility, and social
        computing. Apply to join and help shape the future of HCI research.
      </p>
      <Link
        href="/join"
        className="group inline-flex items-center gap-2 font-outfit font-medium text-sm text-white bg-well-red hover:bg-well-red/90 px-6 py-3 rounded-full transition-colors mt-2"
      >
        Apply to join
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  </div>
);

export default ResearchJoinBanner;
