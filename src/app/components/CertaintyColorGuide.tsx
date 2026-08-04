import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { certaintyColor, CertaintyLevel, EffectDirection } from "./CertaintyBadge";

const LEVELS: CertaintyLevel[] = ["High", "Moderate", "Low", "Very Low"];
const DIRECTIONS: { key: EffectDirection; label: (level: CertaintyLevel) => string }[] = [
  { key: "benefit", label: (l) => `${l} certainty benefit` },
  { key: "harm",    label: (l) => `${l} certainty harm` },
  { key: "neither", label: (l) => `${l} certainty neither benefit nor harm` },
];

interface CertaintyColorGuideProps {
  open: boolean;
  onClose: () => void;
}

/** Reference popup for the certainty color guide — direction (columns) × level (rows). */
export function CertaintyColorGuide({ open, onClose }: CertaintyColorGuideProps) {
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
              aria-label="Certainty of evidence color guide"
              initial={{ opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
              className="pointer-events-auto w-full max-w-[620px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
            >
              <div className="flex items-center justify-between gap-4 px-6 pt-6 pb-4">
                <h2 className="text-[18px] font-semibold text-gray-900 font-['Articulat_CF',sans-serif]">
                  Color guide
                </h2>
                <button
                  ref={closeButtonRef}
                  onClick={onClose}
                  aria-label="Close"
                  className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors shrink-0"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="px-6 pb-6">
                <div className="rounded-xl overflow-hidden border border-gray-100">
                  <div className="grid grid-cols-3">
                    {LEVELS.map((level) =>
                      DIRECTIONS.map(({ key, label }) => {
                        const { bg, text } = certaintyColor(level, key);
                        return (
                          <div
                            key={`${level}-${key}`}
                            className="px-4 py-3.5 text-[13px] font-medium border-b border-r border-white/40 last:border-r-0"
                            style={{ backgroundColor: bg, color: text }}
                          >
                            {label(level)}
                          </div>
                        );
                      })
                    )}
                  </div>
                  <div className="px-4 py-3.5 text-[13px] text-center font-medium bg-gray-100 text-gray-500">
                    Not Applicable
                  </div>
                </div>
                <p className="text-[11px] text-gray-400 font-['Inter',sans-serif] mt-3">
                  Color reflects both the direction of effect (benefit, harm, or neither) and the GRADE certainty
                  of that estimate — darker shades indicate higher certainty.
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
