import { Table, BarChart2, Layers, GitBranch } from "lucide-react";

/**
 * Catalogue of in-app destinations (page views, outcomes, filter presets) that
 * a search term can resolve to. The nav search bar submits straight to the
 * Search Results page, which uses this index to offer inline links through to
 * whichever pages carry the keyword — so a query for "olaparib" surfaces both
 * the matching studies AND the Summary Tables / PRISMA views that feature it.
 */

export interface SearchItem {
  id: string;
  label: string;
  sublabel?: string;
  category: string;
  categoryIcon: React.ElementType;
  to: string;
  /** Matched against the `hl` param on the destination page to highlight a row. */
  highlightId?: string;
  /** Extra terms that should match this destination but aren't in its label. */
  keywords?: string[];
}

export const PAGE_INDEX: SearchItem[] = [
  // PRISMA
  { id: "prisma-current",   label: "Current State",    sublabel: "PRISMA flowchart — living review",         category: "Prisma",            categoryIcon: GitBranch, to: "/prisma?view=current-state",  keywords: ["screening", "prisma", "flow"] },
  { id: "prisma-initial",   label: "Initial Search",   sublabel: "PRISMA flowchart — inception search",      category: "Prisma",            categoryIcon: GitBranch, to: "/prisma?view=initial-search", keywords: ["screening", "prisma", "flow"] },
  { id: "prisma-living",    label: "Living Search",    sublabel: "Monthly automated search heatmap",         category: "Prisma",            categoryIcon: GitBranch, to: "/prisma?view=living-search",  keywords: ["screening", "prisma", "updates"] },
  { id: "prisma-studies",   label: "Study list",       sublabel: "Every trial included in the review",       category: "Prisma",            categoryIcon: GitBranch, to: "/prisma?panel=study-list",    keywords: ["included studies", "references", "citations"] },
  { id: "prisma-propel",    label: "PROpel",           sublabel: "Olaparib + Abiraterone — included study",  category: "Prisma",            categoryIcon: GitBranch, to: "/prisma?view=current-state", highlightId: "PROpel",    keywords: ["olaparib", "abiraterone", "parpi"] },
  { id: "prisma-talapro",   label: "TALAPRO-2",        sublabel: "Talazoparib + Enzalutamide",               category: "Prisma",            categoryIcon: GitBranch, to: "/prisma?view=current-state", highlightId: "TALAPRO-2", keywords: ["talazoparib", "enzalutamide", "parpi"] },
  { id: "prisma-magnitude", label: "MAGNITUDE",        sublabel: "Niraparib + Abiraterone",                  category: "Prisma",            categoryIcon: GitBranch, to: "/prisma?view=current-state", highlightId: "MAGNITUDE", keywords: ["niraparib", "abiraterone", "parpi"] },
  { id: "prisma-vision",    label: "VISION",           sublabel: "177Lu-PSMA-617 + SoC",                     category: "Prisma",            categoryIcon: GitBranch, to: "/prisma?view=current-state", highlightId: "VISION",    keywords: ["lutetium", "psma", "radioligand"] },
  { id: "prisma-card",      label: "CARD",             sublabel: "Cabazitaxel vs Abiraterone/Enzalutamide",  category: "Prisma",            categoryIcon: GitBranch, to: "/prisma?view=current-state", highlightId: "CARD",      keywords: ["cabazitaxel", "chemotherapy"] },
  { id: "prisma-profound",  label: "PROfound",         sublabel: "Olaparib vs Enzalutamide/Abiraterone",     category: "Prisma",            categoryIcon: GitBranch, to: "/prisma?view=current-state", highlightId: "PROfound",  keywords: ["olaparib", "parpi", "hrr"] },
  { id: "prisma-triton3",   label: "TRITON3",          sublabel: "Rucaparib — BRCA1/2 mCRPC",                category: "Prisma",            categoryIcon: GitBranch, to: "/prisma?view=current-state", highlightId: "TRITON3",   keywords: ["rucaparib", "brca", "parpi"] },

  // Summary Tables
  { id: "st-table",         label: "Interactive Table", sublabel: "All trials, characteristics and results", category: "Summary Tables", categoryIcon: Table, to: "/summary-tables?tab=interactive-table", keywords: ["columns", "characteristics", "trials"] },
  { id: "st-parpi",         label: "PARPi",            sublabel: "Treatment class — 5 trials",               category: "Summary Tables",    categoryIcon: Table,     to: "/summary-tables?tab=interactive-table", highlightId: "PARPi",         keywords: ["parp inhibitor", "olaparib", "niraparib", "rucaparib", "talazoparib"] },
  { id: "st-nht",           label: "NHT",              sublabel: "Treatment class — 5 trials",               category: "Summary Tables",    categoryIcon: Table,     to: "/summary-tables?tab=interactive-table", highlightId: "NHT",           keywords: ["arpi", "hormonal", "abiraterone", "enzalutamide"] },
  { id: "st-psma",          label: "PSMA",             sublabel: "Treatment class — 1 trial",                category: "Summary Tables",    categoryIcon: Table,     to: "/summary-tables?tab=interactive-table", highlightId: "PSMA",          keywords: ["radioligand", "lutetium", "177lu"] },
  { id: "st-chemo",         label: "Chemotherapy",     sublabel: "Treatment class — 1 trial",                category: "Summary Tables",    categoryIcon: Table,     to: "/summary-tables?tab=interactive-table", highlightId: "Chemotherapy",  keywords: ["docetaxel", "cabazitaxel"] },
  { id: "st-olaparib",      label: "Olaparib",         sublabel: "Treatment — PROpel, PROfound",             category: "Summary Tables",    categoryIcon: Table,     to: "/summary-tables?tab=interactive-table", highlightId: "Olaparib",      keywords: ["parpi"] },
  { id: "st-enzalutamide",  label: "Enzalutamide",     sublabel: "Treatment — TALAPRO-2, PREVAIL, AFFIRM",   category: "Summary Tables",    categoryIcon: Table,     to: "/summary-tables?tab=interactive-table", highlightId: "Enzalutamide",  keywords: ["nht", "arpi"] },
  { id: "st-abiraterone",   label: "Abiraterone",      sublabel: "Treatment — COU-AA-301, COU-AA-302",       category: "Summary Tables",    categoryIcon: Table,     to: "/summary-tables?tab=interactive-table", highlightId: "Abiraterone",   keywords: ["nht", "arpi"] },
  { id: "st-first-line",    label: "First-line",       sublabel: "Line of therapy — 6 trials",               category: "Summary Tables",    categoryIcon: Table,     to: "/summary-tables?tab=interactive-table", highlightId: "First-line",    keywords: ["1l", "line of therapy"] },
  { id: "st-second-line",   label: "Second-line",      sublabel: "Line of therapy — 5 trials",               category: "Summary Tables",    categoryIcon: Table,     to: "/summary-tables?tab=interactive-table", highlightId: "Second-line",   keywords: ["2l", "line of therapy"] },

  // Meta-Analysis
  { id: "ma-primary",       label: "Primary Analysis",          sublabel: "Overall survival forest plot",    category: "Meta-Analysis",     categoryIcon: BarChart2, to: "/meta-analysis?analysis=Primary",                  keywords: ["forest plot", "pooled", "hazard ratio"] },
  { id: "ma-sensitivity",   label: "Sensitivity Analysis",      sublabel: "BRCA+ subgroup forest plots",     category: "Meta-Analysis",     categoryIcon: BarChart2, to: "/meta-analysis?analysis=Sensitivity&outcome=os",   keywords: ["subgroup", "forest plot", "brca", "hrr"] },
  { id: "ma-os",            label: "Overall Survival",          sublabel: "Primary endpoint — HR 0.79",      category: "Meta-Analysis",     categoryIcon: BarChart2, to: "/meta-analysis?analysis=Primary",                  keywords: ["os", "survival", "mortality"] },
  { id: "ma-pfs",           label: "Progression-free Survival", sublabel: "Primary endpoint — HR 0.61",      category: "Meta-Analysis",     categoryIcon: BarChart2, to: "/meta-analysis?analysis=Sensitivity&outcome=pfs",  keywords: ["pfs", "progression", "rpfs"] },
  { id: "ma-brca",          label: "BRCA+ Subgroup",            sublabel: "Sensitivity — BRCA1/2 positive",  category: "Meta-Analysis",     categoryIcon: BarChart2, to: "/meta-analysis?analysis=Sensitivity&outcome=os",   keywords: ["brca1", "brca2", "hrr", "mutation"] },

  // Summary of Findings
  { id: "sof-os",      label: "Overall Survival",          sublabel: "GRADE High — HR 0.79 (0.71–0.88)",   category: "Summary of Findings", categoryIcon: Layers, to: "/summary-of-findings?analysis=primary",     highlightId: "os",            keywords: ["grade", "certainty", "survival"] },
  { id: "sof-pfs",     label: "Progression-free Survival", sublabel: "GRADE Moderate — HR 0.61",           category: "Summary of Findings", categoryIcon: Layers, to: "/summary-of-findings?analysis=primary",     highlightId: "pfs",           keywords: ["grade", "certainty", "progression"] },
  { id: "sof-orr",     label: "Objective Response",        sublabel: "GRADE High — RR 1.48",               category: "Summary of Findings", categoryIcon: Layers, to: "/summary-of-findings?analysis=primary",     highlightId: "orr",           keywords: ["grade", "response rate"] },
  { id: "sof-crr",     label: "Complete Response",         sublabel: "GRADE Moderate — RR 1.61",           category: "Summary of Findings", categoryIcon: Layers, to: "/summary-of-findings?analysis=primary",     highlightId: "crr",           keywords: ["grade", "response rate"] },
  { id: "sof-ae",      label: "Adverse Events",            sublabel: "All-cause — any grade, G≥3, G5",     category: "Summary of Findings", categoryIcon: Layers, to: "/summary-of-findings?analysis=primary",     highlightId: "ae-any",        keywords: ["grade", "safety", "toxicity", "harms"] },
  { id: "sof-trae",    label: "Treatment-related AEs",     sublabel: "TRAE — any grade, G≥3, G5",          category: "Summary of Findings", categoryIcon: Layers, to: "/summary-of-findings?analysis=primary",     highlightId: "trae-any",      keywords: ["grade", "safety", "toxicity", "harms"] },
  { id: "sof-pfs-sens",label: "PFS Sensitivity",           sublabel: "Composite vs radiographic PFS",      category: "Summary of Findings", categoryIcon: Layers, to: "/summary-of-findings?analysis=sensitivity", highlightId: "pfs-composite", keywords: ["grade", "sensitivity"] },
];

