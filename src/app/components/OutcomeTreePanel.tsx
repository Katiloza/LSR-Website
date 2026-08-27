import React from "react";
import { ChevronDown, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { cn } from "../lib/utils";

/**
 * "Types of Outcomes" rail — Figma node 35:1599 (Primary) / 35:3310 (Sensitivity).
 *
 * Replaces the old horizontal tab bar. The full outcome taxonomy is visible at
 * once as a collapsible tree, so a reader can move between outcomes without
 * losing their place, and the counts sit inline with each leaf.
 */

export interface TreeLeaf {
  id: string;
  label: string;
  count: number;
}

export interface TreeSubGroup {
  id: string;
  label: string;
  items: TreeLeaf[];
}

export interface TreeGroup {
  id: string;
  label: string;
  /** Leaves directly under the group heading. */
  items?: TreeLeaf[];
  /** One level of nesting — e.g. Adverse events → All-cause / Treatment related. */
  subGroups?: TreeSubGroup[];
}

interface OutcomeTreePanelProps {
  groups: TreeGroup[];
  selectedId: string;
  onSelect: (id: string) => void;
  /** Ids of groups/sub-groups currently collapsed. */
  collapsed: Set<string>;
  onToggle: (id: string) => void;
  onCollapseAll: () => void;
  onExpandAll: () => void;
  /** Figma 35:1603 — hides the rail so the forest plot gets the full width. */
  panelOpen: boolean;
  onTogglePanel: () => void;
}

function CountPill({ value, active }: { value: number; active: boolean }) {
  return (
    <span className="flex items-start pl-2 shrink-0">
      <span
        className={cn(
          "rounded-full px-1.5 py-0.5 text-[12px] leading-[16.5px] font-medium text-center tabular-nums",
          active ? "text-[#2e75b5]" : "text-[#99a1af]"
        )}
      >
        {value}
      </span>
    </span>
  );
}

function Leaf({
  leaf,
  selected,
  onSelect,
  indent,
  size,
}: {
  leaf: TreeLeaf;
  selected: boolean;
  onSelect: (id: string) => void;
  indent: string;
  size: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(leaf.id)}
      aria-current={selected ? "true" : undefined}
      className={cn(
        "flex w-full items-center justify-between rounded-[10px] py-2 pr-2 text-left transition-colors",
        indent,
        selected ? "bg-[#eff6ff]/50" : "hover:bg-gray-50"
      )}
    >
      <span
        className={cn(
          "flex-1 min-w-0 leading-[19.5px] font-['Inter',sans-serif]",
          size,
          selected ? "font-semibold text-[#2e75b5]" : "font-medium text-[#6a7282]"
        )}
      >
        {leaf.label}
      </span>
      <CountPill value={leaf.count} active={selected} />
    </button>
  );
}

