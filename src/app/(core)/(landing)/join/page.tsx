import JoinView from "@/modules/join/ui/views/join-view";
import CtaBanner from "@/components/cta-banner";
import { getFAQs } from "@/sanity/lib/faq/getFAQs";

const JoinPage = async () => {
  const faqs = await getFAQs();
  return (
    <>
      <JoinView faqs={faqs} />
      <CtaBanner
        label="Ready to Apply?"
        title="Join the Temple HCI Lab."
        body="We welcome undergraduate and graduate students passionate about human-centered design, AI, accessibility, and social computing."
        ctaLabel="Apply Now"
        ctaHref="https://docs.google.com/forms/d/e/1FAIpQLScuzv5spPPiuG0sSvb7KFvMucBhJtgParffTVDwC7dWefcCMQ/viewform"
      />
    </>
  );
};

export default JoinPage;
