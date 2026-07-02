export const NEWS_CATEGORIES = [
  { key: "Collaborations", color: "bg-gold", border: "border-l-gold" },
  { key: "Grants / Awards", color: "bg-violet", border: "border-l-violet" },
  { key: "Conference Talk", color: "bg-grass", border: "border-l-grass" },
  { key: "Published Papers", color: "bg-sky", border: "border-l-sky" },
  { key: "Alumni", color: "bg-ember", border: "border-l-ember" },
];

export const CATEGORY_COLORS: Record<string, string> = NEWS_CATEGORIES.reduce(
  (acc, { key, color }) => ({ ...acc, [key]: color }),
  {},
);

export const CATEGORY_BORDER: Record<string, string> = NEWS_CATEGORIES.reduce(
  (acc, { key, border }) => ({ ...acc, [key]: border }),
  {},
);
