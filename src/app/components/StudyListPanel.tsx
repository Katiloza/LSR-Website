import React, { useEffect, useRef } from "react";
import { X, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PrismaStage } from "./PrismaFlowchart";

interface StudyListPanelProps {
  stage: PrismaStage | null;
  onClose: () => void;
}

export function StudyListPanel({ stage, onClose }: StudyListPanelProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Focus close button when panel opens
  useEffect(() => {
    if (stage) {
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    }
  }, [stage]);

  // Keyboard dismiss
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && stage) onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [stage, onClose]);

  return (
    <AnimatePresence>
      {stage && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40 bg-black/10"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Studies for: ${stage.label}`}
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="fixed right-0 top-[72px] z-50 h-[calc(100vh-72px)] w-[360px] bg-white shadow-2xl border-l border-gray-200 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-gray-100">
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold text-[#2E75B5] uppercase tracking-widest mb-1 font-['Articulat_CF',sans-serif]">
                  Studies
                </p>
                <h2 className="text-[16px] font-semibold text-gray-900 leading-snug font-['Articulat_CF',sans-serif]">
                  {stage.label}
                </h2>
                <p className="text-[13px] text-gray-500 mt-0.5 font-['Inter',sans-serif]">
                  {stage.count.toLocaleString()} record{stage.count !== 1 ? "s" : ""}
                </p>
              </div>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                aria-label="Close study list"
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors mt-0.5 shrink-0"
              >
                <X size={18} />
              </button>
            </div>

            {/* Study list */}
            <div className="flex-1 overflow-y-auto">
              {stage.studies && stage.studies.length > 0 ? (
                <ul className="divide-y divide-gray-50">
                  {stage.studies.map((study, i) => (
                    <li key={i} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-medium text-gray-900 leading-snug font-['Inter',sans-serif]">
                            {study.title}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[11px] text-gray-400 font-['Inter',sans-serif]">{study.year}</span>
                            {study.pmid && (
                              <>
                                <span className="text-gray-300">·</span>
                                <span className="text-[11px] text-gray-400 font-['Inter',sans-serif]">
                                  PMID: {study.pmid}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                        {study.pmid && (
                          <a
                            href={`https://pubmed.ncbi.nlm.nih.gov/${study.pmid}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open ${study.title} on PubMed`}
                            className="p-1 text-gray-300 hover:text-[#2E75B5] transition-colors shrink-0 mt-0.5"
                          >
                            <ExternalLink size={13} />
                          </a>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex flex-col items-center justify-center h-48 gap-2 text-gray-400">
                  <p className="text-[14px] font-['Inter',sans-serif]">No studies listed for this stage.</p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
