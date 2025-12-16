"use client";

import { useState } from "react";
import { X, ChevronDown, Filter } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface FilterState {
  tiers: string[];
}

interface TierLegendProps {
  onFilterChange?: (filters: FilterState) => void;
}

const TierLegend = ({ onFilterChange }: TierLegendProps) => {
  const [filters, setFilters] = useState<FilterState>({
    tiers: [],
  });
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const tierColors = {
    supporter: "#EAB308",
    partner: "#9333EA",
    champion: "#0D9488",
    visionary: "#2563EB",
  };

  const tierLabels = {
    supporter: "SUPPORTER ($1,000)",
    partner: "PARTNER ($2,000)",
    champion: "CHAMPION ($5,000)",
    visionary: "VISIONARY ($10,000+)",
  };

  const handleFilterToggle = (value: string) => {
    const newFilters = {
      tiers: filters.tiers.includes(value)
        ? filters.tiers.filter((item) => item !== value)
        : [...filters.tiers, value],
    };

    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleCheckboxChange = (value: string, checked: boolean) => {
    const newFilters = {
      tiers: checked
        ? [...filters.tiers, value]
        : filters.tiers.filter((item) => item !== value),
    };

    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleClearAll = () => {
    const newFilters = {
      tiers: [],
    };

    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const totalActiveFilters = filters.tiers.length;
  const hasActiveFilters = totalActiveFilters > 0;

  return (
    <div className="w-full mb-8">
      {/* Mobile Popover */}
      <div className="lg:hidden flex justify-start">
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="relative w-fit justify-between bg-white border-gray-700 hover:bg-gray-50 text-gray-700 rounded-full"
            >
              <div className="flex items-center gap-2">
                <Filter className="size-3" />
                <span className="font-jetbrains-mono text-xs font-semibold">
                  Sponsorship Tiers
                </span>
                {hasActiveFilters && (
                  <span className="ml-1 px-2 py-0.5 text-xs bg-primary-red-800 text-white rounded-full">
                    {totalActiveFilters}
                  </span>
                )}
              </div>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-80 p-4 bg-white border-gray-400 ml-12 z-20!"
            align="center"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-sm font-jetbrains-mono!">
                  Sponsorship Tiers
                </p>
                {hasActiveFilters && (
                  <Button
                    onClick={handleClearAll}
                    variant="ghost"
                    size="sm"
                    className="h-auto p-1 text-xs text-gray-500 hover:text-gray-700 font-jetbrains-mono"
                  >
                    Clear all
                  </Button>
                )}
              </div>

              <div className="space-y-2 pl-2">
                {Object.entries(tierLabels).map(([key, label]) => {
                  const isChecked = filters.tiers.includes(key);
                  return (
                    <div key={key} className="flex items-center space-x-3">
                      <Checkbox
                        id={`tier-${key}`}
                        checked={isChecked}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(key, checked as boolean)
                        }
                        style={{
                          backgroundColor: isChecked
                            ? tierColors[key as keyof typeof tierColors]
                            : "transparent",
                          borderColor:
                            tierColors[key as keyof typeof tierColors],
                        }}
                      />
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-3 h-3 rounded-full border"
                          style={{
                            backgroundColor:
                              tierColors[key as keyof typeof tierColors],
                            borderColor:
                              tierColors[key as keyof typeof tierColors],
                          }}
                        />
                        <label
                          htmlFor={`tier-${key}`}
                          className="text-sm font-medium leading-none cursor-pointer text-gray-700 font-jetbrains-mono"
                        >
                          {label}
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Desktop layout */}
      <div className="hidden lg:block space-y-4 relative">
        <div className="space-y-3">
          <div className="flex items-center space-x-3 h-6">
            <h3 className="text-lg font-semibold text-gray-700 uppercase tracking-wide">
              Sponsorship Tiers
            </h3>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {Object.entries(tierLabels).map(([key, label]) => {
              const isSelected = filters.tiers.includes(key);
              return (
                <Button
                  key={key}
                  className={`
                    px-4 py-2 rounded-full text-sm font-jetbrains-mono font-medium
                    transition-all duration-200 ease-in-out
                    border-2 hover:scale-105 hover:shadow-md
                    ${
                      isSelected
                        ? "text-white shadow-md"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }
                  `}
                  style={{
                    backgroundColor: isSelected
                      ? tierColors[key as keyof typeof tierColors]
                      : "white",
                    borderColor: tierColors[key as keyof typeof tierColors],
                  }}
                  onClick={() => handleFilterToggle(key)}
                >
                  {label}
                </Button>
              );
            })}
            {hasActiveFilters && (
              <Button
                onClick={handleClearAll}
                variant="outline"
                size="sm"
                className="size-6 rounded-full border-gray-700"
              >
                <X className="size-4" />
              </Button>
            )}
          </div>
        </div>

        {hasActiveFilters && (
          <div className="flex justify-end absolute top-0 right-0 left-0">
            <Button
              onClick={handleClearAll}
              variant="outline"
              className="h-8 px-4 text-sm text-gray-500 border-gray-300 hover:text-gray-700 hover:bg-gray-50 rounded-full font-jetbrains-mono"
            >
              <X className="w-3 h-3" />
              Clear All
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TierLegend;
