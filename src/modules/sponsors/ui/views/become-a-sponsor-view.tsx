"use client";

import CtaBanner from "@/components/cta-banner";
import ViewIntroHeader from "@/components/view-intro-header";
import ImpactStories from "@/modules/sponsors/ui/components/impact-stories";
import IndividualGiving from "@/modules/sponsors/ui/components/individual-giving";
import SponsorshipTiers from "@/modules/sponsors/ui/components/sponsorship-tiers";

export default function BecomeASponsorView() {
  return (
  <div className="space-y-32">
    {/* Intro header */}
    <ViewIntroHeader
      label="Become a Sponsor"
      titlePrefix="Sponsors don't just fund research —"
      titleAccent="they shape innovators."
      body="Your sponsorship gives undergraduate students the resources to tackle real-world challenges, design technology that serves people, and grow as the next generation of HCI and UX leaders. Unlike traditional recruiting, you see students' ideas, skills, and research in action."
      imageSrc="/images/cover/NC_09802.jpg"
      imageAlt="Students presenting research at the Temple HCI Lab"
      ctaLabel="Get in touch"
      ctaHref="mailto:stevemacn@temple.edu"
    />

    {/* Impact stories */}
    <ImpactStories />

    <IndividualGiving />

    <SponsorshipTiers />

    {/* CTA strip */}
    <CtaBanner
      label="Ready to Partner?"
      title="Let's talk about how we can work together."
      body="Reach out to Dr. Steve MacNeil to learn more about sponsorship opportunities and how your organization can make an impact."
      ctaLabel="Contact Us"
      ctaHref="mailto:stevemacn@temple.edu"
    />
  </div>
  );
}
