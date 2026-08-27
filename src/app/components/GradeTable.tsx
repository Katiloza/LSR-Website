import React, { useState, useEffect, useRef } from "react";
import { ChevronRight, ChevronDown, Info } from "lucide-react";
import { CertaintyBadge, CertaintyLevel, EffectDirection } from "./CertaintyBadge";
import { CertaintyColorGuide } from "./CertaintyColorGuide";
import type { DomainAssessment } from "./OutcomeDetailView";

export interface SoFRow {
  id: string;
  outcome: string;
  studyCount: number;
  participantCount: number;
  relativeEffect: string;
  relativeEffectCI: string;
  absoluteIntervention: string;
  absoluteControl: string;
  riskDifference: string;
  certainty: CertaintyLevel;
  /** Direction of effect — picks the hue in the certainty color guide. */
  direction: EffectDirection;
  notes?: string;
  heterogeneity?: { i2: string; tau2: string; p: string };
  domains?: DomainAssessment;
  /** Trial names contributing to this outcome — backs the Overview page's citation links. */
  includedTrialNames?: string[];

  // ─── Overview page copy — Figma node 38:3984 ───────────────────────────────
  /** Plain-language headline. Text between ** ** renders bold. */
  plainSummary?: string;
  /** Supporting line under the headline. */
  plainCaption?: string;
  /** Unit phrase for the absolute-effect card, e.g. "deaths per 1,000 at 36 months". */
  absoluteUnit?: string;
  /** Confidence interval for the risk difference, e.g. "95% CI 110 fewer to 47 fewer". */
  riskDifferenceCI?: string;
  /** MOCK_FOREST_DATA key backing the "Forest plot" popup. */
  forestDataId?: string;
}

const RISK_PER_OPTIONS = [
  { value: "1000", label: "Risk per (1,000)" },
  { value: "100",  label: "Risk per (100)" },
  { value: "10000",label: "Risk per (10,000)" },
];

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <span className="text-[13px] font-medium text-gray-600 font-['Inter',sans-serif]">{label}</span>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex w-9 h-5 rounded-full transition-colors ${checked ? "bg-[#2E75B5]" : "bg-gray-200"}`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${checked ? "translate-x-4" : "translate-x-0"}`}
        />
      </button>
    </label>
  );
}

interface GradeTableProps {
  rows: SoFRow[];
  visibleOutcomeIds: string[];
  comparison: string;
  onRowClick?: (row: SoFRow) => void;
  highlightId?: string;
}

