import React, { createContext, useContext, useState, useCallback, useMemo } from "react";

interface TrialListState {
  title: string;
  trialNames: string[];
}

interface CitationContextValue {
  /** Trial name currently shown in the single-study citation popup, or null when closed. */
  openTrialName: string | null;
  openCitation: (trialName: string) => void;
  closeCitation: () => void;

  /** Multi-trial list popup (e.g. opened from a study count) — null when closed. */
  trialList: TrialListState | null;
  openTrialList: (title: string, trialNames: string[]) => void;
  closeTrialList: () => void;
}

const CitationContext = createContext<CitationContextValue | null>(null);

/**
 * App-level provider so any component (table row, forest-plot point, study
 * count) can open the same shared citation popup or trial-list popup by
 * trial name, without prop-drilling a modal component through every
 * intermediate layer. This is the "count → trial list → citation" chain the
 * usability findings asked for everywhere a number represents studies.
 */
export function CitationProvider({ children }: { children: React.ReactNode }) {
  const [openTrialName, setOpenTrialName] = useState<string | null>(null);
  const [trialList, setTrialList] = useState<TrialListState | null>(null);

  const openCitation = useCallback((trialName: string) => setOpenTrialName(trialName), []);
  const closeCitation = useCallback(() => setOpenTrialName(null), []);

  const openTrialList = useCallback((title: string, trialNames: string[]) => setTrialList({ title, trialNames }), []);
  const closeTrialList = useCallback(() => setTrialList(null), []);

  const value = useMemo(
    () => ({ openTrialName, openCitation, closeCitation, trialList, openTrialList, closeTrialList }),
    [openTrialName, openCitation, closeCitation, trialList, openTrialList, closeTrialList]
  );

  return <CitationContext.Provider value={value}>{children}</CitationContext.Provider>;
}

export function useCitation() {
  const ctx = useContext(CitationContext);
  if (!ctx) throw new Error("useCitation must be used within a CitationProvider");
  return ctx;
}
