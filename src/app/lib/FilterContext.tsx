import React, { createContext, useContext, useState, useCallback, useMemo } from "react";

export type FilterState = Record<string, string[]>;

interface FilterContextValue {
  activeFilters: FilterState;
  setFilter: (id: string, values: string[]) => void;
  resetAll: () => void;
  hasActiveFilters: boolean;
}

const FilterContext = createContext<FilterContextValue | null>(null);

/**
 * App-level provider so a filter selected on one page stays applied on every
 * other page. Lives above the router, so it never unmounts on navigation.
 */
export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [activeFilters, setActiveFilters] = useState<FilterState>({});

  const setFilter = useCallback((id: string, values: string[]) => {
    setActiveFilters((prev) => ({ ...prev, [id]: values }));
  }, []);

  const resetAll = useCallback(() => setActiveFilters({}), []);

  const hasActiveFilters = useMemo(
    () => Object.values(activeFilters).some((v) => v.length > 0),
    [activeFilters]
  );

  const value = useMemo(
    () => ({ activeFilters, setFilter, resetAll, hasActiveFilters }),
    [activeFilters, setFilter, resetAll, hasActiveFilters]
  );

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
}

export function useFilters() {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error("useFilters must be used within a FilterProvider");
  return ctx;
}
