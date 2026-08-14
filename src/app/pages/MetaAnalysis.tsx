import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { ChevronDown, ChevronRight } from "lucide-react";
import { TopNav } from "../components/TopNav";
import { AppSidebar } from "../components/AppSidebar";
import { ForestPlot } from "../components/ForestPlot";
import { MOCK_FOREST_DATA } from "../mockData";
import { cn } from "../lib/utils";

type AnalysisType = "Primary" | "Sensitivity";

// ─── Outcome tree ─────────────────────────────────────────────────────────────
// Figma node 1:7461 ("Type of Outcomes") — a page-local outcome picker that
// sits beside the forest plot. Counts are the number of contributing studies
// and match the Summary of Findings rows for the same outcome.

interface OutcomeLeaf {
  kind: "leaf";
  id: string;
  label: string;
  count: number;
  /** Card heading shown above the forest plot. */
  title: string;
  /** Which MOCK_FOREST_DATA series backs this outcome. */
  dataId: string;
}
interface OutcomeGroup {
  kind: "group";
  label: string;
  children: OutcomeNode[];
}
type OutcomeNode = OutcomeLeaf | OutcomeGroup;

const PRIMARY_TREE: OutcomeNode[] = [
  {
    kind: "group",
    label: "Survival",
    children: [
      { kind: "leaf", id: "os",  label: "Overall",             count: 12, title: "Overall Survival (overall population)",          dataId: "os"  },
      { kind: "leaf", id: "pfs", label: "Progression-free",    count: 14, title: "Progression-free Survival (overall population)", dataId: "pfs" },
      { kind: "leaf", id: "ttp", label: "Time to progression", count: 14, title: "Time to Progression (overall population)",       dataId: "pfs" },
    ],
  },
  {
    kind: "group",
    label: "Response",
    children: [
      { kind: "leaf", id: "orr",   label: "Objective", count: 9, title: "Objective Response (overall population)", dataId: "os" },
      { kind: "leaf", id: "crr",   label: "Complete",  count: 7, title: "Complete Response (overall population)",  dataId: "os" },
      { kind: "leaf", id: "prr",   label: "Partial",   count: 7, title: "Partial Response (overall population)",   dataId: "os" },
      { kind: "leaf", id: "psa50", label: "PSA50%",    count: 7, title: "PSA50% Response (overall population)",    dataId: "os" },
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
          { kind: "leaf", id: "ae-any", label: "Any grade",         count: 13, title: "All-cause Adverse Events — any grade",        dataId: "os" },
          { kind: "leaf", id: "ae-g3",  label: "Grade 3 or higher", count: 13, title: "All-cause Adverse Events — grade 3 or higher", dataId: "os" },
          { kind: "leaf", id: "ae-g5",  label: "Grade 5",           count: 10, title: "All-cause Adverse Events — grade 5",           dataId: "os" },
        ],
      },
      {
        kind: "group",
        label: "Treatment related",
        children: [
          { kind: "leaf", id: "trae-any", label: "Any grade",         count: 11, title: "Treatment-related Adverse Events — any grade",         dataId: "os" },
          { kind: "leaf", id: "trae-g3",  label: "Grade 3 or higher", count: 11, title: "Treatment-related Adverse Events — grade 3 or higher", dataId: "os" },
          { kind: "leaf", id: "trae-g5",  label: "Grade 5",           count: 9,  title: "Treatment-related Adverse Events — grade 5",           dataId: "os" },
        ],
      },
    ],
  },
];

const SENSITIVITY_TREE: OutcomeNode[] = [
  {
    kind: "group",
    label: "Endpoint type",
    children: [
      { kind: "leaf", id: "brca-pos-c1",     label: "Overall survival",          count: 4, title: "Overall Survival (BRCA positive, cohort 1)",          dataId: "brca-pos-c1"     },
      { kind: "leaf", id: "pfs-brca-pos-c1", label: "Progression-free survival", count: 4, title: "Progression-free Survival (BRCA positive, cohort 1)", dataId: "pfs-brca-pos-c1" },
    ],
  },
];

function flattenLeaves(nodes: OutcomeNode[]): OutcomeLeaf[] {
  return nodes.flatMap((n) => (n.kind === "leaf" ? [n] : flattenLeaves(n.children)));
}

// ─── Tree rendering ───────────────────────────────────────────────────────────

