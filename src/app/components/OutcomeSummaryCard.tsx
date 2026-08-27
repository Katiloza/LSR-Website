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

/** First letter capitalised, everything after it lower case. */
const sentenceCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();

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
      role={onAction ? "button" : undefined}
      tabIndex={onAction ? 0 : undefined}
      onClick={onAction}
      onKeyDown={
        onAction
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onAction();
              }
            }
          : undefined
      }
      aria-pressed={onAction ? selected : undefined}
      className={cn(
        "group rounded-[10px] overflow-hidden border-2 bg-white shrink-0 transition-colors",
        onAction && "cursor-pointer hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#2E75B5]/40 focus:ring-offset-1"
      )}
      style={{ borderColor: selected ? bg : "#E5E7EB", width }}
    >
      <div className="px-4 py-3 flex flex-col gap-1" style={{ backgroundColor: bg, color: text }}>
        <span className="flex items-center gap-1.5 text-[14px] font-bold tracking-[0.88px] font-['Inter',sans-serif]">
          <span className="size-[8px] rounded-full bg-current opacity-90" />
          {sentenceCase(level)} certainty
        </span>
        <span className="text-[20px] font-semibold leading-tight font-['Inter',sans-serif]">
          {DIRECTION_LABEL[direction]}
        </span>
      </div>

      <div className="px-4 py-4 flex flex-col gap-3">
        <p className="text-[24px] font-bold leading-[31.25px] text-[#101828] font-['Inter',sans-serif]">
          {name}
        </p>

        <div className="flex gap-6">
          {[
            { label: "Studies", value: studies.toLocaleString() },
            { label: "Participants", value: participants.toLocaleString() },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-0.5">
              <span className="text-[14px] font-semibold tracking-[0.77px] text-[#6b7280] font-['Inter',sans-serif]">
                {stat.label}
              </span>
              <span className="text-[20px] font-bold text-[#101828] tabular-nums font-['Inter',sans-serif]">
                {stat.value}
              </span>
            </div>
          ))}
        </div>

        {/* Purely visual now — the whole card is the click target (see the
            outer div's onClick), so this can't be a nested <button>. */}
        <span
          aria-hidden="true"
          className={cn(
            "self-start flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[16px] font-semibold font-['Inter',sans-serif] transition-colors",
            selected
              ? "bg-[#2E75B5] text-white"
              : "border border-[#2E75B5] text-[#2E75B5] group-hover:bg-[#E4F0FE]"
          )}
        >
          {selected ? "Showing below" : actionLabel}
          {selected && <ChevronDown size={16} />}
        </span>
      </div>
    </div>
  );
}
