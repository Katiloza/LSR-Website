import React from "react";
import { cn } from "../lib/utils";

export interface PrismaStage {
  id: string;
  label: string;
  count: number;
  sublabel?: string;
  type: "include" | "exclude" | "total";
  studies?: Array<{ title: string; year: number; pmid?: string }>;
}

export interface PrismaFlowchartProps {
  stages: PrismaStage[];
  onNodeClick: (stage: PrismaStage) => void;
  activeNodeId?: string;
}

const STAGE_COLORS = {
  include: { bg: "#F0F7FF", border: "#2E75B5", text: "#1a4a7a", countColor: "#2E75B5" },
  exclude: { bg: "#FFF5F5", border: "#E0A0A0", text: "#7a3030", countColor: "#C05050" },
  total: { bg: "#F8FAFC", border: "#CBD5E1", text: "#334155", countColor: "#475569" },
};

interface StageNodeProps {
  stage: PrismaStage;
  isActive: boolean;
  onClick: () => void;
}

function StageNode({ stage, isActive, onClick }: StageNodeProps) {
  const colors = STAGE_COLORS[stage.type];
  return (
    <button
      onClick={onClick}
      aria-label={`${stage.label}: ${stage.count} records. Click to view studies.`}
      className={cn(
        "w-full text-left rounded-xl border-2 px-5 py-4 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#2E75B5]/40",
        "hover:shadow-md hover:scale-[1.01]",
        isActive ? "ring-2 ring-[#2E75B5] shadow-md scale-[1.01]" : "shadow-sm"
      )}
      style={{
        backgroundColor: isActive ? "#E4F0FE" : colors.bg,
        borderColor: isActive ? "#2E75B5" : colors.border,
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold leading-snug font-['Articulat_CF',sans-serif]" style={{ color: colors.text }}>
            {stage.label}
          </p>
          {stage.sublabel && (
            <p className="text-[11px] text-gray-500 mt-0.5 font-['Inter',sans-serif]">{stage.sublabel}</p>
          )}
        </div>
        <div
          className="text-[22px] font-bold font-['Articulat_CF',sans-serif] shrink-0 tabular-nums"
          style={{ color: colors.countColor }}
        >
          {stage.count.toLocaleString()}
        </div>
      </div>
    </button>
  );
}

function Connector({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center py-1">
      <div className="w-px h-4 bg-gray-300" />
      {label && (
        <span className="text-[10px] text-gray-400 font-['Inter',sans-serif] px-1">{label}</span>
      )}
      <div className="w-px h-4 bg-gray-300" />
      <div
        className="w-0 h-0"
        style={{ borderLeft: "5px solid transparent", borderRight: "5px solid transparent", borderTop: "6px solid #CBD5E1" }}
      />
    </div>
  );
}

export function PrismaFlowchart({ stages, onNodeClick, activeNodeId }: PrismaFlowchartProps) {
  const phases = [
    {
      label: "Identification",
      stageIds: ["databases", "registers"],
      connectorLabel: undefined,
    },
    {
      label: "Screening",
      stageIds: ["screened", "excluded-screening"],
      connectorLabel: undefined,
    },
    {
      label: "Eligibility",
      stageIds: ["sought", "not-retrieved", "assessed", "excluded-eligibility"],
      connectorLabel: undefined,
    },
    {
      label: "Included",
      stageIds: ["included"],
      connectorLabel: undefined,
    },
  ];

  const stageMap = Object.fromEntries(stages.map((s) => [s.id, s]));

  return (
    <div className="w-full">
      {phases.map((phase, phaseIndex) => {
        const phaseStages = phase.stageIds.map((id) => stageMap[id]).filter(Boolean);
        if (phaseStages.length === 0) return null;

        const mainStages = phaseStages.filter((s) => s.type !== "exclude");
        const excludeStages = phaseStages.filter((s) => s.type === "exclude");

        return (
          <div key={phase.label} className="mb-2">
            {/* Phase label */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-24 shrink-0">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#2E75B5] font-['Articulat_CF',sans-serif]">
                  {phase.label}
                </span>
              </div>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            {/* Stage row */}
            <div className="flex gap-4 items-start pl-28">
              {/* Main (include/total) stages */}
              <div className="flex flex-col gap-2 flex-1 max-w-sm">
                {mainStages.map((stage) => (
                  <StageNode
                    key={stage.id}
                    stage={stage}
                    isActive={activeNodeId === stage.id}
                    onClick={() => onNodeClick(stage)}
                  />
                ))}
              </div>

              {/* Excluded stages — offset right */}
              {excludeStages.length > 0 && (
                <div className="flex flex-col gap-2 flex-1 max-w-xs">
                  {excludeStages.map((stage) => (
                    <div key={stage.id} className="flex items-start gap-2">
                      <div className="flex flex-col items-center pt-5">
                        <div className="h-px w-6 bg-gray-300" />
                      </div>
                      <div className="flex-1">
                        <StageNode
                          stage={stage}
                          isActive={activeNodeId === stage.id}
                          onClick={() => onNodeClick(stage)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Connector between phases */}
            {phaseIndex < phases.length - 1 && (
              <div className="pl-28 max-w-sm">
                <Connector />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
