import React from "react";
import { cn } from "../lib/utils";

export type PrismaStageType = "include" | "final" | "exclude" | "screening" | "total";

export interface PrismaStage {
  id: string;
  label: string;
  count: number;
  sublabel?: string;
  type: PrismaStageType;
  /** Trial names backing this stage — only "final" (Included) stages carry these. */
  trialNames?: string[];
}

export interface PrismaFlowchartProps {
  stages: PrismaStage[];
  /** Only called for "final" (Included) stages — the only cards that are clickable. */
  onNodeClick: (stage: PrismaStage) => void;
  activeNodeId?: string;
}

// total / include → white card, soft blue border + drop shadow
// final           → solid dark-blue card, white text (Included section)
// exclude         → grey card (duplicates, excluded by title/abstract/full text)
// screening       → pale red card (currently screening only)
const STAGE_COLORS: Record<PrismaStageType, { bg: string; border: string; text: string; countColor: string }> = {
  total:     { bg: "#FFFFFF", border: "#BFDBFE", text: "#1e3a5f", countColor: "#2E75B5" },
  include:   { bg: "#FFFFFF", border: "#BFDBFE", text: "#1e3a5f", countColor: "#2E75B5" },
  final:     { bg: "#1e3a7a", border: "#1e3a7a", text: "#FFFFFF", countColor: "#FFFFFF" },
  exclude:   { bg: "#F3F4F6", border: "#D1D5DB", text: "#4B5563", countColor: "#6B7280" },
  screening: { bg: "#FFF5F5", border: "#FECACA", text: "#991b1b", countColor: "#DC2626" },
};

// ── layout metrics (centered fixed-width canvas) ──────────────────────────────
const BLOCK_W = 820;      // flow diagram width
const MAIN_W = 330;       // main flow card width
const MAIN_LEFT = 40;     // main card left inset within the block
const MAIN_CX = MAIN_LEFT + MAIN_W / 2; // central flow line x
const BRANCH_LEFT = 552;  // left edge of branch cards
const BRANCH_W = 240;     // branch card width
const ID_GAP = 20;        // gap between identification source cards
const LABEL_W = 132;      // left rail that anchors each section label
const STICKY_TOP = 84;    // sticky offset (clears the 72px sticky top-nav)
const LINE = "#8AA1C0";   // connector line (muted blue)
const HEAD = "#5273A0";   // arrowhead (deeper blue)

// spacing between stacked cards
const SP_CARD_BRANCH = 20;

const arrowDown: React.CSSProperties = {
  width: 0, height: 0, borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: `7px solid ${HEAD}`,
};
const arrowRight: React.CSSProperties = {
  width: 0, height: 0, borderTop: "4px solid transparent", borderBottom: "4px solid transparent", borderLeft: `7px solid ${HEAD}`,
};

interface StageNodeProps {
  stage: PrismaStage;
  isActive: boolean;
  onClick?: () => void;
}

// Only "Included" (final) stages represent an actual clickable record set —
// every other stage is a screening-process count with nothing behind it to
// open, so it renders as an inert card (no button semantics, no hover/focus
// affordance) rather than a dead click.
function StageNode({ stage, isActive, onClick }: StageNodeProps) {
  const colors = STAGE_COLORS[stage.type];
  const clickable = stage.type === "final" && !!onClick;
  const hasShadow = stage.type === "include" || stage.type === "total" || stage.type === "final";

  const content = (
    <div className="flex flex-col gap-1">
      <span
        className="text-[19px] font-bold leading-none tabular-nums font-['Articulat_CF',sans-serif]"
        style={{ color: colors.countColor }}
      >
        {stage.count.toLocaleString()}
      </span>
      <p className="text-[12px] font-semibold leading-snug font-['Articulat_CF',sans-serif]" style={{ color: colors.text }}>
        {stage.label}
      </p>
      {stage.sublabel && (
        <p
          className="text-[10px] leading-snug font-['Inter',sans-serif]"
          style={{ color: stage.type === "final" ? "rgba(255,255,255,0.7)" : "#9ca3af" }}
        >
          {stage.sublabel}
        </p>
      )}
    </div>
  );

  const sharedStyle: React.CSSProperties = {
    backgroundColor: isActive ? "#E4F0FE" : colors.bg,
    borderColor: isActive ? "#2E75B5" : colors.border,
  };

  if (!clickable) {
    return (
      <div
        className={cn(
          "w-full text-left rounded-xl border-2 px-4 py-3",
          hasShadow && "shadow-sm"
        )}
        style={sharedStyle}
      >
        {content}
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      aria-label={`${stage.label}: ${stage.count} references. Click to view studies.`}
      className={cn(
        "w-full text-left rounded-xl border-2 px-4 py-3 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#2E75B5]/40",
        "hover:scale-[1.01] shadow-sm hover:shadow-md",
        isActive ? "ring-2 ring-[#2E75B5] shadow-md scale-[1.01]" : ""
      )}
      style={sharedStyle}
    >
      {content}
    </button>
  );
}

function PhaseLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] font-bold uppercase tracking-widest text-[#2E75B5] font-['Articulat_CF',sans-serif]">
      {children}
    </span>
  );
}

