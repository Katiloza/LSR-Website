import React from "react";
import { motion, AnimatePresence } from "motion/react";

interface NavPanelShellProps {
  isOpen: boolean;
  children: React.ReactNode;
}

export function NavPanelShell({ isOpen, children }: NavPanelShellProps) {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 280, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="sticky top-[104px] h-[calc(100vh-104px)] bg-white overflow-hidden shrink-0 z-40 border-r border-gray-100"
        >
          <div className="w-[280px] h-full overflow-y-auto">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
