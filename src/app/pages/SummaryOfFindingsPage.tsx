import React, { useState } from "react";
import { useSearchParams } from "react-router";
import { BarChart, Activity, ChevronDown, ChevronRight } from "lucide-react";
import { GlobalSearch } from "../components/GlobalSearch";
import { TopNav } from "../components/TopNav";
import { SideIconRail } from "../components/SideIconRail";
import { NavPanelShell } from "../components/NavPanelShell";
import { GradeTable, SoFRow } from "../components/GradeTable";
import { OutcomeDetailView } from "../components/OutcomeDetailView";
import { FilterBar } from "../components/FilterBar";
import { CANONICAL_TRIAL_NAMES } from "../lib/citations";
import { cn } from "../lib/utils";

type AnalysisType = "primary" | "sensitivity";

interface OutcomeLeaf {
  kind: "leaf";
  id: string;
  label: string;
}
interface OutcomeGroup {
  kind: "group";
  label: string;
  children: (OutcomeLeaf | OutcomeGroup)[];
}
type OutcomeNode = OutcomeLeaf | OutcomeGroup;

function collectLeafIds(nodes: OutcomeNode[]): string[] {
  return nodes.flatMap((n) =>
    n.kind === "leaf" ? [n.id] : collectLeafIds(n.children)
  );
}

const PRIMARY_OUTCOME_TREE: OutcomeNode[] = [
  {
    kind: "group",
    label: "Survival / Time-to-event",
    children: [
      { kind: "leaf", id: "os", label: "Overall survival" },
      { kind: "leaf", id: "pfs", label: "Progression-free survival" },
    ],
  },
  {
    kind: "group",
    label: "Response",
    children: [
      { kind: "leaf", id: "orr", label: "Objective" },
      { kind: "leaf", id: "crr", label: "Complete" },
      { kind: "leaf", id: "prr", label: "Partial" },
    ],
  },
  {
    kind: "group",
    label: "Adverse events",
    children: [
      {
        kind: "group",
        label: "All-cause",
        children: [
          { kind: "leaf", id: "ae-any", label: "Any grade" },
          { kind: "leaf", id: "ae-g3", label: "Grade 3 or higher" },
          { kind: "leaf", id: "ae-g5", label: "Grade 5" },
        ],
      },
      {
        kind: "group",
        label: "Treatment related",
        children: [
          { kind: "leaf", id: "trae-any", label: "Any grade" },
          { kind: "leaf", id: "trae-g3", label: "Grade 3 or higher" },
          { kind: "leaf", id: "trae-g5", label: "Grade 5" },
        ],
      },
    ],
  },
];

const SENSITIVITY_OUTCOME_TREE: OutcomeNode[] = [
  {
    kind: "group",
    label: "Endpoint type",
    children: [
      { kind: "leaf", id: "pfs-composite", label: "Composite PFS (overall population)" },
      { kind: "leaf", id: "pfs-radio-overall", label: "Radiographic PFS (overall population)" },
      { kind: "leaf", id: "pfs-radio-bicr", label: "Radiographic PFS (BICR)" },
      { kind: "leaf", id: "pfs-radio-inv", label: "Radiographic PFS (INV)" },
    ],
  },
];

// The 12 named trials backing Summary Tables / citations — reused here so
// "Included Studies" links on the Overview page resolve to real records
// instead of a disconnected mock list.
const T = CANONICAL_TRIAL_NAMES;

