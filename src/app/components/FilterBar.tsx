import React from "react";
import { FilterChip } from "./FilterChip";
import { FILTER_CONFIGS } from "../lib/filterConfig";
import { useFilters } from "../lib/FilterContext";
import { cn } from "../lib/utils";

/**
 * Shared filter bar shown under the search bar on every page: a "Filters"
 * heading, then the dropdown pills. All selections are held in the global
 * FilterContext, so they persist across pages.
 */
export function FilterBar({ className, align = "left" }: { className?: string; align?: "left" | "center" }) {
  const { activeFilters, setFilter } = useFilters();

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <span className="text-[14px] leading-[18px] font-medium text-black font-['Inter',sans-serif]">Filters</span>
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
