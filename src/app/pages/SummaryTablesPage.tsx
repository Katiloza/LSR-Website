import React, { useState } from "react";
import { useSearchParams } from "react-router";
import { Construction, ChevronDown, ChevronRight } from "lucide-react";
import { GlobalSearch } from "../components/GlobalSearch";
import { TopNav } from "../components/TopNav";
import { SideIconRail } from "../components/SideIconRail";
import { NavPanelShell } from "../components/NavPanelShell";
import {
  SummaryTable,
  StudyRow,
  ALL_LEAF_KEYS,
  descendantLeafKeys,
  LEVEL_COLORS,
} from "../components/SummaryTable";
import { COLUMN_SCHEMA, ColNode } from "../lib/summaryColumns";
import { FilterBar } from "../components/FilterBar";
import { useFilters } from "../lib/FilterContext";
import { cn } from "../lib/utils";

type TableTab = "interactive-table" | "results-table" | "traffic-plot";

// ─── Sidebar tree ─────────────────────────────────────────────────────────────

type CheckState = "all" | "some" | "none";

function TriCheckbox({ state, color }: { state: CheckState; color: string }) {
  return (
    <span
      className="shrink-0 flex items-center justify-center w-[14px] h-[14px] rounded-[3px] border transition-colors"
      style={
        state === "none"
          ? { borderColor: "#d1d5db", background: "#fff" }
          : { borderColor: color, background: color }
      }
    >
      {state === "all" && (
        <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
          <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {state === "some" && <span className="w-[7px] h-[1.5px] bg-white rounded-full" />}
    </span>
  );
}

function ColumnTreeNode({
  node,
  depth,
  checkedLeafKeys,
  expandedKeys,
  onToggleCheck,
  onToggleExpand,
}: {
  node: ColNode;
  depth: number;
  checkedLeafKeys: Set<string>;
  expandedKeys: Set<string>;
  onToggleCheck: (node: ColNode) => void;
  onToggleExpand: (key: string) => void;
}) {
  const isLeaf = !node.children || node.children.length === 0;
  const leafKeys = descendantLeafKeys(node);
  const checkedCount = leafKeys.reduce((a, k) => a + (checkedLeafKeys.has(k) ? 1 : 0), 0);
  const state: CheckState = checkedCount === 0 ? "none" : checkedCount === leafKeys.length ? "all" : "some";
  const open = expandedKeys.has(node.key);
  const color = LEVEL_COLORS[Math.min(depth, LEVEL_COLORS.length - 1)];
  // Category labels are stored ALL-CAPS (literal PDF transcription); title-case
  // them for the sidebar only — the schema and colored header band keep the raw label.
  const displayLabel =
    depth === 0
      ? node.label.replace(/\w\S*/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
      : node.label;

  return (
    <div className="flex flex-col">
      <div
        className="col-tree-item flex items-center rounded-lg"
        data-checked={state !== "none"}
        style={{ paddingLeft: `${depth * 12}px`, ["--lvl" as string]: color }}
      >
        {isLeaf ? (
          <span className="w-[18px] shrink-0" />
        ) : (
          <button
            onClick={() => onToggleExpand(node.key)}
            className="w-[18px] shrink-0 flex items-center justify-center text-gray-400 transition-colors"
            style={{ color: open ? color : undefined }}
            aria-label={open ? "Collapse" : "Expand"}
          >
            {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </button>
        )}
        <button
          onClick={() => onToggleCheck(node)}
          className={cn(
            "flex items-center gap-2 text-left py-1.5 pr-2 flex-1 min-w-0 font-['Articulat_CF',sans-serif]",
            depth === 0 ? "text-[13px] font-semibold" : "text-[12px]"
          )}
        >
          <TriCheckbox state={state} color={color} />
          <span className="col-tree-label truncate">{displayLabel}</span>
        </button>
      </div>
      {!isLeaf && open && (
        <div className="flex flex-col">
          {node.children!.map((child) => (
            <ColumnTreeNode
              key={child.key}
              node={child}
              depth={depth + 1}
              checkedLeafKeys={checkedLeafKeys}
              expandedKeys={expandedKeys}
              onToggleCheck={onToggleCheck}
              onToggleExpand={onToggleExpand}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Static data ──────────────────────────────────────────────────────────────

const TABS: { id: TableTab; label: string }[] = [
  { id: "interactive-table", label: "Interactive Table" },
  { id: "results-table",     label: "Results Table" },
  { id: "traffic-plot",      label: "Traffic Plot" },
];

const MOCK_STUDIES: StudyRow[] = [
  { id: "1",  nct: "NCT03732820", study: "Smith et al.",    year: 2024, trialName: "PROpel",      treatment: "Olaparib + Abiraterone",       control: "Placebo + Abiraterone",          lineOfTherapy: "First-line",         phase: "Phase III", n: 796,  therapyType: "Combination", treatmentClass: "PARPi",        primaryEndpoint: "rPFS",         hrOs: "0.83 (0.66–1.03)", hrPfs: "0.66 (0.54–0.81)" },
  { id: "2",  nct: "NCT03395197", study: "Saad et al.",     year: 2023, trialName: "TALAPRO-2",   treatment: "Talazoparib + Enzalutamide",   control: "Placebo + Enzalutamide",         lineOfTherapy: "First-line",         phase: "Phase III", n: 1095, therapyType: "Combination", treatmentClass: "PARPi",        primaryEndpoint: "rPFS",         hrOs: "0.89 (0.69–1.14)", hrPfs: "0.63 (0.51–0.78)" },
  { id: "3",  nct: "NCT03748641", study: "Chi et al.",      year: 2023, trialName: "MAGNITUDE",   treatment: "Niraparib + Abiraterone",      control: "Placebo + Abiraterone",          lineOfTherapy: "First-line",         phase: "Phase III", n: 423,  therapyType: "Combination", treatmentClass: "PARPi",        primaryEndpoint: "rPFS (HRR+)",  hrOs: "0.88 (0.58–1.34)", hrPfs: "0.53 (0.36–0.79)" },
  { id: "4",  nct: "NCT03511664", study: "Sartor et al.",   year: 2021, trialName: "VISION",      treatment: "177Lu-PSMA-617 + SoC",         control: "Standard of care",               lineOfTherapy: "Third-line or later",phase: "Phase III", n: 831,  therapyType: "Monotherapy", treatmentClass: "PSMA",         primaryEndpoint: "rPFS, OS",     hrOs: "0.62 (0.52–0.74)", hrPfs: "0.40 (0.29–0.57)" },
  { id: "5",  nct: "NCT02485691", study: "de Wit et al.",   year: 2019, trialName: "CARD",        treatment: "Cabazitaxel",                  control: "Abiraterone / Enzalutamide",     lineOfTherapy: "Second-line",        phase: "Phase III", n: 255,  therapyType: "Monotherapy", treatmentClass: "Chemotherapy", primaryEndpoint: "rPFS",         hrOs: "0.64 (0.46–0.89)", hrPfs: "0.54 (0.40–0.73)" },
  { id: "6",  nct: "NCT02975934", study: "Armstrong et al.",year: 2023, trialName: "TRITON3",     treatment: "Rucaparib",                    control: "Physician's choice",             lineOfTherapy: "Second-line",        phase: "Phase III", n: 270,  therapyType: "Monotherapy", treatmentClass: "PARPi",        primaryEndpoint: "rPFS (BRCA1/2)",hrOs: "0.94 (0.65–1.35)", hrPfs: "0.50 (0.33–0.74)" },
  { id: "7",  nct: "NCT02987543", study: "Hussain et al.",  year: 2020, trialName: "PROfound",    treatment: "Olaparib",                     control: "Enzalutamide / Abiraterone",     lineOfTherapy: "Second-line",        phase: "Phase III", n: 387,  therapyType: "Monotherapy", treatmentClass: "PARPi",        primaryEndpoint: "rPFS (HRR+)",  hrOs: "0.69 (0.50–0.97)", hrPfs: "0.34 (0.25–0.47)" },
  { id: "8",  nct: "NCT00887198", study: "Fizazi et al.",   year: 2012, trialName: "COU-AA-302",  treatment: "Abiraterone + Prednisone",     control: "Placebo + Prednisone",           lineOfTherapy: "First-line",         phase: "Phase III", n: 1088, therapyType: "Monotherapy", treatmentClass: "NHT",          primaryEndpoint: "rPFS, OS",     hrOs: "0.75 (0.61–0.93)", hrPfs: "0.53 (0.45–0.62)" },
  { id: "9",  nct: "NCT01212991", study: "Beer et al.",     year: 2014, trialName: "PREVAIL",     treatment: "Enzalutamide",                 control: "Placebo",                        lineOfTherapy: "First-line",         phase: "Phase III", n: 1717, therapyType: "Monotherapy", treatmentClass: "NHT",          primaryEndpoint: "rPFS, OS",     hrOs: "0.73 (0.63–0.85)", hrPfs: "0.19 (0.15–0.23)" },
  { id: "10", nct: "NCT00974311", study: "Scher et al.",    year: 2012, trialName: "AFFIRM",      treatment: "Enzalutamide",                 control: "Placebo",                        lineOfTherapy: "Second-line",        phase: "Phase III", n: 1199, therapyType: "Monotherapy", treatmentClass: "NHT",          primaryEndpoint: "OS",           hrOs: "0.63 (0.53–0.75)", hrPfs: "0.40 (0.35–0.47)" },
  { id: "11", nct: "NCT00638690", study: "Ryan et al.",     year: 2013, trialName: "COU-AA-301",  treatment: "Abiraterone + Prednisone",     control: "Placebo + Prednisone",           lineOfTherapy: "Second-line",        phase: "Phase III", n: 1195, therapyType: "Monotherapy", treatmentClass: "NHT",          primaryEndpoint: "OS",           hrOs: "0.74 (0.64–0.86)", hrPfs: "0.67 (0.59–0.78)" },
  { id: "12", nct: "NCT01715285", study: "Fizazi et al.",   year: 2017, trialName: "LATITUDE",    treatment: "Abiraterone + ADT",            control: "Placebo + ADT",                  lineOfTherapy: "First-line",         phase: "Phase III", n: 1199, therapyType: "Combination", treatmentClass: "NHT",          primaryEndpoint: "OS, rPFS",     hrOs: "0.62 (0.51–0.76)", hrPfs: "0.47 (0.39–0.55)" },
];

function PlaceholderView({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-400">
      <Construction size={32} strokeWidth={1.5} />
      <div className="text-center">
        <p className="text-[15px] font-medium text-gray-500 font-['Articulat_CF',sans-serif]">{title}</p>
        <p className="text-[13px] font-['Inter',sans-serif] mt-1">This view is under development.</p>
      </div>
    </div>
  );
}

// ─── Page component ───────────────────────────────────────────────────────────

export function SummaryTablesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = (searchParams.get("tab") as TableTab) ?? "interactive-table";
  const highlightId = searchParams.get("hl") ?? undefined;
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const { activeFilters } = useFilters(); // global row filters, shared across pages

  // Single source of truth for column visibility: every leaf checked by default.
  const [checkedLeafKeys, setCheckedLeafKeys] = useState<Set<string>>(() => new Set(ALL_LEAF_KEYS));

  // Sidebar chevron open/closed — local UI only, no effect on table columns.
  // Default: all three overarching categories collapsed.
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(() => new Set());

  const toggleCheck = (node: ColNode) => {
    const leafKeys = descendantLeafKeys(node);
    setCheckedLeafKeys((prev) => {
      const next = new Set(prev);
      const allOn = leafKeys.every((k) => next.has(k));
      leafKeys.forEach((k) => (allOn ? next.delete(k) : next.add(k)));
      return next;
    });
  };

  const toggleExpand = (key: string) => {
    setExpandedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const allChecked = checkedLeafKeys.size === ALL_LEAF_KEYS.length;
  const setAll = (on: boolean) => setCheckedLeafKeys(on ? new Set(ALL_LEAF_KEYS) : new Set());

  const setTab = (t: TableTab) => setSearchParams({ tab: t });

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD]">
      <TopNav />
      <div className="flex flex-1 min-h-0">
        <SideIconRail isPanelOpen={isPanelOpen} onTogglePanel={() => setIsPanelOpen((o) => !o)} />

        {/* Left sidebar — Column Selector */}
        <NavPanelShell isOpen={isPanelOpen}>
          <div className="flex flex-col gap-5 px-6 py-6">
            <div>
              <h2 className="text-[22px] font-medium text-[#2E75B5] tracking-tight font-['Benton_Modern_D',serif] mb-1">
                Summary Tables
              </h2>
              <p className="text-[12px] text-gray-400 font-['Inter',sans-serif]">Study characteristics & results</p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Column Selector</span>
                <button
                  onClick={() => setAll(!allChecked)}
                  className="text-[11px] font-medium text-[#2E75B5] hover:underline"
                >
                  {allChecked ? "Clear all" : "Select all"}
                </button>
              </div>
              <div className="flex flex-col">
                {COLUMN_SCHEMA.map((node) => (
                  <ColumnTreeNode
                    key={node.key}
                    node={node}
                    depth={0}
                    checkedLeafKeys={checkedLeafKeys}
                    expandedKeys={expandedKeys}
                    onToggleCheck={toggleCheck}
                    onToggleExpand={toggleExpand}
                  />
                ))}
              </div>
            </div>
          </div>
        </NavPanelShell>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <main className="rounded-[20px] bg-white border-2 border-[#D1D5DC]/25 m-2">
            <div
              className="rounded-t-[18px] p-8"
              style={{ background: "linear-gradient(160deg, rgba(133,200,250,0.15) 0%, rgba(255,255,255,0) 60%)" }}
            >
              <span className="text-[13px] text-gray-500 font-['Articulat_CF',sans-serif] mb-1 block">
                Systematic Review — mCRPC
              </span>
              <h1 className="text-[40px] font-semibold text-[#101828] font-['Benton_Modern_D',serif] leading-tight mb-3">
                Summary Tables
              </h1>
              <p className="text-[15px] text-gray-600 font-['Inter',sans-serif] leading-relaxed max-w-2xl">
                Study characteristics, population details, and results from all {MOCK_STUDIES.length} clinical trials
                included in the living systematic review. Filter by study characteristics or toggle column visibility.
              </p>

              <GlobalSearch placeholder="Search studies, treatments, trials…" className="mt-4" />

              <FilterBar className="mt-4" />
            </div>

            <div className="p-8">
              {/* Tab bar */}
              <div className="flex gap-1 mb-6 border-b border-gray-100 pb-0">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setTab(tab.id)}
                    className={cn(
                      "px-4 py-2.5 text-[13px] font-medium transition-all border-b-2 -mb-px",
                      activeTab === tab.id
                        ? "border-[#2E75B5] text-[#2E75B5]"
                        : "border-transparent text-gray-500 hover:text-gray-700",
                      tab.id !== "interactive-table" && "opacity-40"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {activeTab === "interactive-table" && (
                <SummaryTable
                  rows={MOCK_STUDIES}
                  activeFilters={activeFilters}
                  highlightId={highlightId}
                  checkedLeafKeys={checkedLeafKeys}
                />
              )}
              {activeTab === "results-table" && <PlaceholderView title="Results Table" />}
              {activeTab === "traffic-plot" && <PlaceholderView title="Traffic Plot" />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
