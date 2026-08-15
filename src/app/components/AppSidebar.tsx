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
/** Not-yet-available leaf, per Figma node 1:189 (grayed out, "Coming Soon" tag, unclickable). */
interface ComingSoonLeaf {
  label: string;
  comingSoon: true;
}
type GroupChild = LeafLink | NestedGroup | ComingSoonLeaf;
function isNestedGroup(c: GroupChild): c is NestedGroup {
  return "children" in c;
}
function isComingSoon(c: GroupChild): c is ComingSoonLeaf {
  return "comingSoon" in c;
}
interface NavSection {
  key: string;
  icon: React.ElementType;
  label: string;
  isActive: (pathname: string) => boolean;
  /** Row height of the section header and its leaf rows, per Figma node 1:189. */
  rowHeight: 40 | 48;
  children: GroupChild[];
}

const onPrisma = (pathname: string) => pathname === "/prisma";
const onSummaryTables = (pathname: string) => pathname === "/summary-tables";
const onMeta = (pathname: string) => pathname === "/meta-analysis";
const onSoF = (pathname: string) => pathname === "/summary-of-findings";

// Section order follows Figma node 1:189 top-to-bottom: Home, Summary of
// Findings, Meta-Analysis, Summary Tables, Screening.
const SECTIONS: NavSection[] = [
  {
    key: "sof",
    icon: Layers,
    label: "Summary of Findings",
    isActive: onSoF,
    rowHeight: 48,
    children: [
      { label: "Primary",     to: "/summary-of-findings?analysis=primary",     isActive: (p, sp) => onSoF(p) && (sp.get("analysis") ?? "primary") === "primary" },
      { label: "Sensitivity", to: "/summary-of-findings?analysis=sensitivity", isActive: (p, sp) => onSoF(p) && sp.get("analysis") === "sensitivity" },
    ],
  },
  {
    key: "meta-analysis",
    icon: BarChart2,
    label: "Meta-Analysis",
    isActive: onMeta,
    rowHeight: 40,
    children: [
      { label: "Primary", to: "/meta-analysis?analysis=Primary", isActive: (p, sp) => onMeta(p) && (sp.get("analysis") ?? "Primary") === "Primary" },
      // Figma node 16:6191 — grayed out, "Coming Soon" tag, not a working route.
      { label: "Sensitivity", comingSoon: true },
    ],
  },
  {
    key: "summary-tables",
    icon: Table,
    label: "Summary Tables",
    isActive: onSummaryTables,
    rowHeight: 48,
    children: [
      { label: "Interactive Table", to: "/summary-tables?tab=interactive-table", isActive: (p, sp) => onSummaryTables(p) && (sp.get("tab") ?? "interactive-table") === "interactive-table" },
      // Figma nodes 16:6195 / 16:6198 — grayed out, "Coming Soon" tag, not working routes.
      { label: "Results Tables", comingSoon: true },
      { label: "Traffic Plot", comingSoon: true },
    ],
  },
  {
    key: "screening",
    icon: FileText,
    label: "Screening",
    isActive: onPrisma,
    rowHeight: 40,
    children: [
      { label: "PRISMA",           to: "/prisma?panel=flow",       isActive: (p, sp) => onPrisma(p) && (sp.get("panel") ?? "flow") === "flow" },
      { label: "Included Studies", to: "/prisma?panel=study-list", isActive: (p, sp) => onPrisma(p) && sp.get("panel") === "study-list" },
    ],
  },
];

function LeafRow({ link, active, indent, height = 40, navigate }: { link: LeafLink; active: boolean; indent: number; height?: number; navigate: (to: string) => void }) {
  return (
    <button
      onClick={() => navigate(link.to)}
      className={cn(
        "flex items-center py-2 rounded-[10px] w-full text-left text-[12px] font-medium leading-[15px] font-['Inter',sans-serif] transition-colors",
        active ? "bg-[#E4F0FE] text-[#2E75B5]" : "text-black hover:bg-gray-50"
      )}
      style={{ paddingLeft: indent, height }}
    >
      {link.label}
    </button>
  );
}

function ComingSoonRow({ leaf, indent, height = 40 }: { leaf: ComingSoonLeaf; indent: number; height?: number }) {
  return (
    <div
      className="flex items-center gap-2 w-full text-left font-['Inter',sans-serif] cursor-default"
      style={{ paddingLeft: indent, height }}
    >
      <span className="text-[12px] font-medium leading-[15px] text-[#d1d5dc] whitespace-nowrap">
        {leaf.label}
      </span>
      <span className="text-[6px] leading-[13px] text-[#99a1af]">Coming Soon</span>
    </div>
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
  const active = section.isActive(pathname);
  // Figma node 13:2332 (Homepage) draws every section collapsed; node 1:189
  // draws the active one open. So: open iff this section owns the route.
  const [open, setOpen] = useState(active);
  const Icon = section.icon;
  return (
    <div className="flex flex-col items-start w-full pl-6 pr-4">
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex items-center gap-2 py-2 rounded-[10px] w-full text-left transition-colors",
          active ? "text-[#2E75B5]" : "text-black hover:bg-gray-50"
        )}
        style={{ height: section.rowHeight }}
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
            ) : isComingSoon(child) ? (
              <ComingSoonRow key={child.label} leaf={child} indent={48} height={section.rowHeight} />
            ) : (
              <LeafRow
                key={child.label}
                link={child}
                active={child.isActive(pathname, params)}
                indent={48}
                height={section.rowHeight}
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
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const goTo = (to: string) => navigate(to);

  // Figma node 1:189 — the sidebar column runs the full page height (y=0), so
  // the wordmark sits at the top of this column rather than in the top bar.
  return (
    <div className="sticky top-0 h-screen w-[222px] bg-white border-r border-[#99a1af] flex flex-col items-center gap-[30px] py-8 shrink-0 z-40 overflow-y-auto">
      <img
        src={liveLogo}
        alt="Living Interactive Evidence Synthesis"
        className="h-10 w-auto object-contain self-center"
      />

      {/* Figma node 1:191 — 24px block padding, 23px between nav groups. */}
      <div className="flex flex-col items-center gap-[23px] w-full py-6">
        <button
          onClick={() => goTo("/home")}
          className={cn(
            "flex items-center gap-2 h-[45px] w-full pl-6 pr-4 py-2 text-left transition-colors",
            // Active state per Figma node 1:192 — pale blue fill, blue semibold label.
            location.pathname === "/home"
              ? "bg-[#EFF6FF]/50 text-[#2E75B5]"
              : "text-black hover:bg-gray-50"
          )}
        >
          <Home size={24} strokeWidth={2} className="shrink-0" />
          <span
            className={cn(
              "text-[16px] font-['Inter',sans-serif]",
              location.pathname === "/home" ? "font-semibold" : "font-medium"
            )}
          >
            Home
          </span>
        </button>

        {SECTIONS.map((section) => (
          <Section key={section.key} section={section} pathname={location.pathname} params={searchParams} navigate={goTo} />
        ))}
      </div>
    </div>
  );
}
