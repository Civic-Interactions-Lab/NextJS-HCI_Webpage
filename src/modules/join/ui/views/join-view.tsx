import { FaqsQueryResult } from "../../../../../sanity.types";
import ViewIntroHeader from "@/components/view-intro-header";
import CtaBanner from "@/components/cta-banner";
import JoinFaqList from "@/modules/join/ui/components/join-faq-list";

interface JoinViewProps {
  faqs: FaqsQueryResult;
}

export default function JoinView({ faqs }: JoinViewProps) {
  return (
    <>
      <ViewIntroHeader
        label="Join the Lab"
        titlePrefix="Have questions before"
        titleAccent="joining us?"
        body="We welcome undergraduate and graduate students who are curious, driven, and passionate about human-centered design, AI, accessibility, and social computing. Here's everything you need to know before applying."
        imageSrc="/images/cover/group-6.jpg"
        imageAlt="Students collaborating in the Temple HCI Lab studio"
      />

      <JoinFaqList faqs={faqs} />

      <CtaBanner
        label="Ready to Apply?"
        title="Join the Temple HCI Lab."
        body="We welcome undergraduate and graduate students passionate about human-centered design, AI, accessibility, and social computing."
        ctaLabel="Apply Now"
        ctaHref="https://docs.google.com/forms/d/e/1FAIpQLScuzv5spPPiuG0sSvb7KFvMucBhJtgParffTVDwC7dWefcCMQ/viewform"
      />
    </>
  );
}
