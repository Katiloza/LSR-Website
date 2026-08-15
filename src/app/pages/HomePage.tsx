import React, { useState } from "react";
import { useNavigate } from "react-router";
import { BookOpen, FlaskConical, CalendarCheck, ArrowRight } from "lucide-react";
import { PageShell } from "../components/PageShell";
import { ChangelogModal } from "../components/ChangelogModal";
import { useCitation } from "../lib/CitationContext";
import { CANONICAL_TRIAL_NAMES } from "../lib/citations";
import { cn } from "../lib/utils";

export function HomePage() {
  const [changelogOpen, setChangelogOpen] = useState(false);
  const navigate = useNavigate();
  const { openTrialList } = useCitation();

  // "Studies included" is backed by the same 12-trial dataset shown in
  // Summary Tables — kept in lock-step so a count never opens a list whose
  // length disagrees with the number the user just clicked.
  const studiesIncluded = CANONICAL_TRIAL_NAMES.length;

  const stats = [
    {
      icon: CalendarCheck,
      value: "June 2026",
      label: "Last updated",
      onClick: () => setChangelogOpen(true),
    },
    {
      icon: BookOpen,
      value: String(studiesIncluded),
      label: "Studies included",
      onClick: () => openTrialList("Studies included", CANONICAL_TRIAL_NAMES),
    },
    { icon: FlaskConical, value: "12", label: "Outcomes covered" },
  ];

  return (
    <PageShell>
        <div className="flex-1 flex flex-col min-w-0 bg-white">
          {/* ── Hero (Figma node 13:2277) — 340px band carrying only the
                 gradient wash, title block, and lede. ── */}
          <div
            className="w-full h-[340px] shrink-0 pt-6 pb-5 px-8"
            style={{ background: "linear-gradient(174.2deg, rgba(133,200,250,0.15) 8.49%, rgba(133,200,250,0) 58.3%)" }}
          >
            {/* node 13:2324 — content inset 42px from the column edge */}
            <div className="max-w-[1024px] pl-[10px] pt-[18px] flex flex-col gap-2">
              <p className="text-[20px] font-medium leading-[18px] text-black font-['Inter',sans-serif]">
                Living Systematic Review
              </p>
              <h1 className="font-semibold text-[#101828] font-['Benton_Modern_D',serif] text-[64px] leading-[50px] pt-3">
                Metastatic Castration-Resistant
                <br />
                Prostate Cancer
              </h1>
              <p className="text-black font-['Inter',sans-serif] leading-[27.3px] text-[16px] pt-5">
                Explore randomized controlled trials comparing PARP inhibitors, androgen receptor
                pathway inhibitors, chemotherapy, and PSMA-targeted radioligand therapy — with
                GRADE-rated certainty for overall survival, progression-free survival, response, and
                treatment-related adverse events.
              </p>
            </div>
          </div>

          {/* ── "In this Review" (Figma node 13:2278) ── */}
          <div className="flex flex-col gap-8 items-start pl-[46px] pr-4 pt-[2px] pb-[61px]">
            <h2 className="text-[32px] font-medium leading-[18px] text-black font-['Inter',sans-serif]">
              In this Review
            </h2>

            {/* Stats — node 13:2280, three 302px cards across a 1006px track */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-[50px] w-full max-w-[1006px]">
              {stats.map((stat) => {
                const Wrapper = stat.onClick ? "button" : "div";
                return (
                  <Wrapper
                    key={stat.label}
                    onClick={stat.onClick}
                    className={cn(
                      "bg-white/70 rounded-[14px] px-5 py-4 flex items-center gap-4 text-left w-full h-[147px]",
                      stat.onClick && "hover:bg-white hover:shadow-sm transition-all cursor-pointer"
                    )}
                  >
                    <div className="w-[62px] h-[62px] rounded-[10px] flex items-center justify-center shrink-0">
                      <stat.icon size={44} className="text-black" strokeWidth={1.5} />
                    </div>
                    <div className="flex flex-col gap-2 min-w-0">
                      <div className="text-[32px] font-bold text-[#2E75B6] leading-[22px] font-['Articulat_CF',sans-serif] whitespace-nowrap">
                        {stat.value}
                      </div>
                      <div className="text-[16px] font-medium leading-[16.5px] text-black font-['Inter',sans-serif] whitespace-nowrap">
                        {stat.label}
                      </div>
                    </div>
                  </Wrapper>
                );
              })}
            </div>

            {/* CTA — node 13:2316 */}
            <button
              onClick={() => navigate("/summary-of-findings")}
              className="flex items-center justify-between gap-2 h-[43px] w-[215px] px-4 rounded-[24px] bg-[#2E75B5] border border-[#F3F4F6] text-[#F9FAFB] text-[15px] font-semibold leading-[22.5px] font-['Inter',sans-serif] hover:bg-[#25609a] transition-colors"
            >
              Summary of Findings
              <ArrowRight size={16} className="shrink-0" />
            </button>
          </div>
        </div>

      <ChangelogModal open={changelogOpen} onClose={() => setChangelogOpen(false)} />
    </PageShell>
  );
}
