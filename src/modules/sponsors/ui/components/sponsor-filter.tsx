"use client";

import { useState } from "react";

const TIERS = [
  { key: "supporter", label: "Supporter" },
  { key: "partner", label: "Partner" },
  { key: "champion", label: "Champion" },
  { key: "visionary", label: "Visionary" },
];

interface SponsorFilterProps {
  total: number;
  onFilterChange: (tiers: string[]) => void;
}

const SponsorFilter = ({ total, onFilterChange }: SponsorFilterProps) => {
  const [active, setActive] = useState<string[]>([]);

  const toggle = (key: string) => {
    const next = active.includes(key)
      ? active.filter((k) => k !== key)
      : [...active, key];
    setActive(next);
    onFilterChange(next);
  };

  const clearAll = () => {
    setActive([]);
    onFilterChange([]);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <button
        onClick={clearAll}
        className={`font-outfit text-xs font-medium px-3.5 py-1.5 rounded-full whitespace-nowrap cursor-pointer transition-colors duration-150 border ${
          active.length === 0
            ? "bg-well-red text-white border-well-red"
            : "bg-alabaster text-thunder/70 border-thunder/10"
        }`}
      >
        All
      </button>
      {TIERS.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => toggle(key)}
          className={`font-outfit text-xs font-medium px-3.5 py-1.5 rounded-full whitespace-nowrap cursor-pointer transition-colors duration-150 border ${
            active.includes(key)
              ? "bg-well-red text-white border-well-red"
              : "bg-alabaster text-thunder/70 border-thunder/10"
          }`}
        >
          {label}
        </button>
      ))}
      {active.length > 0 && (
        <span className="font-outfit text-xs text-thunder/40 ml-1">
          Showing {total} sponsor{total !== 1 ? "s" : ""}
        </span>
      )}
    </div>
  );
};

export default SponsorFilter;
