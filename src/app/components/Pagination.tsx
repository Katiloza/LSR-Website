import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/utils";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

/**
 * Shared list-footer pagination — flat text/icons, no pill chrome at rest.
 * Hover deepens the text to navy (no background fill); the current page
 * stays pinned as a solid navy chip so it reads as state, not hover. Used by
 * the PRISMA "Study list" panel and the Search Results page, the app's two
 * long reference lists.
 *
 * Colors are applied via Tailwind classes (not inline styles) so the
 * `hover:` pseudo-class can actually win — an inline `style` color would
 * always out-specificity a class-based hover rule.
 */

// The app's primary blue (#2E75B5) only hits ~4.85:1 against white — AA for
// UI text, but short of AAA's 7:1. This is that same hue darkened just far
// enough to clear AAA (7.1:1) while still reading as "the primary blue".
// Hover deepens further to the app's dark navy accent.
const TEXT_COLOR = "text-[#245B8D]";
const TEXT_HOVER = "hover:text-[#1E3A7A]";

// Windowed page numbers: always show first, last, current ±1, collapsing
// the rest behind an ellipsis once there are enough pages to need one.
function pageWindow(page: number, totalPages: number): (number | "…")[] {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);

  const pages = new Set<number>([1, totalPages, page, page - 1, page + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);

  const out: (number | "…")[] = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) out.push("…");
    out.push(p);
  });
  return out;
}

const ARROW_BTN = cn(
  "flex items-center gap-1 px-3 py-1.5 rounded-full text-[14px] font-medium font-['Inter',sans-serif] transition-colors",
  TEXT_COLOR,
  TEXT_HOVER,
  "disabled:opacity-40 disabled:pointer-events-none disabled:cursor-default"
);

export function Pagination({ page, totalPages, onPageChange, className }: PaginationProps) {
  if (totalPages <= 1) return null;

  const goTo = (p: number) => {
    if (p < 1 || p > totalPages || p === page) return;
    onPageChange(p);
  };

  return (
    <nav aria-label="Pagination" className={cn("flex items-center gap-1 w-fit", className)}>
      <button type="button" onClick={() => goTo(page - 1)} disabled={page === 1} className={ARROW_BTN}>
        <ChevronLeft size={14} />
        Previous
      </button>

      <div className="flex items-center gap-1">
        {pageWindow(page, totalPages).map((p, i) =>
          p === "…" ? (
            <span key={`ellipsis-${i}`} className={cn("px-1.5 text-[14px] font-['Inter',sans-serif]", TEXT_COLOR)}>
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => goTo(p)}
              aria-current={p === page ? "page" : undefined}
              className={cn(
                "min-w-[30px] h-[30px] px-1 rounded-full text-[14px] font-['Inter',sans-serif] transition-colors",
                p === page
                  ? "bg-[#1E3A7A] text-white font-semibold"
                  : cn("font-medium", TEXT_COLOR, TEXT_HOVER)
              )}
            >
              {p}
            </button>
          )
        )}
      </div>

      <button type="button" onClick={() => goTo(page + 1)} disabled={page === totalPages} className={ARROW_BTN}>
        Next
        <ChevronRight size={14} />
      </button>
    </nav>
  );
}
