import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router";
import { GlobalSearch } from "../components/GlobalSearch";
import { cn } from "../lib/utils";
import { TopNav } from "../components/TopNav";
import { SideIconRail } from "../components/SideIconRail";
import { OnPageNav, AnalysisType } from "../components/OnPageNav";
import { ForestPlot } from "../components/ForestPlot";
import { FilterChip } from "../components/FilterChip";
import { 
  PRIMARY_NAV_SECTIONS, 
  SENSITIVITY_NAV_SECTIONS, 
  MOCK_FOREST_DATA 
} from "../mockData";

export function MetaAnalysis() {
  const [searchParams] = useSearchParams();
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [analysisType, setAnalysisType] = useState<AnalysisType>(() => {
    const hl = searchParams.get("hl");
    return hl === "Sensitivity" ? "Sensitivity" : "Primary";
  });
  const [sensitivityOutcome, setSensitivityOutcome] = useState<"os" | "pfs">("os");
  const [activeSection, setActiveSection] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Scroll to top when analysis type changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const firstId = analysisType === "Primary" ? "os" : "brca-pos-c1";
    setActiveSection(firstId);
  }, [analysisType]);

  // Scrollspy logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [analysisType]);

  const handleNavigate = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // sticky header + padding
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveSection(id);
    }
  };

  const currentContent = analysisType === "Primary"
    ? ["os"]
    : sensitivityOutcome === "os" ? ["brca-pos-c1"] : ["pfs-brca-pos-c1"];

  const sensitivityTabs = [
    { id: "os" as const, label: "Overall Survival" },
    { id: "pfs" as const, label: "Progression-free Survival" },
  ];

  const filterConfigs = [
    { id: "therapy", label: "Type of therapy", options: [{ label: "Monotherapy", count: 48 }, { label: "Combination", count: 24 }] },
    { id: "class", label: "Treatment class", options: [{ label: "NHT", count: 32 }, { label: "Chemotherapy", count: 18 }, { label: "PARPi", count: 22 }] },
    { id: "treatment", label: "Treatment", options: [{ label: "Enzalutamide", count: 12 }, { label: "Abiraterone", count: 15 }, { label: "Olaparib", count: 10 }] },
    { id: "control", label: "Control", options: [{ label: "Placebo", count: 40 }, { label: "Standard of Care", count: 30 }] },
    { id: "line", label: "Line of therapy", options: [{ label: "First-line", count: 50 }, { label: "Second-line", count: 20 }] },
    { id: "phase", label: "Trial phase", options: [{ label: "Phase II", count: 25 }, { label: "Phase III", count: 45 }] },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD]">
      {/* 1. Top Nav (Full Width) */}
      <TopNav />

      <div className="flex flex-1 min-h-0">
        {/* 2. Side Icon Rail (Fixed width, persistent) */}
        <SideIconRail
          isPanelOpen={isPanelOpen}
          onTogglePanel={() => setIsPanelOpen(!isPanelOpen)}
        />

        {/* 3. On-Page Nav (Togglable wide panel) */}
        <OnPageNav 
          isOpen={isPanelOpen}
          analysisType={analysisType}
          setAnalysisType={setAnalysisType}
          activeSectionId={activeSection}
          onNavigate={handleNavigate}
          primarySections={PRIMARY_NAV_SECTIONS}
          sensitivitySections={SENSITIVITY_NAV_SECTIONS}
        />
        
        {/* 4. Main Content Area (Flexible width, reflows) */}
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
                  
                  <div className="flex flex-wrap gap-2">
                    {filterConfigs.map((config) => (
                      <FilterChip 
                        key={config.id}
                        label={config.label}
                        options={config.options}
                        selectedOptions={selectedFilters[config.id] || []}
                        onChange={(selected) => setSelectedFilters({ ...selectedFilters, [config.id]: selected })}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Analysis Section (Now inside the white container) */}
            <div className="w-full">
              <div className="px-[32px]">
                <h2 className="font-medium text-[#101828] mb-6 font-['Articulat_CF',sans-serif] text-[40px]">
                  {analysisType} Analysis
                </h2>

                {analysisType === "Sensitivity" && (
                  <div className="flex gap-1 border-b border-gray-100 mb-8">
                    {sensitivityTabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setSensitivityOutcome(tab.id)}
                        className={cn(
                          "px-4 py-2.5 text-[13px] font-medium transition-all border-b-2 -mb-px",
                          sensitivityOutcome === tab.id
                            ? "border-[#2E75B5] text-[#2E75B5]"
                            : "border-transparent text-gray-500 hover:text-gray-700"
                        )}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                )}
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
