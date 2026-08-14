import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router";
import { GlobalSearch } from "../components/GlobalSearch";
import { TopNav } from "../components/TopNav";
import { AppSidebar } from "../components/AppSidebar";
import { ForestPlot } from "../components/ForestPlot";
import { FilterBar } from "../components/FilterBar";
import { MOCK_FOREST_DATA } from "../mockData";

type AnalysisType = "Primary" | "Sensitivity";

export function MetaAnalysis() {
  const [searchParams] = useSearchParams();

  // Both driven by the global sidebar now (Meta-Analysis > Primary /
  // Sensitivity > Overall survival, Progression-free survival), so they live
  // in the URL rather than local-only state.
  const analysisType: AnalysisType = searchParams.get("analysis") === "Sensitivity" ? "Sensitivity" : "Primary";
  const sensitivityOutcome: "os" | "pfs" = searchParams.get("outcome") === "pfs" ? "pfs" : "os";

  const [activeSection, setActiveSection] = useState("");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const firstId = analysisType === "Primary" ? "os" : sensitivityOutcome === "os" ? "brca-pos-c1" : "pfs-brca-pos-c1";
    setActiveSection(firstId);
  }, [analysisType, sensitivityOutcome]);

  const currentContent = analysisType === "Primary"
    ? ["os"]
    : sensitivityOutcome === "os" ? ["brca-pos-c1"] : ["pfs-brca-pos-c1"];

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD]">
      <TopNav />

      <div className="flex flex-1 min-h-0">
        <AppSidebar />

        <div className="flex-1 flex flex-col min-w-0">
          <main className="rounded-[20px] bg-[#ffffff] border-[2px] border-[#D1D5DC]/25 m-[8px] p-[0px]">
            {/* Header / Intro Section */}
            <div className="relative mb-12">
              <div
                className="absolute inset-0 z-0 pointer-events-none opacity-60 rounded-xl"
                style={{ backgroundImage: "linear-gradient(180deg, rgba(133, 200, 250, 0.27) 0%, rgba(255, 255, 255, 0.27) 100%)" }}
              />

              <div className="relative z-10 p-[32px] rounded-[20px] mx-[4px] my-[0px]">
                <span className="text-[16px] text-gray-500 font-['Articulat_CF',sans-serif] mb-2 block">Systematic Review — mCRPC</span>
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
                  <div className="w-full">
                    <h1 className="text-[48px] font-semibold text-[#101828] font-['Benton_Modern_D',serif] leading-tight mb-4">
                      Pairwise Meta-Analysis
                    </h1>
                    <p className="text-[16px] text-gray-700 font-['Articulat_CF',sans-serif] leading-relaxed w-full">
                      Results are summarized as forest plots for primary analysis, sensitivity analysis, and subgroup pairwise meta-analysis. Users can choose to view results for their outcome of interest.
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-4">
                  <GlobalSearch placeholder="Search patient outcomes, treatment options, etc" />

                  <FilterBar />
                </div>
              </div>
            </div>

            {/* Analysis Section (Now inside the white container) */}
            <div className="w-full">
              <div className="px-[32px]">
                <h2 className="font-medium text-[#101828] mb-6 font-['Articulat_CF',sans-serif] text-[40px]">
                  {analysisType} Analysis
                </h2>
              </div>

              <div className="flex flex-col">
                {currentContent.map((id) => (
                  <div
                    key={id}
                    ref={el => sectionRefs.current[id] = el}
                    className="scroll-mt-48 m-[0px] p-[0px]"
                  >
                    <div className="w-full px-[32px] overflow-hidden">
                      <ForestPlot
                        data={MOCK_FOREST_DATA[id]}
                        isActive={activeSection === id}
                      />
                    </div>
                  </div>
                ))}

                <div className="h-64 flex items-center justify-center italic border-t border-dashed border-gray-200 mt-20 font-['Articulat_CF',sans-serif] text-[#868688]">
                  End of analysis results
                </div>
              </div>
            </div>
        </main>
      </div>
    </div>
  </div>
);
}
