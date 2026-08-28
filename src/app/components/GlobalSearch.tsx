import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Search } from "lucide-react";
import { cn } from "../lib/utils";

/**
 * Nav search bar. Submitting (Enter, or the magnifier) always lands on the
 * Search Results page — there's no quick-jump dropdown to disambiguate, so a
 * search behaves the same way every time. The results page is where matches
 * are broken out into studies and links through to the pages that carry them.
 */

interface GlobalSearchProps {
  placeholder?: string;
  className?: string;
  /** Override the input chrome (used by the nav bar's pill variant). */
  inputClassName?: string;
  /** Override the leading search icon position/colour. */
  iconClassName?: string;
}

const DEFAULT_INPUT_CLASS =
  "w-full pl-12 pr-6 py-3 rounded-full border border-blue-100 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.12)] bg-white text-[14px] font-['Inter',sans-serif] focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all";

const DEFAULT_ICON_CLASS =
  "absolute left-4 top-1/2 -translate-y-1/2 text-[#2E75B5] opacity-60 pointer-events-none z-10";

export function GlobalSearch({
  placeholder = "Search outcomes, studies, treatments…",
  className,
  inputClassName,
  iconClassName,
}: GlobalSearchProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <form role="search" onSubmit={submit} className={cn("relative w-full", className)}>
      {/* Decorative — callers position this over the input, so it stays
          click-through; Enter in the field is what submits. */}
      <Search className={iconClassName ?? DEFAULT_ICON_CLASS} size={18} aria-hidden />
      <input
        type="search"
        aria-label="Search"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={inputClassName ?? DEFAULT_INPUT_CLASS}
      />
      {/* Enables implicit form submission on Enter across browsers. */}
      <button type="submit" className="sr-only" tabIndex={-1}>
        Search
      </button>
    </form>
  );
}
