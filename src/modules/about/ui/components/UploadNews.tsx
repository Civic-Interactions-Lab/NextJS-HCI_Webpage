import React from "react";
import { LinkButton } from "@/components/AppButton";
import { BorderHeading } from "@/components/AppTitle";

const UploadNews = () => {
  return (
    <div className="flex flex-col items-center space-y-6 md:space-y-8">
      <BorderHeading title="WANT TO UPLOAD TO HCI NEWS?" />

      <div className="max-w-3xl mx-auto px-4">
        <p className="text-sm md:text-base lg:text-lg text-gray-700 text-center leading-relaxed">
          Have news to share? Whether it&apos;s a project update, publication,
          event highlight, or personal accomplishment, we&apos;d love to feature
          it. Please submit your update through the form below so we can add it
          to the HCI Lab website and celebrate your work with the community.
        </p>
      </div>

      <div className="flex justify-center">
        <LinkButton
          href="/"
          ariaLabel="Fill out the news upload form"
          text="FILL OUT THIS FORM"
        />
      </div>
    </div>
  );
};

export default UploadNews;
