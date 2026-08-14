import React, { useState } from "react";
import { ChevronLeft, Check } from "lucide-react";
import { cn } from "../lib/utils";
import { GlobalSearch } from "./GlobalSearch";
import liveLogo from "@/imports/logo.png";

const PROJECTS = [
  { id: "mcrpc", label: "mCRPC", fullName: "Metastatic Castration-Resistant Prostate Cancer" },
];

const NAV_LINKS = ["Living Guideline", "About Us", "Contact Us"];

// Shared button chrome from the Figma nav: 16px inline / 8px block padding,
// 10px radius, Inter Medium 14px on a 19.5px line box.
const NAV_BUTTON_CLASS =
  "flex items-center px-4 py-2 rounded-[10px] text-[14px] font-medium text-black leading-[19.5px] tracking-[-0.0762px] whitespace-nowrap font-['Inter',sans-serif] transition-colors hover:bg-[#E4F0FE]";

export function TopNav() {
  const [projectOpen, setProjectOpen] = useState(false);
  const [activeProject, setActiveProject] = useState("mcrpc");

  const currentProject = PROJECTS.find((p) => p.id === activeProject)!;

  return (
    <nav className="h-[104px] bg-white border-b border-[#99a1af] flex items-center gap-6 px-6 sticky top-0 z-[60] w-full">
      {/* Logo */}
      <div className="flex items-center shrink-0">
        <img src={liveLogo} alt="Living Interactive Evidence Synthesis" className="h-10 w-auto object-contain" />
      </div>

      {/* Nav buttons, then the search field filling the remaining width —
          70px gap between the two groups, per the design. */}
      <div className="flex flex-1 min-w-0 items-center gap-[70px]">
        <div className="flex items-center gap-2 shrink-0">
          {/* Project switcher — chevron sits before the label as drawn */}
          <div className="relative">
            <button
              onClick={() => setProjectOpen((o) => !o)}
              className={cn(NAV_BUTTON_CLASS, "gap-1.5", projectOpen && "bg-[#E4F0FE]")}
              aria-haspopup="listbox"
              aria-expanded={projectOpen}
            >
              <ChevronLeft
                size={13}
                strokeWidth={2}
                className={cn("shrink-0 text-black transition-transform", projectOpen && "-rotate-90")}
              />
              <span>Living Systematic Review:</span>
              <span className="font-semibold text-[#2E75B5]">{currentProject.label}</span>
            </button>

            {projectOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setProjectOpen(false)} />
                <div className="absolute left-0 top-full mt-1 z-50 w-72 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                  <div className="px-3 py-2 border-b border-gray-100">
                    <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Select Project</p>
                  </div>
                  <ul role="listbox" className="py-1">
                    {PROJECTS.map((project) => (
                      <li key={project.id}>
                        <button
                          role="option"
                          aria-selected={activeProject === project.id}
                          onClick={() => { setActiveProject(project.id); setProjectOpen(false); }}
                          className="w-full flex items-start gap-3 px-3 py-2.5 hover:bg-blue-50 transition-colors text-left"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="text-[13px] font-semibold text-gray-900">{project.label}</div>
                            <div className="text-[11px] text-gray-500 truncate">{project.fullName}</div>
                          </div>
                          {activeProject === project.id && (
                            <Check size={14} className="text-[#2E75B5] mt-0.5 shrink-0" />
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="px-3 py-2 border-t border-gray-100 bg-gray-50">
                    <p className="text-[11px] text-gray-400">More projects coming soon</p>
                  </div>
                </div>
              </>
            )}
          </div>

          {NAV_LINKS.map((label) => (
            <button key={label} className={NAV_BUTTON_CLASS}>
              {label}
            </button>
          ))}
        </div>

        {/* Pill search input — 47px tall, hairline #000105 border, icon inset 14px */}
        <GlobalSearch
          placeholder="Search studies, outcomes, treatments, interventions…"
          className="flex-1 min-w-0"
          inputClassName="w-full h-[47px] pl-12 pr-6 rounded-full border border-[#000105] bg-white text-[14px] font-['Inter',sans-serif] placeholder:text-black focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all"
          iconClassName="absolute left-[14px] top-1/2 -translate-y-1/2 text-black opacity-60 pointer-events-none z-10"
        />
      </div>
    </nav>
  );
}
