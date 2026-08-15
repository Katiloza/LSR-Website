import React, { useEffect } from "react";
import { useSearchParams } from "react-router";
import { PageShell } from "../components/PageShell";
import { PrismaFlowchart, PrismaStage } from "../components/PrismaFlowchart";
import { PrismaLivingSearch } from "../components/PrismaLivingSearch";
import { CitationList } from "../components/CitationList";
import { FilterBar } from "../components/FilterBar";
import { useCitation } from "../lib/CitationContext";
import { CANONICAL_TRIAL_NAMES } from "../lib/citations";
import { cn } from "../lib/utils";

type SidebarPanel = "flow" | "study-list";
type PrismaView = "current-state" | "initial-search" | "living-search";

const VIEW_OPTIONS: { id: PrismaView; label: string }[] = [
  { id: "current-state", label: "Current State" },
  { id: "initial-search", label: "Initial Search" },
  { id: "living-search", label: "Living Search" },
];

// The 12 trials backing Summary Tables / Home / Summary of Findings — reused
// here too so "Included" always resolves to the same set of study records
// everywhere in the app, rather than a separate disconnected PRISMA-only list.
const INCLUDED_TRIALS = CANONICAL_TRIAL_NAMES;

const CURRENT_STATE_STAGES: PrismaStage[] = [
  // Identification (3 sources, displayed as horizontal row)
  { id: "databases",    label: "Initial search from databases",                    count: 26595, sublabel: "MEDLINE, Embase, CENTRAL, ClinicalTrials.gov", type: "total" },
  { id: "auto-update",  label: "Records identified through automatic update",       count: 7494,  sublabel: "Monthly automated search",                    type: "total" },
  { id: "manual-update",label: "Records identified through manual update",          count: 38,    sublabel: "Grey literature, expert contact",              type: "total" },
  // Deduplication
  { id: "total-identified",   label: "Total Records Identified",                   count: 34127, type: "include" },
  { id: "records-after-dedup",label: "Records after removing duplicates",           count: 29419, type: "include" },
  { id: "duplicates",         label: "Duplicates Records",                          count: 4708,  type: "exclude" },
  // Screening
  { id: "records-screened",   label: "Records screened",                            count: 28514, type: "include" },
  { id: "currently-screening",label: "Currently screening",                         count: 905,   type: "screening" },
  { id: "excluded-title",     label: "Excluded by title",                           count: 25396, type: "exclude" },
  { id: "excluded-abstract",  label: "Excluded by abstract",                        count: 1182,  type: "exclude" },
  // Eligibility
  { id: "fulltext-assessed",  label: "Full-text assessed for eligibility",          count: 1936,  type: "include" },
  { id: "currently-screening-ft", label: "Currently screening full text",           count: 181,   type: "screening" },
  { id: "excluded-fulltext",  label: "Excluded by full text review",                count: 1755,  type: "exclude" },
  // Included — dark blue, the only clickable stage
  { id: "studies-systematic", label: "Studies included in systematic review",       count: 181,   sublabel: "n=141 studies", type: "final", trialNames: INCLUDED_TRIALS },
  { id: "studies-meta",       label: "Studies included in meta-analysis",           count: 74,    sublabel: "n=58 studies",  type: "final", trialNames: INCLUDED_TRIALS },
];

