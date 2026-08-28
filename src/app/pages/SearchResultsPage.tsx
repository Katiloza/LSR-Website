import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "../components/PageShell";
import { CitationList } from "../components/CitationList";
import { Pagination } from "../components/Pagination";
import { CANONICAL_TRIAL_NAMES, getCitation } from "../lib/citations";
import { searchPages, itemHref } from "../lib/searchIndex";

/**
 * Figma node 24:622 — "Search Results Page". Submitting the nav search bar
 * (GlobalSearch) always lands here with the query in `?q=`, and results are
 * split into links through to matching pages and the matching studies
 * themselves. Reuses the same header rhythm as PrismaPage and the
 * CitationList already used by its "Study list" panel, so a reference row
 * looks identical no matter which page it's read from.
 */

const PAGE_SIZE = 5;

function matchesQuery(trialName: string, q: string): boolean {
  const c = getCitation(trialName);
  const haystack = [trialName, c?.title, c?.authors, c?.journal, c?.nct, c?.pmid]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return haystack.includes(q);
}

export function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";
  const trimmed = query.trim();

  const results = trimmed
    ? CANONICAL_TRIAL_NAMES.filter((name) => matchesQuery(name, trimmed.toLowerCase()))
    : CANONICAL_TRIAL_NAMES;

  // Pages/views that carry this keyword — rendered as inline links so a search
  // reaches the rest of the app, not just the study list.
  const pageGroups = useMemo(() => searchPages(trimmed), [trimmed]);
  const totalMatches =
    results.length + pageGroups.reduce((sum, g) => sum + g.items.length, 0);

  const [page, setPage] = useState(1);
  // A new query changes the result set, so always land back on page 1.
  useEffect(() => { setPage(1); }, [query]);

  const totalPages = Math.ceil(results.length / PAGE_SIZE);
  const pageResults = results.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <PageShell>
      <div className="flex-1 flex flex-col min-w-0">
        <main className="bg-white">
          {/* Page header — Figma node 25:1047, same gradient wash + hairline rule as PrismaPage's header. */}
          <div
            className="px-8 pt-6 pb-5 border-b border-[#2E75B6]"
            style={{ background: "linear-gradient(177.97deg, rgba(133,200,250,0.15) 8.49%, rgba(133,200,250,0) 58.3%)" }}
          >
            <h1 className="text-[40px] leading-[40px] font-semibold text-[#101828] font-serif pt-1 mb-2">
              Search Results
            </h1>
            <p className="text-[16px] leading-[24px] text-[#4a5565] font-['Inter',sans-serif]">
              <span className="text-black">{totalMatches} results found for </span>
              <span className="font-semibold text-black">&quot;{trimmed}&quot;</span>
            </p>
          </div>

          <div className="px-8 pt-2 pb-8">
            <div className="max-w-[768px] w-full flex flex-col">
              {/* Where else this keyword appears — inline links into the app. */}
              {pageGroups.length > 0 && (
                <section className="pt-4 pb-2">
                  <h2 className="text-[14px] font-semibold text-black font-['Inter',sans-serif] mb-3">
                    Explore &quot;{trimmed}&quot; in
                  </h2>
                  <div className="flex flex-col gap-4">
                    {pageGroups.map((group) => {
                      const GroupIcon = group.icon;
                      return (
                        <div key={group.category}>
                          <div className="flex items-center gap-2 mb-1.5">
                            <GroupIcon size={13} className="text-gray-400" />
                            <span className="text-[12px] font-semibold text-gray-400 font-['Inter',sans-serif]">
                              {group.category}
                            </span>
                          </div>
                          <ul className="flex flex-col">
                            {group.items.map((item) => (
                              <li key={item.id}>
                                <Link
                                  to={itemHref(item)}
                                  className="group flex items-baseline gap-2 py-1 font-['Inter',sans-serif]"
                                >
                                  <span className="text-[14px] font-medium text-[#2E75B5] group-hover:underline">
                                    {item.label}
                                  </span>
                                  {item.sublabel && (
                                    <span className="text-[12px] text-gray-400">{item.sublabel}</span>
                                  )}
                                  <ArrowUpRight
                                    size={13}
                                    className="shrink-0 self-center text-gray-300 group-hover:text-[#2E75B5] transition-colors"
                                  />
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </section>
              )}

              {/* Matching studies */}
              <section className={pageGroups.length > 0 ? "pt-6 mt-4 border-t border-gray-100" : ""}>
                <h2 className="text-[14px] font-semibold text-black font-['Inter',sans-serif]">
                  Studies
                </h2>
                {results.length === 0 ? (
                  <p className="py-8 text-[14px] text-gray-400 font-['Inter',sans-serif]">
                    No studies match &quot;{trimmed}&quot;. Try a different treatment, trial name, or author.
                  </p>
                ) : (
                  <div className="flex flex-col">
                    <CitationList trialNames={pageResults} />
                    <Pagination page={page} totalPages={totalPages} onPageChange={setPage} className="mt-6" />
                  </div>
                )}
              </section>
            </div>
          </div>
        </main>
      </div>
    </PageShell>
  );
}
