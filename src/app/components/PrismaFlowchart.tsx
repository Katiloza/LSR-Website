import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
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

// Figma nodes 13:2803 (open) / 13:3117 (closed).
//
// The design inverts the classic PRISMA diagram: the *answer* — the Included
// counts — sits at the top, and the screening process that produced it is
// collapsed behind a disclosure and reads downward in reverse (Eligibility →
// Screening → Deduplication → Identification). Readers who only want the
// number never scroll past the first row.
//
// total / include → white card, soft blue border
// final           → solid navy card, white text (Included section)
// exclude         → grey card (duplicates, excluded by title/abstract/full text)
// screening       → pale red card (in-flight screening only)
const STAGE_COLORS: Record<PrismaStageType, { bg: string; border: string; text: string; countColor: string }> = {
  total:     { bg: "#FFFFFF", border: "#BFDBFE", text: "#1e3a5f", countColor: "#2E75B5" },
  include:   { bg: "#FFFFFF", border: "#BFDBFE", text: "#1e3a5f", countColor: "#2E75B5" },
  final:     { bg: "#1E3A6E", border: "#1E3A6E", text: "#FFFFFF", countColor: "#FFFFFF" },
  exclude:   { bg: "#F3F4F6", border: "#E5E7EB", text: "#4B5563", countColor: "#9CA3AF" },
  screening: { bg: "#FEF2F2", border: "#FECACA", text: "#B91C1C", countColor: "#DC2626" },
};

// ── layout metrics (all in px, matching the Figma frame) ─────────────────────
const LABEL_W = 132;   // left rail carrying the section anchor label
const RAIL_X = 58;     // x of the vertical spine, measured from the flow column
const CARD_X = 100;    // x of every stacked card's left edge
const CARD_W = 224;    // width of every stacked flow / branch card
const INCLUDED_W = 268; // Included cards sit in a row; sized for the 40px count
const ID_W = 257;      // Identification source cards
const ID_GAP = 20;
const BLOCK_W = 820;
const LINE = "#8AA1C0";
const HEAD = "#5273A0";

const arrowRight: React.CSSProperties = {
  width: 0, height: 0, borderTop: "4px solid transparent", borderBottom: "4px solid transparent", borderLeft: `7px solid ${HEAD}`,
};

// Only "Included" (final) stages represent an actual clickable record set —
// every other stage is a process count with nothing behind it to open, so it
// renders as an inert card rather than a dead click.
function StageNode({ stage, isActive, onClick }: { stage: PrismaStage; isActive: boolean; onClick?: () => void }) {
  const colors = STAGE_COLORS[stage.type];
  const clickable = stage.type === "final" && !!onClick;

  const isFinal = stage.type === "final";

  const content = (
    <div className="flex flex-col gap-1">
      <span
        className={cn(
          "font-bold tabular-nums font-['Inter',sans-serif]",
          isFinal ? "text-[40px] leading-[26px]" : "text-[20px] leading-[20.9px]"
        )}
        style={{ color: colors.countColor }}
      >
        {stage.count.toLocaleString()}
      </span>
      <p
        className={cn(
          "font-semibold font-['Inter',sans-serif]",
          isFinal ? "text-[24px] leading-[24px]" : "text-[14px] leading-[16.9px]"
        )}
        style={{ color: colors.text }}
      >
        {stage.label}
      </p>
      {stage.sublabel && (
        <p
          className={cn(
            "font-normal font-['Inter',sans-serif]",
            isFinal ? "text-[16px] leading-normal" : "text-[12px] leading-[13.75px]"
          )}
          style={{ color: isFinal ? "#F9FAFB" : "#9ca3af" }}
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
      <div className="w-full h-full text-left rounded-[10px] border px-4 py-3" style={sharedStyle}>
        {content}
      </div>
    );
  }

  return (
    <button
      onClick={onClick}
      aria-label={`${stage.label}: ${stage.count} references. Click to view studies.`}
      className={cn(
        "w-full h-full text-left rounded-[10px] border px-4 py-3 transition-all duration-150",
        "focus:outline-none focus:ring-2 focus:ring-[#2E75B5]/40 hover:brightness-110",
        isActive && "ring-2 ring-[#2E75B5]"
      )}
      style={sharedStyle}
    >
      {content}
    </button>
  );
}

function PhaseLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[16px] font-medium leading-[19.5px] text-[#2E75B5] font-['Inter',sans-serif]">
      {children}
    </span>
  );
}

/** A section: right-aligned anchor label in the left rail, flow content beside it. */
function SectionRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-stretch">
      <div className="shrink-0 pt-1.5 pr-[18px] text-left" style={{ width: LABEL_W }}>
        <PhaseLabel>{label}</PhaseLabel>
      </div>
      <div className="shrink-0 relative" style={{ width: BLOCK_W }}>
        {children}
      </div>
    </div>
  );
}

/**
 * One stacked card hanging off the vertical spine: a horizontal arm from the
 * spine into the card, with an arrowhead at the card edge.
 */
function SpineCard({ stage, isActive, onNodeClick }: { stage: PrismaStage; isActive: boolean; onNodeClick: (s: PrismaStage) => void }) {
  return (
    <div className="relative" style={{ paddingLeft: CARD_X, paddingBottom: 14 }}>
      <div
        className="absolute"
        style={{ left: RAIL_X, top: 28, height: 1.5, width: CARD_X - RAIL_X - 7, background: LINE }}
      />
      <div className="absolute" style={{ left: CARD_X - 7, top: 28, transform: "translateY(-50%)", ...arrowRight }} />
      <div style={{ width: CARD_W }}>
        <StageNode stage={stage} isActive={isActive} onClick={() => onNodeClick(stage)} />
      </div>
    </div>
  );
}

