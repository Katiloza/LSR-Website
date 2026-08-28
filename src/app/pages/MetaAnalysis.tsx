import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { PageShell } from "../components/PageShell";
import { ForestPlot } from "../components/ForestPlot";
import { OutcomeTreePanel, TreeGroup } from "../components/OutcomeTreePanel";
import { MOCK_FOREST_DATA } from "../mockData";
import { cn } from "../lib/utils";

type AnalysisType = "Primary" | "Sensitivity";

// ─── Outcome taxonomy ─────────────────────────────────────────────────────────
// Figma nodes 9:816 (Primary) and 13:5771 (Sensitivity).
//
// The tab bar / certainty-card row is gone. The whole outcome taxonomy now
// lives in a persistent left rail, and the main column stacks a forest-plot
// card for every outcome the selected node resolves to.

interface Leaf {
  id: string;
  label: string;
  count: number;
  /** Card heading when the leaf *is* the outcome. */
  title?: string;
  /** Which MOCK_FOREST_DATA series backs it. */
  dataId?: string;
}

interface Group extends TreeGroup {
  items?: Leaf[];
  subGroups?: { id: string; label: string; items: Leaf[] }[];
  /**
   * Sensitivity groups slice the *same* outcomes by subgroup, so one leaf
   * yields several cards. Primary leaves carry their own title instead.
   */
  outcomes?: { name: string; dataId: string }[];
}

const PRIMARY_GROUPS: Group[] = [
  {
    id: "survival",
    label: "Survival",
    items: [
      { id: "os",  label: "Overall",             count: 12, title: "Overall Survival",          dataId: "os"  },
      { id: "pfs", label: "Progression-free",    count: 14, title: "Progression Free Survival", dataId: "pfs" },
      { id: "ttp", label: "Time to progression", count: 14, title: "Time to Progression",       dataId: "pfs" },
    ],
  },
  {
    id: "response",
    label: "Response",
    items: [
      { id: "orr",   label: "Objective", count: 9, title: "Objective Response", dataId: "os" },
      { id: "crr",   label: "Complete",  count: 7, title: "Complete Response",  dataId: "os" },
      { id: "prr",   label: "Partial",   count: 7, title: "Partial Response",   dataId: "os" },
      { id: "psa50", label: "PSA50%",    count: 7, title: "PSA50% Response",    dataId: "os" },
    ],
  },
  {
    id: "adverse-events",
    label: "Adverse events",
    subGroups: [
      {
        id: "all-cause",
        label: "All-cause",
        items: [
          { id: "ae-any", label: "Any grade",         count: 13, title: "All-Cause Adverse Events — Any Grade",         dataId: "os" },
          { id: "ae-g3",  label: "Grade 3 or higher", count: 13, title: "All-Cause Adverse Events — Grade 3 or Higher", dataId: "os" },
          { id: "ae-g5",  label: "Grade 5",           count: 10, title: "All-Cause Adverse Events — Grade 5",           dataId: "os" },
        ],
      },
      {
        id: "treatment-related",
        label: "Treatment related",
        items: [
          { id: "trae-any", label: "Any grade",         count: 11, title: "Treatment-Related Adverse Events — Any Grade",         dataId: "os" },
          { id: "trae-g3",  label: "Grade 3 or higher", count: 11, title: "Treatment-Related Adverse Events — Grade 3 or Higher", dataId: "os" },
          { id: "trae-g5",  label: "Grade 5",           count: 9,  title: "Treatment-Related Adverse Events — Grade 5",           dataId: "os" },
        ],
      },
    ],
  },
];

/** Every subgroup below reports the same two survival outcomes. */
const SUBGROUP_OUTCOMES = [
  { name: "Overall Survival",          dataId: "brca-pos-c1"     },
  { name: "Progression Free Survival", dataId: "pfs-brca-pos-c1" },
];

