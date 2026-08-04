import React, { useState } from "react";
import { useNavigate } from "react-router";
import { FileText, Table, BarChart2, Layers, BookOpen, FlaskConical, CalendarCheck } from "lucide-react";
import { TopNav } from "../components/TopNav";
import { SideIconRail } from "../components/SideIconRail";
import { SectionCard } from "../components/SectionCard";
import { GlobalSearch } from "../components/GlobalSearch";
import { ChangelogModal } from "../components/ChangelogModal";
import { useCitation } from "../lib/CitationContext";
import { CANONICAL_TRIAL_NAMES } from "../lib/citations";
import { cn } from "../lib/utils";

// Quick-search shortcuts — jump straight to something discoverable in this
// review instead of requiring the user to type a query first.
const QUICK_SEARCHES: { label: string; to: string }[] = [
  { label: "PARPi trials",             to: "/summary-tables?tab=interactive-table&hl=PARPi" },
  { label: "Overall survival",         to: "/summary-of-findings?analysis=primary&hl=os" },
  { label: "PRISMA flow",              to: "/prisma?view=current-state" },
  { label: "Forest plots",             to: "/meta-analysis" },
  { label: "First-line therapy",       to: "/summary-tables?tab=interactive-table&hl=First-line" },
  { label: "GRADE certainty",          to: "/summary-of-findings?analysis=primary" },
];

const sections = [
  { icon: FileText,  title: "PRISMA",              description: "Interactive flowchart of the systematic search and screening process with study-level detail.",          to: "/prisma" },
  { icon: Table,     title: "Summary Tables",       description: "Filterable table of included trials with study characteristics, population, and results.",                to: "/summary-tables" },
  { icon: BarChart2, title: "Meta-Analysis",        description: "Forest plots for primary and sensitivity pairwise meta-analyses across all outcomes.",                   to: "/meta-analysis" },
  { icon: Layers,    title: "Summary of Findings",  description: "GRADE Summary of Findings table showing effect estimates and certainty of evidence.",                    to: "/summary-of-findings" },
];

export function HomePage() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [changelogOpen, setChangelogOpen] = useState(false);
  const navigate = useNavigate();
  const { openTrialList } = useCitation();

  // "Studies included" is backed by the same 12-trial dataset shown in
  // Summary Tables — kept in lock-step so a count never opens a list whose
  // length disagrees with the number the user just clicked.
  const studiesIncluded = CANONICAL_TRIAL_NAMES.length;

  const stats = [
    {
      icon: BookOpen,
      value: String(studiesIncluded),
      label: "Studies included",
      onClick: () => openTrialList("Studies included", CANONICAL_TRIAL_NAMES),
    },
    { icon: FlaskConical, value: "12", label: "Interventions covered" },
    {
      icon: CalendarCheck,
      value: "June 2026",
      label: "Last updated",
      onClick: () => setChangelogOpen(true),
    },
  ];

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
                Explore {studiesIncluded} randomized controlled trials comparing PARP inhibitors, androgen
                receptor pathway inhibitors, chemotherapy, and PSMA-targeted radioligand therapy —
                with GRADE-rated certainty for overall survival, progression-free survival,
                response, and treatment-related adverse events.
              </p>

              {/* Search */}
              <GlobalSearch
                placeholder="Search studies, outcomes, treatments, interventions…"
                className="w-full max-w-2xl mb-4 mx-auto"
              />

              {/* Quick-search shortcuts — jump straight to something discoverable */}
              <div className="flex flex-wrap gap-2 justify-center max-w-2xl mx-auto mb-10">
                {QUICK_SEARCHES.map((q) => (
                  <button
                    key={q.label}
                    onClick={() => navigate(q.to)}
                    className="px-4 py-2 rounded-full border border-blue-100 bg-white/70 text-[12px] font-medium text-gray-600 hover:border-[#2E75B5] hover:text-[#2E75B5] hover:bg-white transition-all"
                  >
                    {q.label}
                  </button>
                ))}
              </div>

              {/* Stats — inside hero */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
                {stats.map((stat) => {
                  const Wrapper = stat.onClick ? "button" : "div";
                  return (
                    <Wrapper
                      key={stat.label}
                      onClick={stat.onClick}
                      className={cn(
                        "bg-white/70 backdrop-blur-sm border border-blue-100/60 rounded-xl px-5 py-4 flex items-center gap-3 shadow-sm text-left w-full",
                        stat.onClick && "hover:border-[#2E75B5] hover:bg-white transition-all cursor-pointer"
                      )}
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
                    </Wrapper>
                  );
                })}
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

      <ChangelogModal open={changelogOpen} onClose={() => setChangelogOpen(false)} />
    </div>
  );
}
