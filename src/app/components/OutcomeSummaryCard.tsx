import React from "react";
import { ChevronDown } from "lucide-react";
import { certaintyColor, CertaintyLevel, EffectDirection } from "./CertaintyBadge";
import { cn } from "../lib/utils";

/**
 * Shared outcome card — Figma nodes 1:7704 (Summary of Findings) and 9:816 /
 * 13:5771 (Meta-Analysis). Identical in both places: a certainty-coloured
 * header band stating the *direction* of the effect, then the outcome name,
 * its evidence base, and a single action.
 *
 * The colour is the message. Direction picks the hue (green benefit, red harm,
 * amber neither), certainty picks the shade — so a reader can rank the
 * strength of every outcome on the page without reading a number.
 */

const DIRECTION_LABEL: Record<EffectDirection, string> = {
  benefit: "Benefit",
  harm: "Harm",
  neither: "Neither benefit nor harm",
};

export interface OutcomeSummaryCardProps {
  name: string;
  level: CertaintyLevel;
  direction: EffectDirection;
  studies: number;
  participants: number;
  /** When true the card is the one rendered below and the action reads "Showing below". */
  selected?: boolean;
  actionLabel?: string;
  onAction?: () => void;
  /** Fixed card width; Meta-Analysis pins these in a row, SoF lets the grid size them. */
  width?: number | string;
}

export function OutcomeSummaryCard({
  name,
  level,
  direction,
  studies,
  participants,
  selected = false,
  actionLabel = "View more",
  onAction,
  width,
}: OutcomeSummaryCardProps) {
  const { bg, text } = certaintyColor(level, direction);

  return (
    <div
      className="rounded-[10px] overflow-hidden border-2 bg-white shrink-0 transition-colors"
      style={{ borderColor: selected ? bg : "#E5E7EB", width }}
    >
      <div className="px-4 py-3 flex flex-col gap-1" style={{ backgroundColor: bg, color: text }}>
        <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.9px] font-['Inter',sans-serif]">
          <span className="size-[6px] rounded-full bg-current opacity-90" />
          {level} certainty
        </span>
        <span className="text-[20px] font-semibold leading-tight font-['Articulat_CF',sans-serif]">
          {DIRECTION_LABEL[direction]}
        </span>
      </div>

      <div className="px-4 py-4 flex flex-col gap-3">
        <p className="text-[20px] font-semibold leading-tight text-[#101828] font-['Articulat_CF',sans-serif]">
          {name}
        </p>

        <div className="flex gap-6">
          {[
            { label: "Studies", value: studies.toLocaleString() },
            { label: "Participants", value: participants.toLocaleString() },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-0.5">
              <span className="text-[10px] font-bold uppercase tracking-[0.9px] text-[#6a7282] font-['Inter',sans-serif]">
                {stat.label}
              </span>
              <span className="text-[16px] font-bold text-[#101828] tabular-nums font-['Articulat_CF',sans-serif]">
                {stat.value}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={onAction}
          aria-pressed={selected}
          className={cn(
            "self-start flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-semibold font-['Inter',sans-serif] transition-colors",
            selected
              ? "bg-[#2E75B5] text-white"
              : "border border-[#2E75B5] text-[#2E75B5] hover:bg-[#E4F0FE]"
          )}
        >
          {selected ? "Showing below" : actionLabel}
          {selected && <ChevronDown size={13} />}
        </button>
      </div>
    </div>
  );
}
