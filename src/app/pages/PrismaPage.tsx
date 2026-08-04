import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router";
import { GlobalSearch } from "../components/GlobalSearch";
import { TopNav } from "../components/TopNav";
import { SideIconRail } from "../components/SideIconRail";
import { NavPanelShell } from "../components/NavPanelShell";
import { PrismaFlowchart, PrismaStage } from "../components/PrismaFlowchart";
import { StudyListPanel } from "../components/StudyListPanel";
import { PrismaLivingSearch } from "../components/PrismaLivingSearch";
import { FilterBar } from "../components/FilterBar";
import { cn } from "../lib/utils";

type PrismaView = "current-state" | "initial-search" | "living-search";

const VIEW_OPTIONS: { id: PrismaView; label: string }[] = [
  { id: "current-state", label: "Current State" },
  { id: "initial-search", label: "Initial Search" },
  { id: "living-search", label: "Living Search" },
];

const INCLUDED_STUDIES = [
  { title: "ARCHES: Enzalutamide + ADT vs placebo + ADT in mHSPC", year: 2019, pmid: "31157964" },
  { title: "TITAN: Apalutamide + ADT vs placebo in mHSPC", year: 2019, pmid: "31157962" },
  { title: "MAGNITUDE: Niraparib + abiraterone vs placebo + abiraterone", year: 2022, pmid: "35147311" },
  { title: "PROpel: Olaparib + abiraterone vs placebo + abiraterone in mCRPC", year: 2022, pmid: "35026162" },
  { title: "TALAPRO-2: Talazoparib + enzalutamide vs placebo + enzalutamide", year: 2023, pmid: "37062857" },
  { title: "TRITON3: Rucaparib vs physician's choice in mCRPC BRCA1/2", year: 2023, pmid: "36795891" },
  { title: "VISION: 177Lu-PSMA-617 + standard of care in mCRPC", year: 2021, pmid: "34161052" },
  { title: "TheraP: 177Lu-PSMA-617 vs cabazitaxel in mCRPC", year: 2021, pmid: "33581798" },
  { title: "CARD: Cabazitaxel vs abiraterone/enzalutamide in mCRPC", year: 2019, pmid: "31665565" },
  { title: "ENZAMET: Enzalutamide + ADT vs standard NSAA in mHSPC", year: 2019, pmid: "31157965" },
];

const CURRENT_STATE_STAGES: PrismaStage[] = [
  // Identification (3 sources, displayed as horizontal row)
  { id: "databases",    label: "Initial search from databases",                    count: 26595, sublabel: "MEDLINE, Embase, CENTRAL, ClinicalTrials.gov", type: "total",     studies: [] },
  { id: "auto-update",  label: "Records identified through automatic update",       count: 7494,  sublabel: "Monthly automated search",                    type: "total",     studies: [] },
  { id: "manual-update",label: "Records identified through manual update",          count: 38,    sublabel: "Grey literature, expert contact",              type: "total",     studies: [] },
  // Deduplication
  { id: "total-identified",   label: "Total Records Identified",                   count: 34127, type: "include",   studies: [] },
  { id: "records-after-dedup",label: "Records after removing duplicates",           count: 29419, type: "include",   studies: [] },
  { id: "duplicates",         label: "Duplicates Records",                          count: 4708,  type: "exclude",   studies: [] },
  // Screening
  { id: "records-screened",   label: "Records screened",                            count: 28514, type: "include",   studies: [] },
  { id: "currently-screening",label: "Currently screening",                         count: 905,   type: "screening", studies: [] },
  { id: "excluded-title",     label: "Excluded by title",                           count: 25396, type: "exclude",   studies: [] },
  { id: "excluded-abstract",  label: "Excluded by abstract",                        count: 1182,  type: "exclude",   studies: [] },
  // Eligibility
  { id: "fulltext-assessed",  label: "Full-text assessed for eligibility",          count: 1936,  type: "include",   studies: [] },
  { id: "currently-screening-ft", label: "Currently screening full text",           count: 181,   type: "screening", studies: [] },
  { id: "excluded-fulltext",  label: "Excluded by full text review",                count: 1755,  type: "exclude",   studies: [] },
  // Included — dark blue
  { id: "studies-systematic", label: "Studies included in systematic review",       count: 181,   sublabel: "n=141 studies", type: "final", studies: INCLUDED_STUDIES },
  { id: "studies-meta",       label: "Studies included in meta-analysis",           count: 74,    sublabel: "n=58 studies",  type: "final", studies: [] },
];

