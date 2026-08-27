import React, { useState, useMemo, useEffect, useRef } from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import { cn } from "../lib/utils";
import { COLUMN_SCHEMA, ColNode } from "../lib/summaryColumns";
import { useCitation } from "../lib/CitationContext";

export type { ColNode } from "../lib/summaryColumns";
export { COLUMN_SCHEMA } from "../lib/summaryColumns";

// ─── Data row ─────────────────────────────────────────────────────────────────

export interface StudyRow {
  id: string;
  nct: string;
  study: string;
  year: number;
  trialName: string;
  treatment: string;
  control: string;
  lineOfTherapy: "First-line" | "Second-line" | "Third-line or later";
  phase: "Phase II" | "Phase III";
  n: number;
  therapyType: "Monotherapy" | "Combination";
  treatmentClass: "NHT" | "Chemotherapy" | "PARPi" | "PSMA" | "Other";
  primaryEndpoint: string;
  hrOs?: string;
  hrPfs?: string;
  orr?: string;
}

// ─── Schema helpers ───────────────────────────────────────────────────────────

const isLeaf = (n: ColNode) => !n.children || n.children.length === 0;

function collectLeaves(nodes: ColNode[]): ColNode[] {
  return nodes.flatMap((n) => (isLeaf(n) ? [n] : collectLeaves(n.children!)));
}

export const ALL_LEAVES = collectLeaves(COLUMN_SCHEMA);
export const ALL_LEAF_KEYS = ALL_LEAVES.map((l) => l.key);

/** Every leaf key beneath a node (the node itself if it is a leaf). */
export function descendantLeafKeys(node: ColNode): string[] {
  return isLeaf(node) ? [node.key] : collectLeaves(node.children!).map((l) => l.key);
}

// ─── Well-known column keys (curated mock data + special formatting) ──────────

const K_NCT = "trial_characteristics.nct";
const K_TRIALNAME = "trial_characteristics.trial_name";
const K_AUTHOR = "trial_characteristics.author";
const K_YEAR = "trial_characteristics.year";
const K_PHASE = "trial_characteristics.phase";

const STICKY_KEYS = new Set([K_NCT, K_TRIALNAME]);
const STICKY_WIDTH: Record<string, number> = { [K_NCT]: 132, [K_TRIALNAME]: 156 };

// Mock cell values — a handful of realistic columns; everything else renders "N/A".
const MOCK_VALUE: Record<string, (r: StudyRow) => string | number> = {
  [K_NCT]: (r) => r.nct,
  [K_TRIALNAME]: (r) => r.trialName,
  [K_AUTHOR]: (r) => r.study,
  [K_YEAR]: (r) => r.year,
  [K_PHASE]: (r) => r.phase,
  "trial_characteristics.total_participants_n": (r) => r.n,
  "trial_characteristics.n.treatment": (r) => Math.round(r.n / 2),
  "trial_characteristics.n.control": (r) => r.n - Math.round(r.n / 2),
  "trial_characteristics.line_of_therapy": (r) => r.lineOfTherapy,
  "trial_characteristics.type_of_therapy": (r) => r.therapyType,
  "trial_characteristics.treatment_class": (r) => r.treatmentClass,
  "trial_characteristics.treatment": (r) => r.treatment,
  "trial_characteristics.control": (r) => r.control,
  // a few outcome synths so the wide table isn't entirely N/A
  "outcomes.median_os_mo.overall.treatment": (r) => `${28 + ((parseInt(r.id, 10) * 3) % 12)}`,
  "outcomes.median_os_mo.overall.control": (r) => `${19 + ((parseInt(r.id, 10) * 2) % 9)}`,
  "outcomes.no_of_deaths.overall.overall.treatment": (r) => Math.round(r.n * 0.28),
  "outcomes.no_of_deaths.overall.overall.control": (r) => Math.round(r.n * 0.34),
  "outcomes.orr_n_treatment.overall": (r) => `${45 + ((parseInt(r.id, 10) * 7) % 25)}%`,
  "outcomes.orr_n_control.overall": (r) => `${22 + ((parseInt(r.id, 10) * 5) % 15)}%`,
};

