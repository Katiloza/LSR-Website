import React from "react";
import { Link } from "react-router";
import { ArrowRight, LucideIcon } from "lucide-react";
import { cn } from "../lib/utils";

interface SectionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  to: string;
  accent?: string;
}

export function SectionCard({ icon: Icon, title, description, to, accent = "#2E75B5" }: SectionCardProps) {
  return (
    <Link
      to={to}
      className={cn(
        "group bg-white border border-gray-100 rounded-xl p-6 flex flex-col gap-4",
        "shadow-sm hover:shadow-md hover:border-[#2E75B5]/30 transition-all duration-200"
      )}
    >
      <div className="flex items-start justify-between">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${accent}15` }}
        >
          <Icon size={20} strokeWidth={1.5} style={{ color: accent }} />
        </div>
        <ArrowRight
          size={16}
          className="text-gray-300 group-hover:text-[#2E75B5] group-hover:translate-x-0.5 transition-all"
        />
      </div>
      <div>
        <h3 className="text-[15px] font-semibold text-gray-900 font-['Inter',sans-serif] mb-1">
          {title}
        </h3>
        <p className="text-[13px] text-gray-500 font-['Inter',sans-serif] leading-relaxed">
          {description}
        </p>
      </div>
    </Link>
  );
}