const INITIAL_STATE_STAGES: PrismaStage[] = [
  // Identification — single source only
  { id: "databases",          label: "Initial search from databases",               count: 26595, sublabel: "MEDLINE, Embase, CENTRAL, ClinicalTrials.gov", type: "total" },
  // Deduplication
  { id: "records-after-dedup",label: "Records after removing duplicates",           count: 21887, type: "include" },
  { id: "duplicates",         label: "Duplicates Records",                          count: 4708,  type: "exclude" },
  // Screening
  { id: "records-screened",   label: "Records screened",                            count: 21887, type: "include" },
  { id: "excluded-title",     label: "Excluded by title",                           count: 20187, type: "exclude" },
  { id: "excluded-abstract",  label: "Excluded by abstract",                        count: 478,   type: "exclude" },
  // Eligibility
  { id: "fulltext-assessed",  label: "Full-text assessed for eligibility",          count: 1222,  type: "include" },
  { id: "excluded-fulltext",  label: "Excluded by full text review",                count: 1068,  type: "exclude" },
  // Included — dark blue, the only clickable stage
  { id: "studies-systematic", label: "Studies included in systematic review",       count: 154,   sublabel: "n=78 studies",  type: "final", trialNames: INCLUDED_TRIALS },
  { id: "studies-meta",       label: "Studies included in meta-analysis",           count: 62,    sublabel: "n=51 studies",  type: "final", trialNames: INCLUDED_TRIALS },
];

const LIVING_SEARCH_DATA = [
  { year: 2021, month: 1, count: 12 }, { year: 2021, month: 2, count: 8 }, { year: 2021, month: 3, count: 24 },
  { year: 2021, month: 4, count: 19 }, { year: 2021, month: 5, count: 31 }, { year: 2021, month: 6, count: 15 },
  { year: 2021, month: 7, count: 9 }, { year: 2021, month: 8, count: 11 }, { year: 2021, month: 9, count: 27 },
  { year: 2021, month: 10, count: 22 }, { year: 2021, month: 11, count: 18 }, { year: 2021, month: 12, count: 14 },
  { year: 2022, month: 1, count: 20 }, { year: 2022, month: 2, count: 35 }, { year: 2022, month: 3, count: 42 },
  { year: 2022, month: 4, count: 28 }, { year: 2022, month: 5, count: 51 }, { year: 2022, month: 6, count: 33 },
  { year: 2022, month: 7, count: 19 }, { year: 2022, month: 8, count: 25 }, { year: 2022, month: 9, count: 38 },
  { year: 2022, month: 10, count: 44 }, { year: 2022, month: 11, count: 29 }, { year: 2022, month: 12, count: 16 },
  { year: 2023, month: 1, count: 31 }, { year: 2023, month: 2, count: 47 }, { year: 2023, month: 3, count: 62 },
  { year: 2023, month: 4, count: 39 }, { year: 2023, month: 5, count: 55 }, { year: 2023, month: 6, count: 43 },
  { year: 2023, month: 7, count: 28 }, { year: 2023, month: 8, count: 36 }, { year: 2023, month: 9, count: 71 },
  { year: 2023, month: 10, count: 58 }, { year: 2023, month: 11, count: 49 }, { year: 2023, month: 12, count: 22 },
  { year: 2024, month: 1, count: 45 }, { year: 2024, month: 2, count: 68 }, { year: 2024, month: 3, count: 84 },
  { year: 2024, month: 4, count: 57 }, { year: 2024, month: 5, count: 92 }, { year: 2024, month: 6, count: 74 },
  { year: 2024, month: 7, count: 48 }, { year: 2024, month: 8, count: 63 }, { year: 2024, month: 9, count: 109 },
  { year: 2024, month: 10, count: 87 }, { year: 2024, month: 11, count: 76 }, { year: 2024, month: 12, count: 41 },
  { year: 2025, month: 1, count: 52 }, { year: 2025, month: 2, count: 78 }, { year: 2025, month: 3, count: 95 },
  { year: 2025, month: 4, count: 66 }, { year: 2025, month: 5, count: 103 }, { year: 2025, month: 6, count: 88 },
  { year: 2025, month: 7, count: 71 }, { year: 2025, month: 8, count: 59 }, { year: 2025, month: 9, count: 127 },
  { year: 2025, month: 10, count: 94 }, { year: 2025, month: 11, count: 83 }, { year: 2025, month: 12, count: 47 },
  { year: 2026, month: 1, count: 61 }, { year: 2026, month: 2, count: 84 }, { year: 2026, month: 3, count: 112 },
  { year: 2026, month: 4, count: 79 }, { year: 2026, month: 5, count: 98 }, { year: 2026, month: 6, count: 73 },
];