const PRIMARY_SOF_ROWS: SoFRow[] = [
  {
    id: "os", outcome: "Overall survival", studyCount: 12, participantCount: 14832,
    relativeEffect: "HR 0.79", relativeEffectCI: "(0.71–0.88)",
    absoluteIntervention: "312 per 1,000", absoluteControl: "395 per 1,000", riskDifference: "−83 per 1,000", certainty: "High",
    direction: "benefit", includedTrialNames: T.slice(0, 12),
    heterogeneity: { i2: "21.2", tau2: "0.0041", p: "0.2828" },
    domains: {
      riskOfBias:     { rating: "Not serious", details: { allEvaluated: "Yes", allLowRisk: "True", highRiskSomeConcerns: "False", subgroupPValue: "NA", percentHighRisk: "0%", algorithmDecision: "Not serious", algorithmNote: "All studies are low risk", humanDecision: "Not serious", humanNote: "Not all studies are evaluated" } },
      indirectness:   { rating: "Not serious", details: { algorithmDecision: "Not serious", algorithmNote: "Population and intervention closely match PICO", humanDecision: "Not serious", humanNote: "Confirmed by clinical review" } },
      inconsistency:  { rating: "Not serious", details: { algorithmDecision: "Not serious", algorithmNote: "I² = 21.2%, within acceptable threshold", humanDecision: "Not serious", humanNote: "Low unexplained heterogeneity" } },
      imprecision:    { rating: "Not serious", details: { algorithmDecision: "Not serious", algorithmNote: "95% CI excludes 1.0; large sample size", humanDecision: "Not serious", humanNote: "Optimal information size met" } },
      publicationBias:{ rating: "Not applicable", details: { algorithmDecision: "Not applicable", algorithmNote: "Sufficient studies for funnel plot", humanDecision: "Not applicable", humanNote: "No asymmetry detected" } },
    },
  },
  {
    id: "pfs", outcome: "Progression-free survival", studyCount: 14, participantCount: 16201,
    relativeEffect: "HR 0.61", relativeEffectCI: "(0.54–0.70)",
    absoluteIntervention: "220 per 1,000", absoluteControl: "360 per 1,000", riskDifference: "−140 per 1,000", certainty: "Moderate",
    direction: "benefit", includedTrialNames: T.slice(0, 12),
    heterogeneity: { i2: "38.4", tau2: "0.0112", p: "0.0821" },
    domains: {
      riskOfBias:     { rating: "Not serious", details: { allEvaluated: "Yes", allLowRisk: "True", highRiskSomeConcerns: "False", subgroupPValue: "NA", percentHighRisk: "0%", algorithmDecision: "Not serious", algorithmNote: "All studies are low risk", humanDecision: "Not serious", humanNote: "Agreed with algorithm" } },
      indirectness:   { rating: "Not serious", details: { algorithmDecision: "Not serious", algorithmNote: "Outcomes directly relevant to mCRPC", humanDecision: "Not serious", humanNote: "Confirmed" } },
      inconsistency:  { rating: "Serious",     details: { algorithmDecision: "Serious", algorithmNote: "I² = 38.4%, moderate heterogeneity detected", humanDecision: "Serious", humanNote: "Likely driven by differing control arms" } },
      imprecision:    { rating: "Not serious", details: { algorithmDecision: "Not serious", algorithmNote: "CI narrow; large n", humanDecision: "Not serious", humanNote: "Agreed" } },
      publicationBias:{ rating: "Not applicable" },
    },
  },
  { id: "orr",      outcome: "Objective response",                studyCount: 9,  participantCount: 7634,  relativeEffect: "RR 1.48", relativeEffectCI: "(1.28–1.71)", absoluteIntervention: "415 per 1,000", absoluteControl: "280 per 1,000", riskDifference: "+135 per 1,000", certainty: "High",     direction: "benefit", includedTrialNames: T.slice(0, 9),  heterogeneity: { i2: "14.1", tau2: "0.0021", p: "0.3412" }, domains: { riskOfBias: { rating: "Not serious", details: { allEvaluated: "Yes", allLowRisk: "True", highRiskSomeConcerns: "False", subgroupPValue: "NA", percentHighRisk: "0%", algorithmDecision: "Not serious", algorithmNote: "All studies low risk", humanDecision: "Not serious", humanNote: "Agreed" } }, indirectness: { rating: "Not serious" }, inconsistency: { rating: "Not serious" }, imprecision: { rating: "Not serious" }, publicationBias: { rating: "Not applicable" } } },
  { id: "crr",      outcome: "Complete response",                 studyCount: 7,  participantCount: 6102,  relativeEffect: "RR 1.61", relativeEffectCI: "(1.30–1.99)", absoluteIntervention: "193 per 1,000", absoluteControl: "120 per 1,000", riskDifference: "+73 per 1,000",  certainty: "Moderate",  direction: "benefit", includedTrialNames: T.slice(0, 7),  heterogeneity: { i2: "29.3", tau2: "0.0078", p: "0.1654" }, domains: { riskOfBias: { rating: "Not serious" }, indirectness: { rating: "Not serious" }, inconsistency: { rating: "Not serious" }, imprecision: { rating: "Serious", details: { algorithmDecision: "Serious", algorithmNote: "Wide CI; fewer studies", humanDecision: "Serious", humanNote: "Small event count in some arms" } }, publicationBias: { rating: "Not applicable" } } },
  { id: "prr",      outcome: "Partial response",                  studyCount: 7,  participantCount: 6102,  relativeEffect: "RR 1.41", relativeEffectCI: "(1.18–1.68)", absoluteIntervention: "282 per 1,000", absoluteControl: "200 per 1,000", riskDifference: "+82 per 1,000",  certainty: "Moderate",  direction: "benefit", includedTrialNames: T.slice(5, 12), heterogeneity: { i2: "22.7", tau2: "0.0055", p: "0.2210" }, domains: { riskOfBias: { rating: "Not serious" }, indirectness: { rating: "Not serious" }, inconsistency: { rating: "Not serious" }, imprecision: { rating: "Serious", details: { algorithmDecision: "Serious", algorithmNote: "CI includes small benefit", humanDecision: "Serious", humanNote: "Threshold sensitivity" } }, publicationBias: { rating: "Not applicable" } } },
  { id: "ae-any",   outcome: "All-cause AEs — any grade",         studyCount: 13, participantCount: 15640, relativeEffect: "RR 1.06", relativeEffectCI: "(1.02–1.10)", absoluteIntervention: "848 per 1,000", absoluteControl: "800 per 1,000", riskDifference: "+48 per 1,000",  certainty: "Moderate",  direction: "harm",    includedTrialNames: T.slice(0, 12), heterogeneity: { i2: "41.2", tau2: "0.0098", p: "0.0612" }, domains: { riskOfBias: { rating: "Not serious" }, indirectness: { rating: "Not serious" }, inconsistency: { rating: "Serious", details: { algorithmDecision: "Serious", algorithmNote: "I² = 41.2%, moderate heterogeneity", humanDecision: "Serious", humanNote: "Variability in reporting AE definitions" } }, imprecision: { rating: "Not serious" }, publicationBias: { rating: "Not applicable" } } },
  { id: "ae-g3",    outcome: "All-cause AEs — grade ≥3",          studyCount: 13, participantCount: 15640, relativeEffect: "RR 1.19", relativeEffectCI: "(1.11–1.28)", absoluteIntervention: "583 per 1,000", absoluteControl: "490 per 1,000", riskDifference: "+93 per 1,000",  certainty: "Moderate",  direction: "harm",    includedTrialNames: T.slice(0, 12), heterogeneity: { i2: "18.9", tau2: "0.0044", p: "0.2801" }, domains: { riskOfBias: { rating: "Not serious" }, indirectness: { rating: "Not serious" }, inconsistency: { rating: "Not serious" }, imprecision: { rating: "Not serious" }, publicationBias: { rating: "Not applicable" } } },
  { id: "ae-g5",    outcome: "All-cause AEs — grade 5",           studyCount: 10, participantCount: 11820, relativeEffect: "RR 1.04", relativeEffectCI: "(0.76–1.42)", absoluteIntervention: "21 per 1,000",  absoluteControl: "20 per 1,000",  riskDifference: "+1 per 1,000",   certainty: "Low",       direction: "neither", includedTrialNames: T.slice(0, 10), heterogeneity: { i2: "52.1", tau2: "0.0201", p: "0.0241" }, domains: { riskOfBias: { rating: "Not serious" }, indirectness: { rating: "Not serious" }, inconsistency: { rating: "Serious",   details: { algorithmDecision: "Serious", algorithmNote: "I² = 52.1%, substantial heterogeneity", humanDecision: "Serious", humanNote: "Rare event; variable definitions" } }, imprecision: { rating: "Serious", details: { algorithmDecision: "Serious", algorithmNote: "CI crosses null; rare events", humanDecision: "Serious", humanNote: "Agreed" } }, publicationBias: { rating: "Not applicable" } } },
  { id: "trae-any", outcome: "Treatment-related AEs — any grade", studyCount: 11, participantCount: 13201, relativeEffect: "RR 1.12", relativeEffectCI: "(1.06–1.18)", absoluteIntervention: "672 per 1,000", absoluteControl: "600 per 1,000", riskDifference: "+72 per 1,000",  certainty: "Moderate",  direction: "harm",    includedTrialNames: T.slice(0, 11), heterogeneity: { i2: "31.4", tau2: "0.0081", p: "0.1402" }, domains: { riskOfBias: { rating: "Not serious" }, indirectness: { rating: "Not serious" }, inconsistency: { rating: "Not serious" }, imprecision: { rating: "Not serious" }, publicationBias: { rating: "Not applicable" } } },
  { id: "trae-g3",  outcome: "Treatment-related AEs — grade ≥3",  studyCount: 11, participantCount: 13201, relativeEffect: "RR 1.24", relativeEffectCI: "(1.14–1.35)", absoluteIntervention: "372 per 1,000", absoluteControl: "300 per 1,000", riskDifference: "+72 per 1,000",  certainty: "Moderate",  direction: "harm",    includedTrialNames: T.slice(0, 11), heterogeneity: { i2: "24.8", tau2: "0.0063", p: "0.2014" }, domains: { riskOfBias: { rating: "Not serious" }, indirectness: { rating: "Not serious" }, inconsistency: { rating: "Not serious" }, imprecision: { rating: "Not serious" }, publicationBias: { rating: "Not applicable" } } },
  { id: "trae-g5",  outcome: "Treatment-related AEs — grade 5",   studyCount: 9,  participantCount: 10540, relativeEffect: "RR 1.02", relativeEffectCI: "(0.68–1.52)", absoluteIntervention: "10 per 1,000",  absoluteControl: "10 per 1,000",  riskDifference: "0 per 1,000",    certainty: "Low",       direction: "neither", includedTrialNames: T.slice(3, 12), heterogeneity: { i2: "48.3", tau2: "0.0178", p: "0.0391" }, domains: { riskOfBias: { rating: "Not serious" }, indirectness: { rating: "Not serious" }, inconsistency: { rating: "Serious", details: { algorithmDecision: "Serious", algorithmNote: "Substantial heterogeneity I² = 48.3%", humanDecision: "Serious", humanNote: "Small event count drives variance" } }, imprecision: { rating: "Serious", details: { algorithmDecision: "Serious", algorithmNote: "CI spans null; rare fatal AE", humanDecision: "Serious", humanNote: "Agreed" } }, publicationBias: { rating: "Not applicable" } } },
];