export function GradeTable({ rows, visibleOutcomeIds, comparison, onRowClick, highlightId }: GradeTableProps) {
  const visibleRows = rows.filter((r) => visibleOutcomeIds.includes(r.id));
  const hlRef = useRef<HTMLTableRowElement | null>(null);

  useEffect(() => {
    if (highlightId && hlRef.current) {
      hlRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [highlightId]);

  const [showCI, setShowCI] = useState(true);
  const [showARD, setShowARD] = useState(true);
  const [showSurvival, setShowSurvival] = useState(true);
  const [showRaw, setShowRaw] = useState(true);
  const [riskPer, setRiskPer] = useState("1000");
  const [colorGuideOpen, setColorGuideOpen] = useState(false);

  // Column visibility derived from toggles
  const showAbsCols = showSurvival;
  const showRdCol = showARD;
  const showCiRow = showCI;

  const colSpan = 2 + (showCI ? 1 : 0) + (showAbsCols ? 2 : 0) + (showRdCol ? 1 : 0) + 1;

  return (
    <div className="flex flex-col gap-0">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-6 px-1 py-3 border-b border-gray-100 mb-4">
        {/* Risk per dropdown */}
        <div className="relative">
          <select
            value={riskPer}
            onChange={(e) => setRiskPer(e.target.value)}
            className="appearance-none pl-3 pr-8 py-1.5 text-[13px] font-semibold text-gray-700 font-['Inter',sans-serif] bg-gray-50 border border-gray-200 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400/20 hover:bg-gray-100 transition-colors"
          >
            {RISK_PER_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        <div className="w-px h-5 bg-gray-200" />

        <Toggle label="Show CI"            checked={showCI}       onChange={setShowCI} />
        <Toggle label="Show ARD"           checked={showARD}      onChange={setShowARD} />
        <Toggle label="Show Survival Data" checked={showSurvival} onChange={setShowSurvival} />
        <Toggle label="Show Raw Data"      checked={showRaw}      onChange={setShowRaw} />
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full text-[12px] font-['Inter',sans-serif] border-collapse min-w-[700px]">
          <caption className="sr-only">
            GRADE Summary of Findings: {comparison}
          </caption>
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th scope="col" className="text-left px-4 py-3 font-semibold text-gray-500 tracking-[0.275px] text-[11px] leading-[16.5px] min-w-[200px]">
                Outcome
              </th>
              <th scope="col" className="text-right px-4 py-3 font-semibold text-gray-500 tracking-[0.275px] text-[11px] leading-[16.5px] whitespace-nowrap">
                Participants
              </th>
              <th scope="col" className="text-center px-4 py-3 font-semibold text-gray-500 tracking-[0.275px] text-[11px] leading-[16.5px] whitespace-nowrap">
                Relative effect{showCiRow ? " (95% CI)" : ""}
                <span className="block font-normal text-gray-400 text-[10px] tracking-normal mt-0.5">Intervention vs. control</span>
              </th>
              {showAbsCols && (
                <>
                  <th scope="col" className="text-right px-4 py-3 font-semibold text-gray-500 tracking-[0.275px] text-[11px] leading-[16.5px]">
                    Abs. — Intervention
                  </th>
                  <th scope="col" className="text-right px-4 py-3 font-semibold text-gray-500 tracking-[0.275px] text-[11px] leading-[16.5px]">
                    Abs. — Control
                  </th>
                </>
              )}
              {showRdCol && (
                <th scope="col" className="text-right px-4 py-3 font-semibold text-gray-500 tracking-[0.275px] text-[11px] leading-[16.5px]">
                  Risk difference
                </th>
              )}
              <th scope="col" className="text-center px-4 py-3 font-semibold text-gray-500 tracking-[0.275px] text-[11px] leading-[16.5px]">
                Certainty
              </th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.length === 0 ? (
              <tr>
                <td colSpan={colSpan} className="text-center py-16 text-gray-400 text-[13px]">
                  Select at least one outcome from the sidebar to view results.
                </td>
              </tr>
            ) : (
              visibleRows.map((row, i) => {
                const isHl = !!highlightId && row.id === highlightId;
                return (<tr
                  key={row.id}
                  ref={isHl && !hlRef.current ? (el) => { hlRef.current = el; } : undefined}
                  onClick={() => onRowClick?.(row)}
                  className={`border-b border-gray-50 transition-all group ${
                    isHl
                      ? "animate-[highlight-fade_2.5s_ease-in-out_forwards] ring-2 ring-inset ring-[#2E75B5]/30"
                      : i % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                  } ${onRowClick ? "cursor-pointer hover:bg-blue-50/40" : "hover:bg-blue-50/20"}`}
                >
                  <td className="px-4 py-3 text-[13px]">
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-gray-900 group-hover:text-[#2E75B5] transition-colors">{row.outcome}</span>
                      {/* Studies (n) column removed — count folded in here instead. */}
                      <span className="text-[11px] text-gray-400 tabular-nums shrink-0">n={row.studyCount}</span>
                      {onRowClick && <ChevronRight size={13} className="text-gray-300 group-hover:text-[#2E75B5] shrink-0 transition-colors" />}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right text-gray-600 tabular-nums">{row.participantCount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="font-medium text-gray-900">{row.relativeEffect}</div>
                    {showCiRow && <div className="text-gray-400 text-[11px]">{row.relativeEffectCI}</div>}
                  </td>
                  {showAbsCols && (
                    <>
                      <td className="px-4 py-3 text-right text-gray-600 tabular-nums">{row.absoluteIntervention}</td>
                      <td className="px-4 py-3 text-right text-gray-600 tabular-nums">{row.absoluteControl}</td>
                    </>
                  )}
                  {showRdCol && (
                    <td className="px-4 py-3 text-right font-medium text-gray-900 tabular-nums">{row.riskDifference}</td>
                  )}
                  <td className="px-4 py-3 text-center">
                    <CertaintyBadge level={row.certainty} direction={row.direction} />
                  </td>
                </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Certainty legend — below the table */}
      <div className="flex flex-wrap items-center justify-between gap-4 px-2 pt-3">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[14px] text-gray-500 font-semibold font-['Inter',sans-serif]">
            Certainty of evidence:
          </span>
          {(["High", "Moderate", "Low", "Very Low"] as CertaintyLevel[]).map((level) => (
            <div key={level} className="flex items-center gap-1.5">
              <CertaintyBadge level={level} direction="benefit" />
            </div>
          ))}
        </div>
        <button
          onClick={() => setColorGuideOpen(true)}
          className="flex items-center gap-1.5 text-[12px] font-medium text-[#2E75B5] hover:underline"
        >
          <Info size={13} />
          Color guide
        </button>
      </div>

      <CertaintyColorGuide open={colorGuideOpen} onClose={() => setColorGuideOpen(false)} />
    </div>
  );
}
