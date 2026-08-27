import React from "react";
import { BookOpen, FlaskConical, CalendarCheck } from "lucide-react";

interface Stat {
  icon: React.ElementType;
  value: string;
  label: string;
}

const stats: Stat[] = [
  { icon: BookOpen, value: "12", label: "Studies included" },
  { icon: FlaskConical, value: "12", label: "Interventions covered" },
  { icon: CalendarCheck, value: "June 2026", label: "Last updated" },
];

export function StatsStrip() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white border border-gray-100 rounded-xl px-6 py-5 flex items-center gap-4 shadow-sm"
        >
          <div className="w-10 h-10 rounded-lg bg-[#E4F0FE] flex items-center justify-center shrink-0">
            <stat.icon size={20} className="text-[#2E75B5]" strokeWidth={1.5} />
          </div>
          <div>
            <div className="text-[26px] font-semibold text-[#2E75B5] leading-none font-['Inter',sans-serif]">
              {stat.value}
            </div>
            <div className="text-[12px] text-gray-500 mt-0.5 font-['Inter',sans-serif]">
              {stat.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