export function OutcomeTreePanel({
  groups,
  selectedId,
  onSelect,
  collapsed,
  onToggle,
  onCollapseAll,
  onExpandAll,
  panelOpen,
  onTogglePanel,
}: OutcomeTreePanelProps) {
  if (!panelOpen) {
    return (
      <div className="shrink-0 pt-5">
        <button
          type="button"
          onClick={onTogglePanel}
          aria-expanded={false}
          aria-label="Show the list of outcomes"
          title="Show the list of outcomes"
          className="flex items-start rounded-[10px] p-2 text-[#6a7282] transition-colors hover:bg-gray-100 hover:text-[#101828]"
        >
          <PanelLeftOpen size={22} strokeWidth={1.6} />
        </button>
      </div>
    );
  }

  return (
    <div className="flex w-[217px] shrink-0 flex-col gap-2 pt-5">
      {/* Header — Figma node 35:1600 */}
      <div className="flex items-center justify-center gap-3.5 pr-3">
        <p className="text-[16px] leading-[15px] font-medium text-[#6a7282] font-['Inter',sans-serif] whitespace-nowrap">
          Types of Outcomes
        </p>
        {/* Figma 35:1603 — collapsing the list gives the forest plot more room. */}
        <button
          type="button"
          onClick={onTogglePanel}
          aria-expanded
          aria-label="Hide the list of outcomes to widen the forest plot"
          title="Hide the list of outcomes to widen the forest plot"
          className="flex items-start rounded-[10px] p-2 text-[#6a7282] transition-colors hover:bg-gray-100 hover:text-[#101828]"
        >
          <PanelLeftClose size={22} strokeWidth={1.6} />
        </button>
      </div>

      <div className="flex flex-col gap-4 pt-2">
        {/* Collapse all / Expand all — Figma node 40:5489 */}
        <div className="flex w-[193px] items-stretch rounded-full bg-[#1e3a7a] p-[3px]">
          <button
            type="button"
            onClick={onCollapseAll}
            className={cn(
              "flex flex-1 items-center justify-center rounded-full px-3 py-2 text-[12px] font-semibold transition-colors font-['Inter',sans-serif]",
              collapsed.size === 0
                ? "bg-white text-[#101828] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
                : "text-[#f9fafb] hover:bg-white/10"
            )}
          >
            Collapse all
          </button>
          <button
            type="button"
            onClick={onExpandAll}
            className={cn(
              "flex flex-1 items-center justify-center rounded-full px-3 py-2 text-[12px] font-semibold transition-colors font-['Inter',sans-serif]",
              collapsed.size > 0
                ? "bg-white text-[#101828] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)]"
                : "text-[#f9fafb] hover:bg-white/10"
            )}
          >
            Expand all
          </button>
        </div>

        {groups.map((group) => {
          const groupOpen = !collapsed.has(group.id);
          return (
            <div key={group.id} className="flex w-[193px] flex-col">
              <button
                type="button"
                onClick={() => onToggle(group.id)}
                aria-expanded={groupOpen}
                className="flex w-full items-center gap-2 rounded-[10px] py-2 pl-1 pr-2 text-left transition-colors hover:bg-gray-50"
              >
                <span className="flex-1 min-w-0 text-[16px] leading-[22.5px] font-semibold text-[#101828] font-['Inter',sans-serif]">
                  {group.label}
                </span>
                <ChevronDown
                  size={14}
                  className={cn(
                    "shrink-0 text-[#6a7282] transition-transform",
                    groupOpen ? "" : "-rotate-90"
                  )}
                />
              </button>

              {groupOpen && (
                <div className="flex w-[193px] flex-col">
                  {group.items?.map((leaf) => (
                    <Leaf
                      key={leaf.id}
                      leaf={leaf}
                      selected={leaf.id === selectedId}
                      onSelect={onSelect}
                      indent="pl-3.5"
                      size="text-[14px]"
                    />
                  ))}

                  {group.subGroups?.map((sub) => {
                    const subOpen = !collapsed.has(sub.id);
                    return (
                      <div key={sub.id} className="flex w-[193px] flex-col">
                        <button
                          type="button"
                          onClick={() => onToggle(sub.id)}
                          aria-expanded={subOpen}
                          className="flex w-full items-center gap-2 rounded-[10px] py-2 pl-2.5 pr-2 text-left transition-colors hover:bg-gray-50"
                        >
                          <ChevronDown
                            size={14}
                            className={cn(
                              "shrink-0 text-[#6a7282] transition-transform",
                              subOpen ? "" : "-rotate-90"
                            )}
                          />
                          <span className="flex-1 min-w-0 text-[14px] leading-[22.5px] font-semibold text-[#101828] font-['Inter',sans-serif]">
                            {sub.label}
                          </span>
                        </button>

                        {subOpen && (
                          <div className="flex w-[193px] flex-col">
                            {sub.items.map((leaf) => (
                              <Leaf
                                key={leaf.id}
                                leaf={leaf}
                                selected={leaf.id === selectedId}
                                onSelect={onSelect}
                                indent="pl-[18px]"
                                size="text-[13px]"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
