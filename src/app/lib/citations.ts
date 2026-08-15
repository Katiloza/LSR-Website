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
  /** Publication title shown as the linked headline in reference-style lists. */
  title?: string;
  authors: string;
  journal: string;
  year: number;
  pmid?: string;
  nct?: string;
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
  { trialName: "PROpel",     title: "Abiraterone and olaparib for metastatic castration-resistant prostate cancer (PROpel).",                                      authors: "Saad F, Clarke NW, Oya M, et al.",       journal: "NEJM Evidence",                    year: 2023, pmid: "35026162", nct: "NCT03732820" },
  { trialName: "TALAPRO-2",  title: "Talazoparib plus enzalutamide in men with first-line metastatic castration-resistant prostate cancer (TALAPRO-2).",           authors: "Agarwal N, Azad AA, Carles J, et al.",   journal: "The Lancet",                       year: 2023, pmid: "37062857", nct: "NCT03395197" },
  { trialName: "MAGNITUDE",  title: "Niraparib and abiraterone acetate for metastatic castration-resistant prostate cancer (MAGNITUDE).",                          authors: "Chi KN, Rathkopf D, Smith MR, et al.",   journal: "Journal of Clinical Oncology",     year: 2023, pmid: "35147311", nct: "NCT03748641" },
  { trialName: "VISION",     title: "Lutetium-177–PSMA-617 for metastatic castration-resistant prostate cancer (VISION).",                                          authors: "Sartor O, de Bono J, Chi KN, et al.",    journal: "New England Journal of Medicine",  year: 2021, pmid: "34161052", nct: "NCT03511664" },
  { trialName: "CARD",       title: "Cabazitaxel versus abiraterone or enzalutamide in metastatic prostate cancer (CARD).",                                         authors: "de Wit R, de Bono J, Sternberg CN, et al.", journal: "New England Journal of Medicine", year: 2019, pmid: "31665565", nct: "NCT02485691" },
  { trialName: "TRITON3",    title: "Rucaparib or physician's choice in metastatic prostate cancer with a BRCA1, BRCA2, or ATM alteration (TRITON3).",             authors: "Fizazi K, Piulats JM, Reaume MN, et al.", journal: "New England Journal of Medicine", year: 2023, pmid: "36795891", nct: "NCT02975934" },
  { trialName: "PROfound",   title: "Olaparib for metastatic castration-resistant prostate cancer with homologous recombination repair alterations (PROfound).",   authors: "Hussain M, Mateo J, Fizazi K, et al.",   journal: "New England Journal of Medicine",  year: 2020, nct: "NCT02987543" },
  { trialName: "COU-AA-302", title: "Abiraterone in metastatic prostate cancer without previous chemotherapy (COU-AA-302).",                                        authors: "Ryan CJ, Smith MR, de Bono JS, et al.",  journal: "New England Journal of Medicine",  year: 2013, nct: "NCT00887198" },
  { trialName: "PREVAIL",    title: "Enzalutamide in metastatic prostate cancer before chemotherapy (PREVAIL).",                                                    authors: "Beer TM, Armstrong AJ, Rathkopf DE, et al.", journal: "New England Journal of Medicine", year: 2014, nct: "NCT01212991" },
  { trialName: "AFFIRM",     title: "Increased survival with enzalutamide in prostate cancer after chemotherapy (AFFIRM).",                                         authors: "Scher HI, Fizazi K, Saad F, et al.",     journal: "New England Journal of Medicine",  year: 2012, nct: "NCT00974311" },
  { trialName: "COU-AA-301", title: "Abiraterone and increased survival in metastatic prostate cancer (COU-AA-301).",                                               authors: "de Bono JS, Logothetis CJ, Molina A, et al.", journal: "New England Journal of Medicine", year: 2011, nct: "NCT00638690" },
  { trialName: "LATITUDE",   title: "Abiraterone plus prednisone in metastatic, castration-sensitive prostate cancer (LATITUDE).",                                  authors: "Fizazi K, Tran N, Fein L, et al.",       journal: "New England Journal of Medicine",  year: 2017, nct: "NCT01715285" },
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
