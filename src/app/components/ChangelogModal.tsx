import React, { useEffect, useRef } from "react";
import { X, PlusCircle, TrendingUp, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../lib/utils";

interface ChangeEntry {
  kind: "added" | "moved" | "updated";
  text: string;
  date: string;
}

// What changed since the previous living-review update — the concrete
// evidence that this is a *living* review, not a static one.
const CHANGES: ChangeEntry[] = [
  { kind: "added",   text: "TALAPRO-2 added to the included-studies set after full-text screening.", date: "Jun 2026" },
  { kind: "moved",   text: "Overall survival pooled HR moved from 0.81 (0.72–0.91) to 0.79 (0.71–0.88) after TALAPRO-2 was incorporated.", date: "Jun 2026" },
  { kind: "updated", text: "GRADE certainty for progression-free survival upgraded from Low to Moderate — inconsistency reassessed.", date: "May 2026" },
  { kind: "added",   text: "TRITON3 added; BRCA1/2 sensitivity subgroup forest plot introduced.", date: "Apr 2026" },
  { kind: "updated", text: "Monthly automated search identified 41 new records; 3 progressed to full-text review.", date: "Apr 2026" },
];

const ICON: Record<ChangeEntry["kind"], React.ElementType> = {
  added: PlusCircle,
  moved: TrendingUp,
  updated: RefreshCw,
};
const ICON_COLOR: Record<ChangeEntry["kind"], string> = {
  added: "text-emerald-500",
  moved: "text-[#2E75B5]",
  updated: "text-amber-500",
};

interface ChangelogModalProps {
  open: boolean;
  onClose: () => void;
}

export function ChangelogModal({ open, onClose }: ChangelogModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => closeButtonRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] bg-black/25"
            onClick={onClose}
          />
          <div className="fixed inset-0 z-[101] flex items-center justify-center px-4 pointer-events-none">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="What changed in this living review"
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
              className="pointer-events-auto w-full max-w-[480px] max-h-[75vh] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col"
            >
              <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4 shrink-0">
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-[#2E75B5] tracking-[0.77px] mb-1.5 font-['Inter',sans-serif]">
                    Living review
                  </p>
                  <h2 className="text-[18px] font-semibold text-gray-900 leading-snug font-['Inter',sans-serif]">
                    What's changed
                  </h2>
                  <p className="text-[12px] text-gray-400 mt-0.5 font-['Inter',sans-serif]">
                    Studies added and estimates updated since prior versions of this review
                  </p>
                </div>
                <button
                  ref={closeButtonRef}
                  onClick={onClose}
                  aria-label="Close"
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors shrink-0"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto border-t border-gray-100">
                <ul className="divide-y divide-gray-50">
                  {CHANGES.map((change, i) => {
                    const Icon = ICON[change.kind];
                    return (
                      <li key={i} className="flex items-start gap-3 px-6 py-4">
                        <Icon size={16} className={cn("shrink-0 mt-0.5", ICON_COLOR[change.kind])} />
                        <div className="min-w-0">
                          <p className="text-[13px] text-gray-800 font-['Inter',sans-serif] leading-relaxed">
                            {change.text}
                          </p>
                          <p className="text-[11px] text-gray-400 font-['Inter',sans-serif] mt-1">{change.date}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
