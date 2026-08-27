import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { Palette } from "lucide-react";
import { PageShell } from "../components/PageShell";
import { SoFRow } from "../components/GradeTable";
import { CertaintyLevel } from "../components/CertaintyBadge";
import { OutcomeDetailView } from "../components/OutcomeDetailView";
import { OutcomeSummaryCard } from "../components/OutcomeSummaryCard";
import { CertaintyColorGuide } from "../components/CertaintyColorGuide";
import { CANONICAL_TRIAL_NAMES } from "../lib/citations";

type AnalysisType = "primary" | "sensitivity";

// The 12 named trials backing Summary Tables / citations — reused here so
// "Included Studies" links on the Overview page resolve to real records
// instead of a disconnected mock list.
const T = CANONICAL_TRIAL_NAMES;

const PRIMARY_SOF_ROWS: SoFRow[] = [
  {
    id: "os", outcome: "Overall survival", studyCount: 12, participantCount: 14832,
    relativeEffect: "HR 0.79", relativeEffectCI: "(0.71–0.88)",
    absoluteIntervention: "540 per 1,000", absoluteControl: "620 per 1,000", riskDifference: "−80 per 1,000", certainty: "High",
    direction: "benefit", includedTrialNames: T.slice(0, 12),
    heterogeneity: { i2: "21.2", tau2: "0.0041", p: "0.2828" },
    absoluteUnit: "deaths per 1,000 at 36 months",
    riskDifferenceCI: "95% CI 110 fewer to 47 fewer",
    forestDataId: "os",
    plainSummary:
      "Adding an ARPI to ADT **reduces the risk of death** — about **80 fewer deaths per 1,000 people** over three years.",
    plainCaption:
      "High certainty across 12 randomized trials and 14,832 participants. Further research is very unlikely to change confidence in this estimate.",
    domains: {
      riskOfBias:     { rating: "Not serious", details: { allEvaluated: "Yes", allLowRisk: "True", highRiskSomeConcerns: "False", subgroupPValue: "NA", percentHighRisk: "0%", algorithmDecision: "Not serious", algorithmNote: "All studies are low risk", humanDecision: "Not serious", humanNote: "Not all studies are evaluated", summary: "All 12 contributing trials were assessed with RoB 2. No trial contributed more than 14% of the pooled weight.", rationale: "No downgrade — every trial was judged low risk across all five RoB 2 domains." } },
      indirectness:   { rating: "Not serious", details: { algorithmDecision: "Not serious", algorithmNote: "Population and intervention closely match PICO", humanDecision: "Not serious", humanNote: "Confirmed by clinical review", summary: "Population, intervention and outcome definitions map directly onto the review question.", rationale: "No downgrade — the evidence answers the PICO without substitution." } },
      inconsistency:  { rating: "Not serious", details: { algorithmDecision: "Not serious", algorithmNote: "I² = 21.2%, within acceptable threshold", humanDecision: "Not serious", humanNote: "Low unexplained heterogeneity", summary: "Between-trial variation is low (I² 21.2%) and the point estimates all fall on the same side of the null.", rationale: "No downgrade — heterogeneity sits well within the pre-specified threshold." } },
      imprecision:    { rating: "Not serious", details: { algorithmDecision: "Not serious", algorithmNote: "95% CI excludes 1.0; large sample size", humanDecision: "Not serious", humanNote: "Optimal information size met", reviewerOverride: true, summary: "The 95% confidence interval excludes no effect and the optimal information size is met at 14,832 participants.", rationale: "No downgrade — a reviewer confirmed the algorithm's judgement after inspecting the interval." } },
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

  { id: "ae-any",   outcome: "All-cause AEs — any grade",         studyCount: 13, participantCount: 15640, relativeEffect: "RR 1.06", relativeEffectCI: "(1.02–1.10)", absoluteIntervention: "848 per 1,000", absoluteControl: "800 per 1,000", riskDifference: "+48 per 1,000",  certainty: "Moderate",  direction: "harm",    includedTrialNames: T.slice(0, 12), heterogeneity: { i2: "41.2", tau2: "0.0098", p: "0.0612" }, domains: { riskOfBias: { rating: "Not serious" }, indirectness: { rating: "Not serious" }, inconsistency: { rating: "Serious", details: { algorithmDecision: "Serious", algorithmNote: "I² = 41.2%, moderate heterogeneity", humanDecision: "Serious", humanNote: "Variability in reporting AE definitions" } }, imprecision: { rating: "Not serious" }, publicationBias: { rating: "Not applicable" } } },

  { id: "ae-g5",    outcome: "All-cause AEs — grade 5",           studyCount: 10, participantCount: 11820, relativeEffect: "RR 1.04", relativeEffectCI: "(0.76–1.42)", absoluteIntervention: "21 per 1,000",  absoluteControl: "20 per 1,000",  riskDifference: "+1 per 1,000",   certainty: "Low",       direction: "neither", includedTrialNames: T.slice(0, 10), heterogeneity: { i2: "52.1", tau2: "0.0201", p: "0.0241" }, domains: { riskOfBias: { rating: "Not serious" }, indirectness: { rating: "Not serious" }, inconsistency: { rating: "Serious",   details: { algorithmDecision: "Serious", algorithmNote: "I² = 52.1%, substantial heterogeneity", humanDecision: "Serious", humanNote: "Rare event; variable definitions" } }, imprecision: { rating: "Serious", details: { algorithmDecision: "Serious", algorithmNote: "CI crosses null; rare events", humanDecision: "Serious", humanNote: "Agreed" } }, publicationBias: { rating: "Not applicable" } } },

  { id: "hrqol",    outcome: "Health-related quality of life",    studyCount: 6,  participantCount: 4120,  relativeEffect: "MD 3.2 pts", relativeEffectCI: "(−1.1 to 7.5)", absoluteIntervention: "—", absoluteControl: "—", riskDifference: "—", certainty: "Very Low", direction: "neither", includedTrialNames: T.slice(0, 6), heterogeneity: { i2: "68.4", tau2: "0.0312", p: "0.0074" }, domains: { riskOfBias: { rating: "Serious", details: { allEvaluated: "No", allLowRisk: "False", highRiskSomeConcerns: "True", subgroupPValue: "NA", percentHighRisk: "33%", algorithmDecision: "Serious", algorithmNote: "Open-label designs with self-reported outcome", humanDecision: "Serious", humanNote: "Unblinded QoL reporting" } }, indirectness: { rating: "Serious", details: { algorithmDecision: "Serious", algorithmNote: "Instruments differ across trials", humanDecision: "Serious", humanNote: "Mixed QoL scales limit comparability" } }, inconsistency: { rating: "Serious", details: { algorithmDecision: "Serious", algorithmNote: "I² = 68.4%, substantial heterogeneity", humanDecision: "Serious", humanNote: "Direction of effect varies" } }, imprecision: { rating: "Serious", details: { algorithmDecision: "Serious", algorithmNote: "CI crosses no-difference threshold", humanDecision: "Serious", humanNote: "Optimal information size not met" } }, publicationBias: { rating: "Not applicable" } } },

  { id: "crr",      outcome: "Complete response",                 studyCount: 7,  participantCount: 6102,  relativeEffect: "RR 1.61", relativeEffectCI: "(1.30–1.99)", absoluteIntervention: "193 per 1,000", absoluteControl: "120 per 1,000", riskDifference: "+73 per 1,000",  certainty: "Moderate",  direction: "benefit", includedTrialNames: T.slice(0, 7),  heterogeneity: { i2: "29.3", tau2: "0.0078", p: "0.1654" }, domains: { riskOfBias: { rating: "Not serious" }, indirectness: { rating: "Not serious" }, inconsistency: { rating: "Not serious" }, imprecision: { rating: "Serious", details: { algorithmDecision: "Serious", algorithmNote: "Wide CI; fewer studies", humanDecision: "Serious", humanNote: "Small event count in some arms" } }, publicationBias: { rating: "Not applicable" } } },

  { id: "prr",      outcome: "Partial response",                  studyCount: 7,  participantCount: 6102,  relativeEffect: "RR 1.41", relativeEffectCI: "(1.18–1.68)", absoluteIntervention: "282 per 1,000", absoluteControl: "200 per 1,000", riskDifference: "+82 per 1,000",  certainty: "Moderate",  direction: "benefit", includedTrialNames: T.slice(5, 12), heterogeneity: { i2: "22.7", tau2: "0.0055", p: "0.2210" }, domains: { riskOfBias: { rating: "Not serious" }, indirectness: { rating: "Not serious" }, inconsistency: { rating: "Not serious" }, imprecision: { rating: "Serious", details: { algorithmDecision: "Serious", algorithmNote: "CI includes small benefit", humanDecision: "Serious", humanNote: "Threshold sensitivity" } }, publicationBias: { rating: "Not applicable" } } },

  { id: "ae-g3",    outcome: "All-cause AEs — grade ≥3",          studyCount: 13, participantCount: 15640, relativeEffect: "RR 1.19", relativeEffectCI: "(1.11–1.28)", absoluteIntervention: "583 per 1,000", absoluteControl: "490 per 1,000", riskDifference: "+93 per 1,000",  certainty: "Moderate",  direction: "harm",    includedTrialNames: T.slice(0, 12), heterogeneity: { i2: "18.9", tau2: "0.0044", p: "0.2801" }, domains: { riskOfBias: { rating: "Not serious" }, indirectness: { rating: "Not serious" }, inconsistency: { rating: "Not serious" }, imprecision: { rating: "Not serious" }, publicationBias: { rating: "Not applicable" } } },
];

const SENSITIVITY_SOF_ROWS: SoFRow[] = [
  { id: "pfs-composite",    outcome: "Composite PFS (overall population)",      studyCount: 8, participantCount: 9214,  relativeEffect: "HR 0.58", relativeEffectCI: "(0.50–0.67)", absoluteIntervention: "201 per 1,000", absoluteControl: "347 per 1,000", riskDifference: "−146 per 1,000", certainty: "High",     direction: "benefit", includedTrialNames: T.slice(0, 8) },
  { id: "pfs-radio-overall",outcome: "Radiographic PFS (overall population)",   studyCount: 10,participantCount: 12830, relativeEffect: "HR 0.54", relativeEffectCI: "(0.47–0.62)", absoluteIntervention: "185 per 1,000", absoluteControl: "343 per 1,000", riskDifference: "−158 per 1,000", certainty: "High",     direction: "benefit", includedTrialNames: T.slice(0, 10) },
  { id: "pfs-radio-bicr",   outcome: "Radiographic PFS (BICR)",                studyCount: 7, participantCount: 8401,  relativeEffect: "HR 0.52", relativeEffectCI: "(0.44–0.61)", absoluteIntervention: "176 per 1,000", absoluteControl: "338 per 1,000", riskDifference: "−162 per 1,000", certainty: "Moderate", direction: "benefit", includedTrialNames: T.slice(0, 7) },
  { id: "pfs-radio-inv",    outcome: "Radiographic PFS (INV)",                 studyCount: 7, participantCount: 8401,  relativeEffect: "HR 0.55", relativeEffectCI: "(0.47–0.64)", absoluteIntervention: "189 per 1,000", absoluteControl: "344 per 1,000", riskDifference: "−155 per 1,000", certainty: "Moderate", direction: "benefit", includedTrialNames: T.slice(5, 12) },
];

// ─── Certainty theming ───────────────────────────────────────────────────────
// Figma nodes 1:7705 / 1:7729 / 1:7778 — each card is tinted by its GRADE
// certainty level. Legend swatch hues come from node 1:7688.

const CERTAINTY_THEME: Record<
  CertaintyLevel,
  { bg: string; border: string; ink: string; dot: string }
> = {
  High:       { bg: "#ecfdf5", border: "#a7f3d0", ink: "#065f46", dot: "#10b981" },
  Moderate:   { bg: "#fffbeb", border: "#fde68a", ink: "#92400e", dot: "#f59e0b" },
  Low:        { bg: "#fff7ed", border: "#fed7aa", ink: "#9a3412", dot: "#f97316" },
  "Very Low": { bg: "#fef2f2", border: "#fecaca", ink: "#991b1b", dot: "#ef4444" },
};

const LEGEND_LEVELS: CertaintyLevel[] = ["High", "Moderate", "Low", "Very Low"];

/** Card face copy — the design splits some outcome names into a title plus a
 *  smaller grade qualifier (e.g. "All-cause adverse events" / "grade 5"). */


export function SummaryOfFindingsPage() {
  const [searchParams] = useSearchParams();
  const analysisType = (searchParams.get("analysis") as AnalysisType) ?? "primary";
  const [selectedRow, setSelectedRow] = useState<SoFRow | null>(null);
  const [guideOpen, setGuideOpen] = useState(false);
  // Figma node 1:7688 — "Sort by Certainty of Evidence" pills; "All" is the
  // default and the four GRADE levels narrow the card grid below.
  const [certaintyFilter, setCertaintyFilter] = useState<CertaintyLevel | "All">("All");

  const sofRows = analysisType === "primary" ? PRIMARY_SOF_ROWS : SENSITIVITY_SOF_ROWS;
  const visibleRows =
    certaintyFilter === "All" ? sofRows : sofRows.filter((r) => r.certainty === certaintyFilter);

  // Opening or closing an outcome's Overview jumps back to the top so the
  // full-height detail view (and, on back, the cards) starts in view.
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [selectedRow]);

  // Reset any open detail view when switching primary ↔ sensitivity.
  useEffect(() => {
    setSelectedRow(null);
  }, [analysisType]);

  const outcomesAssessed = sofRows.length;
  const trialsContributing = Math.max(...sofRows.map((r) => r.studyCount));
  const largestOutcome = Math.max(...sofRows.map((r) => r.participantCount));

  const stats = [
    { value: String(outcomesAssessed), label: "Outcomes assessed" },
    { value: String(trialsContributing), label: "Trials contributing" },
    { value: `n=${largestOutcome.toLocaleString()}`, label: "Largest single outcome" },
  ];

  return (
    <PageShell>
        {/* Main content — Figma node 1:7658 */}
        <div className="flex-1 flex flex-col min-w-0">
          {selectedRow ? (
            <OutcomeDetailView
              row={selectedRow}
              onBack={() => setSelectedRow(null)}
              siblings={sofRows}
              onSelectSibling={setSelectedRow}
            />
          ) : (
            <>
              {/* Page header + stats — Figma node 1:7659 */}
              <div
                className="px-8 pt-8 pb-6"
                style={{
                  backgroundImage:
                    "linear-gradient(177.26deg, rgba(133,200,250,0.15) 8.4861%, rgba(133,200,250,0) 58.303%)",
                }}
              >
                <h1 className="pt-1 text-[40px] leading-[44px] font-semibold text-[#101828] font-serif">
                  Summary of Findings
                </h1>
                <p className="pt-3 text-[16px] leading-[24px] text-[#4b5563] font-['Inter',sans-serif] w-[800px] max-w-full line-clamp-2">
                  Each card is one outcome from the GRADE Summary of Findings analysis. Card color and
                  label follow the certainty of evidence in how confident the review is in the effect
                  estimate.
                </p>

                {/* Stats — Figma node 1:7665 */}
                <div className="mt-10 flex flex-wrap gap-16 max-w-[795px]">
                  {stats.map((stat) => (
                    <div key={stat.label} className="flex flex-col items-start">
                      <span className="text-[32px] leading-[26px] font-semibold text-[#2e75b6] font-['Inter',sans-serif]">
                        {stat.value}
                      </span>
                      <span className="pt-2 text-[16px] leading-[16.5px] font-medium text-black font-['Inter',sans-serif]">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certainty filter — Figma node 1:7688 */}
              <div className="mx-8 flex flex-wrap items-center gap-3 border-b border-[#f3f4f6] pb-6 pr-8">
                <span className="text-[16px] leading-[16.5px] font-medium text-[#101828] font-['Inter',sans-serif] mr-2">
                  Sort by certainty of evidence:
                </span>

                <button
                  onClick={() => setCertaintyFilter("All")}
                  aria-pressed={certaintyFilter === "All"}
                  className={
                    "rounded-full px-4 py-1.5 text-[14px] font-bold font-['Inter',sans-serif] border transition-colors " +
                    (certaintyFilter === "All"
                      ? "bg-[#1B3A63] border-[#1B3A63] text-[#f9fafb]"
                      : "bg-white border-[#d1d5dc] text-[#101828] hover:bg-gray-50")
                  }
                >
                  All
                </button>

                {LEGEND_LEVELS.map((level) => {
                  const active = certaintyFilter === level;
                  return (
                    <button
                      key={level}
                      onClick={() => setCertaintyFilter(active ? "All" : level)}
                      aria-pressed={active}
                      className={
                        "flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[14px] font-normal font-['Inter',sans-serif] border transition-colors " +
                        (active
                          ? "border-transparent text-white"
                          : "bg-white border-[#d1d5dc] text-[#374151] hover:bg-gray-50")
                      }
                      style={active ? { backgroundColor: CERTAINTY_THEME[level].dot } : undefined}
                    >
                      <span
                        className="size-2 rounded-full shrink-0"
                        style={{ backgroundColor: active ? "#fff" : CERTAINTY_THEME[level].dot }}
                      />
                      {level}
                    </button>
                  );
                })}

                <button
                  onClick={() => setGuideOpen(true)}
                  className="ml-auto flex items-center gap-1.5 rounded-full border border-[#2E75B5] bg-white px-3.5 py-1.5 text-[16px] font-semibold text-[#2E75B5] font-['Inter',sans-serif] hover:bg-[#E4F0FE] transition-colors"
                >
                  <Palette size={16} />
                  Color guide
                </button>
              </div>

              {/* Outcome cards — Figma node 1:7704 */}
              <div className="px-8 pt-6 pb-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[30px]">
                {visibleRows.map((row) => (
                  <OutcomeSummaryCard
                    key={row.id}
                    name={row.outcome}
                    level={row.certainty}
                    direction={row.direction}
                    studies={row.studyCount}
                    participants={row.participantCount}
                    onAction={() => setSelectedRow(row)}
                  />
                ))}
              </div>
            </>
          )}
        </div>

      <CertaintyColorGuide open={guideOpen} onClose={() => setGuideOpen(false)} />
    </PageShell>
  );
}
