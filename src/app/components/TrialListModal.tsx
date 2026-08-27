import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCitation } from "../lib/CitationContext";
import { CitationList } from "./CitationList";

/**
 * Shared "count → list of studies" popup. Opened from any study count via
 * useCitation().openTrialList(title, trialNames). Entries render as
 * reference-style citations with direct outbound links to each study —
 * the "count is a dead-end" fix from the usability findings.
 */
export function TrialListModal() {
  const { trialList, closeTrialList } = useCitation();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (trialList) setTimeout(() => closeButtonRef.current?.focus(), 50);
  }, [trialList]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && trialList) closeTrialList();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [trialList, closeTrialList]);

  return (
    <AnimatePresence>
      {trialList && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] bg-black/25"
            onClick={closeTrialList}
          />
          <div className="fixed inset-0 z-[101] flex items-center justify-center px-4 pointer-events-none">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={trialList.title}
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
              className="pointer-events-auto w-full max-w-[600px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col"
            >
              <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4 shrink-0">
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-[#2E75B5] tracking-[0.77px] mb-1.5 font-['Inter',sans-serif]">
                    Studies
                  </p>
                  <h2 className="text-[18px] font-semibold text-gray-900 leading-snug font-['Inter',sans-serif]">
                    {trialList.title}
                  </h2>
                  <p className="text-[12px] text-gray-400 mt-0.5 font-['Inter',sans-serif]">
                    {trialList.trialNames.length} stud{trialList.trialNames.length === 1 ? "y" : "ies"}
                  </p>
                </div>
                <button
                  ref={closeButtonRef}
                  onClick={closeTrialList}
                  aria-label="Close"
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors shrink-0"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto border-t border-gray-100 px-6">
                <CitationList trialNames={trialList.trialNames} />
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
