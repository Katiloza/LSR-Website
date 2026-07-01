import React from "react";
import {
  Home,
  FileText,
  Table,
  BarChart2,
  Layers,
  MoreHorizontal,
  Bell,
  User,
  PanelLeftClose,
  PanelLeftOpen
} from "lucide-react";
import { Link, useLocation } from "react-router";
import { cn } from "../lib/utils";

interface SideIconRailProps {
  isPanelOpen: boolean;
  onTogglePanel: () => void;
}

const navItems = [
  { id: "home", path: "/home", icon: Home, label: "Home" },
  { id: "prisma", path: "/prisma", icon: FileText, label: "Prisma" },
  { id: "summary", path: "/summary-tables", icon: Table, label: "Summary Tables" },
  { id: "meta", path: "/meta-analysis", icon: BarChart2, label: "Meta Analysis" },
  { id: "sof", path: "/summary-of-findings", icon: Layers, label: "Summary of Findings" },
  { id: "more", path: "#", icon: MoreHorizontal, label: "More" },
];

export function SideIconRail({ isPanelOpen, onTogglePanel }: SideIconRailProps) {
  const location = useLocation();

  return (
    <div className="h-[calc(100vh-72px)] w-[72px] bg-white flex flex-col items-center sticky top-[72px] z-50 shrink-0 py-[32px]">
      <button
        onClick={onTogglePanel}
        className="mb-8 p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
        title={isPanelOpen ? "Collapse sidebar" : "Expand sidebar"}
      >
        {isPanelOpen ? <PanelLeftClose size={22} /> : <PanelLeftOpen size={22} />}
      </button>

      <div className="flex-1 flex flex-col gap-6 w-full px-[8px]">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.id}
              to={item.path}
              aria-label={item.label}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex flex-col items-center justify-center gap-1 w-full py-2 rounded-lg transition-all",
                isActive
                  ? "text-[#2E75B5] bg-blue-50/50"
                  : "text-gray-400 hover:text-gray-900 hover:bg-gray-50"
              )}
              title={item.label}
            >
              <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="font-medium font-['Inter',sans-serif] text-center leading-tight text-[12px]">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="mt-auto flex flex-col gap-4 pb-4 w-full px-2">
        <button className="flex flex-col items-center justify-center py-2 text-gray-400 hover:text-gray-900 transition-colors" aria-label="Notifications">
          <Bell size={24} />
        </button>
        <button className="flex flex-col items-center justify-center py-2 text-gray-400 hover:text-gray-900 transition-colors" aria-label="User profile">
          <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 bg-gray-50 overflow-hidden">
            <User size={18} />
          </div>
        </button>
      </div>
    </div>
  );
}
