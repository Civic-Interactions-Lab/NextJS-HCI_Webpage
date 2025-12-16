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
  categories: string[];
}

interface NewsCategoryLegendProps {
  onFilterChange?: (filters: FilterState) => void;
}

const NewsCategoryLegend = ({ onFilterChange }: NewsCategoryLegendProps) => {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
  });
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const categoryColors = {
    Collaborations: "#EAB308", // yellow-500
    "Grants / Awards": "#A855F7", // purple-500
    "Conference Talk": "#0D9488", // teal-600
    "Published Papers": "#0891B2", // cyan-600
    Alumni: "#F97316", // orange-500
  };

  const categoryLabels = {
    Collaborations: "Collaborations",
    "Grants / Awards": "Grants / Awards",
    "Conference Talk": "Conference Talk",
    "Published Papers": "Published Papers",
    Alumni: "Alumni",
  };

  const handleFilterToggle = (value: string) => {
    const newFilters = {
      categories: filters.categories.includes(value)
        ? filters.categories.filter((item) => item !== value)
        : [...filters.categories, value],
    };

    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleCheckboxChange = (value: string, checked: boolean) => {
    const newFilters = {
      categories: checked
        ? [...filters.categories, value]
        : filters.categories.filter((item) => item !== value),
    };

    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handleClearAll = () => {
    const newFilters = {
      categories: [],
    };

    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const totalActiveFilters = filters.categories.length;
  const hasActiveFilters = totalActiveFilters > 0;

  return (
    <div className="w-full mb-6 md:mb-8">
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
                  Categories
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
            className="w-80 p-4 bg-white border-gray-400 ml-32 z-20!"
            align="center"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-sm font-jetbrains-mono!">
                  News Categories
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
                {Object.entries(categoryLabels).map(([key, label]) => {
                  const isChecked = filters.categories.includes(key);
                  return (
                    <div key={key} className="flex items-center space-x-3">
                      <Checkbox
                        id={`category-${key}`}
                        checked={isChecked}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(key, checked as boolean)
                        }
                        style={{
                          backgroundColor: isChecked
                            ? categoryColors[key as keyof typeof categoryColors]
                            : "transparent",
                          borderColor:
                            categoryColors[key as keyof typeof categoryColors],
                        }}
                      />
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-3 h-3 rounded-full border"
                          style={{
                            backgroundColor:
                              categoryColors[
                                key as keyof typeof categoryColors
                              ],
                            borderColor:
                              categoryColors[
                                key as keyof typeof categoryColors
                              ],
                          }}
                        />
                        <label
                          htmlFor={`category-${key}`}
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
              News Categories
            </h3>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {Object.entries(categoryLabels).map(([key, label]) => {
              const isSelected = filters.categories.includes(key);
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
                      ? categoryColors[key as keyof typeof categoryColors]
                      : "white",
                    borderColor:
                      categoryColors[key as keyof typeof categoryColors],
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

export default NewsCategoryLegend;
