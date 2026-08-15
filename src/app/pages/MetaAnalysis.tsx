import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { Palette } from "lucide-react";
import { PageShell } from "../components/PageShell";
import { ForestPlot } from "../components/ForestPlot";
import { CertaintyColorGuide } from "../components/CertaintyColorGuide";
import { certaintyColor, CertaintyLevel, EffectDirection } from "../components/CertaintyBadge";
import { OutcomeSummaryCard } from "../components/OutcomeSummaryCard";
import { MOCK_FOREST_DATA } from "../mockData";
import { cn } from "../lib/utils";

type AnalysisType = "Primary" | "Sensitivity";

// ─── Outcome model ────────────────────────────────────────────────────────────
// Figma nodes 9:816 (Survival) and 13:5771 (Adverse events, toggled).
//
// The page reads top-down: pick an outcome *family* with the tab bar, scan the
// certainty-coloured outcome cards, then the selected card's forest plot renders
// in a panel below, framed in that same certainty colour so the strength of the
// evidence is legible before any number is read.

interface Outcome {
  id: string;
  /** Card heading. */
  name: string;
  /** Panel heading above the forest plot. */
  title: string;
  level: CertaintyLevel;
  direction: EffectDirection;
  studies: number;
  participants: number;
  /** Which MOCK_FOREST_DATA series backs this outcome. */
  dataId: string;
}

interface OutcomeTab {
  id: string;
  label: string;
  /** Adverse events splits further into an All cause / Treatment related toggle. */
  groups?: { id: string; label: string; outcomes: Outcome[] }[];
  outcomes?: Outcome[];
}

const PRIMARY_TABS: OutcomeTab[] = [
  {
    id: "survival",
    label: "Survival",
    outcomes: [
      { id: "os",  name: "Overall survival",          title: "Overall Survival | Primary Analysis",          level: "High",     direction: "benefit", studies: 12, participants: 14832, dataId: "os"  },
      { id: "pfs", name: "Progression-free survival", title: "Progression-free Survival | Primary Analysis", level: "Moderate", direction: "benefit", studies: 14, participants: 16201, dataId: "pfs" },
      { id: "ttp", name: "Time to progression",       title: "Time to Progression | Primary Analysis",       level: "High",     direction: "benefit", studies: 9,  participants: 7634,  dataId: "pfs" },
    ],
  },
  {
    id: "response",
    label: "Response",
    outcomes: [
      { id: "orr",   name: "Objective response", title: "Objective Response | Primary Analysis", level: "Moderate", direction: "benefit", studies: 9, participants: 9412, dataId: "os" },
      { id: "crr",   name: "Complete response",  title: "Complete Response | Primary Analysis",  level: "Low",      direction: "benefit", studies: 7, participants: 6188, dataId: "os" },
      { id: "psa50", name: "PSA50% response",    title: "PSA50% Response | Primary Analysis",    level: "Moderate", direction: "benefit", studies: 7, participants: 6702, dataId: "os" },
    ],
  },
  {
    id: "adverse-events",
    label: "Adverse events",
    groups: [
      {
        id: "all-cause",
        label: "All cause",
        outcomes: [
          { id: "ae-any", name: "All-cause AEs — any grade", title: "All-Cause Adverse Events — Any Grade", level: "Moderate", direction: "harm",    studies: 13, participants: 15640, dataId: "os" },
          { id: "ae-g5",  name: "All-cause AEs — grade 5",   title: "All-Cause Adverse Events — Grade 5",   level: "Low",      direction: "neither", studies: 10, participants: 11820, dataId: "os" },
        ],
      },
      {
        id: "treatment-related",
        label: "Treatment related",
        outcomes: [
          { id: "trae-any", name: "Treatment-related AEs — any grade", title: "Treatment-Related Adverse Events — Any Grade", level: "Moderate", direction: "harm",    studies: 11, participants: 13204, dataId: "os" },
          { id: "trae-g5",  name: "Treatment-related AEs — grade 5",   title: "Treatment-Related Adverse Events — Grade 5",   level: "Low",      direction: "neither", studies: 9,  participants: 10388, dataId: "os" },
        ],
      },
    ],
  },
];

