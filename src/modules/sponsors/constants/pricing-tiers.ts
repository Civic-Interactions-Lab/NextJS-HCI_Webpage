export const PRICING_TIERS = [
  {
    id: "supporter",
    title: "Supporter",
    price: "$1,000",
    description:
      "Sponsors a student's research stipend or conference trip. Your name is listed on our website and annual report.",
    perks: ["Name listed on website", "Name in annual report"],
  },
  {
    id: "partner",
    title: "Partner",
    price: "$2,000",
    includes: "Includes Supporter perks",
    description:
      "Logo on lab merch, access to students' emails (with their consent), and an invitation to meet students.",
    perks: ["Logo on lab merch", "Student email access (with consent)", "Invitation to meet students"],
  },
  {
    id: "champion",
    title: "Champion",
    price: "$5,000",
    includes: "Includes Partner perks",
    description:
      "A sponsor spotlight post and the option to name a student award at the annual ACM dinner we host.",
    perks: ["Sponsor spotlight post", "Named student award at ACM dinner"],
  },
];
