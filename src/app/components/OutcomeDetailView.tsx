import React, { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../lib/utils";
import { useCitation } from "../lib/CitationContext";
import { CertaintyLevel } from "./CertaintyBadge";
import { ForestPlotModal } from "./ForestPlotModal";
import type { SoFRow } from "./GradeTable";

/**
 * Outcome Overview — Figma node 38:3984.
 *
 * Reads top-down as an argument: what the evidence says in plain language,
 * then the numbers behind it, then which trials contributed, then how the
 * GRADE certainty rating was reached.
 *
 * Figma annotation on node 39:5337 ("DO not use any all caps words or
 * phrases, only capitalize the first letter") applies to every eyebrow label
 * on this page — the design renders them in caps, the build must not.
 */

type DomainRating = "Not serious" | "Serious" | "Very serious" | "Not applicable" | "Undetected";

export interface DomainDetails {
  allEvaluated?: string;
  allLowRisk?: string;
  highRiskSomeConcerns?: string;
  subgroupPValue?: string;
  percentHighRisk?: string;
  algorithmDecision?: string;
  humanDecision?: string;
  algorithmNote?: string;
  humanNote?: string;
  /** Paragraph under the domain name in the detail panel. */
  summary?: string;
  /** Explanation beneath the final rating. */
  rationale?: string;
  /** Shows the amber "Reviewer override" note on the domain card. */
  reviewerOverride?: boolean;
}

export interface DomainAssessment {
  riskOfBias: { rating: DomainRating; details?: DomainDetails };
  indirectness: { rating: DomainRating; details?: DomainDetails };
  inconsistency: { rating: DomainRating; details?: DomainDetails };
  imprecision: { rating: DomainRating; details?: DomainDetails };
  publicationBias: { rating: DomainRating; details?: DomainDetails };
}

type DomainKey = keyof DomainAssessment;

/** Card order follows the design, not the interface declaration order. */
const DOMAIN_ORDER: DomainKey[] = [
  "riskOfBias",
  "inconsistency",
  "indirectness",
  "imprecision",
  "publicationBias",
];

const DOMAIN_LABELS: Record<DomainKey, string> = {
  riskOfBias: "Risk of Bias",
  indirectness: "Indirectness",
  inconsistency: "Inconsistency",
  imprecision: "Imprecision",
  publicationBias: "Publication Bias",
};

const CERTAINTY_PILL: Record<CertaintyLevel, { bg: string; border: string; dot: string; ink: string }> = {
  High:       { bg: "#ecfdf5", border: "#a7f3d0", dot: "#10b981", ink: "#065f46" },
  Moderate:   { bg: "#fffbeb", border: "#fde68a", dot: "#f59e0b", ink: "#92400e" },
  Low:        { bg: "#fff7ed", border: "#fed7aa", dot: "#f97316", ink: "#9a3412" },
  "Very Low": { bg: "#fef2f2", border: "#fecaca", dot: "#ef4444", ink: "#991b1b" },
};

function ratingPill(r: DomainRating) {
  if (r === "Not serious")  return { bg: "#ecfdf5", border: "#a7f3d0", dot: "#10b981", ink: "#065f46" };
  if (r === "Serious")      return { bg: "#fffbeb", border: "#fde68a", dot: "#f59e0b", ink: "#92400e" };
  if (r === "Very serious") return { bg: "#fef2f2", border: "#fecaca", dot: "#ef4444", ink: "#991b1b" };
  return { bg: "#f9fafb", border: "#e5e7eb", dot: "#9ca3af", ink: "#4b5563" };
}

/** Renders **bold** runs inside the plain-language headline. */
function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={i} className="font-bold">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </>
  );
}

/** "540 per 1,000" → 540. Only the leading figure, so the "per 1,000" suffix
 *  and its thousands separator can't be swallowed into the number. */
const parseRate = (s?: string) => {
  const match = String(s ?? "").match(/\d[\d,]*(?:\.\d+)?/);
  const n = match ? Number(match[0].replace(/,/g, "")) : 0;
  return Number.isFinite(n) ? n : 0;
};

