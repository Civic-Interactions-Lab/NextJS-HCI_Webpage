"use client";

import { useState } from "react";
import { FILTER_TIERS } from "@/modules/sponsors/constants";

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
    <div
      className="flex flex-wrap items-center gap-2 mb-6"
      role="group"
      aria-label="Filter Temple HCI Lab sponsors by tier"
    >
      <button
        onClick={clearAll}
        aria-pressed={active.length === 0}
        aria-label="Show all Temple HCI Lab sponsors"
        className={`font-outfit text-xs font-medium px-3.5 py-1.5 rounded-full whitespace-nowrap cursor-pointer transition-colors duration-150 border ${
          active.length === 0
            ? "bg-well-red text-white border-well-red"
            : "bg-alabaster text-thunder/70 border-thunder/10"
        }`}
      >
        All
      </button>
      {FILTER_TIERS.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => toggle(key)}
          aria-pressed={active.includes(key)}
          aria-label={`Filter by ${label} tier`}
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
