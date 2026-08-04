import React from "react";

export type CertaintyLevel = "High" | "Moderate" | "Low" | "Very Low";
export type EffectDirection = "benefit" | "harm" | "neither";

/**
 * Color guide: direction (benefit / harm / neither) picks the hue, certainty
 * level picks the shade — darker/more saturated at High, lighter at Low.
 * "Very Low" extends the same ramp one step lighter than "Low" (the official
 * GRADE color guide this was modeled on only shows three certainty rows;
 * this keeps every step visually distinct, which was also the "give Low a
 * different colour than Moderate" fix called out separately in feedback).
 */
const COLOR_GUIDE: Record<EffectDirection, Record<CertaintyLevel, { bg: string; text: string }>> = {
  benefit: {
    High:      { bg: "#2E7D32", text: "#FFFFFF" },
    Moderate:  { bg: "#4CAF50", text: "#FFFFFF" },
    Low:       { bg: "#81C784", text: "#0D3311" },
    "Very Low":{ bg: "#C8E6C9", text: "#1B5E20" },
  },
  harm: {
    High:      { bg: "#B3261E", text: "#FFFFFF" },
    Moderate:  { bg: "#DC5B52", text: "#FFFFFF" },
    Low:       { bg: "#EFA6A0", text: "#5C120D" },
    "Very Low":{ bg: "#FBDEDC", text: "#7A1B15" },
  },
  neither: {
    High:      { bg: "#C9962B", text: "#FFFFFF" },
    Moderate:  { bg: "#E0B655", text: "#3D2E05" },
    Low:       { bg: "#F0D896", text: "#3D2E05" },
    "Very Low":{ bg: "#FBEFD2", text: "#5C4A0E" },
  },
};
const NOT_APPLICABLE = { bg: "#E5E7EB", text: "#6B7280" };

export function certaintyColor(level: CertaintyLevel, direction?: EffectDirection) {
  if (!direction) return NOT_APPLICABLE;
  return COLOR_GUIDE[direction][level];
}

interface CertaintyBadgeProps {
  level: CertaintyLevel;
  direction?: EffectDirection;
}

export function CertaintyBadge({ level, direction }: CertaintyBadgeProps) {
  const { bg, text } = certaintyColor(level, direction);
  const label = direction ? `${level} certainty ${direction === "neither" ? "of no effect" : direction}` : `${level} certainty`;
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold"
      style={{ backgroundColor: bg, color: text }}
      aria-label={`Certainty of evidence: ${label}`}
      title={label}
    >
      {level}
    </span>
  );
}
