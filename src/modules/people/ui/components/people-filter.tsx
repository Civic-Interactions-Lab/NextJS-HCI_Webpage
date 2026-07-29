"use client";

import { useState } from "react";
import { statusLabels } from "@/modules/people/constants";

const STATUS_OPTIONS = Object.entries(statusLabels).map(([value, label]) => ({
  value,
  label,
}));

interface PeopleFilterProps {
  total: number;
  onFilterChange: (active: string[]) => void;
}

const PeopleFilter = ({ total, onFilterChange }: PeopleFilterProps) => {
  const [active, setActive] = useState<string[]>([]);

  const toggle = (value: string) => {
    const next = active.includes(value)
      ? active.filter((v) => v !== value)
      : [...active, value];
    setActive(next);
    onFilterChange(next);
  };

  const clearAll = () => {
    setActive([]);
    onFilterChange([]);
  };

  return (
    <div className="flex flex-col gap-2 mb-6" role="group" aria-label="Filter Temple HCI Lab members by role">
      <div className="flex flex-nowrap gap-2 overflow-x-auto pb-1 scrollbar-none">
        {/* All chip */}
        <button
          onClick={clearAll}
          aria-pressed={active.length === 0}
          aria-label="Show all Temple HCI Lab members"
          className={`whitespace-nowrap font-outfit text-xs font-medium px-3.5 py-1.5 rounded-full border transition-colors duration-150 shrink-0 ${
            active.length === 0
              ? "bg-thunder text-white border-thunder"
              : "text-thunder/70 border-thunder/10 hover:border-thunder/25"
          }`}
        >
          All
        </button>

        {STATUS_OPTIONS.map(({ value, label }) => {
          const isActive = active.includes(value);
          return (
            <button
              key={value}
              onClick={() => toggle(value)}
              aria-pressed={isActive}
              aria-label={`Filter by ${label}`}
              className={`whitespace-nowrap font-outfit text-xs font-medium px-3.5 py-1.5 rounded-full border transition-colors duration-150 shrink-0 ${
                isActive
                  ? "bg-well-red text-white border-well-red"
                  : "text-thunder/70 border-thunder/10 hover:border-thunder/25"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {active.length > 0 && (
        <p className="text-xs text-thunder/40 font-outfit">
          Showing filtered results of {total} members
        </p>
      )}
    </div>
  );
};

export default PeopleFilter;
