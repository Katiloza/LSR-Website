import React, { useState } from "react";
import { Info } from "lucide-react";
import { cn } from "../lib/utils";
import { motion } from "motion/react";
import { useCitation } from "../lib/CitationContext";

export interface StudyData {
  id: string;
  name: string;
  trialName: string;
  hr: number;
  ci: [number, number];
  weight: number;
}

export interface ForestPlotData {
  id: string;
  title: string;
  subtitle?: string;
  studies: StudyData[];
  pooledHr: number;
  pooledCi: [number, number];
  heterogeneity: {
    i2: string;
    t2: string;
    p: string;
  };
  treatment?: string;
  control?: string;
  outcome?: string;
}

interface ForestPlotProps {
  data: ForestPlotData;
  isActive?: boolean;
}

function computeTakeaway(
  study: StudyData,
  outcome: string,
  treatment: string,
  control: string
): string {
  const [lo, hi] = study.ci;
  const significant = (lo < 1 && hi < 1) || (lo > 1 && hi > 1);

  const sigPhrase = significant
    ? "This trial found a statistically significant"
    : "This trial suggested but did not statistically confirm";

  const effectPct = Math.round(
    study.hr < 1 ? (1 - study.hr) * 100 : (study.hr - 1) * 100
  );
  const direction = study.hr < 1 ? "lower" : "higher";

  let weightNote = "";
  if (study.weight >= 30) {
    weightNote = " It was one of the most influential studies in this analysis.";
  } else if (study.weight < 15) {
    weightNote = " It contributed a smaller share to the pooled estimate.";
  }

  return `${sigPhrase} a ${effectPct}% ${direction} risk of ${outcome} with ${treatment} versus ${control}.${weightNote}`;
}

