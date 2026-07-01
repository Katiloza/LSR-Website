import React from "react";
import { ChevronDown, ChevronRight, BarChart, Activity } from "lucide-react";
import { cn } from "../lib/utils";
import { motion, AnimatePresence } from "motion/react";

export type AnalysisType = "Primary" | "Sensitivity";

interface OnPageNavProps {
  isOpen: boolean;
  analysisType: AnalysisType;
  setAnalysisType: (type: AnalysisType) => void;
  activeSectionId: string;
  onNavigate: (id: string) => void;
  primarySections: NavCategory[];
  sensitivitySections: NavCategory[];
}

export interface NavCategory {
  id: string;
  label: string;
  children?: NavItem[];
}

export interface NavItem {
  id: string;
  label: string;
  subItems?: NavItem[];
}

export function OnPageNav({ 
  isOpen,
  analysisType, 
  setAnalysisType, 
  activeSectionId, 
  onNavigate,
  primarySections,
  sensitivitySections
}: OnPageNavProps) {
  const currentSections = analysisType === "Primary" ? primarySections : sensitivitySections;

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div 
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 280, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="sticky top-[72px] h-[calc(100vh-72px)] bg-white overflow-hidden shrink-0 z-40"
        >
          <div className="w-[280px] h-full overflow-y-auto flex flex-col gap-8 px-[24px] py-[4px]">
            {/* Header / Wordmark */}
            <div className="flex flex-col gap-1">
              
            </div>

            <div className="flex flex-col gap-6">
              <h2 className="text-[24px] font-medium text-[#2E75B5] tracking-tight font-['Benton_Modern_D',serif]">Explore&nbsp;&nbsp;</h2>
              
              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Type of Analysis</span>
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => setAnalysisType("Primary")}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-all w-full",
                      analysisType === "Primary" 
                        ? "bg-[#F3F8FE] text-[#2E75B5]" 
                        : "text-gray-500 hover:bg-gray-50"
                    )}
                  >Primary<BarChart size={18} /></button>
                  <button
                    onClick={() => setAnalysisType("Sensitivity")}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-medium transition-all w-full",
                      analysisType === "Sensitivity" 
                        ? "bg-[#F3F8FE] text-[#2E75B5]" 
                        : "text-gray-500 hover:bg-gray-50"
                    )}
                  >Sensitivity<Activity size={18} /></button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Type of Outcomes</span>
              {currentSections.map((category) => (
                <NavGroup 
                  key={category.id} 
                  category={category} 
                  activeSectionId={activeSectionId} 
                  onNavigate={onNavigate} 
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function NavGroup({ 
  category, 
  activeSectionId, 
  onNavigate,
  depth = 0 
}: { 
  category: NavCategory | NavItem; 
  activeSectionId: string; 
  onNavigate: (id: string) => void;
  depth?: number;
}) {
  const [expanded, setExpanded] = React.useState(true);
  const isLeaf = !("children" in category ? category.children : (category as NavItem).subItems);
  
  const isActive = activeSectionId === category.id;

  if (isLeaf) {
    return (
      <button
        onClick={() => onNavigate(category.id)}
        className={cn(
          "text-left py-2 pr-2 rounded-lg text-[13px] transition-colors w-full font-['Articulat_CF',sans-serif]",
          isActive ? "text-[#2E75B5] font-semibold bg-blue-50/50" : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
        )}
        style={{ paddingLeft: `${(depth + 1) * 12 + 8}px` }}
      >
        {category.label}
      </button>
    );
  }

  const items = "children" in category ? category.children : (category as NavItem).subItems;

  return (
    <div className="flex flex-col">
      <button
        onClick={() => setExpanded(!expanded)}
        className={cn(
          "flex items-center gap-2 py-2 pr-2 text-left rounded-lg transition-colors w-full group",
          depth === 0 ? "text-[15px] font-medium text-gray-900 font-['Articulat_CF',sans-serif]" : "text-[13px] text-gray-600 font-['Articulat_CF',sans-serif]"
        )}
        style={{ paddingLeft: `${depth * 12 + 4}px` }}
      >
        <span className="text-gray-400 group-hover:text-[#2E75B5]">
          {expanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </span>
        <span className="flex-1 truncate">{category.label === "Outcome" ? "Survival / Time-to-event" : category.label}</span>
      </button>
      
      {expanded && items && (
        <div className="flex flex-col">
          {items.map((item) => (
            <NavGroup 
              key={item.id} 
              category={item} 
              activeSectionId={activeSectionId} 
              onNavigate={onNavigate}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
