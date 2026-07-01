import React, { useState, useMemo } from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown, SlidersHorizontal, X } from "lucide-react";
import { cn } from "../lib/utils";

export interface StudyRow {
  id: string;
  study: string;
  year: number;
  trialName: string;
  treatment: string;
  control: string;
  lineOfTherapy: "First-line" | "Second-line" | "Third-line or later";
  phase: "Phase II" | "Phase III";
  n: number;
  therapyType: "Monotherapy" | "Combination";
  treatmentClass: "NHT" | "Chemotherapy" | "PARPi" | "PSMA" | "Other";
  primaryEndpoint: string;
  hrOs?: string;
  hrPfs?: string;
  orr?: string;
}

interface Column {
  key: keyof StudyRow;
  label: string;
  visible: boolean;
  width?: string;
}

interface SummaryTableProps {
  rows: StudyRow[];
  activeFilters: Record<string, string[]>;
}

type SortDir = "asc" | "desc" | null;

export function SummaryTable({ rows, activeFilters }: SummaryTableProps) {
  const [columns, setColumns] = useState<Column[]>([
    { key: "study", label: "Study", visible: true },
    { key: "year", label: "Year", visible: true },
    { key: "trialName", label: "Trial", visible: true },
    { key: "treatment", label: "Treatment", visible: true },
    { key: "control", label: "Control", visible: true },
    { key: "lineOfTherapy", label: "Line", visible: true },
    { key: "phase", label: "Phase", visible: true },
    { key: "n", label: "N", visible: true },
    { key: "therapyType", label: "Therapy type", visible: false },
    { key: "treatmentClass", label: "Class", visible: true },
    { key: "primaryEndpoint", label: "Primary endpoint", visible: true },
    { key: "hrOs", label: "HR OS", visible: true },
    { key: "hrPfs", label: "HR PFS", visible: true },
    { key: "orr", label: "ORR", visible: false },
  ]);

  const [colPanelOpen, setColPanelOpen] = useState(false);
  const [sortKey, setSortKey] = useState<keyof StudyRow | null>("year");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const visibleColumns = columns.filter((c) => c.visible);

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      return Object.entries(activeFilters).every(([key, values]) => {
        if (!values.length) return true;
        const cellValue = String(row[key as keyof StudyRow] ?? "");
        return values.includes(cellValue);
      });
    });
  }, [rows, activeFilters]);

  const sortedRows = useMemo(() => {
    if (!sortKey || !sortDir) return filteredRows;
    return [...filteredRows].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (av == null) return 1;
      if (bv == null) return -1;
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [filteredRows, sortKey, sortDir]);

  const handleSort = (key: keyof StudyRow) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : d === "desc" ? null : "asc"));
      if (sortDir === null) setSortKey(null);
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const toggleColumn = (key: keyof StudyRow) => {
    const visible = columns.filter((c) => c.visible);
    if (visible.length === 1 && visible[0].key === key) return; // keep at least 1
    setColumns((cols) => cols.map((c) => (c.key === key ? { ...c, visible: !c.visible } : c)));
  };

  const SortIcon = ({ colKey }: { colKey: keyof StudyRow }) => {
    if (sortKey !== colKey) return <ChevronsUpDown size={12} className="text-gray-300" />;
    if (sortDir === "asc") return <ChevronUp size={12} className="text-[#2E75B5]" />;
    if (sortDir === "desc") return <ChevronDown size={12} className="text-[#2E75B5]" />;
    return <ChevronsUpDown size={12} className="text-gray-300" />;
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <span className="text-[13px] text-gray-500 font-['Inter',sans-serif]">
          {sortedRows.length} of {rows.length} studies
        </span>
        <div className="relative">
          <button
            onClick={() => setColPanelOpen((o) => !o)}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[12px] font-medium transition-all",
              colPanelOpen
                ? "border-[#2E75B5] bg-[#E4F0FE] text-[#2E75B5]"
                : "border-gray-200 text-gray-600 hover:border-gray-300"
            )}
          >
            <SlidersHorizontal size={13} />
            Columns
          </button>

          {colPanelOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setColPanelOpen(false)} />
              <div className="absolute right-0 top-full mt-1 z-50 w-52 bg-white border border-gray-200 rounded-xl shadow-lg py-2">
                {columns.map((col) => (
                  <label
                    key={col.key}
                    className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={col.visible}
                      onChange={() => toggleColumn(col.key)}
                      className="rounded accent-[#2E75B5]"
                    />
                    <span className="text-[13px] text-gray-700 font-['Inter',sans-serif]">{col.label}</span>
                  </label>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="w-full text-[12px] font-['Inter',sans-serif] border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {visibleColumns.map((col) => (
                <th
                  key={col.key}
                  className="text-left px-4 py-3 font-semibold text-gray-500 uppercase tracking-wide text-[10px] cursor-pointer select-none whitespace-nowrap"
                  scope="col"
                  onClick={() => handleSort(col.key)}
                >
                  <div className="flex items-center gap-1">
                    {col.label}
                    <SortIcon colKey={col.key} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedRows.length === 0 ? (
              <tr>
                <td colSpan={visibleColumns.length} className="text-center py-16 text-gray-400 text-[13px]">
                  No studies match the active filters.
                </td>
              </tr>
            ) : (
              sortedRows.map((row, i) => (
                <tr
                  key={row.id}
                  className={cn(
                    "border-b border-gray-50 transition-colors hover:bg-blue-50/30",
                    i % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                  )}
                >
                  {visibleColumns.map((col) => {
                    const val = row[col.key];
                    return (
                      <td key={col.key} className="px-4 py-3 text-gray-700 whitespace-nowrap">
                        {col.key === "study" ? (
                          <span className="font-medium text-gray-900">{String(val ?? "—")}</span>
                        ) : col.key === "phase" ? (
                          <span className={cn(
                            "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold",
                            val === "Phase III" ? "bg-blue-50 text-[#2E75B5]" : "bg-gray-100 text-gray-500"
                          )}>
                            {String(val ?? "—")}
                          </span>
                        ) : col.key === "treatmentClass" ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 text-indigo-600">
                            {String(val ?? "—")}
                          </span>
                        ) : (
                          String(val ?? "—")
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
        <caption className="sr-only">
          Summary of included studies in the mCRPC living systematic review
        </caption>
      </div>
    </div>
  );
}
