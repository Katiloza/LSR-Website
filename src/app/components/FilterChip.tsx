import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "../lib/utils";

interface FilterOption {
  label: string;
  count: number;
}

interface FilterChipProps {
  label: string;
  options: FilterOption[];
  selectedOptions: string[];
  onChange: (selected: string[]) => void;
}

export function FilterChip({ label, options, selectedOptions, onChange }: FilterChipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (optionLabel: string) => {
    if (selectedOptions.includes(optionLabel)) {
      onChange(selectedOptions.filter(o => o !== optionLabel));
    } else {
      onChange([...selectedOptions, optionLabel]);
    }
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-2 px-4 py-2 rounded-full border text-[11px] font-medium transition-all",
          selectedOptions.length > 0 
            ? "border-[#2E75B5] bg-blue-50 text-[#2E75B5]" 
            : "border-[#2E75B5] text-[#000105] hover:bg-gray-50"
        )}
      >
        <span>{label}</span>
        {selectedOptions.length > 0 && (
          <span className="bg-[#2E75B5] text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px]">
            {selectedOptions.length}
          </span>
        )}
        <ChevronDown size={14} className={cn("transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="max-h-60 overflow-y-auto">
            {options.map((option) => {
              const isSelected = selectedOptions.includes(option.label);
              return (
                <button
                  key={option.label}
                  onClick={() => toggleOption(option.label)}
                  className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg text-[13px] transition-colors"
                >
                  <div className={cn(
                    "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                    isSelected ? "bg-[#2E75B5] border-[#2E75B5]" : "border-gray-300 bg-white"
                  )}>
                    {isSelected && <Check size={12} className="text-white" strokeWidth={3} />}
                  </div>
                  <span className="flex-1 text-left text-gray-700">{option.label}</span>
                  <span className="text-gray-400 text-[11px]">({option.count})</span>
                </button>
              );
            })}
          </div>
          {selectedOptions.length > 0 && (
            <div className="border-t border-gray-100 mt-2 pt-2 flex justify-end">
              <button 
                onClick={() => onChange([])}
                className="text-[11px] font-semibold text-[#2E75B5] hover:underline px-2"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
