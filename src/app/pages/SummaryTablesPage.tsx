import React, { useState } from "react";
import { useSearchParams } from "react-router";
import { Construction, Search } from "lucide-react";
import { TopNav } from "../components/TopNav";
import { SideIconRail } from "../components/SideIconRail";
import { NavPanelShell } from "../components/NavPanelShell";
import { SummaryTable, StudyRow } from "../components/SummaryTable";
import { FilterChip } from "../components/FilterChip";
import { cn } from "../lib/utils";

type TableTab = "interactive-table" | "results-table" | "traffic-plot";

const TABS: { id: TableTab; label: string }[] = [
  { id: "interactive-table", label: "Interactive Table" },
  { id: "results-table", label: "Results Table" },
  { id: "traffic-plot", label: "Traffic Plot" },
];

const MOCK_STUDIES: StudyRow[] = [
  { id: "1", study: "Smith et al.", year: 2024, trialName: "PROpel", treatment: "Olaparib + Abiraterone", control: "Placebo + Abiraterone", lineOfTherapy: "First-line", phase: "Phase III", n: 796, therapyType: "Combination", treatmentClass: "PARPi", primaryEndpoint: "rPFS", hrOs: "0.83 (0.66–1.03)", hrPfs: "0.66 (0.54–0.81)" },
  { id: "2", study: "Saad et al.", year: 2023, trialName: "TALAPRO-2", treatment: "Talazoparib + Enzalutamide", control: "Placebo + Enzalutamide", lineOfTherapy: "First-line", phase: "Phase III", n: 1095, therapyType: "Combination", treatmentClass: "PARPi", primaryEndpoint: "rPFS", hrOs: "0.89 (0.69–1.14)", hrPfs: "0.63 (0.51–0.78)" },
  { id: "3", study: "Chi et al.", year: 2023, trialName: "MAGNITUDE", treatment: "Niraparib + Abiraterone", control: "Placebo + Abiraterone", lineOfTherapy: "First-line", phase: "Phase III", n: 423, therapyType: "Combination", treatmentClass: "PARPi", primaryEndpoint: "rPFS (HRR+)", hrOs: "0.88 (0.58–1.34)", hrPfs: "0.53 (0.36–0.79)" },
  { id: "4", study: "Sartor et al.", year: 2021, trialName: "VISION", treatment: "177Lu-PSMA-617 + SoC", control: "Standard of care", lineOfTherapy: "Third-line or later", phase: "Phase III", n: 831, therapyType: "Monotherapy", treatmentClass: "PSMA", primaryEndpoint: "rPFS, OS", hrOs: "0.62 (0.52–0.74)", hrPfs: "0.40 (0.29–0.57)" },
  { id: "5", study: "de Wit et al.", year: 2019, trialName: "CARD", treatment: "Cabazitaxel", control: "Abiraterone / Enzalutamide", lineOfTherapy: "Second-line", phase: "Phase III", n: 255, therapyType: "Monotherapy", treatmentClass: "Chemotherapy", primaryEndpoint: "rPFS", hrOs: "0.64 (0.46–0.89)", hrPfs: "0.54 (0.40–0.73)" },
  { id: "6", study: "Armstrong et al.", year: 2023, trialName: "TRITON3", treatment: "Rucaparib", control: "Physician's choice", lineOfTherapy: "Second-line", phase: "Phase III", n: 270, therapyType: "Monotherapy", treatmentClass: "PARPi", primaryEndpoint: "rPFS (BRCA1/2)", hrOs: "0.94 (0.65–1.35)", hrPfs: "0.50 (0.33–0.74)" },
  { id: "7", study: "Hussain et al.", year: 2020, trialName: "PROfound", treatment: "Olaparib", control: "Enzalutamide / Abiraterone", lineOfTherapy: "Second-line", phase: "Phase III", n: 387, therapyType: "Monotherapy", treatmentClass: "PARPi", primaryEndpoint: "rPFS (HRR+)", hrOs: "0.69 (0.50–0.97)", hrPfs: "0.34 (0.25–0.47)" },
  { id: "8", study: "Fizazi et al.", year: 2012, trialName: "COU-AA-302", treatment: "Abiraterone + Prednisone", control: "Placebo + Prednisone", lineOfTherapy: "First-line", phase: "Phase III", n: 1088, therapyType: "Monotherapy", treatmentClass: "NHT", primaryEndpoint: "rPFS, OS", hrOs: "0.75 (0.61–0.93)", hrPfs: "0.53 (0.45–0.62)" },
  { id: "9", study: "Beer et al.", year: 2014, trialName: "PREVAIL", treatment: "Enzalutamide", control: "Placebo", lineOfTherapy: "First-line", phase: "Phase III", n: 1717, therapyType: "Monotherapy", treatmentClass: "NHT", primaryEndpoint: "rPFS, OS", hrOs: "0.73 (0.63–0.85)", hrPfs: "0.19 (0.15–0.23)" },
  { id: "10", study: "Scher et al.", year: 2012, trialName: "AFFIRM", treatment: "Enzalutamide", control: "Placebo", lineOfTherapy: "Second-line", phase: "Phase III", n: 1199, therapyType: "Monotherapy", treatmentClass: "NHT", primaryEndpoint: "OS", hrOs: "0.63 (0.53–0.75)", hrPfs: "0.40 (0.35–0.47)" },
  { id: "11", study: "Ryan et al.", year: 2013, trialName: "COU-AA-301", treatment: "Abiraterone + Prednisone", control: "Placebo + Prednisone", lineOfTherapy: "Second-line", phase: "Phase III", n: 1195, therapyType: "Monotherapy", treatmentClass: "NHT", primaryEndpoint: "OS", hrOs: "0.74 (0.64–0.86)", hrPfs: "0.67 (0.59–0.78)" },
  { id: "12", study: "Fizazi et al.", year: 2017, trialName: "LATITUDE", treatment: "Abiraterone + ADT", control: "Placebo + ADT", lineOfTherapy: "First-line", phase: "Phase III", n: 1199, therapyType: "Combination", treatmentClass: "NHT", primaryEndpoint: "OS, rPFS", hrOs: "0.62 (0.51–0.76)", hrPfs: "0.47 (0.39–0.55)" },
];

