import React, { useState } from "react";
import { FileText, Table, BarChart2, Layers, BookOpen, FlaskConical, CalendarCheck } from "lucide-react";
import { TopNav } from "../components/TopNav";
import { SideIconRail } from "../components/SideIconRail";
import { SectionCard } from "../components/SectionCard";
import { GlobalSearch } from "../components/GlobalSearch";

const stats = [
  { icon: BookOpen,      value: "47",        label: "Studies included" },
  { icon: FlaskConical,  value: "12",        label: "Interventions covered" },
  { icon: CalendarCheck, value: "June 2026", label: "Last updated" },
];

const sections = [
  { icon: FileText,  title: "PRISMA",              description: "Interactive flowchart of the systematic search and screening process with study-level detail.",          to: "/prisma" },
  { icon: Table,     title: "Summary Tables",       description: "Filterable table of included trials with study characteristics, population, and results.",                to: "/summary-tables" },
  { icon: BarChart2, title: "Meta-Analysis",        description: "Forest plots for primary and sensitivity pairwise meta-analyses across all outcomes.",                   to: "/meta-analysis" },
  { icon: Layers,    title: "Summary of Findings",  description: "GRADE Summary of Findings table showing effect estimates and certainty of evidence.",                    to: "/summary-of-findings" },
];

export function HomePage() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFDFD]">
      <TopNav />
      <div className="flex flex-1 min-h-0">
        <SideIconRail isPanelOpen={isPanelOpen} onTogglePanel={() => setIsPanelOpen((o) => !o)} />

        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">

          {/* ── Full-width hero ── */}
          <div
            className="w-full px-10 pt-14 pb-12 flex flex-col items-center justify-center text-center"
            style={{ background: "linear-gradient(160deg, rgba(133,200,250,0.22) 0%, rgba(214,234,255,0.10) 55%, rgba(255,255,255,0) 100%)" }}
          >
            <div className="max-w-5xl mx-auto w-full">
              <p className="text-[13px] font-medium text-[#2E75B5] uppercase tracking-widest mb-3 font-['Articulat_CF',sans-serif]">
                Living Systematic Review
              </p>
              <h1
                className="font-semibold text-[#101828] font-['Benton_Modern_D',serif] leading-[1.08] mb-5"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
              >
                Metastatic Castration-Resistant<br />Prostate Cancer
              </h1>
              <p
                className="text-gray-600 font-['Inter',sans-serif] leading-relaxed max-w-2xl mb-8 mx-auto"
                style={{ fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)" }}
              >
                mCRPC is an advanced form of prostate cancer that no longer responds to hormone-suppressing therapy.
                This living review continuously synthesizes evidence from randomised controlled trials to support
                clinical decision-making and guideline development.
              </p>

              {/* Search */}
              <GlobalSearch
                placeholder="Search studies, outcomes, treatments, interventions…"
                className="w-full max-w-2xl mb-10 mx-auto"
              />

              {/* Stats — inside hero */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white/70 backdrop-blur-sm border border-blue-100/60 rounded-xl px-5 py-4 flex items-center gap-3 shadow-sm"
                  >
                    <div className="w-9 h-9 rounded-lg bg-[#E4F0FE] flex items-center justify-center shrink-0">
                      <stat.icon size={18} className="text-[#2E75B5]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <div className="text-[22px] font-semibold text-[#2E75B5] leading-none font-['Articulat_CF',sans-serif]">
                        {stat.value}
                      </div>
                      <div className="text-[11px] text-gray-500 mt-0.5 font-['Inter',sans-serif]">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Explore the review ── */}
          <div className="px-10 py-10 flex flex-col gap-6">
            <h2 className="text-[24px] font-semibold text-gray-400 uppercase tracking-widest font-['Articulat_CF',sans-serif]">
              Explore the review
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {sections.map((s) => (
                <SectionCard key={s.to} {...s} />
              ))}
            </div>

            {/* Footer note */}
            <div className="border-t border-gray-100 pt-6 pb-2 mt-2">
              <p className="text-[12px] text-gray-400 font-['Inter',sans-serif]">
                This review is updated continuously as new evidence becomes available. Data last verified June 2026.
                For clinical decisions, always consult current guidelines and a qualified clinician.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