const SENSITIVITY_SOF_ROWS: SoFRow[] = [
  { id: "pfs-composite",    outcome: "Composite PFS (overall population)",      studyCount: 8, participantCount: 9214,  relativeEffect: "HR 0.58", relativeEffectCI: "(0.50–0.67)", absoluteIntervention: "201 per 1,000", absoluteControl: "347 per 1,000", riskDifference: "−146 per 1,000", certainty: "High",     direction: "benefit", includedTrialNames: T.slice(0, 8) },
  { id: "pfs-radio-overall",outcome: "Radiographic PFS (overall population)",   studyCount: 10,participantCount: 12830, relativeEffect: "HR 0.54", relativeEffectCI: "(0.47–0.62)", absoluteIntervention: "185 per 1,000", absoluteControl: "343 per 1,000", riskDifference: "−158 per 1,000", certainty: "High",     direction: "benefit", includedTrialNames: T.slice(0, 10) },
  { id: "pfs-radio-bicr",   outcome: "Radiographic PFS (BICR)",                studyCount: 7, participantCount: 8401,  relativeEffect: "HR 0.52", relativeEffectCI: "(0.44–0.61)", absoluteIntervention: "176 per 1,000", absoluteControl: "338 per 1,000", riskDifference: "−162 per 1,000", certainty: "Moderate", direction: "benefit", includedTrialNames: T.slice(0, 7) },
  { id: "pfs-radio-inv",    outcome: "Radiographic PFS (INV)",                 studyCount: 7, participantCount: 8401,  relativeEffect: "HR 0.55", relativeEffectCI: "(0.47–0.64)", absoluteIntervention: "189 per 1,000", absoluteControl: "344 per 1,000", riskDifference: "−155 per 1,000", certainty: "Moderate", direction: "benefit", includedTrialNames: T.slice(5, 12) },
];