// Reverse reading order — each section lists its cards top-to-bottom exactly as
// drawn in Figma: in-flight and excluded branches first, then the surviving
// count that carries into the section above.
const SECTIONS: { id: string; label: string; cardIds: string[] }[] = [
  { id: "eligibility", label: "Eligibility",   cardIds: ["currently-screening-ft", "excluded-fulltext", "fulltext-assessed"] },
  { id: "screening",   label: "Screening",     cardIds: ["currently-screening", "excluded-title", "excluded-abstract", "records-screened"] },
  { id: "dedup",       label: "Deduplication", cardIds: ["duplicates", "total-identified", "records-after-dedup"] },
];

/** The three Identification sources, bracketed together at the foot of the flow. */
function IdentificationRow({
  sources,
  activeNodeId,
  onNodeClick,
}: {
  sources: PrismaStage[];
  activeNodeId?: string;
  onNodeClick: (s: PrismaStage) => void;
}) {
  const single = sources.length === 1;
  const totalW = single ? CARD_W : sources.length * ID_W + (sources.length - 1) * ID_GAP;
  const firstCx = single ? CARD_X + CARD_W / 2 : ID_W / 2;
  const lastCx = single ? firstCx : totalW - ID_W / 2;
  const H = 44;
  const railY = 30;
  const r = 8;

  return (
    <div className="relative">
      {/* bracket rising from the source cards up to the spine */}
      <svg width={Math.max(totalW, RAIL_X + 40)} height={H} style={{ display: "block" }}>
        <path
          d={`M ${RAIL_X} 0 V ${railY}`}
          stroke={LINE}
          strokeWidth={1.5}
          fill="none"
        />
        {single ? (
          <path d={`M ${firstCx} ${railY} V ${H}`} stroke={LINE} strokeWidth={1.5} fill="none" />
        ) : (
          <>
            <path
              d={`M ${firstCx} ${H} V ${railY + r} Q ${firstCx} ${railY} ${firstCx + r} ${railY} H ${lastCx - r} Q ${lastCx} ${railY} ${lastCx} ${railY + r} V ${H}`}
              fill="none"
              stroke={LINE}
              strokeWidth={1.5}
            />
            {sources.slice(1, -1).map((_, i) => (
              <path
                key={i}
                d={`M ${(i + 1) * (ID_W + ID_GAP) + ID_W / 2} ${railY} V ${H}`}
                stroke={LINE}
                strokeWidth={1.5}
                fill="none"
              />
            ))}
            <path d={`M ${RAIL_X} ${railY} H ${firstCx}`} stroke={LINE} strokeWidth={1.5} fill="none" />
          </>
        )}
      </svg>

      {single ? (
        <div style={{ paddingLeft: CARD_X, width: CARD_X + CARD_W }}>
          <StageNode stage={sources[0]} isActive={activeNodeId === sources[0].id} onClick={() => onNodeClick(sources[0])} />
        </div>
      ) : (
        <div className="flex" style={{ gap: ID_GAP }}>
          {sources.map((stage) => (
            <div key={stage.id} style={{ width: ID_W }}>
              <StageNode stage={stage} isActive={activeNodeId === stage.id} onClick={() => onNodeClick(stage)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function PrismaFlowchart({ stages, onNodeClick, activeNodeId }: PrismaFlowchartProps) {
  // Figma node 13:3117 is the default state: collapsed to the Included row.
  const [showProcess, setShowProcess] = useState(false);

  const stageMap = Object.fromEntries(stages.map((s) => [s.id, s]));
  const pick = (ids: string[]) => ids.map((id) => stageMap[id]).filter(Boolean) as PrismaStage[];

  const included = pick(["studies-systematic", "studies-meta"]);
  const idSources = pick(["databases", "auto-update", "manual-update"]);
  const presentSections = SECTIONS.map((s) => ({ ...s, cards: pick(s.cardIds) })).filter((s) => s.cards.length > 0);

  return (
    <div className="w-full" style={{ maxWidth: LABEL_W + BLOCK_W }}>
      {/* ── Included — the headline result, always visible ── */}
      <h2 className="mb-4 text-[32px] leading-[19.5px] font-medium text-[#2E75B5] font-['Inter',sans-serif]">
        Included studies
      </h2>
      <div className="flex" style={{ gap: 16 }}>
        {included.map((stage) => (
          <div key={stage.id} style={{ width: INCLUDED_W }}>
            <StageNode stage={stage} isActive={activeNodeId === stage.id} onClick={() => onNodeClick(stage)} />
          </div>
        ))}
      </div>

      {/* ── Disclosure ── */}
      <div>
        <button
          onClick={() => setShowProcess((o) => !o)}
          aria-expanded={showProcess}
          className="mt-5 mb-2 flex items-center gap-1.5 text-[20px] font-semibold text-[#0663AD] font-['Inter',sans-serif] hover:underline"
        >
          {showProcess ? "Hide screening process" : "Show how these studies were selected"}
          {showProcess ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {showProcess && (
        <div className="pt-2 pb-8">
          {presentSections.map((section) => (
            <SectionRow key={section.id} label={section.label}>
              {/* the spine this section's cards hang from */}
              <div className="absolute" style={{ left: RAIL_X, top: 0, bottom: 0, width: 1.5, background: LINE }} />
              {section.cards.map((card) => (
                <SpineCard
                  key={card.id}
                  stage={card}
                  isActive={activeNodeId === card.id}
                  onNodeClick={onNodeClick}
                />
              ))}
            </SectionRow>
          ))}

          {idSources.length > 0 && (
            <SectionRow label="Identification">
              <IdentificationRow sources={idSources} activeNodeId={activeNodeId} onNodeClick={onNodeClick} />
            </SectionRow>
          )}
        </div>
      )}
    </div>
  );
}
