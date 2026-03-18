"use client";

import { useState } from "react";
import { X, ChevronDown, Filter } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  statusColors,
  statusLabels,
} from "@/modules/people/constants/roleConfig";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export type FilterState = {
  status: string[];
};

interface RoleLegendProps {
  onFilterChange?: (filters: FilterState) => void;
}

const RoleLegend = ({ onFilterChange }: RoleLegendProps) => {
  const [filters, setFilters] = useState<FilterState>({
    status: [],
  });
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const categories = [
    {
      key: "status" as keyof FilterState,
      label: "Academic Status",
      colors: statusColors,
      labels: statusLabels,
    },
    // {
    //   key: "area" as keyof FilterState,
    //   label: "Research Area",
    //   colors: areaColors,
    //   labels: areaLabels,
    // },
    // {
    //   key: "accomplishment" as keyof FilterState,
    //   label: "Accomplishments",
    //   colors: accomplishmentColors,
    //   labels: accomplishmentLabels,
    // },
  ];

  const handleFilterToggle = (category: keyof FilterState, value: string) => {
    const newFilters = {
      ...filters,
      [category]: filters[category].includes(value)
        ? filters[category].filter((item) => item !== value)
        : [...filters[category], value],
    };

    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleCheckboxChange = (
    category: keyof FilterState,
    value: string,
    checked: boolean,
  ) => {
    const newFilters = {
      ...filters,
      [category]: checked
        ? [...filters[category], value]
        : filters[category].filter((item) => item !== value),
    };

    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleClearCategory = (category: keyof FilterState) => {
    const newFilters = {
      ...filters,
      [category]: [],
    };

    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleClearAll = () => {
    const newFilters = {
      status: [],
    };

    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const totalActiveFilters = Object.values(filters).flat().length;
  const hasActiveFilters = totalActiveFilters > 0;

  return (
    <div className="w-full mb-6">
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
                  Filters
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
                  Filter Options
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

              {categories.map((category) => {
                const categoryHasFilters = filters[category.key].length > 0;
                return (
                  <div key={category.key} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h5 className="font-medium text-sm text-gray-700 font-jetbrains-mono">
                        {category.label}
                      </h5>
                      {categoryHasFilters && (
                        <Button
                          onClick={() => handleClearCategory(category.key)}
                          variant="ghost"
                          size="sm"
                          className="h-auto px-1 text-xs text-gray-400 hover:text-gray-600 font-jetbrains-mono"
                        >
                          Clear
                        </Button>
                      )}
                    </div>
                    <div className="space-y-2 pl-2">
                      {Object.entries(category.labels).map(([key, label]) => {
                        const isChecked = filters[category.key].includes(key);
                        return (
                          <div
                            key={key}
                            className="flex items-center space-x-3"
                          >
                            <Checkbox
                              id={`${category.key}-${key}`}
                              checked={isChecked}
                              onCheckedChange={(checked) =>
                                handleCheckboxChange(
                                  category.key,
                                  key,
                                  checked as boolean,
                                )
                              }
                              style={{
                                backgroundColor: isChecked
                                  ? category.colors[key]
                                  : "transparent",
                                borderColor: category.colors[key],
                              }}
                            />
                            <div className="flex items-center space-x-2">
                              <div
                                className="w-3 h-3 rounded-full border"
                                style={{
                                  backgroundColor: category.colors[key],
                                  borderColor: category.colors[key],
                                }}
                              />
                              <label
                                htmlFor={`${category.key}-${key}`}
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
                );
              })}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Desktop layout */}
      <div className="hidden lg:block space-y-4 relative">
        {categories.map((category) => {
          const categoryHasFilters = filters[category.key].length > 0;

          return (
            <div key={category.key} className="space-y-3">
              <div className="flex items-center space-x-3 h-6">
                <h3 className="text-lg font-semibold text-gray-700 uppercase tracking-wide">
                  {category.label}
                </h3>
              </div>

              {/* Filter Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                {Object.entries(category.labels).map(([key, label]) => {
                  const isSelected = filters[category.key].includes(key);
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
                          ? category.colors[key]
                          : "white",
                        borderColor: category.colors[key],
                      }}
                      onClick={() => handleFilterToggle(category.key, key)}
                    >
                      {label}
                    </Button>
                  );
                })}
                {categoryHasFilters && (
                  <Button
                    onClick={() => handleClearCategory(category.key)}
                    variant="outline"
                    size="sm"
                    className="size-6 rounded-full border-gray-700"
                  >
                    <X className="size-4" />
                  </Button>
                )}
              </div>
            </div>
          );
        })}

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

export default RoleLegend;
