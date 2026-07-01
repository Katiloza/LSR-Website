import React, { useState } from "react";
import { Search, FileText, Table, BarChart2, Layers } from "lucide-react";
import { TopNav } from "../components/TopNav";
import { SideIconRail } from "../components/SideIconRail";
import { StatsStrip } from "../components/StatsStrip";
import { SectionCard } from "../components/SectionCard";

const sections = [
  {
    icon: FileText,
    title: "PRISMA",
    description: "Interactive flowchart of the systematic search and screening process with study-level detail.",
    to: "/prisma",
  },
  {
    icon: Table,
    title: "Summary Tables",
    description: "Filterable table of included trials with study characteristics, population, and results.",
    to: "/summary-tables",
  },
  {
    icon: BarChart2,
    title: "Meta-Analysis",
    description: "Forest plots for primary and sensitivity pairwise meta-analyses across all outcomes.",
    to: "/meta-analysis",
  },
  {
    icon: Layers,
    title: "Summary of Findings",
    description: "GRADE Summary of Findings table showing effect estimates and certainty of evidence.",
    to: "/summary-of-findings",
  },
];

export function HomePage() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD]">
      <TopNav />
      <div className="flex flex-1 min-h-0">
        <SideIconRail
          isPanelOpen={isPanelOpen}
          onTogglePanel={() => setIsPanelOpen((o) => !o)}
        />

        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          <main className="max-w-4xl mx-auto w-full px-8 py-12 flex flex-col gap-12">

            {/* Page header */}
            <div
              className="rounded-2xl px-10 py-10 border border-blue-50"
              style={{ background: "linear-gradient(160deg, rgba(133,200,250,0.15) 0%, rgba(255,255,255,0) 60%)" }}
            >
              <p className="text-[13px] font-medium text-[#2E75B5] uppercase tracking-widest mb-2 font-['Articulat_CF',sans-serif]">
                Living Systematic Review
              </p>
              <h1 className="text-[44px] font-semibold text-[#101828] font-['Benton_Modern_D',serif] leading-tight mb-4">
                Metastatic Castration-Resistant<br />Prostate Cancer
              </h1>
              <p className="text-[16px] text-gray-600 font-['Inter',sans-serif] leading-relaxed max-w-2xl">
                mCRPC is an advanced form of prostate cancer that no longer responds to hormone-suppressing therapy. This living review continuously synthesizes evidence from randomised controlled trials to support clinical decision-making and guideline development.
              </p>

              <div className="mt-8 relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#2E75B5] opacity-60" size={18} />
                <input
                  type="text"
                  placeholder="Search studies, outcomes, treatments, interventions…"
                  className="w-full pl-12 pr-6 py-3 rounded-full border border-blue-100 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.12)] bg-white text-[14px] font-['Inter',sans-serif] focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Stats */}
            <StatsStrip />

            {/* Section cards */}
            <div className="flex flex-col gap-4">
              <h2 className="text-[12px] font-semibold text-gray-400 uppercase tracking-widest font-['Articulat_CF',sans-serif]">
                Explore the review
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {sections.map((s) => (
                  <SectionCard key={s.to} {...s} />
                ))}
              </div>
            </div>

            {/* Footer note */}
            <div className="border-t border-gray-100 pt-6 pb-4">
              <p className="text-[12px] text-gray-400 font-['Inter',sans-serif]">
                This review is updated continuously as new evidence becomes available. Data last verified June 2026.
                For clinical decisions, always consult current guidelines and a qualified clinician.
              </p>
            </div>

          </main>
        </div>
      </div>
    </div>
  );
}