function OutcomeTreeNode({
  node,
  checkedIds,
  onToggle,
  depth = 0,
}: {
  node: OutcomeNode;
  checkedIds: string[];
  onToggle: (id: string) => void;
  depth?: number;
}) {
  const [open, setOpen] = useState(true);

  if (node.kind === "leaf") {
    const isChecked = checkedIds.includes(node.id);
    return (
      <button
        onClick={() => onToggle(node.id)}
        className={cn(
          "flex items-center gap-2.5 text-left py-2 pr-2 rounded-lg text-[13px] transition-colors w-full font-['Articulat_CF',sans-serif] hover:bg-gray-50",
          isChecked ? "text-[#2E75B5] font-semibold" : "text-gray-900"
        )}
        style={{ paddingLeft: `${(depth + 1) * 12 + 8}px` }}
      >
        {/* Checkbox */}
        <span className={cn(
          "shrink-0 flex items-center justify-center w-[14px] h-[14px] rounded-[3px] border transition-colors",
          isChecked ? "bg-[#2E75B5] border-[#2E75B5]" : "border-gray-300 bg-white"
        )}>
          {isChecked && (
            <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
              <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
        {node.label}
      </button>
    );
  }

  return (
    <div className="flex flex-col">
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex items-center gap-2 py-2 pr-2 text-left rounded-lg transition-colors w-full group",
          depth === 0
            ? "text-[15px] font-medium text-gray-900 font-['Articulat_CF',sans-serif]"
            : "text-[13px] text-gray-600 font-['Articulat_CF',sans-serif]"
        )}
        style={{ paddingLeft: `${depth * 12 + 4}px` }}
      >
        <span className="text-gray-400 group-hover:text-[#2E75B5] shrink-0 transition-colors">
          {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </span>
        <span className="flex-1 truncate">{node.label}</span>
      </button>
      {open && (
        <div className="flex flex-col">
          {node.children.map((child) => (
            <OutcomeTreeNode
              key={child.kind === "leaf" ? child.id : child.label}
              node={child}
              checkedIds={checkedIds}
              onToggle={onToggle}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function SummaryOfFindingsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const analysisType = (searchParams.get("analysis") as AnalysisType) ?? "primary";
  const highlightId = searchParams.get("hl") ?? undefined;
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRow, setSelectedRow] = useState<SoFRow | null>(null);

  const outcomeTree = analysisType === "primary" ? PRIMARY_OUTCOME_TREE : SENSITIVITY_OUTCOME_TREE;
  const sofRows = analysisType === "primary" ? PRIMARY_SOF_ROWS : SENSITIVITY_SOF_ROWS;
  const allLeafIds = collectLeafIds(outcomeTree);

  const [checkedIds, setCheckedIds] = useState<string[]>(allLeafIds);

  const setAnalysis = (t: AnalysisType) => {
    const tree = t === "primary" ? PRIMARY_OUTCOME_TREE : SENSITIVITY_OUTCOME_TREE;
    setCheckedIds(collectLeafIds(tree));
    setSearchParams({ analysis: t });
  };

  const toggleOutcome = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const allSelected = checkedIds.length === allLeafIds.length;
  const setAllOutcomes = (on: boolean) => setCheckedIds(on ? allLeafIds : []);

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
                Explore
              </h2>
              <p className="text-[12px] text-gray-400 font-['Inter',sans-serif]">
                Summary of findings
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                Type of Analysis
              </span>
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => setAnalysis("primary")}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-all w-full",
                    analysisType === "primary" ? "bg-[#F3F8FE] text-[#2E75B5]" : "text-gray-500 hover:bg-gray-50"
                  )}
                >
                  Primary <BarChart size={18} />
                </button>
                <button
                  onClick={() => setAnalysis("sensitivity")}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-all w-full",
                    analysisType === "sensitivity" ? "bg-[#F3F8FE] text-[#2E75B5]" : "text-gray-500 hover:bg-gray-50"
                  )}
                >
                  Sensitivity <Activity size={18} />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                  Outcomes shown
                </span>
                <button
                  onClick={() => setAllOutcomes(!allSelected)}
                  className="text-[11px] font-medium text-[#2E75B5] hover:underline"
                >
                  {allSelected ? "Clear all" : "Select all"}
                </button>
              </div>
              {outcomeTree.map((node) => (
                <OutcomeTreeNode
                  key={node.kind === "leaf" ? node.id : node.label}
                  node={node}
                  checkedIds={checkedIds}
                  onToggle={toggleOutcome}
                />
              ))}
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
                Summary of Findings
              </h1>
              <p className="text-[15px] text-gray-600 font-['Inter',sans-serif] leading-relaxed max-w-2xl">
                GRADE Summary of Findings table for{" "}
                <span className="font-medium text-gray-800">
                  {analysisType === "primary" ? "primary analysis" : "sensitivity analysis"}
                </span>
                . Certainty of evidence assessed using the GRADE approach. Use the sidebar to select which outcomes to display.
              </p>

              <GlobalSearch placeholder="Search outcomes, effects, certainty levels…" className="mt-8" />

              <FilterBar className="mt-4" />
            </div>

            {selectedRow ? (
              <OutcomeDetailView
                row={selectedRow}
                onBack={() => setSelectedRow(null)}
              />
            ) : (
              <div className="p-8">
                <GradeTable
                  rows={sofRows}
                  visibleOutcomeIds={checkedIds}
                  comparison={`mCRPC — ${analysisType === "primary" ? "Primary" : "Sensitivity"} Analysis`}
                  onRowClick={(row) => row.domains && setSelectedRow(row)}
                  highlightId={highlightId}
                />
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