const SENSITIVITY_TABS: OutcomeTab[] = [
  {
    id: "survival",
    label: "Survival",
    outcomes: [
      { id: "brca-pos-c1",     name: "Overall survival",          title: "Overall Survival | Sensitivity Analysis",          level: "Moderate", direction: "benefit", studies: 4, participants: 3810, dataId: "brca-pos-c1"     },
      { id: "pfs-brca-pos-c1", name: "Progression-free survival", title: "Progression-free Survival | Sensitivity Analysis", level: "Low",      direction: "benefit", studies: 4, participants: 3810, dataId: "pfs-brca-pos-c1" },
    ],
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export function MetaAnalysis() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [guideOpen, setGuideOpen] = useState(false);

  const analysisType: AnalysisType =
    searchParams.get("analysis") === "Sensitivity" ? "Sensitivity" : "Primary";

  const tabs = analysisType === "Sensitivity" ? SENSITIVITY_TABS : PRIMARY_TABS;

  const activeTab = tabs.find((t) => t.id === searchParams.get("tab")) ?? tabs[0];
  const activeGroup =
    activeTab.groups?.find((g) => g.id === searchParams.get("group")) ?? activeTab.groups?.[0];
  const outcomes = activeGroup?.outcomes ?? activeTab.outcomes ?? [];

  const activeOutcome = outcomes.find((o) => o.id === searchParams.get("outcome")) ?? outcomes[0];

  const patchParams = (patch: Record<string, string | null>) =>
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("analysis", analysisType);
      Object.entries(patch).forEach(([k, v]) => (v === null ? next.delete(k) : next.set(k, v)));
      return next;
    });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [analysisType, activeTab.id]);

  const data = MOCK_FOREST_DATA[activeOutcome.dataId] ?? MOCK_FOREST_DATA["os"];
  const accent = certaintyColor(activeOutcome.level, activeOutcome.direction);
  const tint = `color-mix(in srgb, ${accent.bg} 12%, white)`;

  return (
    <PageShell>
      {/* Main content — Figma node 9:816 */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Page header */}
        <div
          className="flex flex-col items-start px-8 pt-8 pb-4"
          style={{
            backgroundImage:
              "linear-gradient(177.26deg, rgba(133,200,250,0.15) 8.4861%, rgba(133,200,250,0) 58.303%)",
          }}
        >
          <h1 className="text-[48px] leading-[60px] font-semibold text-[#101828] font-['Benton_Modern_D',serif] pt-2">
            {analysisType} Meta-Analysis
          </h1>
          <p className="pt-4 text-[16px] leading-[26px] text-[#4a5565] font-['Inter',sans-serif] max-w-[760px] line-clamp-2">
            Results are summarized as forest plots for primary analysis, sensitivity analysis, and
            subgroup pairwise meta-analysis. Users can choose to view results for their outcome of
            interest.
          </p>

          {/* Outcome-family tabs + colour guide */}
          <div className="mt-6 flex items-end justify-between w-full max-w-[1010px] border-b border-gray-200">
            <div className="flex gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => patchParams({ tab: tab.id, group: null, outcome: null })}
                  className={cn(
                    "px-4 py-2.5 text-[13px] font-medium transition-all border-b-2 -mb-px font-['Articulat_CF',sans-serif]",
                    activeTab.id === tab.id
                      ? "border-[#2E75B5] text-[#2E75B5]"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => setGuideOpen(true)}
              className="mb-2 flex items-center gap-1.5 rounded-full border border-[#2E75B5] bg-white px-3.5 py-1.5 text-[12px] font-semibold text-[#2E75B5] font-['Inter',sans-serif] hover:bg-[#E4F0FE] transition-colors"
            >
              <Palette size={13} />
              Color guide
            </button>
          </div>
        </div>

        <div className="px-8 pt-5 pb-12 flex flex-col gap-5">
          {/* Adverse-events sub-toggle — Figma node 13:5771 */}
          {activeTab.groups && (
            <div className="inline-flex self-start rounded-full border border-gray-200 bg-gray-50 p-1">
              {activeTab.groups.map((group) => (
                <button
                  key={group.id}
                  onClick={() => patchParams({ group: group.id, outcome: null })}
                  className={cn(
                    "rounded-full px-3.5 py-1.5 text-[12px] font-medium font-['Inter',sans-serif] transition-colors",
                    activeGroup?.id === group.id
                      ? "bg-white text-[#101828] shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  {group.label}
                </button>
              ))}
            </div>
          )}

          {/* Outcome cards */}
          <div className="flex flex-wrap gap-4">
            {outcomes.map((outcome) => (
              <OutcomeSummaryCard
                key={outcome.id}
                name={outcome.name}
                level={outcome.level}
                direction={outcome.direction}
                studies={outcome.studies}
                participants={outcome.participants}
                selected={outcome.id === activeOutcome.id}
                onAction={() => patchParams({ outcome: outcome.id })}
                width={258}
              />
            ))}
          </div>

          {/* Forest plot panel, framed in the selected outcome's certainty colour */}
          <section
            className="rounded-[10px] border-2 overflow-hidden bg-white max-w-[1010px]"
            style={{ borderColor: accent.bg }}
          >
            <header
              className="flex items-center justify-between gap-4 px-4 py-2.5"
              style={{ backgroundColor: tint }}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-[0.9px] text-[#6a7282] font-['Inter',sans-serif]">
                  Now showing
                </span>
                <span className="text-[14px] font-bold text-[#101828] font-['Articulat_CF',sans-serif] truncate">
                  {activeOutcome.name}
                </span>
                <span
                  className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold shrink-0"
                  style={{ backgroundColor: `color-mix(in srgb, ${accent.bg} 18%, white)`, color: accent.bg }}
                >
                  <span className="size-[5px] rounded-full" style={{ backgroundColor: accent.bg }} />
                  {activeOutcome.level}
                </span>
              </div>
              <span className="text-[11px] text-[#6a7282] font-['Inter',sans-serif] shrink-0 tabular-nums">
                n={activeOutcome.studies} studies · {activeOutcome.participants.toLocaleString()} participants
              </span>
            </header>

            <div className="p-6">
              <ForestPlot data={{ ...data, title: activeOutcome.title }} isActive />
            </div>
          </section>
        </div>
      </div>

      <CertaintyColorGuide open={guideOpen} onClose={() => setGuideOpen(false)} />
    </PageShell>
  );
}