const SENSITIVITY_GROUPS: Group[] = [
  {
    id: "brca-status",
    label: "BRCA status",
    outcomes: SUBGROUP_OUTCOMES,
    items: [
      { id: "brca-pos-c1",  label: "BRCA positive (cohort 1)",  count: 12 },
      { id: "brca-pos-c2",  label: "BRCA positive (cohort 2)",  count: 14 },
      { id: "brca-neg-c1",  label: "BRCA negative (cohort 1)",  count: 14 },
      { id: "brca-neg-c2",  label: "BRCA negative (cohort 2)",  count: 14 },
      { id: "brca1-pos-c2", label: "BRCA1 positive (cohort 2)", count: 14 },
      { id: "brca2-pos-c2", label: "BRCA2 positive (cohort 2)", count: 14 },
    ],
  },
  {
    id: "hrr-status",
    label: "HRR status",
    outcomes: SUBGROUP_OUTCOMES,
    items: [
      { id: "hrr-pos-c1", label: "HRR positive (cohort 1)", count: 9 },
      { id: "hrr-pos-c2", label: "HRR positive (cohort 2)", count: 9 },
      { id: "hrr-neg-c1", label: "HRR negative (cohort 1)", count: 9 },
    ],
  },
  {
    id: "other-gene-mutations",
    label: "Other gene mutations (cohort 2)",
    outcomes: SUBGROUP_OUTCOMES,
    items: [
      { id: "atm-pos",   label: "ATM positive",   count: 9 },
      { id: "cdk12-pos", label: "CDK12 positive", count: 9 },
      { id: "chek2-pos", label: "CHEK2 positive", count: 9 },
      { id: "palb2-pos", label: "PALB2 positive", count: 9 },
    ],
  },
  {
    id: "gleason-score",
    label: "Gleason score",
    outcomes: SUBGROUP_OUTCOMES,
    items: [
      { id: "gleason-lt8", label: "Gleason score <8", count: 9 },
      { id: "gleason-gt8", label: "Gleason score >8", count: 9 },
    ],
  },
  {
    id: "metastatic-burden",
    label: "Metastatic burden",
    outcomes: SUBGROUP_OUTCOMES,
    items: [
      { id: "visceral",       label: "Viceral metastases",              count: 9 },
      { id: "no-visceral",    label: "No viceral metastases",           count: 9 },
      { id: "measurable",     label: "Measurable disease at baseline",    count: 9 },
      { id: "no-measurable",  label: "No measurable disease at baseline", count: 9 },
    ],
  },
  {
    id: "patient-factors",
    label: "Patient factors",
    outcomes: SUBGROUP_OUTCOMES,
    items: [
      { id: "age-lt70",  label: "Age <70",     count: 9 },
      { id: "age-gt70",  label: "Age >70",     count: 9 },
      { id: "ecog-0-1",  label: "ECOG PS 0–1", count: 9 },
      { id: "ecog-2",    label: "ECOG PS 2",   count: 9 },
    ],
  },
  {
    id: "endpoint-type",
    label: "Endpoint type",
    items: [
      { id: "rpfs-overall", label: "Radiographic PFS (overall population)", count: 9, title: "Radiographic PFS (overall population)", dataId: "pfs-brca-pos-c1" },
      { id: "rpfs-bicr",    label: "Radiographic PFS (BICR)",              count: 9, title: "Radiographic PFS (BICR)",              dataId: "pfs-brca-pos-c1" },
      { id: "rpfs-inv",     label: "Radiographic PFS (INV)",               count: 9, title: "Radiographic PFS (INV)",               dataId: "pfs-brca-pos-c1" },
      { id: "cpfs-overall", label: "Composite PFS (overall population)",   count: 9, title: "Composite PFS (overall population)",   dataId: "pfs-brca-pos-c1" },
    ],
  },
];

/** "BRCA positive (cohort 1)" → "BRCA positive, cohort 1" — Figma node 35:1729. */
const asQualifier = (label: string) => label.replace(/\s*\(([^)]*)\)\s*$/, ", $1");

// "Sort by:" pill row — Figma node 43:719, Sensitivity Meta-Analysis only.
// Every subgroup leaf reports both survival outcomes as separate stacked
// cards (SUBGROUP_OUTCOMES); this lets the reader narrow the comparison down
// to just one of them instead of scrolling past both. Display label differs
// slightly in casing from the data's "Progression Free Survival" — matched
// to the Figma copy exactly, filtering still keys off the outcome name.
const SORT_OPTIONS: { key: string; label: string }[] = [
  { key: "all", label: "All" },
  { key: "Overall Survival", label: "Overall Survival" },
  { key: "Progression Free Survival", label: "Progression free survival" },
];