// Connector following a main card: one continuous central line, optional branch
// cards tapping off to the right, and a down arrowhead entering the next card.
function Connector({
  branches,
  activeNodeId,
  onNodeClick,
}: {
  branches: PrismaStage[];
  activeNodeId?: string;
  onNodeClick: (s: PrismaStage) => void;
}) {
  return (
    <div className="relative" style={{ width: BLOCK_W }}>
      {/* continuous central flow line (arrowhead space left at the bottom) */}
      <div className="absolute" style={{ left: MAIN_CX - 0.75, top: 0, bottom: 7, width: 1.5, background: LINE }} />

      <div className="flex flex-col">
        {/* branch cards tapping off the central line */}
        {branches.length > 0 && (
          <div className="flex flex-col" style={{ paddingTop: SP_CARD_BRANCH, gap: 14 }}>
            {branches.map((b) => (
              <div key={b.id} className="relative flex items-center" style={{ paddingLeft: BRANCH_LEFT }}>
                {/* horizontal arm from the central line to the card */}
                <div
                  className="absolute"
                  style={{ left: MAIN_CX, top: "50%", height: 1.5, width: BRANCH_LEFT - MAIN_CX, background: LINE, transform: "translateY(-50%)" }}
                />
                <div className="absolute" style={{ left: BRANCH_LEFT - 7, top: "50%", transform: "translateY(-50%)", ...arrowRight }} />
                <div style={{ width: BRANCH_W }}>
                  <StageNode stage={b} isActive={activeNodeId === b.id} onClick={() => onNodeClick(b)} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* bottom spacing before the next card */}
        <div style={{ height: branches.length ? 22 : 26 }} />
      </div>

      {/* arrowhead entering the next card */}
      <div className="absolute" style={{ left: MAIN_CX, bottom: 0, transform: "translateX(-50%)", ...arrowDown }} />
    </div>
  );
}

// One PRISMA section: a sticky left-rail label (the scroll anchor) beside the
// section's flow content. No horizontal separators.
function SectionRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-stretch">
      <div className="relative shrink-0" style={{ width: LABEL_W }}>
        <div className="sticky" style={{ top: STICKY_TOP, paddingTop: 6, paddingRight: 18, textAlign: "right" }}>
          <PhaseLabel>{label}</PhaseLabel>
        </div>
      </div>
      <div className="shrink-0" style={{ width: BLOCK_W }}>
        {children}
      </div>
    </div>
  );
}

// Identification: 3 source cards funnelling down (rounded bracket) to the central line.
function IdentificationFunnel({ centers }: { centers: number[] }) {
  const H = 52;
  const railY = 28;
  const r = 8;
  const c0 = centers[0];
  const cN = centers[centers.length - 1];
  return (
    <svg width={BLOCK_W} height={H} style={{ display: "block" }}>
      {/* outer bracket (arms + rail) with rounded corners */}
      <path
        d={`M ${c0} 0 V ${railY - r} Q ${c0} ${railY} ${c0 + r} ${railY} H ${cN - r} Q ${cN} ${railY} ${cN} ${railY - r} V 0`}
        fill="none"
        stroke={LINE}
        strokeWidth={1.5}
      />
      {/* middle stubs */}
      {centers.slice(1, -1).map((c, i) => (
        <path key={i} d={`M ${c} 0 V ${railY}`} stroke={LINE} strokeWidth={1.5} fill="none" />
      ))}
      {/* drop to central line */}
      <path d={`M ${MAIN_CX} ${railY} V ${H}`} stroke={LINE} strokeWidth={1.5} fill="none" />
    </svg>
  );
}

// ── sections (filtered by what's present in `stages`) ─────────────────────────
// `branches` tap off the first present card of the section, so they always stay
// grouped under that section's anchor label.
const SECTIONS: { id: string; label: string; cardIds: string[]; branches: string[] }[] = [
  { id: "dedup", label: "Deduplication", cardIds: ["total-identified", "records-after-dedup"], branches: ["duplicates"] },
  { id: "screening", label: "Screening", cardIds: ["records-screened"], branches: ["currently-screening", "excluded-title", "excluded-abstract"] },
  { id: "eligibility", label: "Eligibility", cardIds: ["fulltext-assessed"], branches: ["currently-screening-ft", "excluded-fulltext"] },
  { id: "included", label: "Included", cardIds: ["studies-systematic", "studies-meta"], branches: [] },
];

export function PrismaFlowchart({ stages, onNodeClick, activeNodeId }: PrismaFlowchartProps) {
  const stageMap = Object.fromEntries(stages.map((s) => [s.id, s]));
  const pick = (ids: string[]) => ids.map((id) => stageMap[id]).filter(Boolean) as PrismaStage[];

  const idSources = pick(["databases", "auto-update", "manual-update"]);

  // identification card centers (flex-1 within the block)
  const idCardW = (BLOCK_W - ID_GAP * (idSources.length - 1)) / idSources.length;
  const centers = idSources.map((_, i) => i * (idCardW + ID_GAP) + idCardW / 2);

  const renderMainCard = (stage: PrismaStage) => (
    <div style={{ paddingLeft: MAIN_LEFT }}>
      <div style={{ width: MAIN_W }}>
        <StageNode stage={stage} isActive={activeNodeId === stage.id} onClick={() => onNodeClick(stage)} />
      </div>
    </div>
  );

  const presentSections = SECTIONS.map((s) => ({ ...s, cards: pick(s.cardIds) })).filter((s) => s.cards.length > 0);

  return (
    <div className="w-full py-2">
      <div className="mx-auto" style={{ width: LABEL_W + BLOCK_W, maxWidth: "100%" }}>
        {/* Identification */}
        <SectionRow label="Identification">
          {idSources.length > 1 ? (
            <>
              <div className="flex" style={{ gap: ID_GAP }}>
                {idSources.map((stage) => (
                  <div key={stage.id} style={{ flex: 1 }}>
                    <StageNode stage={stage} isActive={activeNodeId === stage.id} onClick={() => onNodeClick(stage)} />
                  </div>
                ))}
              </div>
              <IdentificationFunnel centers={centers} />
            </>
          ) : (
            renderMainCard(idSources[0])
          )}
          {/* line + arrowhead into the first card of the next section */}
          <Connector branches={[]} activeNodeId={activeNodeId} onNodeClick={onNodeClick} />
        </SectionRow>

        {/* Deduplication → Screening → Eligibility → Included */}
        {presentSections.map((section, si) => {
          const isLastSection = si === presentSections.length - 1;
          return (
            <SectionRow key={section.id} label={section.label}>
              {section.cards.map((card, i) => {
                const branches = i === 0 ? pick(section.branches) : [];
                const isVeryLast = isLastSection && i === section.cards.length - 1;
                return (
                  <React.Fragment key={card.id}>
                    {renderMainCard(card)}
                    {!isVeryLast && <Connector branches={branches} activeNodeId={activeNodeId} onNodeClick={onNodeClick} />}
                  </React.Fragment>
                );
              })}
            </SectionRow>
          );
        })}
      </div>
    </div>
  );
}
