import React from "react";
import { cn } from "../lib/utils";

export interface LivingSearchCell {
  year: number;
  month: number; // 1-12
  count: number;
}

interface PrismaLivingSearchProps {
  data: LivingSearchCell[];
  startYear?: number;
  endYear?: number;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function getCellIntensity(count: number, max: number): string {
  if (count === 0) return "transparent";
  const ratio = count / max;
  if (ratio < 0.2) return "rgba(46,117,181,0.12)";
  if (ratio < 0.4) return "rgba(46,117,181,0.25)";
  if (ratio < 0.6) return "rgba(46,117,181,0.45)";
  if (ratio < 0.8) return "rgba(46,117,181,0.65)";
  return "rgba(46,117,181,0.85)";
}

function getCellTextColor(count: number, max: number): string {
  if (count === 0) return "#CBD5E1";
  const ratio = count / max;
  return ratio >= 0.6 ? "#ffffff" : "#1e4d7a";
}

export function PrismaLivingSearch({ data, startYear = 2020, endYear = 2026 }: PrismaLivingSearchProps) {
  const years: number[] = [];
  for (let y = endYear; y >= startYear; y--) years.push(y);

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  const countMap = new Map<string, number>();
  data.forEach((cell) => countMap.set(`${cell.year}-${cell.month}`, cell.count));

  const maxCount = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse text-[12px] font-['Inter',sans-serif]">
        <thead>
          <tr>
            <th className="w-16 text-left pr-4 pb-3 text-[11px] leading-[16.5px] font-semibold text-gray-500">
              Year
            </th>
            {MONTHS.map((m) => (
              <th
                key={m}
                className="text-center pb-3 text-[11px] leading-[16.5px] font-semibold text-gray-500 min-w-[52px]"
              >
                {m}
              </th>
            ))}
            <th className="pl-4 pb-3 text-right text-[11px] font-semibold text-gray-400">Total</th>
          </tr>
        </thead>
        <tbody>
          {years.map((year) => {
            const yearTotal = MONTHS.reduce((sum, _, idx) => {
              const count = countMap.get(`${year}-${idx + 1}`) ?? 0;
              return sum + count;
            }, 0);

            return (
              <tr key={year} className="group">
                <td className="pr-4 py-1 text-[12px] font-semibold text-gray-700 align-middle">{year}</td>
                {MONTHS.map((_, monthIdx) => {
                  const month = monthIdx + 1;
                  const isFuture = year > currentYear || (year === currentYear && month > currentMonth);
                  const count = countMap.get(`${year}-${month}`) ?? 0;
                  const bg = isFuture ? "transparent" : getCellIntensity(count, maxCount);
                  const textColor = isFuture ? "#E2E8F0" : getCellTextColor(count, maxCount);

                  return (
                    <td key={month} className="py-1 px-0.5">
                      <div
                        className={cn(
                          "h-10 rounded-md flex items-center justify-center tabular-nums transition-all",
                          !isFuture && count > 0 && "cursor-default hover:opacity-80",
                          isFuture && "opacity-30"
                        )}
                        style={{ backgroundColor: bg }}
                        title={isFuture ? "Future" : `${count} record${count !== 1 ? "s" : ""}`}
                      >
                        <span style={{ color: textColor }} className="text-[11px] font-medium">
                          {isFuture ? "" : count === 0 ? "—" : count}
                        </span>
                      </div>
                    </td>
                  );
                })}
                <td className="pl-4 py-1 text-right text-[12px] font-semibold text-gray-700 tabular-nums">
                  {yearTotal > 0 ? yearTotal.toLocaleString() : "—"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Legend */}
      <div className="flex items-center gap-2 mt-4 justify-end">
        <span className="text-[11px] text-gray-400 font-['Inter',sans-serif]">Records screened:</span>
        {[0, 10, 30, 60, 100, 150].map((val, i) => (
          <div
            key={i}
            className="w-7 h-5 rounded flex items-center justify-center text-[9px]"
            style={{
              backgroundColor: val === 0 ? "#F1F5F9" : getCellIntensity(val, 150),
              color: getCellTextColor(val, 150),
            }}
          >
            {val === 0 ? "0" : ""}
          </div>
        ))}
        <span className="text-[11px] text-gray-400 font-['Inter',sans-serif]">more</span>
      </div>
    </div>
  );
}
