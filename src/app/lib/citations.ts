// Shared trial-citation lookup used by every "clickable count → study record"
// interaction in the app (Summary Tables rows, PRISMA Study List, Summary of
// Findings included-studies, Meta-Analysis forest plot rows, Home page study
// count). One entry per trial name so every surface shows the same citation.
//
// `pmid` is only set where it was already present elsewhere in this codebase
// (PRISMA's included-studies list) so we never display an unverified ID.
// Everywhere else we link out via a PubMed *search* URL, which is always
// correct even though it isn't a direct deep link.

export interface Citation {
  trialName: string;
  authors: string;
  journal: string;
  year: number;
  pmid?: string;
  condition?: string;
}

function pubmedSearchUrl(trialName: string) {
  return `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(trialName + " trial")}`;
}

export function citationUrl(c: Citation): string {
  return c.pmid ? `https://pubmed.ncbi.nlm.nih.gov/${c.pmid}` : pubmedSearchUrl(c.trialName);
}

// The 12 mCRPC trials backing the Summary Tables interactive table — the
// canonical, fully-detailed dataset in this prototype.
const MCRPC_CITATIONS: Citation[] = [
  { trialName: "PROpel",     authors: "Saad F, et al.",       journal: "NEJM Evidence",           year: 2023, pmid: "35026162" },
  { trialName: "TALAPRO-2",  authors: "Agarwal N, et al.",    journal: "The Lancet",               year: 2023, pmid: "37062857" },
  { trialName: "MAGNITUDE",  authors: "Chi KN, et al.",       journal: "Journal of Clinical Oncology", year: 2023, pmid: "35147311" },
  { trialName: "VISION",     authors: "Sartor O, et al.",     journal: "New England Journal of Medicine", year: 2021, pmid: "34161052" },
  { trialName: "CARD",       authors: "de Wit R, et al.",     journal: "New England Journal of Medicine", year: 2019, pmid: "31665565" },
  { trialName: "TRITON3",    authors: "Fizazi K, et al.",     journal: "New England Journal of Medicine", year: 2023, pmid: "36795891" },
  { trialName: "PROfound",   authors: "Hussain M, et al.",    journal: "New England Journal of Medicine", year: 2020 },
  { trialName: "COU-AA-302", authors: "Ryan CJ, et al.",      journal: "New England Journal of Medicine", year: 2013 },
  { trialName: "PREVAIL",    authors: "Beer TM, et al.",      journal: "New England Journal of Medicine", year: 2014 },
  { trialName: "AFFIRM",     authors: "Scher HI, et al.",     journal: "New England Journal of Medicine", year: 2012 },
  { trialName: "COU-AA-301", authors: "de Bono JS, et al.",   journal: "New England Journal of Medicine", year: 2011 },
  { trialName: "LATITUDE",   authors: "Fizazi K, et al.",     journal: "New England Journal of Medicine", year: 2017 },
];

// Additional trials referenced only in PRISMA's included-studies list.
const PRISMA_EXTRA_CITATIONS: Citation[] = [
  { trialName: "ARCHES",  authors: "Armstrong AJ, et al.", journal: "Journal of Clinical Oncology",    year: 2019, pmid: "31157964" },
  { trialName: "TITAN",   authors: "Chi KN, et al.",       journal: "New England Journal of Medicine", year: 2019, pmid: "31157962" },
  { trialName: "TheraP",  authors: "Hofman MS, et al.",    journal: "The Lancet",                       year: 2021, pmid: "33581798" },
  { trialName: "ENZAMET", authors: "Davis ID, et al.",     journal: "New England Journal of Medicine", year: 2019, pmid: "31157965" },
];

// Trials referenced only by the (generic, non-mCRPC) forest-plot demo data.
const FOREST_PLOT_CITATIONS: Citation[] = [
  { trialName: "CHECKMATE-914 PART A", authors: "Motzer RJ, et al.",  journal: "The Lancet",                       year: 2023, condition: "Renal cell carcinoma" },
  { trialName: "CHECKMATE-914 PART B", authors: "Motzer RJ, et al.",  journal: "The Lancet",                       year: 2023, condition: "Renal cell carcinoma" },
  { trialName: "KEYNOTE-564",          authors: "Choueiri TK, et al.",journal: "New England Journal of Medicine", year: 2021, condition: "Renal cell carcinoma" },
  { trialName: "IMMOTION010",          authors: "Pal SK, et al.",     journal: "The Lancet",                       year: 2022, condition: "Renal cell carcinoma" },
  { trialName: "CLEAR",                authors: "Motzer RJ, et al.",  journal: "New England Journal of Medicine", year: 2021, condition: "Renal cell carcinoma" },
  { trialName: "JAVELIN Renal 101",    authors: "Motzer RJ, et al.",  journal: "New England Journal of Medicine", year: 2019, condition: "Renal cell carcinoma" },
];

export const CANONICAL_TRIAL_NAMES = MCRPC_CITATIONS.map((c) => c.trialName);

const CITATION_MAP: Map<string, Citation> = new Map(
  [...MCRPC_CITATIONS, ...PRISMA_EXTRA_CITATIONS, ...FOREST_PLOT_CITATIONS].map((c) => [c.trialName, c])
);

/** Returns undefined for trial names with no citation on file (handled as an empty state by the modal). */
export function getCitation(trialName: string): Citation | undefined {
  return CITATION_MAP.get(trialName);
}
