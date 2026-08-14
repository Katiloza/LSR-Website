import React, { useState } from "react";
import { useNavigate } from "react-router";
import { BookOpen, FlaskConical, CalendarCheck, ArrowRight } from "lucide-react";
import { TopNav } from "../components/TopNav";
import { AppSidebar } from "../components/AppSidebar";
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
    <div className="flex flex-col min-h-screen bg-[#FDFDFD]">
      <TopNav />
      <div className="flex flex-1 min-h-0">
        <AppSidebar />

        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* ── Hero ── */}
          <div
            className="w-full px-8 pt-8 pb-6"
            style={{ background: "linear-gradient(174.2deg, rgba(133,200,250,0.15) 8.49%, rgba(133,200,250,0) 58.3%)" }}
          >
            <div className="max-w-[1024px]">
              <p className="text-[20px] font-medium text-black font-['Inter',sans-serif] mb-0">
                Living Systematic Review
              </p>
              <h1 className="font-semibold text-[#101828] font-['Benton_Modern_D',serif] leading-[1.15] text-[40px] sm:text-[56px] lg:text-[64px] pt-3">
                Metastatic Castration-Resistant
                <br />
                Prostate Cancer
              </h1>
              <p className="text-black font-['Inter',sans-serif] leading-[1.7] text-[16px] pt-5 max-w-[900px]">
                Explore randomized controlled trials comparing PARP inhibitors, androgen receptor
                pathway inhibitors, chemotherapy, and PSMA-targeted radioligand therapy — with
                GRADE-rated certainty for overall survival, progression-free survival, response, and
                treatment-related adverse events.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-[1006px] mt-8">
                {stats.map((stat) => {
                  const Wrapper = stat.onClick ? "button" : "div";
                  return (
                    <Wrapper
                      key={stat.label}
                      onClick={stat.onClick}
                      className={cn(
                        "bg-white/70 border-2 border-[#bfdbfe] rounded-[14px] px-5 py-4 flex items-center gap-4 text-left w-full",
                        stat.onClick && "hover:border-[#2E75B5] hover:bg-white transition-all cursor-pointer"
                      )}
                    >
                      <div className="w-[62px] h-[62px] rounded-[10px] flex items-center justify-center shrink-0">
                        <stat.icon size={36} className="text-black" strokeWidth={1.5} />
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="text-[32px] font-bold text-[#2E75B6] leading-[22px] font-['Articulat_CF',sans-serif]">
                          {stat.value}
                        </div>
                        <div className="text-[16px] font-medium text-black font-['Inter',sans-serif]">
                          {stat.label}
                        </div>
                      </div>
                    </Wrapper>
                  );
                })}
              </div>

              {/* CTA */}
              <button
                onClick={() => navigate("/summary-of-findings")}
                className="mt-8 flex items-center gap-2 h-[43px] px-4 rounded-full bg-[#2E75B5] border border-[#F3F4F6] text-[#F9FAFB] text-[15px] font-semibold font-['Inter',sans-serif] hover:bg-[#25609a] transition-colors"
              >
                Summary of Findings
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <ChangelogModal open={changelogOpen} onClose={() => setChangelogOpen(false)} />
    </div>
  );
}
