import React, { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import { Search, ArrowUpRight, FileText, Table, BarChart2, Layers, GitBranch } from "lucide-react";
import { cn } from "../lib/utils";

interface SearchItem {
  id: string;
  label: string;
  sublabel?: string;
  category: string;
  categoryIcon: React.ElementType;
  to: string;
  highlightId?: string; // matched against data-hl attributes on destination page
}

const ALL_ITEMS: SearchItem[] = [
  // PRISMA
  { id: "prisma-current",   label: "Current State",    sublabel: "PRISMA flowchart — living review",         category: "PRISMA",            categoryIcon: GitBranch, to: "/prisma?view=current-state" },
  { id: "prisma-initial",   label: "Initial Search",   sublabel: "PRISMA flowchart — inception search",      category: "PRISMA",            categoryIcon: GitBranch, to: "/prisma?view=initial-search" },
  { id: "prisma-living",    label: "Living Search",    sublabel: "Monthly automated search heatmap",         category: "PRISMA",            categoryIcon: GitBranch, to: "/prisma?view=living-search" },
  { id: "prisma-propel",    label: "PROpel",           sublabel: "Olaparib + Abiraterone — included study",  category: "PRISMA",            categoryIcon: GitBranch, to: "/prisma?view=current-state", highlightId: "PROpel" },
  { id: "prisma-talapro",   label: "TALAPRO-2",        sublabel: "Talazoparib + Enzalutamide",               category: "PRISMA",            categoryIcon: GitBranch, to: "/prisma?view=current-state", highlightId: "TALAPRO-2" },
  { id: "prisma-magnitude", label: "MAGNITUDE",        sublabel: "Niraparib + Abiraterone",                  category: "PRISMA",            categoryIcon: GitBranch, to: "/prisma?view=current-state", highlightId: "MAGNITUDE" },
  { id: "prisma-vision",    label: "VISION",           sublabel: "177Lu-PSMA-617 + SoC",                     category: "PRISMA",            categoryIcon: GitBranch, to: "/prisma?view=current-state", highlightId: "VISION" },
  { id: "prisma-card",      label: "CARD",             sublabel: "Cabazitaxel vs Abiraterone/Enzalutamide",  category: "PRISMA",            categoryIcon: GitBranch, to: "/prisma?view=current-state", highlightId: "CARD" },
  { id: "prisma-profound",  label: "PROfound",         sublabel: "Olaparib vs Enzalutamide/Abiraterone",     category: "PRISMA",            categoryIcon: GitBranch, to: "/prisma?view=current-state", highlightId: "PROfound" },
  { id: "prisma-triton3",   label: "TRITON3",          sublabel: "Rucaparib — BRCA1/2 mCRPC",               category: "PRISMA",            categoryIcon: GitBranch, to: "/prisma?view=current-state", highlightId: "TRITON3" },

  // Summary Tables
  { id: "st-parpi",         label: "PARPi",            sublabel: "Treatment class — 5 trials",               category: "Summary Tables",    categoryIcon: Table,     to: "/summary-tables?tab=interactive-table", highlightId: "PARPi" },
  { id: "st-nht",           label: "NHT",              sublabel: "Treatment class — 5 trials",               category: "Summary Tables",    categoryIcon: Table,     to: "/summary-tables?tab=interactive-table", highlightId: "NHT" },
  { id: "st-psma",          label: "PSMA",             sublabel: "Treatment class — 1 trial",                category: "Summary Tables",    categoryIcon: Table,     to: "/summary-tables?tab=interactive-table", highlightId: "PSMA" },
  { id: "st-chemo",         label: "Chemotherapy",     sublabel: "Treatment class — 1 trial",                category: "Summary Tables",    categoryIcon: Table,     to: "/summary-tables?tab=interactive-table", highlightId: "Chemotherapy" },
  { id: "st-olaparib",      label: "Olaparib",         sublabel: "Treatment — PROpel, PROfound",             category: "Summary Tables",    categoryIcon: Table,     to: "/summary-tables?tab=interactive-table", highlightId: "Olaparib" },
  { id: "st-enzalutamide",  label: "Enzalutamide",     sublabel: "Treatment — TALAPRO-2, PREVAIL, AFFIRM",   category: "Summary Tables",    categoryIcon: Table,     to: "/summary-tables?tab=interactive-table", highlightId: "Enzalutamide" },
  { id: "st-abiraterone",   label: "Abiraterone",      sublabel: "Treatment — COU-AA-301, COU-AA-302",       category: "Summary Tables",    categoryIcon: Table,     to: "/summary-tables?tab=interactive-table", highlightId: "Abiraterone" },
  { id: "st-first-line",    label: "First-line",       sublabel: "Line of therapy — 6 trials",               category: "Summary Tables",    categoryIcon: Table,     to: "/summary-tables?tab=interactive-table", highlightId: "First-line" },
  { id: "st-second-line",   label: "Second-line",      sublabel: "Line of therapy — 5 trials",               category: "Summary Tables",    categoryIcon: Table,     to: "/summary-tables?tab=interactive-table", highlightId: "Second-line" },

  // Meta-Analysis
  { id: "ma-primary",       label: "Primary Analysis",          sublabel: "Overall survival forest plot",    category: "Meta-Analysis",     categoryIcon: BarChart2, to: "/meta-analysis", highlightId: "Primary" },
  { id: "ma-sensitivity",   label: "Sensitivity Analysis",      sublabel: "BRCA+ subgroup forest plots",    category: "Meta-Analysis",     categoryIcon: BarChart2, to: "/meta-analysis", highlightId: "Sensitivity" },
  { id: "ma-os",            label: "Overall Survival",          sublabel: "Primary endpoint — HR 0.79",     category: "Meta-Analysis",     categoryIcon: BarChart2, to: "/meta-analysis", highlightId: "Primary" },
  { id: "ma-pfs",           label: "Progression-free Survival", sublabel: "Primary endpoint — HR 0.61",     category: "Meta-Analysis",     categoryIcon: BarChart2, to: "/meta-analysis", highlightId: "Primary" },
  { id: "ma-brca",          label: "BRCA+ Subgroup",            sublabel: "Sensitivity — BRCA1/2 positive", category: "Meta-Analysis",     categoryIcon: BarChart2, to: "/meta-analysis", highlightId: "Sensitivity" },

  // Summary of Findings
  { id: "sof-os",      label: "Overall Survival",          sublabel: "GRADE High — HR 0.79 (0.71–0.88)",   category: "Summary of Findings", categoryIcon: Layers, to: "/summary-of-findings?analysis=primary",     highlightId: "os" },
  { id: "sof-pfs",     label: "Progression-free Survival", sublabel: "GRADE Moderate — HR 0.61",           category: "Summary of Findings", categoryIcon: Layers, to: "/summary-of-findings?analysis=primary",     highlightId: "pfs" },
  { id: "sof-orr",     label: "Objective Response",        sublabel: "GRADE High — RR 1.48",               category: "Summary of Findings", categoryIcon: Layers, to: "/summary-of-findings?analysis=primary",     highlightId: "orr" },
  { id: "sof-crr",     label: "Complete Response",         sublabel: "GRADE Moderate — RR 1.61",           category: "Summary of Findings", categoryIcon: Layers, to: "/summary-of-findings?analysis=primary",     highlightId: "crr" },
  { id: "sof-ae",      label: "Adverse Events",            sublabel: "All-cause — any grade, G≥3, G5",     category: "Summary of Findings", categoryIcon: Layers, to: "/summary-of-findings?analysis=primary",     highlightId: "ae-any" },
  { id: "sof-trae",    label: "Treatment-related AEs",     sublabel: "TRAE — any grade, G≥3, G5",          category: "Summary of Findings", categoryIcon: Layers, to: "/summary-of-findings?analysis=primary",     highlightId: "trae-any" },
  { id: "sof-pfs-sens",label: "PFS Sensitivity",           sublabel: "Composite vs radiographic PFS",      category: "Summary of Findings", categoryIcon: Layers, to: "/summary-of-findings?analysis=sensitivity", highlightId: "pfs-composite" },
  { id: "sof-high",    label: "High Certainty",            sublabel: "GRADE outcomes — OS, ORR",           category: "Summary of Findings", categoryIcon: Layers, to: "/summary-of-findings?analysis=primary",     highlightId: "os" },
  { id: "sof-moderate",label: "Moderate Certainty",        sublabel: "GRADE outcomes — PFS, CRR, AEs",     category: "Summary of Findings", categoryIcon: Layers, to: "/summary-of-findings?analysis=primary",     highlightId: "pfs" },
  { id: "sof-low",     label: "Low Certainty",             sublabel: "GRADE outcomes — G5 AEs",            category: "Summary of Findings", categoryIcon: Layers, to: "/summary-of-findings?analysis=primary",     highlightId: "ae-g5" },
];

const CATEGORY_ORDER = ["PRISMA", "Summary Tables", "Meta-Analysis", "Summary of Findings"];

function scoreItem(item: SearchItem, q: string): number {
  const lq = q.toLowerCase();
  const lLabel = item.label.toLowerCase();
  const lSub = (item.sublabel ?? "").toLowerCase();
  const lCat = item.category.toLowerCase();
  if (lLabel === lq) return 100;
  if (lLabel.startsWith(lq)) return 80;
  if (lLabel.includes(lq)) return 60;
  if (lSub.includes(lq)) return 40;
  if (lCat.includes(lq)) return 20;
  return 0;
}

interface GlobalSearchProps {
  placeholder?: string;
  className?: string;
}

export function GlobalSearch({ placeholder = "Search outcomes, studies, treatments…", className }: GlobalSearchProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const scored = ALL_ITEMS
      .map((item) => ({ item, score: scoreItem(item, query.trim()) }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
      .map((x) => x.item);

    // group by category in defined order
    const grouped: Record<string, SearchItem[]> = {};
    for (const cat of CATEGORY_ORDER) grouped[cat] = [];
    for (const item of scored) {
      if (grouped[item.category]) grouped[item.category].push(item);
    }
    return CATEGORY_ORDER.filter((c) => grouped[c].length > 0).map((cat) => ({
      category: cat,
      icon: grouped[cat][0].categoryIcon,
      items: grouped[cat],
    }));
  }, [query]);

  // flat list for keyboard nav
  const flatResults = results.flatMap((g) => g.items);

  useEffect(() => { setActiveIdx(-1); }, [query]);

  // close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const goTo = (item: SearchItem) => {
    setOpen(false);
    setQuery("");
    const [path, qs] = item.to.split("?");
    const params = new URLSearchParams(qs ?? "");
    if (item.highlightId) params.set("hl", item.highlightId);
    const paramStr = params.toString();
    navigate(path + (paramStr ? `?${paramStr}` : ""));
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (!open || flatResults.length === 0) return;
    if (e.key === "ArrowDown") { e.preventDefault(); setActiveIdx((i) => Math.min(i + 1, flatResults.length - 1)); }
    if (e.key === "ArrowUp")   { e.preventDefault(); setActiveIdx((i) => Math.max(i - 1, 0)); }
    if (e.key === "Enter" && activeIdx >= 0) { e.preventDefault(); goTo(flatResults[activeIdx]); }
    if (e.key === "Escape") { setOpen(false); }
  };

  let flatIdx = -1;

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2E75B5] opacity-60 pointer-events-none z-10" size={18} />
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
        onFocus={() => query && setOpen(true)}
        onKeyDown={handleKey}
        className="w-full pl-12 pr-6 py-3 rounded-full border border-blue-100 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.12)] bg-white text-[14px] font-['Inter',sans-serif] focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all"
      />

      {open && results.length > 0 && (
        <div className="absolute top-[calc(100%+8px)] left-0 right-0 z-50 bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden">
          <div className="max-h-[420px] overflow-y-auto">
            {results.map((group) => {
              const GroupIcon = group.icon;
              return (
                <div key={group.category}>
                  <div className="flex items-center gap-2 px-4 pt-4 pb-2">
                    <GroupIcon size={13} className="text-gray-400" />
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest font-['Articulat_CF',sans-serif]">
                      {group.category}
                    </span>
                  </div>
                  {group.items.map((item) => {
                    flatIdx++;
                    const isActive = flatIdx === activeIdx;
                    const capturedIdx = flatIdx;
                    return (
                      <button
                        key={item.id}
                        onClick={() => goTo(item)}
                        onMouseEnter={() => setActiveIdx(capturedIdx)}
                        className={cn(
                          "w-full flex items-center justify-between px-4 py-2.5 text-left transition-colors group",
                          isActive ? "bg-[#F3F8FE]" : "hover:bg-gray-50"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-1 self-stretch rounded-full shrink-0 transition-colors",
                            isActive ? "bg-[#2E75B5]" : "bg-transparent group-hover:bg-gray-200"
                          )} />
                          <div>
                            <span className={cn(
                              "text-[13px] font-medium font-['Inter',sans-serif]",
                              isActive ? "text-[#2E75B5]" : "text-gray-800"
                            )}>
                              {item.label}
                            </span>
                            {item.sublabel && (
                              <p className="text-[11px] text-gray-400 font-['Inter',sans-serif] mt-0.5">{item.sublabel}</p>
                            )}
                          </div>
                        </div>
                        <ArrowUpRight size={14} className={cn("shrink-0 transition-colors", isActive ? "text-[#2E75B5]" : "text-gray-300")} />
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
          {/* Keyboard hints */}
          <div className="border-t border-gray-100 px-4 py-2.5 flex items-center gap-4 bg-gray-50/60">
            {[["↵", "to select"], ["↑↓", "to navigate"], ["Esc", "to close"]].map(([key, label]) => (
              <span key={key} className="flex items-center gap-1.5 text-[11px] text-gray-400 font-['Inter',sans-serif]">
                <kbd className="px-1.5 py-0.5 rounded bg-white border border-gray-200 text-[10px] font-mono text-gray-500">{key}</kbd>
                {label}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
