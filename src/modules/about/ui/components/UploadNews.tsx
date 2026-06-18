import { ArrowRight } from "lucide-react";

const UploadNews = () => {
  return (
    <div className="-mx-6 md:-mx-12 bg-alabaster px-6 md:px-12 py-14">
      <div className="flex flex-col items-center gap-5 text-center max-w-2xl mx-auto">
        <p className="font-outfit text-sm font-medium text-well-red uppercase tracking-widest">
          Share your story
        </p>
        <h2 className="font-outfit font-medium text-3xl md:text-4xl text-thunder leading-tight">
          Want to upload to HCI News?
        </h2>
        <p className="text-p1 text-thunder/70 leading-relaxed">
          Have news to share? Whether it&apos;s a project update, publication,
          event highlight, or personal accomplishment, we&apos;d love to feature
          it. Submit your update and we&apos;ll celebrate your work with the
          community.
        </p>
        <a
          href="/"
          className="group inline-flex items-center gap-2 font-outfit font-medium text-sm text-white bg-well-red hover:bg-well-red/90 px-6 py-3 rounded-full transition-colors mt-2"
        >
          Fill out this form
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
};

export default UploadNews;
