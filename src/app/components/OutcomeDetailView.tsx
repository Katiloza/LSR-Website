import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { CertaintyBadge, CertaintyLevel } from "./CertaintyBadge";
import { cn } from "../lib/utils";
import type { SoFRow } from "./GradeTable";

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
}

export interface DomainAssessment {
  riskOfBias: { rating: DomainRating; details?: DomainDetails };
  indirectness: { rating: DomainRating; details?: DomainDetails };
  inconsistency: { rating: DomainRating; details?: DomainDetails };
  imprecision: { rating: DomainRating; details?: DomainDetails };
  publicationBias: { rating: DomainRating; details?: DomainDetails };
}

type DomainKey = keyof DomainAssessment;

const DOMAIN_LABELS: Record<DomainKey, string> = {
  riskOfBias: "Risk of Bias",
  indirectness: "Indirectness",
  inconsistency: "Inconsistency",
  imprecision: "Imprecision",
  publicationBias: "Publication Bias",
};

function ratingColor(r: DomainRating) {
  if (r === "Not serious") return { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-500" };
  if (r === "Serious") return { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", dot: "bg-amber-500" };
  if (r === "Very serious") return { bg: "bg-red-50", text: "text-red-700", border: "border-red-200", dot: "bg-red-500" };
  return { bg: "bg-gray-100", text: "text-gray-500", border: "border-gray-200", dot: "bg-gray-400" };
}

function RiskOfBiasDecisionTree() {
  return (
    <svg viewBox="0 0 520 420" className="w-full h-auto" aria-label="Risk of Bias decision tree algorithm">
      <defs>
        <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#9CA3AF" />
        </marker>
      </defs>

      {/* HITL top */}
      <polygon points="260,18 340,38 340,62 260,82 180,62 180,38" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" />
      <text x="260" y="46" textAnchor="middle" fontSize="9" fontWeight="600" fill="#92400E">HITL: Are all studies</text>
      <text x="260" y="58" textAnchor="middle" fontSize="9" fontWeight="600" fill="#92400E">evaluated?</text>

      {/* Yes left arrow */}
      <line x1="220" y1="62" x2="180" y2="102" stroke="#9CA3AF" strokeWidth="1" markerEnd="url(#arrowhead)" />
      <text x="194" y="88" fontSize="8" fill="#6B7280">Yes</text>

      {/* No right arrow */}
      <line x1="300" y1="62" x2="380" y2="102" stroke="#9CA3AF" strokeWidth="1" markerEnd="url(#arrowhead)" />
      <text x="346" y="88" fontSize="8" fill="#6B7280">No</text>

      {/* "Are all studies low risk?" */}
      <rect x="90" y="102" width="160" height="36" rx="6" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1.5" />
      <text x="170" y="117" textAnchor="middle" fontSize="9" fill="#1E40AF">Are all studies</text>
      <text x="170" y="129" textAnchor="middle" fontSize="9" fill="#1E40AF">low risk?</text>

      {/* "0: Not available" */}
      <rect x="340" y="102" width="130" height="36" rx="14" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="1.5" />
      <text x="405" y="117" textAnchor="middle" fontSize="9" fontWeight="600" fill="#6B7280">0: Not available</text>

      {/* Yes right arrow from "low risk?" */}
      <line x1="250" y1="120" x2="340" y2="162" stroke="#9CA3AF" strokeWidth="1" markerEnd="url(#arrowhead)" />
      <text x="300" y="148" fontSize="8" fill="#6B7280">Yes</text>

      {/* "1: Not serious" (right outcome) */}
      <rect x="340" y="162" width="130" height="30" rx="12" fill="#ECFDF5" stroke="#A7F3D0" strokeWidth="1.5" />
      <text x="405" y="181" textAnchor="middle" fontSize="9" fontWeight="600" fill="#065F46">1: Not serious</text>

      {/* No down arrow from "low risk?" */}
      <line x1="170" y1="138" x2="170" y2="192" stroke="#9CA3AF" strokeWidth="1" markerEnd="url(#arrowhead)" />
      <text x="153" y="168" fontSize="8" fill="#6B7280">No</text>

      {/* "High risk or some concerns?" */}
      <rect x="80" y="192" width="180" height="36" rx="6" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1.5" />
      <text x="170" y="207" textAnchor="middle" fontSize="9" fill="#1E40AF">Are all studies high risk or</text>
      <text x="170" y="219" textAnchor="middle" fontSize="9" fill="#1E40AF">some concerns?</text>

      {/* Yes left arrow */}
      <line x1="100" y1="216" x2="60" y2="258" stroke="#9CA3AF" strokeWidth="1" markerEnd="url(#arrowhead)" />
      <text x="64" y="244" fontSize="8" fill="#6B7280">Yes</text>

      {/* No right arrow */}
      <line x1="240" y1="216" x2="300" y2="258" stroke="#9CA3AF" strokeWidth="1" markerEnd="url(#arrowhead)" />
      <text x="264" y="244" fontSize="8" fill="#6B7280">No</text>

      {/* "2: Serious" (left branch) */}
      <rect x="20" y="258" width="84" height="28" rx="12" fill="#FEF3C7" stroke="#FDE68A" strokeWidth="1.5" />
      <text x="62" y="275" textAnchor="middle" fontSize="9" fontWeight="600" fill="#92400E">2: Serious</text>

      {/* Optional → HITL Review → Rate down → 3-4 */}
      <line x1="62" y1="286" x2="62" y2="302" stroke="#9CA3AF" strokeWidth="1" markerEnd="url(#arrowhead)" />
      <text x="72" y="298" fontSize="7.5" fill="#9CA3AF">Optional</text>
      <rect x="20" y="302" width="84" height="24" rx="10" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" />
      <text x="62" y="317" textAnchor="middle" fontSize="8.5" fontWeight="600" fill="#92400E">HITL: Review</text>
      <line x1="62" y1="326" x2="62" y2="342" stroke="#9CA3AF" strokeWidth="1" markerEnd="url(#arrowhead)" />
      <text x="72" y="338" fontSize="7.5" fill="#9CA3AF">Rate down</text>
      <rect x="8" y="342" width="108" height="26" rx="12" fill="#FEE2E2" stroke="#FCA5A5" strokeWidth="1.5" />
      <text x="62" y="358" textAnchor="middle" fontSize="8.5" fontWeight="600" fill="#991B1B">3–4: Very–Extremely</text>
      <text x="62" y="369" textAnchor="middle" fontSize="8" fill="#991B1B">serious</text>

      {/* Subgroup analysis */}
      <rect x="256" y="258" width="144" height="30" rx="6" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1.5" />
      <text x="328" y="270" textAnchor="middle" fontSize="8.5" fill="#1E40AF">Subgroup analysis</text>
      <text x="328" y="281" textAnchor="middle" fontSize="8.5" fill="#1E40AF">(low vs. high/some)</text>

      {/* p≤0.05 left */}
      <line x1="290" y1="288" x2="270" y2="318" stroke="#9CA3AF" strokeWidth="1" markerEnd="url(#arrowhead)" />
      <text x="262" y="308" fontSize="7.5" fill="#6B7280">p≤0.05</text>

      {/* p>0.05 right */}
      <line x1="366" y1="288" x2="400" y2="318" stroke="#9CA3AF" strokeWidth="1" markerEnd="url(#arrowhead)" />
      <text x="370" y="308" fontSize="7.5" fill="#6B7280">p&gt;0.05</text>

      {/* 3: Very serious outcome */}
      <rect x="360" y="318" width="108" height="26" rx="12" fill="#FEE2E2" stroke="#FCA5A5" strokeWidth="1.5" />
      <text x="414" y="334" textAnchor="middle" fontSize="9" fontWeight="600" fill="#991B1B">3: Very serious</text>

      {/* Percent of high-risk studies */}
      <rect x="210" y="318" width="120" height="26" rx="6" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1.5" />
      <text x="270" y="330" textAnchor="middle" fontSize="8.5" fill="#1E40AF">Percent of high-risk</text>
      <text x="270" y="341" textAnchor="middle" fontSize="8.5" fill="#1E40AF">studies</text>

      {/* <10% */}
      <line x1="245" y1="344" x2="222" y2="374" stroke="#9CA3AF" strokeWidth="1" markerEnd="url(#arrowhead)" />
      <text x="218" y="364" fontSize="7.5" fill="#6B7280">&lt;10%</text>

      {/* ≥50% */}
      <line x1="295" y1="344" x2="318" y2="374" stroke="#9CA3AF" strokeWidth="1" markerEnd="url(#arrowhead)" />
      <text x="296" y="364" fontSize="7.5" fill="#6B7280">≥50%</text>

      {/* 1: Not serious (small) */}
      <rect x="176" y="374" width="90" height="24" rx="10" fill="#ECFDF5" stroke="#A7F3D0" strokeWidth="1.5" />
      <text x="221" y="389" textAnchor="middle" fontSize="8.5" fontWeight="600" fill="#065F46">1: Not serious</text>

      {/* 2: Serious (small) */}
      <rect x="288" y="374" width="72" height="24" rx="10" fill="#FEF3C7" stroke="#FDE68A" strokeWidth="1.5" />
      <text x="324" y="389" textAnchor="middle" fontSize="8.5" fontWeight="600" fill="#92400E">2: Serious</text>
    </svg>
  );
}

interface OutcomeDetailViewProps {
  row: SoFRow;
  onBack: () => void;
}

export function OutcomeDetailView({ row, onBack }: OutcomeDetailViewProps) {
  const domains = row.domains;
  const [focusedDomain, setFocusedDomain] = useState<DomainKey>("riskOfBias");

  if (!domains) return null;

  const focusedEntry = domains[focusedDomain];
  const focusedDetails = focusedEntry.details;

  return (
    <div className="flex flex-col gap-8 p-8 font-['Inter',sans-serif]">
      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-[#2E75B5] text-[13px] font-medium hover:underline w-fit"
      >
        <ArrowLeft size={14} />
        Go Back
      </button>

      {/* Title */}
      <div className="flex items-baseline gap-3">
        <h2 className="text-[32px] font-semibold text-[#101828] font-['Benton_Modern_D',serif] leading-tight">
          {row.outcome}
        </h2>
        <span className="text-[14px] text-gray-400 font-['Inter',sans-serif]">
          {row.studyCount} references
        </span>
      </div>

      {/* Overview */}
      <section>
        <h3 className="text-[20px] font-semibold text-[#2E75B5] font-['Articulat_CF',sans-serif] mb-3">Overview</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="border border-gray-100 rounded-xl p-4 bg-white">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Summary Effect</p>
            <p className="text-[20px] font-bold text-gray-900">{row.relativeEffect}</p>
            <p className="text-[12px] text-gray-500">95% CI: {row.relativeEffectCI.replace(/[()]/g, "")}</p>
          </div>
          <div className="border border-gray-100 rounded-xl p-4 bg-white">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Heterogeneity</p>
            <p className="text-[20px] font-bold text-gray-900">
              I² {row.heterogeneity?.i2 ?? "—"}
            </p>
            <p className="text-[12px] text-gray-500">
              τ² = {row.heterogeneity?.tau2 ?? "—"} · p {row.heterogeneity?.p ?? "—"}
            </p>
          </div>
          <div className="border border-gray-100 rounded-xl p-4 bg-white">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Studies Included</p>
            <p className="text-[20px] font-bold text-gray-900">{row.studyCount} studies</p>
            <p className="text-[12px] text-gray-500">Random-effect model ready</p>
          </div>
        </div>
      </section>

      {/* Domain Assessment */}
      <section>
        <h3 className="text-[20px] font-semibold text-[#2E75B5] font-['Articulat_CF',sans-serif] mb-3">Domain Assessment</h3>
        <div className="grid grid-cols-5 gap-3 mb-6">
          {(Object.keys(DOMAIN_LABELS) as DomainKey[]).map((key) => {
            const entry = domains[key];
            const colors = ratingColor(entry.rating);
            const isActive = focusedDomain === key;
            return (
              <button
                key={key}
                onClick={() => setFocusedDomain(key)}
                className={cn(
                  "flex flex-col gap-2 p-3 rounded-xl border-2 text-left transition-all",
                  isActive ? "border-[#2E75B5] bg-blue-50/40" : "border-gray-100 bg-white hover:border-gray-200"
                )}
              >
                <p className="text-[11px] text-gray-500 font-medium">{DOMAIN_LABELS[key]}:</p>
                <span className={cn(
                  "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold border w-fit",
                  colors.bg, colors.text, colors.border
                )}>
                  <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", colors.dot)} aria-hidden />
                  {entry.rating}
                </span>
              </button>
            );
          })}
        </div>

        {/* COE Focus + Decision Tree */}
        <div className="grid grid-cols-[280px_1fr] gap-4">
          {/* COE Focus panel */}
          <div className="border border-gray-100 rounded-xl p-4 bg-white flex flex-col gap-3">
            <div>
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">COE Focus</p>
              <p className="text-[15px] font-semibold text-gray-900 mt-0.5">{DOMAIN_LABELS[focusedDomain]}</p>
            </div>

            {focusedDetails ? (
              <div className="flex flex-col gap-1.5">
                {focusedDetails.allEvaluated !== undefined && (
                  <div className="flex justify-between text-[12px]">
                    <span className="text-gray-500">All evaluated</span>
                    <span className="font-semibold text-gray-900">{focusedDetails.allEvaluated}</span>
                  </div>
                )}
                {focusedDetails.allLowRisk !== undefined && (
                  <div className="flex justify-between text-[12px]">
                    <span className="text-gray-500">All Low risk</span>
                    <span className="font-semibold text-gray-900">{focusedDetails.allLowRisk}</span>
                  </div>
                )}
                {focusedDetails.highRiskSomeConcerns !== undefined && (
                  <div className="flex justify-between text-[12px]">
                    <span className="text-gray-500">High risk / some concerns</span>
                    <span className="font-semibold text-gray-900">{focusedDetails.highRiskSomeConcerns}</span>
                  </div>
                )}
                {focusedDetails.subgroupPValue !== undefined && (
                  <div className="flex justify-between text-[12px]">
                    <span className="text-gray-500">Subgroup Analysis p-value</span>
                    <span className="font-semibold text-gray-900">{focusedDetails.subgroupPValue}</span>
                  </div>
                )}
                {focusedDetails.percentHighRisk !== undefined && (
                  <div className="flex justify-between text-[12px]">
                    <span className="text-gray-500">% of High-risk studies</span>
                    <span className="font-semibold text-gray-900">{focusedDetails.percentHighRisk}</span>
                  </div>
                )}

                {(focusedDetails.algorithmDecision || focusedDetails.humanDecision) && (
                  <div className="mt-2 rounded-lg bg-green-50 border border-green-100 p-2.5 flex flex-col gap-1.5">
                    {focusedDetails.algorithmDecision && (
                      <div>
                        <p className="text-[11px] font-semibold text-green-800">Algorithm Decision: {focusedDetails.algorithmDecision}</p>
                        {focusedDetails.algorithmNote && (
                          <p className="text-[11px] text-green-700">{focusedDetails.algorithmNote}</p>
                        )}
                      </div>
                    )}
                    {focusedDetails.humanDecision && (
                      <div>
                        <p className="text-[11px] font-semibold text-green-800">Human Decision: {focusedDetails.humanDecision}</p>
                        {focusedDetails.humanNote && (
                          <p className="text-[11px] text-green-700">{focusedDetails.humanNote}</p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <p className="text-[12px] text-gray-400 italic">No detailed assessment available for this domain.</p>
            )}
          </div>

          {/* Decision Tree */}
          <div className="border border-gray-100 rounded-xl p-4 bg-white">
            <p className="text-[12px] font-semibold text-gray-700 mb-0.5">
              Decision Tree — {DOMAIN_LABELS[focusedDomain]} algorithm
            </p>
            <p className="text-[11px] text-gray-400 mb-4">
              {focusedDomain === "riskOfBias"
                ? "Flow: HITL review → are all studies evaluated? → are all studies low risk? → algorithm output"
                : `Algorithmic assessment for ${DOMAIN_LABELS[focusedDomain].toLowerCase()}.`}
            </p>
            <RiskOfBiasDecisionTree />
          </div>
        </div>
      </section>
    </div>
  );
}
