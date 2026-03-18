import React from "react";
import { SectionHeading } from "@/components/AppTitle";
import Image from "next/image";
import Link from "next/link";

const organizations = [
  {
    name: "OwlHacks",
    logo: "https://d112y698adiu2z.cloudfront.net/photos/production/challenge_photos/002/962/488/datas/original.PNG",
    href: "https://www.owlhacks.com",
  },
  {
    name: "ACM",
    logo: "https://www.owlhacks.com/endorsement_logo/ACM.svg",
    href: "https://acm.temple.edu",
  },
  {
    name: "TUDev",
    logo: "https://cis.temple.edu/assets/img/thumbnail/student-org-tudev.jpg",
    href: "https://tudev.org",
  },
  {
    name: "Code for Philly",
    logo: "https://spiritnews.org/wp-content/uploads/2016/05/code-for-philly-copy.jpg",
    href: "https://codeforphilly.org",
  },
  {
    name: "PhillyCHI",
    logo: "https://images.squarespace-cdn.com/content/63b43c38ed9f2c0a9819b8d3/dce92198-d18a-4d74-812b-8185895f30fe/Logo+Horizotal+BW+1.png?format=1500w&content-type=image%2Fpng",
    href: "https://phillychi.org",
  },
];

const OrgBadge = ({
  name,
  logo,
  href,
}: {
  name: string;
  logo: string;
  href: string;
}) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center p-2 hover:scale-105 transition-transform"
  >
    <div className="relative min-w-16 h-16">
      <Image src={logo} alt={`${name} logo`} fill className="object-contain" />
    </div>
  </Link>
);

const OtherOpportunities = () => {
  return (
    <div className="flex flex-col space-y-4 ">
      <SectionHeading title="Other Opportunities" />

      <div className="flex flex-col">
        <p className="text-sm md:text-base lg:text-lg mb-6">
          There are other ways to get involved with us. We host the{" "}
          <span className="font-semibold">OwlHacks</span> hackathon here at
          Temple and you can develop your leadership skills. Our members are
          very involved with <span className="font-semibold">ACM</span> and{" "}
          <span className="font-semibold">ACM-W</span> where you can learn more
          about career development. Finally, we have partnered with{" "}
          <span className="font-semibold">TUDev</span> to provide more
          development skills that extend beyond your classes. So even if we
          don&apos;t have space right now, there are many ways to get involved
          with us.
        </p>

        <div className="flex flex-wrap gap-3 justify-center">
          {organizations.map((org) => (
            <OrgBadge key={org.name} {...org} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OtherOpportunities;
