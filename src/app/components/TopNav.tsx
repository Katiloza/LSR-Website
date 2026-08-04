import React, { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "../lib/utils";
import liveLogo from "@/imports/logo.png";

const PROJECTS = [
  { id: "mcrpc", label: "mCRPC", fullName: "Metastatic Castration-Resistant Prostate Cancer" },
];

export function TopNav() {
  const [projectOpen, setProjectOpen] = useState(false);
  const [activeProject, setActiveProject] = useState("mcrpc");
  const [aboutOpen, setAboutOpen] = useState(false);

  const currentProject = PROJECTS.find((p) => p.id === activeProject)!;

  return (
    <nav className="h-[72px] bg-white border-b border-gray-200 flex items-center px-6 sticky top-0 z-[60] w-full gap-4">
      {/* Logo */}
      <div className="flex items-center shrink-0">
        <img src={liveLogo} alt="Living Interactive Evidence Synthesis" className="h-10 w-auto object-contain" />
      </div>

      {/* Right nav: project switcher inline with links */}
      <div className="flex items-center gap-2 ml-auto">
        {/* Project Switcher — relabelled "Research", same dropdown pattern */}
        <div className="relative">
          <button
            onClick={() => setProjectOpen((o) => !o)}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all text-[13px] font-medium",
              projectOpen
                ? "text-[#1a1a1a] bg-[#E4F0FE]"
                : "text-gray-500 hover:text-gray-900 hover:bg-[#E4F0FE]"
            )}
            aria-haspopup="listbox"
            aria-expanded={projectOpen}
          >
            <span>Research</span>
            <span className="text-gray-400">·</span>
            <span className="font-semibold text-[#2E75B5]">{currentProject.label}</span>
            <ChevronDown size={13} className={cn("text-gray-400 transition-transform", projectOpen && "rotate-180")} />
          </button>

          {projectOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setProjectOpen(false)} />
              <div className="absolute right-0 top-full mt-1 z-50 w-72 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
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

        <div className="w-px h-5 bg-gray-200 mx-2" />

        {/* Placeholder stubs — future build work, scoped separately */}
        <button
          className="text-[13px] font-medium transition-all px-4 py-2 rounded-lg text-gray-400 cursor-default flex items-center gap-1.5"
          title="Coming soon"
        >
          For Patients
          <span className="text-[9px] font-bold text-gray-300 uppercase tracking-wide">Soon</span>
        </button>
        <button
          className="text-[13px] font-medium transition-all px-4 py-2 rounded-lg text-gray-400 cursor-default flex items-center gap-1.5"
          title="Coming soon"
        >
          Clinicians
          <span className="text-[9px] font-bold text-gray-300 uppercase tracking-wide">Soon</span>
        </button>

        {/* About Us — Contact Us folded in as a dropdown item */}
        <div className="relative">
          <button
            onClick={() => setAboutOpen((o) => !o)}
            className={cn(
              "flex items-center gap-1 text-[13px] font-medium transition-all px-4 py-2 rounded-lg",
              aboutOpen ? "text-[#1a1a1a] bg-[#E4F0FE]" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
            )}
            aria-haspopup="menu"
            aria-expanded={aboutOpen}
          >
            About Us
            <ChevronDown size={13} className={cn("text-gray-400 transition-transform", aboutOpen && "rotate-180")} />
          </button>

          {aboutOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setAboutOpen(false)} />
              <div className="absolute right-0 top-full mt-1 z-50 w-56 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden py-1">
                <button
                  onClick={() => setAboutOpen(false)}
                  className="w-full text-left px-3.5 py-2.5 text-[13px] text-gray-700 hover:bg-blue-50 hover:text-[#2E75B5] transition-colors"
                >
                  About Us
                </button>
                <button
                  onClick={() => setAboutOpen(false)}
                  className="w-full text-left px-3.5 py-2.5 text-[13px] text-gray-700 hover:bg-blue-50 hover:text-[#2E75B5] transition-colors"
                >
                  Contact Us
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
