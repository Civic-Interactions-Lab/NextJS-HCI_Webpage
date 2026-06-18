"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface FilterState {
  categories: string[];
}

interface NewsCategoryLegendProps {
  onFilterChange?: (filters: FilterState) => void;
}

const CATEGORIES = [
  { key: "Collaborations", color: "bg-gold" },
  { key: "Grants / Awards", color: "bg-violet" },
  { key: "Conference Talk", color: "bg-grass" },
  { key: "Published Papers", color: "bg-sky" },
  { key: "Alumni", color: "bg-ember" },
];

const NewsCategoryLegend = ({ onFilterChange }: NewsCategoryLegendProps) => {
  const [active, setActive] = useState<string[]>([]);

  const toggle = (key: string) => {
    const next = active.includes(key)
      ? active.filter((k) => k !== key)
      : [...active, key];
    setActive(next);
    onFilterChange?.({ categories: next });
  };

  const clearAll = () => {
    setActive([]);
    onFilterChange?.({ categories: [] });
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {CATEGORIES.map(({ key, color }) => {
        const isActive = active.includes(key);
        return (
          <button
            key={key}
            onClick={() => toggle(key)}
            className={`font-outfit text-xs font-medium px-4 py-2 rounded-full border-2 transition-all duration-200 hover:scale-105 ${
              isActive
                ? `${color} text-white border-transparent shadow-md`
                : "bg-alabaster text-thunder/60 border-transparent hover:text-thunder"
            }`}
          >
            {key}
          </button>
        );
      })}
      {active.length > 0 && (
        <button
          onClick={clearAll}
          className="flex items-center gap-1 font-outfit text-xs text-thunder/50 hover:text-well-red transition-colors px-2 py-2"
        >
          <X className="w-3.5 h-3.5" /> Clear
        </button>
      )}
    </div>
  );
};

export default NewsCategoryLegend;