const FILTER_CONFIGS = [
  { id: "therapyType", label: "Therapy type", options: [{ label: "Monotherapy", count: 7 }, { label: "Combination", count: 5 }] },
  { id: "treatmentClass", label: "Treatment class", options: [{ label: "NHT", count: 5 }, { label: "Chemotherapy", count: 1 }, { label: "PARPi", count: 5 }, { label: "PSMA", count: 1 }] },
  { id: "lineOfTherapy", label: "Line of therapy", options: [{ label: "First-line", count: 6 }, { label: "Second-line", count: 5 }, { label: "Third-line or later", count: 1 }] },
  { id: "phase", label: "Trial phase", options: [{ label: "Phase II", count: 0 }, { label: "Phase III", count: 12 }] },
];

function PlaceholderView({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4 text-gray-400">
      <Construction size={32} strokeWidth={1.5} />
      <div className="text-center">
        <p className="text-[15px] font-medium text-gray-500 font-['Articulat_CF',sans-serif]">{title}</p>
        <p className="text-[13px] font-['Inter',sans-serif] mt-1">This view is under development.</p>
      </div>
    </div>
  );
}

export function SummaryTablesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = (searchParams.get("tab") as TableTab) ?? "interactive-table";
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});

  const setTab = (t: TableTab) => setSearchParams({ tab: t });
  const hasFilters = Object.values(activeFilters).some((v) => v.length > 0);

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD]">
      <TopNav />
      <div className="flex flex-1 min-h-0">
        <SideIconRail isPanelOpen={isPanelOpen} onTogglePanel={() => setIsPanelOpen((o) => !o)} />

        {/* On-page nav */}
        <NavPanelShell isOpen={isPanelOpen}>
          <div className="flex flex-col gap-8 px-6 py-6">
            <div>
              <h2 className="text-[22px] font-medium text-[#2E75B5] tracking-tight font-['Benton_Modern_D',serif] mb-1">
                Summary Tables
              </h2>
              <p className="text-[12px] text-gray-400 font-['Inter',sans-serif]">
                Study characteristics & results
              </p>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Views</span>
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all w-full text-left",
                    activeTab === tab.id
                      ? "bg-[#F3F8FE] text-[#2E75B5]"
                      : "text-gray-500 hover:bg-gray-50",
                    tab.id !== "interactive-table" && "opacity-50"
                  )}
                >
                  {tab.label}
                  {tab.id !== "interactive-table" && (
                    <span className="ml-auto text-[9px] font-bold text-gray-300 uppercase tracking-wide">Soon</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </NavPanelShell>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <main className="rounded-[20px] bg-white border-2 border-[#D1D5DC]/25 m-2">
            <div
              className="rounded-[18px] p-8 mx-1 my-1"
              style={{ background: "linear-gradient(160deg, rgba(133,200,250,0.15) 0%, rgba(255,255,255,0) 60%)" }}
            >
              <span className="text-[13px] text-gray-500 font-['Articulat_CF',sans-serif] mb-1 block">
                Systematic Review — mCRPC
              </span>
              <h1 className="text-[40px] font-semibold text-[#101828] font-['Benton_Modern_D',serif] leading-tight mb-3">
                Summary Tables
              </h1>
              <p className="text-[15px] text-gray-600 font-['Inter',sans-serif] leading-relaxed max-w-2xl">
                Study characteristics, population details, and results from all {MOCK_STUDIES.length} clinical trials
                included in the living systematic review. Filter by study characteristics or toggle column visibility.
              </p>

              <div className="mt-8 relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2E75B5] opacity-60" size={18} />
                <input
                  type="text"
                  placeholder="Search studies, treatments, trials…"
                  className="w-full pl-12 pr-6 py-3 rounded-full border border-blue-100 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.12)] bg-white text-[14px] font-['Inter',sans-serif] focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="p-8">
              {/* Tab bar */}
              <div className="flex gap-1 mb-6 border-b border-gray-100 pb-0">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setTab(tab.id)}
                    className={cn(
                      "px-4 py-2.5 text-[13px] font-medium transition-all border-b-2 -mb-px",
                      activeTab === tab.id
                        ? "border-[#2E75B5] text-[#2E75B5]"
                        : "border-transparent text-gray-500 hover:text-gray-700",
                      tab.id !== "interactive-table" && "opacity-40"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {activeTab === "interactive-table" && (
                <>
                  {/* Filter chips */}
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    {FILTER_CONFIGS.map((cfg) => (
                      <FilterChip
                        key={cfg.id}
                        label={cfg.label}
                        options={cfg.options}
                        selectedOptions={activeFilters[cfg.id] ?? []}
                        onChange={(sel) => setActiveFilters((f) => ({ ...f, [cfg.id]: sel }))}
                      />
                    ))}
                    {hasFilters && (
                      <button
                        onClick={() => setActiveFilters({})}
                        className="flex items-center gap-1 text-[12px] text-gray-400 hover:text-gray-700 transition-colors px-2 py-1 rounded-lg hover:bg-gray-100"
                      >
                        Clear all
                      </button>
                    )}
                  </div>

                  <SummaryTable rows={MOCK_STUDIES} activeFilters={activeFilters} />
                </>
              )}

              {activeTab === "results-table" && <PlaceholderView title="Results Table" />}
              {activeTab === "traffic-plot" && <PlaceholderView title="Traffic Plot" />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