function cellValue(node: ColNode, row: StudyRow): string | number {
  const fn = MOCK_VALUE[node.key];
  return fn ? fn(row) : "N/A";
}

// ─── Depth → level color (header cells only) ──────────────────────────────────
// L0 category · L1 main · L2 sub · L3 sub-sub · L4 sub-sub-sub.
// Neutral monochrome slate ramp (darkest → lightest) so depth is still legible
// at a glance without the header competing for attention with the data below —
// usability feedback flagged the earlier rainbow scheme as too loud.
export const LEVEL_COLORS = [
  "#1E293B", // L0 — slate-800 (overarching category band)
  "#334155", // L1 — slate-700 (main column category)
  "#475569", // L2 — slate-600 (subcolumn)
  "#64748B", // L3 — slate-500 (sub-subcolumn)
  "#94A3B8", // L4 — slate-400 (sub-sub-subcolumn)
];
const levelColor = (depth: number) => LEVEL_COLORS[Math.min(depth - 1, LEVEL_COLORS.length - 1)];

// ─── Pruned tree ──────────────────────────────────────────────────────────────

interface PrunedNode {
  node: ColNode;
  depth: number; // 1-based (category = 1)
  leafCount: number;
  children: PrunedNode[];
}

function buildPruned(node: ColNode, checked: Set<string>, depth: number): PrunedNode | null {
  if (isLeaf(node)) {
    return checked.has(node.key) ? { node, depth, leafCount: 1, children: [] } : null;
  }
  const children = node
    .children!.map((c) => buildPruned(c, checked, depth + 1))
    .filter((c): c is PrunedNode => c !== null);
  if (children.length === 0) return null;
  return { node, depth, leafCount: children.reduce((s, c) => s + c.leafCount, 0), children };
}

const nodeMaxDepth = (pn: PrunedNode): number =>
  pn.children.length === 0 ? pn.depth : Math.max(...pn.children.map(nodeMaxDepth));

