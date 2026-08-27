import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ForestPlot } from "./ForestPlot";
import { MOCK_FOREST_DATA } from "../mockData";

/**
 * Forest-plot popup — Figma annotation on node 39:5349: "When selected, a
 * popup will appear with the associated forest plot." Opened from the
 * "Forest plot →" link on an outcome's Overview page, so the reader can see
 * the per-study estimates without leaving the summary.
 */
interface ForestPlotModalProps {
  open: boolean;
  onClose: () => void;
  /** Outcome name, used for the dialog heading. */
  title: string;
  /** MOCK_FOREST_DATA key. */
  dataId: string;
}

export function ForestPlotModal({ open, onClose, title, dataId }: ForestPlotModalProps) {
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

  const data = MOCK_FOREST_DATA[dataId] ?? MOCK_FOREST_DATA["os"];

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
          <div className="pointer-events-none fixed inset-0 z-[101] flex items-center justify-center px-4">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`${title} forest plot`}
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
              className="pointer-events-auto flex max-h-[86vh] w-full max-w-[1060px] flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl"
            >
              <div className="flex shrink-0 items-start justify-between gap-4 px-6 pt-6 pb-4">
                <div className="min-w-0 flex-1">
                  <p className="mb-1.5 font-['Inter',sans-serif] text-[14px] font-semibold text-[#2E75B5]">
                    Forest plot
                  </p>
                  <h2 className="font-['Inter',sans-serif] text-[18px] font-semibold leading-snug text-gray-900">
                    {title}
                  </h2>
                </div>
                <button
                  ref={closeButtonRef}
                  onClick={onClose}
                  aria-label="Close"
                  className="shrink-0 rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-900"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto border-t border-gray-100 px-6 py-5">
                <ForestPlot data={{ ...data, id: `${data.id}-modal`, title }} isActive />
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
