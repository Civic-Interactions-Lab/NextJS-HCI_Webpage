"use client";

import { motion } from "framer-motion";
import SponsorCard from "@/modules/sponsors/ui/components/SponsorCard";

interface Grant {
  title: string;
  grantNumber?: string;
  dateRange: string;
  amount: string;
}

interface SponsorData {
  id: string;
  name: string;
  logo: string;
  url: string;
  altText: string;
  description: string;
  grants: Grant[];
}

const sponsors: SponsorData[] = [
  {
    id: "nsf",
    name: "The National Science Foundation (NSF)",
    logo: "/logos/acm.png",
    url: "https://www.nsf.gov/",
    altText: "National Science Foundation logo",
    description: "Detailed grant information and project details",
    grants: [
      {
        title:
          "CAREER: Safety by Design: Protecting Adolescents from Online Risks",
        grantNumber: "#1844811",
        dateRange: "3/2019 - 2/2024",
        amount: "$550,000",
      },
      {
        title:
          "PFI-RP: A Multi-Disciplinary Approach to Detecting Adolescent Online Risks",
        grantNumber: "#2125609",
        dateRange: "9/2021 - 8/2024",
        amount: "$1,000,000",
      },
      {
        title:
          "SaTC: CORE: Small: Collaborative: Leveraging community oversight to enhance collective efficacy for privacy and security",
        grantNumber: "#1956441",
        dateRange: "8/2020 - 7/2023",
        amount: "$500,000",
      },
      {
        title:
          "EAGER:CHS: Examining Self-Harm and Suicide Contagion Risks of Viral Social Media Challenges on Youth and Young Adults",
        grantNumber: "#2134914",
        dateRange: "9/2021 - 8/2023",
        amount: "$300,000",
      },
    ],
  },
  {
    id: "temple-cst",
    name: "Temple College of Science and Technology",
    logo: "/logos/acm-w.png",
    url: "https://www.temple.edu/academics/colleges-schools/college-science-technology",
    altText: "Temple College of Science and Technology logo",
    description: "Detailed grant information and project details",
    grants: [
      {
        title: "Faculty Research Development Grant",
        grantNumber: "#FRDG-2023",
        dateRange: "1/2023 - 12/2023",
        amount: "$25,000",
      },
      {
        title: "Student Research Support Grant",
        grantNumber: "#SRSG-2024",
        dateRange: "1/2024 - 12/2024",
        amount: "$15,000",
      },
    ],
  },
  {
    id: "acl-nidilrr",
    name: "Administration for Community Living & National Institute of Disability, Independent Living and Rehabilitation Research",
    logo: "/logos/hci-logo.png",
    url: "https://www.acl.gov/",
    altText: "ACL and NIDILRR logos",
    description: "Detailed grant information and project details",
    grants: [
      {
        title: "Accessibility Technology Research Grant",
        grantNumber: "#ACL-2023-001",
        dateRange: "6/2023 - 5/2024",
        amount: "$200,000",
      },
      {
        title: "Community Living Support Initiative",
        grantNumber: "#ACL-2024-002",
        dateRange: "1/2024 - 12/2024",
        amount: "$150,000",
      },
    ],
  },
];

const SponsorList = () => {
  return (
    <section>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="text-center md:text-left mb-8 lg:mb-12 max-w-4xl mx-auto"
        >
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Our Sponsors
          </h2>
          <p className="text-base lg:text-lg text-gray-600">
            Thank you to our current sponsors for your generous support! Your
            contributions help the HCI Lab continue to grow, innovate, and
            empower students to make a real impact through research and design.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 max-w-4xl mx-auto">
          {sponsors.map((sponsor, index) => (
            <SponsorCard key={sponsor.id} sponsor={sponsor} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorList;