function flattenPrunedLeaves(pruned: PrunedNode[]): PrunedNode[] {
  const out: PrunedNode[] = [];
  const walk = (pn: PrunedNode) => (pn.children.length === 0 ? out.push(pn) : pn.children.forEach(walk));
  pruned.forEach(walk);
  return out;
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface SummaryTableProps {
  rows: StudyRow[];
  activeFilters: Record<string, string[]>;
  highlightId?: string;
  checkedLeafKeys: Set<string>;
}

type SortDir = "asc" | "desc" | null;

function rowMatchesHighlight(row: StudyRow, hlId: string) {
  return (
    row.trialName === hlId ||
    row.treatmentClass === hlId ||
    row.lineOfTherapy === hlId ||
    row.treatment.includes(hlId)
  );
}

const FILTER_KEY_MAP: Record<string, keyof StudyRow> = {
  therapy: "therapyType",
  line: "lineOfTherapy",
};

export function SummaryTable({ rows, activeFilters, highlightId, checkedLeafKeys }: SummaryTableProps) {
  const hlRef = useRef<HTMLTableRowElement | null>(null);
  const { openCitation } = useCitation();

  useEffect(() => {
    if (highlightId && hlRef.current) {
      hlRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [highlightId]);

  const [sortKey, setSortKey] = useState<string | null>(K_YEAR);
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const { headerRows, leaves, maxDepth, stickyLeft, stickyTotal, lastStickyKey } = useMemo(() => {
    const checked = checkedLeafKeys ?? new Set<string>();
    const pruned = COLUMN_SCHEMA
      .map((n) => buildPruned(n, checked, 1))
      .filter((p): p is PrunedNode => p !== null);

    const depth = pruned.length ? Math.max(...pruned.map(nodeMaxDepth)) : 0;

    const matrix: PrunedNode[][] = Array.from({ length: depth }, () => []);
    const walk = (pn: PrunedNode) => {
      matrix[pn.depth - 1].push(pn);
      pn.children.forEach(walk);
    };
    pruned.forEach(walk);

    const leafList = flattenPrunedLeaves(pruned);

    const left: Record<string, number> = {};
    let acc = 0;
    let lastSticky: string | null = null;
    for (const l of leafList) {
      if (STICKY_KEYS.has(l.node.key)) {
        left[l.node.key] = acc;
        acc += STICKY_WIDTH[l.node.key];
        lastSticky = l.node.key;
      }
    }

    return { headerRows: matrix, leaves: leafList, maxDepth: depth, stickyLeft: left, stickyTotal: acc, lastStickyKey: lastSticky };
  }, [checkedLeafKeys]);

  const filteredRows = useMemo(() => {
    return rows.filter((row) =>
      Object.entries(activeFilters).every(([key, values]) => {
        if (!values.length) return true;
        const rowKey = (FILTER_KEY_MAP[key] ?? key) as keyof StudyRow;
        return values.includes(String(row[rowKey] ?? ""));
      })
    );
  }, [rows, activeFilters]);

  const sortedRows = useMemo(() => {
    if (!sortKey || !sortDir) return filteredRows;
    return [...filteredRows].sort((a, b) => {
      const av = cellValue({ key: sortKey } as ColNode, a);
      const bv = cellValue({ key: sortKey } as ColNode, b);
      // push N/A to the end regardless of direction
      const aNA = av === "N/A";
      const bNA = bv === "N/A";
      if (aNA && bNA) return 0;
      if (aNA) return 1;
      if (bNA) return -1;
      let cmp: number;
      if (typeof av === "number" && typeof bv === "number") cmp = av - bv;
      else cmp = String(av).localeCompare(String(bv), undefined, { numeric: true });
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [filteredRows, sortKey, sortDir]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : d === "desc" ? null : "asc"));
      if (sortDir === null) setSortKey(null);
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const SortIcon = ({ colKey }: { colKey: string }) => {
    if (sortKey !== colKey) return <ChevronsUpDown size={12} className="text-white/40" />;
    if (sortDir === "asc") return <ChevronUp size={12} className="text-white" />;
    if (sortDir === "desc") return <ChevronDown size={12} className="text-white" />;
    return <ChevronsUpDown size={12} className="text-white/40" />;
  };

  const stickyBodyStyle = (node: ColNode, bg: string): React.CSSProperties | undefined => {
    if (!STICKY_KEYS.has(node.key)) return undefined;
    const width = STICKY_WIDTH[node.key];
    return {
      position: "sticky",
      left: stickyLeft[node.key],
      width,
      minWidth: width,
      maxWidth: width,
      background: bg,
      zIndex: 20,
      boxShadow: node.key === lastStickyKey ? "2px 0 5px -2px rgba(16,24,40,0.15)" : undefined,
    };
  };

  const renderCell = (node: ColNode, row: StudyRow) => {
    const val = cellValue(node, row);
    if (val === "N/A") return <span className="text-gray-300">N/A</span>;
    if (node.key === K_TRIALNAME)
      return <span className="font-semibold text-[#2E75B5] group-hover:underline">{String(val)}</span>;
    if (node.key === K_AUTHOR) return <span className="font-medium text-gray-900">{String(val)}</span>;
    if (node.key === K_NCT) return <span className="font-mono text-[11px] text-gray-500">{String(val)}</span>;
    if (node.key === K_PHASE)
      return (
        <span
          className={cn(
            "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold",
            val === "Phase III" ? "bg-blue-50 text-[#2E75B5]" : "bg-gray-100 text-gray-500"
          )}
        >
          {String(val)}
        </span>
      );
    if (node.key === "trial_characteristics.treatment_class")
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 text-indigo-600">
          {String(val)}
        </span>
      );
    return String(val);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-[13px] text-gray-500 font-['Inter',sans-serif]">
          {sortedRows.length} of {rows.length} studies
        </span>
        <span className="text-[12px] text-gray-400 font-['Inter',sans-serif]">
          {leaves.length} columns · scroll horizontally →
        </span>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="text-[12px] font-['Inter',sans-serif] border-collapse">
          <caption className="sr-only">
            Summary of included studies in the mCRPC living systematic review
          </caption>

          {/* Hierarchical, color-coded header — one <tr> per depth level */}
          <thead>
            {headerRows.map((rowNodes, ri) => (
              <tr key={ri}>
                {rowNodes.map((pn) => {
                  const bg = levelColor(pn.depth);
                  const leaf = pn.children.length === 0;
                  if (!leaf) {
                    // internal grouping node → span its visible leaves; label only
                    const isCategory = pn.depth === 1;
                    return (
                      <th
                        key={pn.node.key}
                        colSpan={pn.leafCount}
                        scope="colgroup"
                        className="px-3 py-2 text-left whitespace-nowrap font-semibold text-white text-[11px] leading-[16.5px] tracking-[0.275px] border-r border-white/15"
                        style={{ background: bg }}
                      >
                        {isCategory ? (
                          // Category label pins past the sticky-left columns, then
                          // scrolls out as the next category enters.
                          <span
                            className="inline-block"
                            style={{ position: "sticky", left: stickyTotal + 12 }}
                          >
                            {pn.node.label}
                          </span>
                        ) : (
                          pn.node.label
                        )}
                      </th>
                    );
                  }
                  // leaf node → span remaining rows; carries the sort control
                  return (
                    <th
                      key={pn.node.key}
                      rowSpan={maxDepth - pn.depth + 1}
                      scope="col"
                      onClick={() => handleSort(pn.node.key)}
                      className="px-4 py-2 text-left align-bottom font-semibold text-white tracking-[0.25px] text-[10px] leading-[15px] cursor-pointer select-none whitespace-nowrap border-r border-white/15"
                      style={
                        STICKY_KEYS.has(pn.node.key)
                          ? {
                              position: "sticky",
                              left: stickyLeft[pn.node.key],
                              width: STICKY_WIDTH[pn.node.key],
                              minWidth: STICKY_WIDTH[pn.node.key],
                              maxWidth: STICKY_WIDTH[pn.node.key],
                              background: bg,
                              zIndex: 30,
                              boxShadow: pn.node.key === lastStickyKey ? "2px 0 5px -2px rgba(16,24,40,0.25)" : undefined,
                            }
                          : { background: bg }
                      }
                    >
                      <div className="flex items-center gap-1">
                        {pn.node.label}
                        <SortIcon colKey={pn.node.key} />
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody>
            {leaves.length === 0 ? (
              <tr>
                <td className="text-center py-16 text-gray-400 text-[13px]">Select at least one column from the sidebar.</td>
              </tr>
            ) : sortedRows.length === 0 ? (
              <tr>
                <td colSpan={leaves.length} className="text-center py-16 text-gray-400 text-[13px]">
                  No studies match the active filters.
                </td>
              </tr>
            ) : (
              sortedRows.map((row, i) => {
                const isHl = !!highlightId && rowMatchesHighlight(row, highlightId);
                const rowBg = isHl ? "#E4F0FE" : i % 2 === 0 ? "#ffffff" : "#fafafa";
                return (
                  <tr
                    key={row.id}
                    ref={isHl && !hlRef.current ? (el) => { hlRef.current = el; } : undefined}
                    role="button"
                    tabIndex={0}
                    aria-label={`View study record for ${row.trialName}`}
                    onClick={() => openCitation(row.trialName)}
                    onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openCitation(row.trialName); } }}
                    className={cn(
                      "group border-b border-gray-50 transition-all hover:bg-blue-50/30 cursor-pointer focus:outline-none focus:bg-blue-50/40",
                      isHl && "ring-2 ring-inset ring-[#2E75B5]/30 animate-[highlight-fade_2.5s_ease-in-out_forwards]"
                    )}
                    style={{ background: rowBg }}
                  >
                    {leaves.map((pn) => (
                      <td
                        key={pn.node.key}
                        className="px-4 py-3 text-gray-700 whitespace-nowrap border-r border-gray-50"
                        style={stickyBodyStyle(pn.node, rowBg)}
                      >
                        {renderCell(pn.node, row)}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
