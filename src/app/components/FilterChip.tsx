import React, { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDown, Check, Search, X } from "lucide-react";
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
  const [query, setQuery] = useState("");
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

  // Long option lists get an in-dropdown search box.
  const searchable = options.length > 8;

  const filteredOptions = useMemo(() => {
    if (!query.trim()) return options;
    const q = query.toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query]);

  const toggleOption = (optionLabel: string) => {
    if (selectedOptions.includes(optionLabel)) {
      onChange(selectedOptions.filter((o) => o !== optionLabel));
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
        <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-gray-200 rounded-xl shadow-xl z-50 p-2 animate-in fade-in slide-in-from-top-2 duration-200">
          {searchable && (
            <div className="relative mb-2">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search ${label.toLowerCase()}…`}
                className="w-full pl-8 pr-7 py-1.5 text-[12px] rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2E75B5]/20 focus:border-[#2E75B5] font-['Inter',sans-serif]"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={13} />
                </button>
              )}
            </div>
          )}

          <div className="max-h-64 overflow-y-auto">
            {filteredOptions.length === 0 ? (
              <p className="px-3 py-4 text-center text-[12px] text-gray-400">No matches</p>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = selectedOptions.includes(option.label);
                return (
                  <button
                    key={option.label}
                    onClick={() => toggleOption(option.label)}
                    className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-lg text-[13px] transition-colors text-left"
                  >
                    <div
                      className={cn(
                        "shrink-0 w-4 h-4 rounded border flex items-center justify-center transition-colors",
                        isSelected ? "bg-[#2E75B5] border-[#2E75B5]" : "border-gray-300 bg-white"
                      )}
                    >
                      {isSelected && <Check size={12} className="text-white" strokeWidth={3} />}
                    </div>
                    <span className="flex-1 text-left text-gray-700 break-words">{option.label}</span>
                    <span className="shrink-0 text-gray-400 text-[11px]">({option.count})</span>
                  </button>
                );
              })
            )}
          </div>

          {selectedOptions.length > 0 && (
            <div className="border-t border-gray-100 mt-2 pt-2 flex items-center justify-between px-1">
              <span className="text-[11px] text-gray-400">{selectedOptions.length} selected</span>
              <button
                onClick={() => onChange([])}
                className="text-[11px] font-semibold text-[#2E75B5] hover:underline px-1"
              >
                Clear
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