/** "−83 per 1,000" → "83 fewer per 1,000"; "+48 per 1,000" → "48 more per 1,000". */
function riskDifferencePhrase(raw: string, per: number) {
  const trimmed = raw.trim();
  if (!/^[+\-−]/.test(trimmed)) return trimmed;
  const fewer = /^[-−]/.test(trimmed);
  const value = parseRate(trimmed);
  const scaled = per === 100 ? Math.round(value / 10) : Math.round(value);
  return `${scaled.toLocaleString()} ${fewer ? "fewer" : "more"} per ${per.toLocaleString()}`;
}

/** Eyebrow label — sentence case per the Figma content annotation on 39:5337. */
function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "font-['Inter',sans-serif] text-[13px] font-semibold tracking-[0.4px] text-[#6b7280]",
        className
      )}
    >
      {children}
    </p>
  );
}

interface OutcomeDetailViewProps {
  row: SoFRow;
  onBack: () => void;
  /** Every outcome on the parent page — backs the "Explore other outcomes" menu. */
  siblings?: SoFRow[];
  onSelectSibling?: (row: SoFRow) => void;
}

export function OutcomeDetailView({ row, onBack, siblings = [], onSelectSibling }: OutcomeDetailViewProps) {
  const domains = row.domains;
  const [focusedDomain, setFocusedDomain] = useState<DomainKey>("riskOfBias");
  const [per, setPer] = useState<100 | 1000>(1000);
  const [showCI, setShowCI] = useState(true);
  const [showRiskDifference, setShowRiskDifference] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [forestOpen, setForestOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { openTrialList } = useCitation();

  const includedTrials = row.includedTrialNames ?? [];

  useEffect(() => {
    setFocusedDomain("riskOfBias");
    setMenuOpen(false);
  }, [row.id]);

  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  if (!domains) return null;

  const pill = CERTAINTY_PILL[row.certainty];
  const focusedEntry = domains[focusedDomain];
  const focusedDetails = focusedEntry.details;

  const scale = (v: number) => (per === 100 ? Math.round(v / 10) : Math.round(v));
  const interventionRate = parseRate(row.absoluteIntervention);
  const controlRate = parseRate(row.absoluteControl);
  const maxRate = Math.max(interventionRate, controlRate, 1);
  const unit = row.absoluteUnit ?? `events per ${per.toLocaleString()}`;
  const absoluteHeading =
    row.absoluteUnit && per === 100
      ? row.absoluteUnit.replace(/1,000/g, "100")
      : unit;

  const detailRows = focusedDetails
    ? ([
        ["All studies evaluated", focusedDetails.allEvaluated],
        ["All low risk", focusedDetails.allLowRisk],
        ["High risk / some concerns", focusedDetails.highRiskSomeConcerns],
        ["Subgroup analysis p-value", focusedDetails.subgroupPValue],
        ["% of high-risk studies", focusedDetails.percentHighRisk],
      ] as const).filter(([, v]) => v !== undefined)
    : [];

  // The design writes this copy by hand for Overall survival (Figma 39:5305 /
  // 39:5307). Every other outcome falls back to a sentence built from its own
  // numbers rather than an invented clinical claim.
  const plainSummary =
    row.plainSummary ??
    `The pooled estimate is **${row.relativeEffect}** — about **${riskDifferencePhrase(
      row.riskDifference,
      per
    )} people**.`;
  const plainCaption =
    row.plainCaption ??
    `${row.certainty} certainty across ${row.studyCount} randomized trials and ${row.participantCount.toLocaleString()} participants.`;

  const bars = [
    { label: "Intervention", value: interventionRate, color: "#2e75b5" },
    { label: "Control", value: controlRate, color: "#94a3b8" },
  ];

  return (
    <div className="flex min-w-0 flex-1 flex-col font-['Inter',sans-serif]">
      {/* Header — Figma node 39:5285 */}
      <div
        className="flex flex-col items-start border-b border-[#f3f4f6] px-10 pt-[26px] pb-8"
        style={{
          backgroundImage:
            "linear-gradient(174.96deg, rgba(133,200,250,0.27) 8.4861%, rgba(133,200,250,0) 66.606%)",
        }}
      >
        <div className="flex w-full items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="text-[15px] font-semibold text-[#2e75b5] transition-colors hover:text-[#1b3a63]"
          >
            ← Back to Summary of Findings
          </button>

          {/* Figma 39:5293 — navigate between the other outcomes. */}
          {siblings.length > 1 && onSelectSibling && (
            <div className="flex items-center gap-2.5">
              <span className="text-[13px] font-medium text-[#6b7280]">Explore other outcomes:</span>
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen((o) => !o)}
                  aria-haspopup="listbox"
                  aria-expanded={menuOpen}
                  className="flex h-9 items-center gap-2.5 rounded-full border border-[#bfdbfe] bg-white px-3.5 text-[14px] font-semibold text-[#101828] transition-colors hover:bg-[#f3f8fe]"
                >
                  {row.outcome}
                  <ChevronDown size={13} className={cn("transition-transform", menuOpen && "rotate-180")} />
                </button>

                {menuOpen && (
                  <ul
                    role="listbox"
                    className="absolute right-0 z-30 mt-2 max-h-[320px] w-[300px] overflow-y-auto rounded-xl border border-[#e5e7eb] bg-white py-1.5 shadow-lg"
                  >
                    {siblings.map((sibling) => (
                      <li key={sibling.id}>
                        <button
                          role="option"
                          aria-selected={sibling.id === row.id}
                          onClick={() => {
                            setMenuOpen(false);
                            onSelectSibling(sibling);
                          }}
                          className={cn(
                            "flex w-full items-center justify-between gap-3 px-3.5 py-2 text-left text-[14px] transition-colors hover:bg-[#f3f8fe]",
                            sibling.id === row.id
                              ? "font-semibold text-[#2e75b5]"
                              : "font-medium text-[#374151]"
                          )}
                        >
                          <span className="min-w-0 flex-1 truncate">{sibling.outcome}</span>
                          <span
                            className="size-1.5 shrink-0 rounded-full"
                            style={{ backgroundColor: CERTAINTY_PILL[sibling.certainty].dot }}
                            aria-hidden
                          />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 pt-[18px]">
          <h1 className="font-serif text-[40px] leading-[44px] font-semibold text-[#101828]">
            {row.outcome}
          </h1>
          <span
            className="flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-semibold"
            style={{ backgroundColor: pill.bg, borderColor: pill.border, color: pill.ink }}
          >
            <span className="size-1.5 rounded-full" style={{ backgroundColor: pill.dot }} aria-hidden />
            {row.certainty}
          </span>
        </div>

        <p className="max-w-[860px] pt-4 text-[22px] leading-[32px] text-[#101828]">
          <RichText text={plainSummary} />
        </p>
        <p className="max-w-[860px] pt-2.5 text-[15px] leading-[24px] text-[#4b5563]">
          {plainCaption}
        </p>
      </div>

      {/* Readout controls — Figma node 39:5308 */}
      <div className="flex flex-wrap items-center gap-2.5 border-b border-[#f3f4f6] bg-[#fafafa] px-10 py-3.5">
        <Eyebrow className="pr-1">Risk per</Eyebrow>
        {([1000, 100] as const).map((option) => (
          <button
            key={option}
            onClick={() => setPer(option)}
            aria-pressed={per === option}
            className={cn(
              "h-[30px] rounded-full border px-3.5 text-[13px] font-semibold transition-colors",
              per === option
                ? "border-[#2e75b5] bg-[#2e75b5] text-white"
                : "border-[#e5e7eb] bg-white text-[#6b7280] hover:bg-gray-50"
            )}
          >
            {option.toLocaleString()}
          </button>
        ))}

        <span className="mx-2 h-[22px] w-px bg-[#e5e7eb]" aria-hidden />

        {[
          { label: "95% CI", on: showCI, toggle: () => setShowCI((v) => !v) },
          { label: "Risk difference", on: showRiskDifference, toggle: () => setShowRiskDifference((v) => !v) },
        ].map((item) => (
          <button
            key={item.label}
            onClick={item.toggle}
            aria-pressed={item.on}
            className={cn(
              "flex h-[30px] items-center gap-2 rounded-full border px-3.5 text-[13px] font-semibold transition-colors",
              item.on
                ? "border-[#bfdbfe] bg-[#e4f0fe] text-[#0663ad]"
                : "border-[#e5e7eb] bg-white text-[#6b7280] hover:bg-gray-50"
            )}
          >
            <span
              className="size-[7px] rounded-full"
              style={{ backgroundColor: item.on ? "#2e75b5" : "#d1d5db" }}
              aria-hidden
            />
            {item.label}
          </button>
        ))}

        {["Raw event data", "Survival data"].map((label) => (
          <button
            key={label}
            disabled
            title="Not available for this outcome"
            className="flex h-[30px] cursor-not-allowed items-center gap-2 rounded-full border border-[#e5e7eb] bg-white px-3.5 text-[13px] font-semibold text-[#6b7280]"
          >
            <span className="size-[7px] rounded-full bg-[#d1d5db]" aria-hidden />
            {label}
          </button>
        ))}
      </div>

      {/* Effect estimates — Figma node 39:5333 */}
      <div className="flex flex-col gap-7 px-10 pt-8 pb-14">
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[280px_minmax(0,1fr)]">
          {/* Relative effect — Figma node 39:5335 */}
          <div className="flex flex-col rounded-xl border border-[#e5e7eb] bg-white p-5 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
            <Eyebrow>Relative effect</Eyebrow>
            <p className="pt-2.5 text-[34px] leading-[34px] font-bold text-[#101828]">
              {row.relativeEffect}
            </p>
            {showCI && (
              <p className="pt-2 text-[16px] font-medium text-[#4b5563]">
                95% CI {row.relativeEffectCI.replace(/[()]/g, "").replace(/–/g, " to ")}
              </p>
            )}
            {row.heterogeneity && (
              <div className="mt-4 border-t border-[#f9fafb] pt-3.5">
                <p className="text-[14px] leading-[20px] font-medium text-[#6b7280]">
                  I² {row.heterogeneity.i2}% · τ² {row.heterogeneity.tau2} · p {row.heterogeneity.p}
                </p>
              </div>
            )}
          </div>

          {/* Absolute effect — Figma node 39:5345 */}
          <div className="flex flex-col rounded-xl border border-[#e5e7eb] bg-white px-6 py-5 drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <Eyebrow>Absolute effect — {absoluteHeading}</Eyebrow>
              {/* Figma 39:5349 — opens a popup with the associated forest plot. */}
              <button
                onClick={() => setForestOpen(true)}
                className="shrink-0 text-[13px] font-semibold text-[#2e75b5] transition-colors hover:text-[#1b3a63]"
              >
                Forest plot →
              </button>
            </div>

            <div className="flex flex-col gap-3.5 pt-[18px]">
              {bars.map((bar) => (
                <div key={bar.label} className="grid grid-cols-[110px_minmax(0,1fr)_130px] items-center gap-4">
                  <span className="text-[14px] font-semibold text-[#374151]">{bar.label}</span>
                  <div className="h-6 overflow-hidden rounded bg-[#f9fafb]">
                    <div
                      className="h-6 rounded transition-[width] duration-300"
                      style={{ width: `${(bar.value / maxRate) * 100}%`, backgroundColor: bar.color }}
                    />
                  </div>
                  <span className="text-right text-[17px] font-bold tabular-nums text-[#101828]">
                    {scale(bar.value).toLocaleString()} per {per.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {showRiskDifference && (
              <div className="mt-[18px] flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-[#f9fafb] pt-4">
                <Eyebrow>Risk difference</Eyebrow>
                <span
                  className="text-[20px] font-bold"
                  style={{ color: row.direction === "harm" ? "#991b1b" : "#065f46" }}
                >
                  {riskDifferencePhrase(row.riskDifference, per)}
                </span>
                {row.riskDifferenceCI && (
                  <span className="text-[14px] font-medium text-[#6b7280]">{row.riskDifferenceCI}</span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Contributing studies — Figma node 39:5370 */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#e5e7eb] bg-[#f3f8fe] px-5 py-4">
          <div className="flex flex-wrap items-center gap-3.5">
            <Eyebrow>Contributing studies</Eyebrow>
            <span className="text-[17px] font-bold text-[#101828]">
              {row.studyCount} trials · {row.participantCount.toLocaleString()} participants
            </span>
            {includedTrials.slice(0, 4).map((trial) => (
              <span
                key={trial}
                className="flex h-7 items-center rounded-full border border-[#bfdbfe] bg-white px-[11px] text-[13px] font-semibold text-[#2e75b5]"
              >
                {trial}
              </span>
            ))}
          </div>

          {/* Figma 39:5389 — opens a popup listing the studies. */}
          {includedTrials.length > 0 && (
            <button
              onClick={() => openTrialList(`${row.outcome} — included studies`, includedTrials)}
              className="shrink-0 text-[14px] font-semibold text-[#2e75b5] transition-colors hover:text-[#1b3a63]"
            >
              View all {includedTrials.length} citations →
            </button>
          )}
        </div>

        {/* Certainty — Figma node 39:5390 */}
        <div className="flex flex-col gap-3.5">
          <div className="flex flex-wrap items-baseline gap-4">
            <h2 className="font-serif text-[26px] font-semibold text-[#101828]">
              How the certainty was reached
            </h2>
            <p className="text-[14px] font-medium text-[#6b7280]">
              Select a GRADE domain to see the evidence behind its judgement.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
            {DOMAIN_ORDER.map((key) => {
              const entry = domains[key];
              const colors = ratingPill(entry.rating);
              const isActive = focusedDomain === key;
              return (
                <button
                  key={key}
                  onClick={() => setFocusedDomain(key)}
                  aria-pressed={isActive}
                  className={cn(
                    "flex flex-col items-start gap-2.5 rounded-xl border px-4 py-3.5 text-left transition-all",
                    isActive
                      ? "border-[#2e75b5] bg-[#f3f8fe] drop-shadow-[0px_1px_1px_rgba(46,117,181,0.18)]"
                      : "border-[#e5e7eb] bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] hover:border-[#bfdbfe]"
                  )}
                >
                  <span className="text-[14px] font-semibold text-[#374151]">{DOMAIN_LABELS[key]}</span>
                  <span
                    className="flex h-6 items-center gap-1.5 rounded-full border px-2.5 text-[12px] font-semibold"
                    style={{ backgroundColor: colors.bg, borderColor: colors.border, color: colors.ink }}
                  >
                    <span className="size-1.5 rounded-full" style={{ backgroundColor: colors.dot }} aria-hidden />
                    {entry.rating}
                  </span>
                  <span className="min-h-[14.5px] text-[12px] font-semibold text-[#92400e]">
                    {entry.details?.reviewerOverride ? "Reviewer override" : ""}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Domain detail + judgement — Figma node 39:5430 */}
          <div className="overflow-hidden rounded-xl border border-[#bfdbfe] bg-[#f3f8fe]">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
              <div className="flex flex-col border-b border-[#dbeafe] px-6 py-[22px] lg:border-b-0 lg:border-r">
                <p className="text-[12px] font-bold tracking-[0.5px] text-[#2e75b5]">Domain detail</p>
                <p className="pt-1.5 text-[20px] font-semibold text-[#101828]">
                  {DOMAIN_LABELS[focusedDomain]}
                </p>
                <p className="max-w-[560px] pt-2 text-[14px] leading-[22px] text-[#4b5563]">
                  {focusedDetails?.summary ??
                    focusedDetails?.algorithmNote ??
                    `No structured assessment was recorded for ${DOMAIN_LABELS[focusedDomain].toLowerCase()} on this outcome.`}
                </p>

                {detailRows.length > 0 && (
                  <div className="mt-4 border-t border-[#dbeafe]">
                    {detailRows.map(([label, value]) => (
                      <div
                        key={label}
                        className="flex items-center justify-between border-b border-[#dbeafe] py-2.5"
                      >
                        <span className="text-[14px] text-[#4b5563]">{label}</span>
                        <span className="text-[14px] font-bold text-[#101828]">{value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3.5 px-6 py-[22px]">
                <p className="text-[12px] font-bold tracking-[0.5px] text-[#2e75b5]">Judgement</p>
                <div className="rounded-[10px] border border-[#dbeafe] bg-white px-[18px] py-4">
                  <Eyebrow>Final rating</Eyebrow>
                  <p className="pt-2 text-[22px] font-bold text-[#101828]">{focusedEntry.rating}</p>
                  <p className="pt-2 text-[14px] leading-[22px] text-[#4b5563]">
                    {focusedDetails?.rationale ??
                      focusedDetails?.humanNote ??
                      focusedDetails?.algorithmNote ??
                      (focusedEntry.rating === "Not serious"
                        ? "No downgrade was applied for this domain."
                        : `Certainty was rated down for ${DOMAIN_LABELS[focusedDomain].toLowerCase()}.`)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ForestPlotModal
        open={forestOpen}
        onClose={() => setForestOpen(false)}
        title={row.outcome}
        dataId={row.forestDataId ?? row.id}
      />
    </div>
  );
}