// Figma node 1:473 — the filter pills sit between the page header and the
// reference list, above a hairline rule that the list hangs from.
function StudyListView() {
  return (
    <div className="flex flex-col">
      <FilterBar className="pb-4 border-b border-[#2E75B5]/40" />
      <CitationList trialNames={INCLUDED_TRIALS} />
    </div>
  );
}

export function PrismaPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activePanel = (searchParams.get("panel") as SidebarPanel) ?? "flow";
  const activeView = (searchParams.get("view") as PrismaView) ?? "current-state";
  const highlightStudy = searchParams.get("hl") ?? undefined;
  const { openCitation, openTrialList } = useCitation();

  const setView = (v: PrismaView) => setSearchParams((prev) => {
    const next = new URLSearchParams(prev);
    next.set("panel", "flow");
    next.set("view", v);
    return next;
  });

  const stages = activeView === "initial-search" ? INITIAL_STATE_STAGES : CURRENT_STATE_STAGES;

  // Deep link from search: jump straight to the study's citation.
  useEffect(() => {
    if (highlightStudy && INCLUDED_TRIALS.includes(highlightStudy)) {
      openCitation(highlightStudy);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [highlightStudy]);

  return (
    <PageShell>
        {/* Main content — no overflow container here so the flow's section
            anchor labels can stick relative to the page as the user scrolls */}
        <div className="flex-1 flex flex-col min-w-0">
          <main className="bg-white">
            {/* Page header — Figma node 13:2803. Flat on the page (no card
                chrome) with the gradient wash running the full column width. */}
            <div
              className="px-8 pt-6 pb-5"
              style={{ background: "linear-gradient(177.97deg, rgba(133,200,250,0.15) 8.49%, rgba(133,200,250,0) 58.3%)" }}
            >
              <h1 className="text-[32px] font-semibold text-[#101828] font-['Benton_Modern_D',serif] leading-tight mb-1">
                {activePanel === "study-list" ? "Study List" : "Study selection"}
              </h1>
              <p className="text-[14px] text-[#4a5565] font-['Inter',sans-serif] leading-relaxed max-w-3xl line-clamp-2">
                {activePanel === "study-list"
                  ? "Every trial included in this living systematic review."
                  : activeView === "living-search"
                  ? "Automated search results retrieved each month across all configured databases."
                  : activeView === "initial-search"
                  ? "The initial systematic search conducted at review inception."
                  : "Expand the flow below to trace how the living search was screened down to this set."}
              </p>
            </div>

            <div className="px-8 pt-2 pb-8">
              {activePanel === "flow" && (
                <>
                  {/* Tab bar */}
                  <div className="flex gap-1 border-b border-gray-100 mb-8 max-w-[952px]">
                    {VIEW_OPTIONS.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setView(opt.id)}
                        className={cn(
                          "px-4 py-2.5 text-[13px] font-medium transition-all border-b-2 -mb-px font-['Articulat_CF',sans-serif]",
                          activeView === opt.id
                            ? "border-[#2E75B5] text-[#2E75B5]"
                            : "border-transparent text-gray-500 hover:text-gray-700"
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>

                  {activeView === "living-search" ? (
                    <PrismaLivingSearch data={LIVING_SEARCH_DATA} startYear={2021} endYear={2026} />
                  ) : (
                    <PrismaFlowchart
                      stages={stages}
                      onNodeClick={(stage) => stage.trialNames && openTrialList(stage.label, stage.trialNames)}
                      activeNodeId={undefined}
                    />
                  )}
                </>
              )}

              {activePanel === "study-list" && <StudyListView />}
            </div>
          </main>
        </div>
    </PageShell>
  );
}
