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

  const currentProject = PROJECTS.find((p) => p.id === activeProject)!;

  const tabs = [
    { label: "Living Guidelines", active: false },
    { label: "About Us", active: false },
    { label: "Contact Us", active: false },
  ];

  return (
    <nav className="h-[72px] bg-white border-b border-gray-200 flex items-center px-6 sticky top-0 z-[60] w-full gap-4">
      {/* Logo */}
      <div className="flex items-center shrink-0">
        <img src={liveLogo} alt="Living Interactive Evidence Synthesis" className="h-10 w-auto object-contain" />
      </div>

      {/* Right nav: project switcher inline with links */}
      <div className="flex items-center gap-2 ml-auto">
        {/* Project Switcher */}
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
            <span>Living Systematic Reviews</span>
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

        {tabs.map((tab) => (
          <button
            key={tab.label}
            className="text-[13px] font-medium transition-all px-4 py-2 rounded-lg text-gray-500 hover:text-gray-900"
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
