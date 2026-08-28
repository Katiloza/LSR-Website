import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { PageShell } from "../components/PageShell";
import { FilterBar } from "../components/FilterBar";
import { CitationList } from "../components/CitationList";
import { Pagination } from "../components/Pagination";
import { CANONICAL_TRIAL_NAMES, getCitation } from "../lib/citations";

/**
 * Figma node 24:622 — "Search Results Page". Submitting the nav search bar
 * (GlobalSearch, Enter with no quick-jump item highlighted) lands here with
 * the query in `?q=`. Reuses the same header rhythm as PrismaPage and the
 * FilterBar / CitationList pairing already used by its "Study list" panel,
 * so a reference row looks identical no matter which page it's read from.
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
            className="px-8 pt-6 pb-5 border-b border-[#2E75B6] flex flex-col gap-4"
            style={{ background: "linear-gradient(177.97deg, rgba(133,200,250,0.15) 8.49%, rgba(133,200,250,0) 58.3%)" }}
          >
            <div>
              <h1 className="text-[40px] leading-[40px] font-semibold text-[#101828] font-serif pt-1 mb-2">
                Search Results
              </h1>
              <p className="text-[16px] leading-[24px] text-[#4a5565] font-['Inter',sans-serif]">
                <span className="text-black">{results.length} results found for </span>
                <span className="font-semibold text-black">&quot;{trimmed}&quot;</span>
              </p>
            </div>

            <FilterBar />
          </div>

          <div className="px-8 pt-2 pb-8">
            <div className="max-w-[768px] w-full flex flex-col">
              {results.length === 0 ? (
                <p className="py-12 text-[14px] text-gray-400 font-['Inter',sans-serif]">
                  No studies match &quot;{trimmed}&quot;. Try a different treatment, trial name, or author.
                </p>
              ) : (
                <>
                  <CitationList trialNames={pageResults} />
                  <Pagination page={page} totalPages={totalPages} onPageChange={setPage} className="mt-6" />
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </PageShell>
  );
}
