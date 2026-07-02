import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "react-router";
import { GitBranch, Search as SearchIcon, Filter, Users, CheckCircle, XCircle } from "lucide-react";
import { GlobalSearch } from "../components/GlobalSearch";
import { TopNav } from "../components/TopNav";
import { SideIconRail } from "../components/SideIconRail";
import { NavPanelShell } from "../components/NavPanelShell";
import { PrismaFlowchart, PrismaStage } from "../components/PrismaFlowchart";
import { StudyListPanel } from "../components/StudyListPanel";
import { PrismaLivingSearch } from "../components/PrismaLivingSearch";
import { cn } from "../lib/utils";

type PrismaView = "current-state" | "initial-search" | "living-search";

const VIEW_OPTIONS: { id: PrismaView; label: string }[] = [
  { id: "current-state", label: "Current State" },
  { id: "initial-search", label: "Initial Search" },
  { id: "living-search", label: "Living Search" },
];

const CURRENT_STATE_STAGES: PrismaStage[] = [
  {
    id: "databases",
    label: "Initial search from databases",
    count: 26595,
    sublabel: "MEDLINE, Embase, CENTRAL, ClinicalTrials.gov",
    type: "total",
    studies: [],
  },
  {
    id: "auto-update",
    label: "Records identified through automatic update",
    count: 7494,
    sublabel: "Monthly automated search",
    type: "total",
    studies: [],
  },
  {
    id: "manual-update",
    label: "Records identified through manual update",
    count: 38,
    sublabel: "Grey literature, expert contact",
    type: "total",
    studies: [],
  },
  {
    id: "screened",
    label: "Records screened (title/abstract)",
    count: 4963,
    type: "include",
    studies: [],
  },
  {
    id: "excluded-screening",
    label: "Records excluded at screening",
    count: 4712,
    sublabel: "Not RCTs, wrong population, wrong intervention",
    type: "exclude",
    studies: [],
  },
  {
    id: "sought",
    label: "Reports sought for retrieval",
    count: 251,
    type: "include",
    studies: [],
  },
  {
    id: "not-retrieved",
    label: "Reports not retrieved",
    count: 8,
    type: "exclude",
    studies: [],
  },
  {
    id: "assessed",
    label: "Reports assessed for eligibility",
    count: 243,
    type: "include",
    studies: [],
  },
  {
    id: "excluded-eligibility",
    label: "Reports excluded (full text)",
    count: 196,
    sublabel: "Wrong comparator (n=82), ongoing trial (n=67), wrong outcome (n=47)",
    type: "exclude",
    studies: [],
  },
  {
    id: "included",
    label: "Studies included in review",
    count: 47,
    sublabel: "Representing 47 unique RCTs",
    type: "include",
    studies: [
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
    ],
  },
];

const INITIAL_STATE_STAGES: PrismaStage[] = [
  {
    id: "databases",
    label: "Initial search from databases",
    count: 26595,
    sublabel: "MEDLINE, Embase, CENTRAL, ClinicalTrials.gov",
    type: "total",
    studies: [],
  },
  // auto-update and manual-update are omitted — initial search has only one identification source
  ...CURRENT_STATE_STAGES.filter((s) => !["databases", "auto-update", "manual-update"].includes(s.id)).map((s) => ({
    ...s,
    count: s.id === "screened" ? 26595 : s.id === "excluded-screening" ? 25198 :
      s.id === "sought" ? 1397 : s.id === "not-retrieved" ? 23 :
      s.id === "assessed" ? 1374 : s.id === "excluded-eligibility" ? 1340 :
      s.id === "included" ? 34 : s.count,
  })),
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
    const includedStage = CURRENT_STATE_STAGES.find((s) => s.id === "included");
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

            {activeView !== "living-search" && (
              <div className="flex flex-col gap-3">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  Summary
                </span>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <SearchIcon size={14} className="text-gray-400" />
                    <span className="text-[12px] text-gray-600 font-['Inter',sans-serif]">
                      {activeView === "current-state" ? "34,127" : "26,595"} records screened
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter size={14} className="text-gray-400" />
                    <span className="text-[12px] text-gray-600 font-['Inter',sans-serif]">
                      {activeView === "current-state" ? "243" : "1,374"} assessed for eligibility
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-[#2E75B5]" />
                    <span className="text-[12px] text-[#2E75B5] font-semibold font-['Inter',sans-serif]">
                      {activeView === "current-state" ? "47" : "34"} studies included
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </NavPanelShell>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
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
