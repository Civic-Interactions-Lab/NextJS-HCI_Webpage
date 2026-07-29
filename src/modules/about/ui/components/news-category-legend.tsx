"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { NEWS_CATEGORIES } from "@/modules/about/constants";

interface FilterState {
  categories: string[];
}

interface NewsCategoryLegendProps {
  onFilterChange?: (filters: FilterState) => void;
}

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
      {NEWS_CATEGORIES.map(({ key, color }) => {
        const isActive = active.includes(key);
        return (
          <button
            key={key}
            onClick={() => toggle(key)}
            aria-pressed={isActive}
            aria-label={`Filter Temple HCI Lab news by ${key}`}
            className={`font-outfit text-xs font-medium px-4 py-2 rounded-full border-2 transition-all duration-200 hover:scale-105 ${
              isActive
                ? `${color} text-white border-transparent shadow-md`
                : "text-thunder/60 border-transparent hover:text-thunder"
            }`}
          >
            {key}
          </button>
        );
      })}
      {active.length > 0 && (
        <button
          onClick={clearAll}
          aria-label="Clear all news category filters"
          className="flex items-center gap-1 font-outfit text-xs text-thunder/50 hover:text-well-red transition-colors px-2 py-2"
        >
          <X className="w-3.5 h-3.5" aria-hidden="true" /> Clear
        </button>
      )}
    </div>
  );
};

export default NewsCategoryLegend;