export const CATEGORY_ORDER = ["Prisma", "Summary Tables", "Meta-Analysis", "Summary of Findings"];

function scoreItem(item: SearchItem, q: string): number {
  const lq = q.toLowerCase();
  const lLabel = item.label.toLowerCase();
  const lSub = (item.sublabel ?? "").toLowerCase();
  const lCat = item.category.toLowerCase();
  const kw = (item.keywords ?? []).map((k) => k.toLowerCase());

  if (lLabel === lq) return 100;
  if (lLabel.startsWith(lq)) return 80;
  if (lLabel.includes(lq)) return 60;
  if (kw.some((k) => k === lq)) return 55;
  if (lSub.includes(lq)) return 40;
  if (kw.some((k) => k.includes(lq))) return 30;
  if (lCat.includes(lq)) return 20;
  return 0;
}

export interface SearchGroup {
  category: string;
  icon: React.ElementType;
  items: SearchItem[];
}

/** Destinations matching `query`, grouped by category in canonical order. */
export function searchPages(query: string, limit = 12): SearchGroup[] {
  const q = query.trim();
  if (!q) return [];

  const scored = PAGE_INDEX.map((item) => ({ item, score: scoreItem(item, q) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.item);

  return CATEGORY_ORDER.map((category) => ({
    category,
    items: scored.filter((i) => i.category === category),
  }))
    .filter((g) => g.items.length > 0)
    .map((g) => ({ ...g, icon: g.items[0].categoryIcon }));
}

/** Resolves a destination to its href, folding in the highlight param. */
export function itemHref(item: SearchItem): string {
  const [path, qs] = item.to.split("?");
  const params = new URLSearchParams(qs ?? "");
  if (item.highlightId) params.set("hl", item.highlightId);
  const s = params.toString();
  return path + (s ? `?${s}` : "");
}
