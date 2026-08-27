import React, { useEffect, useRef } from "react";
import { X, ExternalLink, FileQuestion } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useCitation } from "../lib/CitationContext";
import { getCitation, citationUrl } from "../lib/citations";

/**
 * Shared "trial overview" popup: trial name, authors, journal (the citation),
 * and a link to view the study directly. Opened from anywhere via
 * useCitation().openCitation(trialName) — reused by Summary Tables rows,
 * PRISMA's Study List, Summary of Findings included-studies, Meta-Analysis
 * forest-plot rows, and the Home page study count.
 */
export function CitationModal() {
  const { openTrialName, closeCitation } = useCitation();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const citation = openTrialName ? getCitation(openTrialName) : undefined;

  useEffect(() => {
    if (openTrialName) setTimeout(() => closeButtonRef.current?.focus(), 50);
  }, [openTrialName]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && openTrialName) closeCitation();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [openTrialName, closeCitation]);

  return (
    <AnimatePresence>
      {openTrialName && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[100] bg-black/25"
            onClick={closeCitation}
          />
          <div className="fixed inset-0 z-[101] flex items-center justify-center px-4 pointer-events-none">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`Study record: ${openTrialName}`}
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
              className="pointer-events-auto w-full max-w-[420px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
            >
              <div className="flex items-start justify-between gap-4 px-6 pt-6 pb-4">
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-semibold text-[#2E75B5] tracking-[0.77px] mb-1.5 font-['Inter',sans-serif]">
                    Study record
                  </p>
                  <h2 className="text-[18px] font-semibold text-gray-900 leading-snug font-['Inter',sans-serif]">
                    {openTrialName}
                  </h2>
                </div>
                <button
                  ref={closeButtonRef}
                  onClick={closeCitation}
                  aria-label="Close"
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors shrink-0"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="px-6 pb-6">
                {citation ? (
                  <div className="rounded-xl border border-gray-100 bg-gray-50/60 px-4 py-3.5 flex flex-col gap-1.5">
                    <p className="text-[13px] text-gray-800 font-['Inter',sans-serif] leading-snug">
                      {citation.authors}
                    </p>
                    <p className="text-[13px] text-gray-600 font-['Inter',sans-serif] italic leading-snug">
                      {citation.journal}. {citation.year}.
                    </p>
                    {citation.condition && (
                      <p className="text-[11px] text-gray-400 font-['Inter',sans-serif]">{citation.condition}</p>
                    )}
                    <a
                      href={citationUrl(citation)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#2E75B5] hover:underline w-fit"
                    >
                      View study on PubMed
                      <ExternalLink size={13} />
                    </a>
                  </div>
                ) : (
                  <div className="rounded-xl border border-dashed border-gray-200 px-4 py-5 flex flex-col items-center text-center gap-2">
                    <FileQuestion size={20} className="text-gray-300" />
                    <p className="text-[12px] text-gray-400 font-['Inter',sans-serif]">
                      No citation on file for this record in the prototype.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