function OutcomeTreeNode({
  node,
  activeId,
  onSelect,
  depth,
}: {
  node: OutcomeNode;
  activeId: string;
  onSelect: (leaf: OutcomeLeaf) => void;
  depth: number;
}) {
  const [open, setOpen] = useState(true);

  if (node.kind === "leaf") {
    const active = node.id === activeId;
    return (
      <button
        onClick={() => onSelect(node)}
        className={cn(
          "flex items-center justify-between w-full pr-2 py-2 rounded-[10px] transition-colors",
          active ? "bg-[#EFF6FF]/50" : "hover:bg-gray-50"
        )}
        style={{ paddingLeft: depth === 1 ? 32 : 48 }}
      >
        <span
          className={cn(
            "text-[13px] leading-[19.5px] font-['Articulat_CF',sans-serif] truncate text-left",
            active ? "font-semibold text-[#2E75B5]" : "text-[#6a7282]"
          )}
        >
          {node.label}
        </span>
        <span
          className={cn(
            "shrink-0 ml-2 px-1.5 py-0.5 rounded-full text-[11px] leading-[16.5px] font-medium font-['Articulat_CF',sans-serif]",
            active ? "bg-[#2E75B5]/10 text-[#2E75B5]" : "bg-[#f3f4f6] text-[#99a1af]"
          )}
        >
          {node.count}
        </span>
      </button>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 w-full pl-1 pr-2 py-2 rounded-[10px] hover:bg-gray-50 transition-colors"
        style={{ paddingLeft: depth === 0 ? 4 : 20 }}
      >
        <span className="shrink-0 text-[#101828]">
          {open ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </span>
        <span
          className={cn(
            "flex-1 text-left font-semibold font-['Articulat_CF',sans-serif] text-[#101828] truncate",
            depth === 0 ? "text-[15px] leading-[22.5px]" : "text-[13px] leading-[19.5px]"
          )}
        >
          {node.label}
        </span>
      </button>
      {open && (
        <div className="flex flex-col w-full">
          {node.children.map((child) => (
            <OutcomeTreeNode
              key={child.kind === "leaf" ? child.id : child.label}
              node={child}
              activeId={activeId}
              onSelect={onSelect}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function MetaAnalysis() {
  const [searchParams, setSearchParams] = useSearchParams();

  const analysisType: AnalysisType =
    searchParams.get("analysis") === "Sensitivity" ? "Sensitivity" : "Primary";

  const tree = analysisType === "Sensitivity" ? SENSITIVITY_TREE : PRIMARY_TREE;
  const leaves = flattenLeaves(tree);

  const outcomeParam = searchParams.get("outcome");
  const activeLeaf = leaves.find((l) => l.id === outcomeParam) ?? leaves[0];

  const selectOutcome = (leaf: OutcomeLeaf) =>
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("analysis", analysisType);
      next.set("outcome", leaf.id);
      return next;
    });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [analysisType, activeLeaf.id]);

  const data = MOCK_FOREST_DATA[activeLeaf.dataId] ?? MOCK_FOREST_DATA["os"];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <TopNav />

      <div className="flex flex-1 min-h-0">
        <AppSidebar />

        {/* Main content — Figma node 1:7450 */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Page header — Figma node 1:7453 */}
          <div
            className="flex flex-col items-start p-8"
            style={{
              backgroundImage:
                "linear-gradient(177.26deg, rgba(133,200,250,0.15) 8.4861%, rgba(133,200,250,0) 58.303%)",
            }}
          >
            <h1 className="text-[48px] leading-[60px] font-semibold text-[#101828] font-['Benton_Modern_D',serif] pt-2">
              {analysisType} Meta-Analysis
            </h1>
            <p className="pt-4 text-[16px] leading-[26px] text-[#4a5565] font-['Inter',sans-serif] max-w-[1153px]">
              Results are summarized as forest plots for primary analysis, sensitivity analysis, and
              subgroup pairwise meta-analysis. Users can choose to view results for their outcome of
              interest.
            </p>
          </div>

          {/* Outcome picker + forest plot — Figma node 1:7460 */}
          <div className="flex items-start gap-4 px-8 pb-12 pt-5">
            {/* Type of Outcomes — Figma node 1:7461 */}
            <aside className="w-[217px] shrink-0">
              <p className="px-3 text-[11px] leading-[16.5px] font-bold uppercase tracking-[1.1645px] text-[#6a7282] font-['Inter',sans-serif]">
                Type of Outcomes
              </p>
              <div className="mt-2 flex flex-col px-3">
                {tree.map((node) => (
                  <OutcomeTreeNode
                    key={node.kind === "leaf" ? node.id : node.label}
                    node={node}
                    activeId={activeLeaf.id}
                    onSelect={selectOutcome}
                    depth={0}
                  />
                ))}
              </div>
            </aside>

            {/* Forest plot card — Figma node 1:7574 */}
            <section className="flex-1 min-w-0 rounded-[14px] border border-[#e5e7eb] bg-white p-6">
              <ForestPlot data={{ ...data, title: activeLeaf.title }} isActive />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
