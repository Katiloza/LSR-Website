import React, { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import {
  Home,
  FileText,
  Table,
  BarChart2,
  Layers,
  ChevronDown,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { cn } from "../lib/utils";
import liveLogo from "@/imports/logo.png";

// Global nav — replaces the old icon-only rail plus every page's separate
// "identity + primary nav" panel with one persistent sidebar. Structure and
// labels come from Figma node 289:15490 ("Sidebar nav"); icons below are
// exact matches (by path geometry) to lucide icons already used elsewhere in
// this codebase, reused rather than re-authored.

interface LeafLink {
  label: string;
  to: string;
  isActive: (pathname: string, params: URLSearchParams) => boolean;
}
interface NestedGroup {
  label: string;
  isActive: (pathname: string, params: URLSearchParams) => boolean;
  children: LeafLink[];
}
type GroupChild = LeafLink | NestedGroup;
function isNestedGroup(c: GroupChild): c is NestedGroup {
  return "children" in c;
}
interface NavSection {
  key: string;
  icon: React.ElementType;
  label: string;
  isActive: (pathname: string) => boolean;
  children: GroupChild[];
}

const onPrisma = (pathname: string) => pathname === "/prisma";
const onSummaryTables = (pathname: string) => pathname === "/summary-tables";
const onMeta = (pathname: string) => pathname === "/meta-analysis";
const onSoF = (pathname: string) => pathname === "/summary-of-findings";

const SECTIONS: NavSection[] = [
  {
    key: "screening",
    icon: FileText,
    label: "Screening Flow",
    isActive: onPrisma,
    children: [
      { label: "PRISMA",           to: "/prisma?panel=flow",       isActive: (p, sp) => onPrisma(p) && (sp.get("panel") ?? "flow") === "flow" },
      { label: "Included Studies", to: "/prisma?panel=study-list", isActive: (p, sp) => onPrisma(p) && sp.get("panel") === "study-list" },
    ],
  },
  {
    key: "summary-tables",
    icon: Table,
    label: "Summary Tables",
    isActive: onSummaryTables,
    children: [
      { label: "Interactive Table", to: "/summary-tables?tab=interactive-table", isActive: (p, sp) => onSummaryTables(p) && (sp.get("tab") ?? "interactive-table") === "interactive-table" },
      { label: "Results Tables",    to: "/summary-tables?tab=results-table",     isActive: (p, sp) => onSummaryTables(p) && sp.get("tab") === "results-table" },
      { label: "Traffic Plot",      to: "/summary-tables?tab=traffic-plot",      isActive: (p, sp) => onSummaryTables(p) && sp.get("tab") === "traffic-plot" },
    ],
  },
  {
    key: "meta-analysis",
    icon: BarChart2,
    label: "Meta-Analysis",
    isActive: onMeta,
    children: [
      { label: "Primary", to: "/meta-analysis?analysis=Primary", isActive: (p, sp) => onMeta(p) && (sp.get("analysis") ?? "Primary") === "Primary" },
      {
        label: "Sensitivity",
        isActive: (p, sp) => onMeta(p) && sp.get("analysis") === "Sensitivity",
        children: [
          { label: "Overall survival",          to: "/meta-analysis?analysis=Sensitivity&outcome=os",  isActive: (p, sp) => onMeta(p) && sp.get("analysis") === "Sensitivity" && (sp.get("outcome") ?? "os") === "os" },
          { label: "Progression-free survival", to: "/meta-analysis?analysis=Sensitivity&outcome=pfs", isActive: (p, sp) => onMeta(p) && sp.get("analysis") === "Sensitivity" && sp.get("outcome") === "pfs" },
        ],
      },
    ],
  },
  {
    key: "sof",
    icon: Layers,
    label: "Summary of Findings",
    isActive: onSoF,
    children: [
      { label: "Primary",     to: "/summary-of-findings?analysis=primary",     isActive: (p, sp) => onSoF(p) && (sp.get("analysis") ?? "primary") === "primary" },
      { label: "Sensitivity", to: "/summary-of-findings?analysis=sensitivity", isActive: (p, sp) => onSoF(p) && sp.get("analysis") === "sensitivity" },
    ],
  },
];

function LeafRow({ link, active, indent, navigate }: { link: LeafLink; active: boolean; indent: number; navigate: (to: string) => void }) {
  return (
    <button
      onClick={() => navigate(link.to)}
      className={cn(
        "flex items-center h-10 py-2 rounded-[10px] w-full text-left text-[12px] font-medium font-['Inter',sans-serif] transition-colors",
        active ? "bg-[#E4F0FE] text-[#2E75B5]" : "text-black hover:bg-gray-50"
      )}
      style={{ paddingLeft: indent }}
    >
      {link.label}
    </button>
  );
}

function NestedGroupRow({ group, params, pathname, navigate }: { group: NestedGroup; params: URLSearchParams; pathname: string; navigate: (to: string) => void }) {
  const [open, setOpen] = useState(true);
  const active = group.isActive(pathname, params);
  return (
    <div className="flex flex-col w-full">
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex items-center gap-2 h-10 py-2 pr-2 rounded-[10px] w-full text-left text-[12px] font-medium font-['Inter',sans-serif] transition-colors",
          active ? "text-[#2E75B5]" : "text-black hover:bg-gray-50"
        )}
        style={{ paddingLeft: 48 }}
      >
        <span className="flex-1">{group.label}</span>
        <span className="text-black shrink-0">
          {open ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
        </span>
      </button>
      {open && (
        <div className="flex flex-col w-full">
          {group.children.map((leaf) => (
            <LeafRow
              key={leaf.label}
              link={leaf}
              active={leaf.isActive(pathname, params)}
              indent={58}
              navigate={navigate}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Section({ section, pathname, params, navigate }: { section: NavSection; pathname: string; params: URLSearchParams; navigate: (to: string) => void }) {
  const [open, setOpen] = useState(true);
  const active = section.isActive(pathname);
  const Icon = section.icon;
  return (
    <div className="flex flex-col items-start w-full pl-6 pr-4">
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex items-center gap-2 py-2 rounded-[10px] w-full text-left transition-colors",
          active ? "text-[#2E75B5]" : "text-black hover:bg-gray-50"
        )}
      >
        <Icon size={24} strokeWidth={2} className="shrink-0" />
        <span className="flex-1 text-[16px] font-medium font-['Inter',sans-serif] leading-[18px]">
          {section.label}
        </span>
        <span className="text-black shrink-0">
          {open ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
        </span>
      </button>
      {open && (
        <div className="flex flex-col items-start w-full">
          {section.children.map((child) =>
            isNestedGroup(child) ? (
              <NestedGroupRow key={child.label} group={child} params={params} pathname={pathname} navigate={navigate} />
            ) : (
              <LeafRow
                key={child.label}
                link={child}
                active={child.isActive(pathname, params)}
                indent={48}
                navigate={navigate}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}

export function AppSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const goTo = (to: string) => navigate(to);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open sidebar"
        className="sticky top-[104px] mt-4 ml-3 h-9 w-9 shrink-0 flex items-center justify-center rounded-lg bg-white border border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors z-50 self-start"
      >
        <PanelLeftOpen size={18} />
      </button>
    );
  }

  return (
    <div className="sticky top-[104px] h-[calc(100vh-104px)] w-[222px] bg-white border-r border-[#99a1af] flex flex-col items-center gap-[30px] py-8 shrink-0 z-40 overflow-y-auto">
      <div className="w-full px-6 flex items-center justify-between">
        <img src={liveLogo} alt="Living Interactive Evidence Synthesis" className="h-10 w-auto object-contain" />
        <button
          onClick={() => setIsOpen(false)}
          aria-label="Collapse sidebar"
          className="p-1 rounded-md text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors shrink-0"
        >
          <PanelLeftClose size={16} />
        </button>
      </div>

      <div className="flex flex-col items-start gap-6 w-full">
        <button
          onClick={() => goTo("/home")}
          className={cn(
            "flex items-center gap-2 h-[45px] w-full pl-6 pr-4 py-2 text-left transition-colors",
            location.pathname === "/home" ? "text-[#2E75B5]" : "text-black hover:bg-gray-50"
          )}
        >
          <Home size={24} strokeWidth={2} className="shrink-0" />
          <span className="text-[16px] font-medium font-['Inter',sans-serif]">Home</span>
        </button>

        {SECTIONS.map((section) => (
          <Section key={section.key} section={section} pathname={location.pathname} params={searchParams} navigate={goTo} />
        ))}
      </div>
    </div>
  );
}
