import React from "react";

export type CertaintyLevel = "High" | "Moderate" | "Low" | "Very Low";

const CERTAINTY_CONFIG: Record<CertaintyLevel, { bg: string; text: string; border: string; dot: string }> = {
  High:      { bg: "#ECFDF5", text: "#065F46", border: "#A7F3D0", dot: "#10B981" },
  Moderate:  { bg: "#FFFBEB", text: "#92400E", border: "#FDE68A", dot: "#F59E0B" },
  Low:       { bg: "#FFF7ED", text: "#9A3412", border: "#FED7AA", dot: "#F97316" },
  "Very Low":{ bg: "#FEF2F2", text: "#991B1B", border: "#FECACA", dot: "#EF4444" },
};

interface CertaintyBadgeProps {
  level: CertaintyLevel;
}

export function CertaintyBadge({ level }: CertaintyBadgeProps) {
  const cfg = CERTAINTY_CONFIG[level];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold border"
      style={{ backgroundColor: cfg.bg, color: cfg.text, borderColor: cfg.border }}
      aria-label={`Certainty of evidence: ${level}`}
    >
      <span
        className="w-1.5 h-1.5 rounded-full shrink-0"
        style={{ backgroundColor: cfg.dot }}
        aria-hidden="true"
      />
      {level}
    </span>
  );
}