function SortByRow({ value, onChange }: { value: string; onChange: (key: string) => void }) {
  return (
    <div className="flex items-center gap-3 pb-6 border-b border-[#f3f4f6]">
      <p className="text-[16px] font-medium text-black font-['Inter',sans-serif] whitespace-nowrap">Sort by:</p>
      {SORT_OPTIONS.map((opt) => {
        const active = value === opt.key;
        return (
          <button
            key={opt.key}
            type="button"
            onClick={() => onChange(opt.key)}
            aria-pressed={active}
            className={cn(
              "px-2 py-1 rounded-full text-[14px] whitespace-nowrap transition-colors font-['Inter',sans-serif]",
              active
                ? "bg-[#1e3a7a] text-[#f9fafb] font-bold"
                : "border border-[#2E75B5] text-[#374151] font-medium hover:bg-[#F3F8FE]"
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function flatten(groups: Group[]) {
  const leaves: { leaf: Leaf; group: Group }[] = [];
  groups.forEach((group) => {
    group.items?.forEach((leaf) => leaves.push({ leaf: leaf as Leaf, group }));
    group.subGroups?.forEach((sub) =>
      sub.items.forEach((leaf) => leaves.push({ leaf: leaf as Leaf, group }))
    );
  });
  return leaves;
}

function allNodeIds(groups: Group[]) {
  const ids: string[] = [];
  groups.forEach((g) => {
    ids.push(g.id);
    g.subGroups?.forEach((s) => ids.push(s.id));
  });
  return ids;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function MetaAnalysis() {
  const [searchParams, setSearchParams] = useSearchParams();

  const analysisType: AnalysisType =
    searchParams.get("analysis") === "Sensitivity" ? "Sensitivity" : "Primary";

  const groups = analysisType === "Sensitivity" ? SENSITIVITY_GROUPS : PRIMARY_GROUPS;
  const leaves = useMemo(() => flatten(groups), [groups]);

  // Tree starts fully collapsed so the rail reads as a compact outline.
  const [collapsed, setCollapsed] = useState<Set<string>>(() => new Set(allNodeIds(groups)));
  const [panelOpen, setPanelOpen] = useState(true);

  const selectedId = searchParams.get("outcome") ?? leaves[0].leaf.id;
  const selected = leaves.find((l) => l.leaf.id === selectedId) ?? leaves[0];

  const selectOutcome = (id: string) =>
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("analysis", analysisType);
      next.set("outcome", id);
      return next;
    });

  // Switching Primary ↔ Sensitivity resets the tree to fully collapsed and scrolls to top.
  useEffect(() => {
    setCollapsed(new Set(allNodeIds(groups)));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [analysisType]);

  const toggleNode = (id: string) =>
    setCollapsed((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  // The cards to stack: subgroup leaves fan out into one card per outcome,
  // a self-contained leaf renders a single card.
  const cards = useMemo(() => {
    const { leaf, group } = selected;
    if (group.outcomes) {
      return group.outcomes.map((outcome) => ({
        key: `${leaf.id}-${outcome.dataId}`,
        title: `${outcome.name} (${asQualifier(leaf.label)})`,
        dataId: outcome.dataId,
        outcomeName: outcome.name,
      }));
    }
    return [
      {
        key: leaf.id,
        title:
          analysisType === "Primary"
            ? `${leaf.title ?? leaf.label} (overall population)`
            : leaf.title ?? leaf.label,
        dataId: leaf.dataId ?? "os",
        outcomeName: undefined as string | undefined,
      },
    ];
  }, [selected, analysisType]);

  // "Sort by:" (Figma node 43:719) — only meaningful when a leaf yields
  // multiple outcome cards; resets to "All" on every new selection.
  const [sortFilter, setSortFilter] = useState("all");
  useEffect(() => { setSortFilter("all"); }, [selected.leaf.id]);

  const showSortBy = analysisType === "Sensitivity" && !!selected.group.outcomes;
  const visibleCards = showSortBy && sortFilter !== "all"
    ? cards.filter((c) => c.outcomeName === sortFilter)
    : cards;

  return (
    <PageShell>
      {/* Main content — Figma node 9:816 */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Page header — Figma node 9:822 */}
        <div
          className="flex flex-col items-start px-8 pt-8 pb-4"
          style={{
            backgroundImage:
              "linear-gradient(177.26deg, rgba(133,200,250,0.15) 8.4861%, rgba(133,200,250,0) 58.303%)",
          }}
        >
          <h1 className="pt-2 font-serif text-[40px] leading-[60px] font-semibold text-[#101828]">
            {analysisType} Meta-Analysis
          </h1>
          <p className="max-w-[760px] pt-4 font-['Inter',sans-serif] text-[16px] leading-[26px] text-[#364153] line-clamp-2">
            Results are summarized as forest plots for primary analysis, sensitivity analysis, and
            subgroup pairwise meta-analysis.
          </p>
        </div>

        {/* Outcome rail + stacked forest-plot cards — Figma node 35:1598 */}
        <div className="flex min-w-0 items-start gap-4 px-8 pb-12">
          <OutcomeTreePanel
            groups={groups}
            selectedId={selected.leaf.id}
            onSelect={selectOutcome}
            collapsed={collapsed}
            onToggle={toggleNode}
            onCollapseAll={() => setCollapsed(new Set(allNodeIds(groups)))}
            onExpandAll={() => setCollapsed(new Set())}
            panelOpen={panelOpen}
            onTogglePanel={() => setPanelOpen((o) => !o)}
          />

          <div className="flex min-w-0 flex-1 flex-col gap-8 pt-5">
            {showSortBy && <SortByRow value={sortFilter} onChange={setSortFilter} />}
            {visibleCards.map((card) => {
              const data = MOCK_FOREST_DATA[card.dataId] ?? MOCK_FOREST_DATA["os"];
              return (
                <section
                  key={card.key}
                  className="rounded-[14px] border border-[#f3f4f6] bg-white p-6"
                >
                  <ForestPlot data={{ ...data, id: card.key, title: card.title }} isActive />
                </section>
              );
            })}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
