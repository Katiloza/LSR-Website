import React, { useEffect, useRef } from "react";
import { X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCitation } from "../lib/CitationContext";
import { getCitation } from "../lib/citations";

/**
 * Shared "count → list of studies" popup. Opened from any study count via
 * useCitation().openTrialList(title, trialNames). Clicking a trial in the
 * list opens the fuller single-study CitationModal — the "count is a
 * dead-end" fix from the usability findings.
 */
export function TrialListModal() {
  const { trialList, closeTrialList, openCitation } = useCitation();
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

  const selectTrial = (trialName: string) => {
    closeTrialList();
    openCitation(trialName);
  };

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
              className="pointer-events-auto w-full max-w-[440px] max-h-[75vh] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col"
            >
              <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4 shrink-0">
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-bold text-[#2E75B5] uppercase tracking-widest mb-1.5 font-['Articulat_CF',sans-serif]">
                    Studies
                  </p>
                  <h2 className="text-[18px] font-semibold text-gray-900 leading-snug font-['Articulat_CF',sans-serif]">
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

              <div className="flex-1 overflow-y-auto border-t border-gray-100">
                <ul className="divide-y divide-gray-50">
                  {trialList.trialNames.map((trialName) => {
                    const citation = getCitation(trialName);
                    return (
                      <li key={trialName}>
                        <button
                          onClick={() => selectTrial(trialName)}
                          className="w-full flex items-center justify-between gap-3 px-6 py-3.5 hover:bg-blue-50/40 transition-colors text-left"
                        >
                          <div className="min-w-0">
                            <p className="text-[13px] font-semibold text-gray-900 leading-snug font-['Inter',sans-serif]">
                              {trialName}
                            </p>
                            {citation && (
                              <p className="text-[11px] text-gray-400 font-['Inter',sans-serif] mt-0.5">
                                {citation.journal} · {citation.year}
                              </p>
                            )}
                          </div>
                          <ChevronRight size={15} className="text-gray-300 shrink-0" />
                        </button>
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