const INITIAL_STATE_STAGES: PrismaStage[] = [
  // Identification — single source only
  { id: "databases",          label: "Initial search from databases",               count: 26595, sublabel: "MEDLINE, Embase, CENTRAL, ClinicalTrials.gov", type: "total",   studies: [] },
  // Deduplication
  { id: "records-after-dedup",label: "Records after removing duplicates",           count: 21887, type: "include",   studies: [] },
  { id: "duplicates",         label: "Duplicates Records",                          count: 4708,  type: "exclude",   studies: [] },
  // Screening
  { id: "records-screened",   label: "Records screened",                            count: 21887, type: "include",   studies: [] },
  { id: "excluded-title",     label: "Excluded by title",                           count: 20187, type: "exclude",   studies: [] },
  { id: "excluded-abstract",  label: "Excluded by abstract",                        count: 478,   type: "exclude",   studies: [] },
  // Eligibility
  { id: "fulltext-assessed",  label: "Full-text assessed for eligibility",          count: 1222,  type: "include",   studies: [] },
  { id: "excluded-fulltext",  label: "Excluded by full text review",                count: 1068,  type: "exclude",   studies: [] },
  // Included — dark blue
  { id: "studies-systematic", label: "Studies included in systematic review",       count: 154,   sublabel: "n=78 studies",  type: "final", studies: INCLUDED_STUDIES },
  { id: "studies-meta",       label: "Studies included in meta-analysis",           count: 62,    sublabel: "n=51 studies",  type: "final", studies: [] },
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

export function PrismaPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeView = (searchParams.get("view") as PrismaView) ?? "current-state";
  const highlightStudy = searchParams.get("hl") ?? undefined;
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStage, setSelectedStage] = useState<PrismaStage | null>(null);
  const [activeNodeId, setActiveNodeId] = useState<string | undefined>(undefined);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  const setView = (v: PrismaView) => setSearchParams({ view: v });

  const handleNodeClick = (stage: PrismaStage, triggerEl?: HTMLElement) => {
    if (triggerEl) lastFocusedRef.current = triggerEl;
    setSelectedStage(stage);
    setActiveNodeId(stage.id);
  };

  const handleClose = () => {
    setSelectedStage(null);
    setActiveNodeId(undefined);
    setTimeout(() => lastFocusedRef.current?.focus(), 50);
  };

  const stages = activeView === "initial-search" ? INITIAL_STATE_STAGES : CURRENT_STATE_STAGES;

  // When navigating from search with a study highlight, open the included stage
  useEffect(() => {
    if (!highlightStudy) return;
    const includedStage = CURRENT_STATE_STAGES.find((s) => s.id === "studies-systematic");
    if (includedStage) {
      setSelectedStage(includedStage);
      setActiveNodeId("included");
    }
  }, [highlightStudy]);

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD]">
      <TopNav />
      <div className="flex flex-1 min-h-0">
        <SideIconRail isPanelOpen={isPanelOpen} onTogglePanel={() => setIsPanelOpen((o) => !o)} />

        {/* On-page nav */}
        <NavPanelShell isOpen={isPanelOpen}>
          <div className="flex flex-col gap-8 px-6 py-6">
            <div>
              <h2 className="text-[22px] font-medium text-[#2E75B5] tracking-tight font-['Benton_Modern_D',serif] mb-1">
                PRISMA
              </h2>
              <p className="text-[12px] text-gray-400 font-['Inter',sans-serif]">
                Systematic search & screening
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                View
              </span>
              {VIEW_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setView(opt.id)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all w-full text-left",
                    activeView === opt.id
                      ? "bg-[#F3F8FE] text-[#2E75B5]"
                      : "text-gray-500 hover:bg-gray-50"
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>

          </div>
        </NavPanelShell>

        {/* Main content — no overflow container here so the flow's section
            anchor labels can stick relative to the page as the user scrolls */}
        <div className="flex-1 flex flex-col min-w-0">
          <main className="rounded-[20px] bg-white border-2 border-[#D1D5DC]/25 m-2">
            {/* Page header */}
            <div
              className="rounded-t-[18px] p-8"
              style={{ background: "linear-gradient(160deg, rgba(133,200,250,0.15) 0%, rgba(255,255,255,0) 60%)" }}
            >
              <span className="text-[13px] text-gray-500 font-['Articulat_CF',sans-serif] mb-1 block">
                Systematic Review — mCRPC
              </span>
              <h1 className="text-[40px] font-semibold text-[#101828] font-['Benton_Modern_D',serif] leading-tight mb-3">
                PRISMA Flow
              </h1>
              <p className="text-[15px] text-gray-600 font-['Inter',sans-serif] leading-relaxed max-w-2xl">
                {activeView === "living-search"
                  ? "Automated search results retrieved each month across all configured databases. Each cell shows the number of records pulled by automated screening."
                  : activeView === "initial-search"
                  ? "The PRISMA flow representing the initial systematic search conducted at review inception. Click any node to view the studies at that stage."
                  : "The PRISMA flow representing the current state of the living review. Click any node to view the studies at that stage."}
              </p>

              <GlobalSearch placeholder="Search studies, databases, screening stages…" className="mt-8" />

              <FilterBar className="mt-4" />
            </div>

            <div className="p-8">
              {/* Tab bar */}
              <div className="flex gap-1 border-b border-gray-100 mb-8">
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
                  onNodeClick={(stage) => handleNodeClick(stage)}
                  activeNodeId={activeNodeId}
                />
              )}
            </div>
          </main>
        </div>
      </div>

      <StudyListPanel stage={selectedStage} onClose={handleClose} />
    </div>
  );
}
