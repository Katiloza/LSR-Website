import React from "react";
import { FilterChip } from "./FilterChip";
import { FILTER_CONFIGS } from "../lib/filterConfig";
import { useFilters } from "../lib/FilterContext";
import { cn } from "../lib/utils";

/**
 * Shared filter bar shown under the search bar on every page: a "Filters"
 * heading with a "Reset all" callout, then the dropdown pills. All selections
 * are held in the global FilterContext, so they persist across pages.
 */
export function FilterBar({ className, align = "left" }: { className?: string; align?: "left" | "center" }) {
  const { activeFilters, setFilter, resetAll, hasActiveFilters } = useFilters();

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Filters</span>
        <button
          onClick={resetAll}
          disabled={!hasActiveFilters}
          className={cn(
            "text-[12px] font-medium transition-colors",
            hasActiveFilters ? "text-[#2E75B5] hover:underline" : "text-gray-300 cursor-default"
          )}
        >
          Reset all
        </button>
      </div>
      <div className={cn("flex flex-wrap gap-2", align === "center" && "justify-center")}>
        {FILTER_CONFIGS.map((cfg) => (
          <FilterChip
            key={cfg.id}
            label={cfg.label}
            options={cfg.options}
            selectedOptions={activeFilters[cfg.id] ?? []}
            onChange={(sel) => setFilter(cfg.id, sel)}
          />
        ))}
      </div>
    </div>
  );
}