export function ForestPlot({ data, isActive }: ForestPlotProps) {
  const [hoveredStudyId, setHoveredStudyId] = useState<string | null>(null);
  const { openCitation } = useCitation();

  const outcomeLabel = data.outcome ?? data.title.split("|")[0].trim();
  const treatmentLabel = data.treatment ?? "treatment";
  const controlLabel = data.control ?? "control";

  const getPosition = (val: number) => {
    const min = 0.22;
    const max = 3;
    const logMin = Math.log(min);
    const logMax = Math.log(max);
    const logVal = Math.log(val);
    return ((logVal - logMin) / (logMax - logMin)) * 100;
  };

  const hoveredStudy = data.studies.find((s) => s.id === hoveredStudyId) ?? null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      id={data.id}
      className={cn("bg-white w-full overflow-hidden", isActive ? "" : "")}
    >
      <h3 className="font-medium mb-4 border-b border-gray-100 pb-4 font-['Inter',sans-serif] text-[24px] text-[#000105]">
        {data.title}
      </h3>

      {/* Takeaway panel — sits directly under the heading (Figma node 1:7586),
          updating in place as the user hovers different studies. */}
      <div className="mb-6 rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3 min-h-[64px] flex items-start gap-2.5">
        <Info size={15} className="text-gray-400 shrink-0 mt-0.5" />
        {hoveredStudy ? (
          <div>
            <p className="text-[12px] font-bold text-gray-900 mb-0.5">{hoveredStudy.name} · {hoveredStudy.trialName}</p>
            <p className="text-[12px] text-gray-600 leading-[1.5] font-['Inter',sans-serif]">
              {computeTakeaway(hoveredStudy, outcomeLabel, treatmentLabel, controlLabel)}
            </p>
          </div>
        ) : (
          <p className="text-[12px] text-gray-400 font-['Inter',sans-serif] self-center">
            Hover a study to see a plain-language summary here. Click any study to view its citation.
          </p>
        )}
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Table Side */}
        <div className="col-span-7 overflow-x-auto">
          <table className="w-full text-left font-['Inter',sans-serif]">
            {/* Every cell is nowrap so each row stays exactly 48px tall — the
                plot rows on the right use the same fixed 48px pitch, and a
                wrapped author name would otherwise push the two out of sync. */}
            <thead>
              <tr className="border-b border-[#D0D5DC]">
                <th className="py-2 text-[12px] font-bold text-[#101318] w-[25%] whitespace-nowrap">Study</th>
                <th className="py-2 text-[12px] font-bold text-[#101318] w-[30%] whitespace-nowrap">Trial Name</th>
                <th className="py-2 text-[12px] font-bold text-[#101318] text-center w-[10%] whitespace-nowrap">HR</th>
                <th className="py-2 text-[12px] font-bold text-[#101318] text-center w-[15%] whitespace-nowrap">95% CI</th>
                <th className="py-2 text-[12px] font-bold text-[#101318] text-right w-[20%] whitespace-nowrap">Weight</th>
              </tr>
            </thead>
            <tbody className="text-[13px]">
              {data.studies.map((study) => (
                <tr
                  key={study.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`View study record for ${study.trialName}`}
                  className={cn(
                    "border-b border-[#EAEDF1] transition-colors h-[48px] cursor-pointer focus:outline-none",
                    hoveredStudyId === study.id ? "bg-blue-50/50" : "hover:bg-gray-50/50"
                  )}
                  onMouseEnter={() => setHoveredStudyId(study.id)}
                  onMouseLeave={() => setHoveredStudyId(null)}
                  onClick={() => openCitation(study.trialName)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openCitation(study.trialName); } }}
                >
                  <td className="py-2 text-[#0663AD] hover:underline whitespace-nowrap">{study.name}</td>
                  <td className="py-2 text-[#101318] font-medium whitespace-nowrap">{study.trialName}</td>
                  <td className="py-2 text-[#101318] text-center tabular-nums whitespace-nowrap">{study.hr.toFixed(2)}</td>
                  <td className="py-2 text-[#101318] text-center tabular-nums whitespace-nowrap">[{study.ci[0].toFixed(2)}; {study.ci[1].toFixed(2)}]</td>
                  <td className="py-2 text-[#101318] text-right tabular-nums whitespace-nowrap">{study.weight.toFixed(1)}%</td>
                </tr>
              ))}
              <tr className="border-b-3 border-[#101318] bg-gray-50/30 h-[48px]">
                <td colSpan={2} className="py-2 font-bold text-[#101318] whitespace-nowrap">Random effects model</td>
                <td className="py-2 font-bold text-[#101318] text-center tabular-nums whitespace-nowrap">{data.pooledHr.toFixed(2)}</td>
                <td className="py-2 font-bold text-[#101318] text-center tabular-nums whitespace-nowrap">[{data.pooledCi[0].toFixed(2)}; {data.pooledCi[1].toFixed(2)}]</td>
                <td className="py-2 font-bold text-[#101318] text-right tabular-nums whitespace-nowrap">100%</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-2 text-[12px] text-[#333C48] font-['Inter',sans-serif]">
            Heterogeneity: I² = {data.heterogeneity.i2}; τ² = {data.heterogeneity.t2}; p = {data.heterogeneity.p}
          </p>
        </div>

        {/* Plot Side */}
        {/* Plot geometry mirrors the table exactly: the top padding matches the
            thead height and every row (studies + pooled) is the same fixed
            48px as its table row, so markers always sit beside their row. */}
        <div className="col-span-5 flex flex-col relative px-[0px] pt-[35px] pb-[72px] m-[0px]">
          <div className="w-full relative border-l border-b border-gray-300">
            {/* Axis Title */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-[13px] font-bold text-gray-900 font-['Inter',sans-serif]">
              Hazard Ratio (95% CI)
            </div>

            {/* Grid / Axis labels */}
            <div className="absolute bottom-[-24px] left-0 text-[11px] text-gray-500">0.22</div>
            <div className="absolute bottom-[-24px] right-0 text-[11px] text-gray-500">3</div>
            {/* Directional labels fixed to axis boundaries */}
            <span
              className="absolute bottom-[-54px] left-0 text-[12px] font-bold text-[#101318] font-['Inter',sans-serif] pointer-events-none"
            >
              Favours treatment
            </span>
            <span
              className="absolute bottom-[-54px] right-0 text-[12px] font-bold text-[#101318] font-['Inter',sans-serif] pointer-events-none"
            >
              Favours control
            </span>

            {/* Vertical Reference Lines */}
            {/* Line of no effect (HR = 1) - Solid Black */}
            <div
              className="absolute top-0 bottom-0 border-l border-[#101318] z-0 pointer-events-none"
              style={{ left: `${getPosition(1)}%` }}
            />

            {/* Pooled Estimate Reference - Dashed Red */}
            <div
              className="absolute top-0 bottom-0 border-l border-dashed border-[#D92D20] z-0 pointer-events-none opacity-50"
              style={{ left: `${getPosition(data.pooledHr)}%` }}
            />

            <div
              className="absolute bottom-[-24px] -translate-x-1/2 text-[11px] font-bold text-gray-900"
              style={{ left: `${getPosition(1)}%` }}
            >
              1
            </div>

            {/* Individual Points and Whiskers */}
            <div className="flex flex-col">
              {data.studies.map((study) => {
                const markerSize = Math.max(6, 4 + (study.weight * 0.8)); // Scaled box size
                return (
                  <div
                    key={study.id}
                    className={cn(
                      "relative h-[48px] shrink-0 w-full transition-colors",
                      hoveredStudyId === study.id ? "bg-blue-50/20" : ""
                    )}
                  >
                    {/* Hit Area (Full row height) — hover previews the takeaway
                        panel below; click opens the study's citation popup. */}
                    <button
                      aria-label={`View study record for ${study.trialName}`}
                      className="absolute inset-0 z-20 cursor-pointer"
                      onMouseEnter={() => setHoveredStudyId(study.id)}
                      onMouseLeave={() => setHoveredStudyId(null)}
                      onClick={() => openCitation(study.trialName)}
                    />

                    {/* Whisker */}
                    <div
                      className="absolute h-[1.2px] bg-gray-900 top-1/2 -translate-y-1/2 z-10 pointer-events-none"
                      style={{
                        left: `${getPosition(study.ci[0])}%`,
                        width: `${getPosition(study.ci[1]) - getPosition(study.ci[0])}%`
                      }}
                    />

                    {/* Marker (Square Box) */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{
                        scale: 1,
                        backgroundColor: hoveredStudyId === study.id ? "#2E75B5" : "#000000"
                      }}
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 pointer-events-none"
                      style={{
                        left: `${getPosition(study.hr)}%`,
                        width: `${markerSize}px`,
                        height: `${markerSize}px`
                      }}
                    />
                  </div>
                );
              })}

              {/* Pooled Estimate (Diamond) — same fixed pitch, directly after
                  the study rows so it lines up with the Random-effects row */}
              <div className="relative h-[48px] shrink-0 w-full">
                <div
                  className="absolute top-1/2 -translate-y-1/2 z-10"
                  style={{
                    left: `${getPosition(data.pooledCi[0])}%`,
                    width: `${getPosition(data.pooledCi[1]) - getPosition(data.pooledCi[0])}%`,
                    height: '14px'
                  }}
                >
                  <motion.svg
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className="w-full h-full text-[#D92D20] fill-current overflow-visible"
                  >
                    <path d="M 50 0 L 100 50 L 50 100 L 0 50 Z" />
                  </motion.svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </motion.div>
  );
}
