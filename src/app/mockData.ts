import { ForestPlotData } from "./components/ForestPlot";
import { NavCategory } from "./components/OnPageNav";

export const PRIMARY_NAV_SECTIONS: NavCategory[] = [
  {
    id: "outcome",
    label: "Outcome",
    children: [
      { id: "os", label: "Overall survival" },
      { id: "pfs", label: "Progression-free survival" },
      { id: "ttp", label: "Time to progression" },
    ]
  },
  {
    id: "response",
    label: "Response",
    children: [
      { id: "obj", label: "Objective" },
      { id: "comp", label: "Complete" },
      { id: "part", label: "Partial" },
      { id: "psa", label: "PSA50%" },
    ]
  },
  {
    id: "ae",
    label: "Adverse events",
    children: [
      {
        id: "all-cause",
        label: "All-cause",
        subItems: [
          { id: "ae-any", label: "Any grade" },
          { id: "ae-g3", label: "Grade 3 or higher" },
          { id: "ae-g5", label: "Grade 5" },
        ]
      },
      {
        id: "treat-rel",
        label: "Treatment related",
        subItems: [
          { id: "trae-any", label: "Any grade" },
          { id: "trae-g3", label: "Grade 3 or higher" },
          { id: "trae-g5", label: "Grade 5" },
        ]
      }
    ]
  }
];

export const SENSITIVITY_NAV_SECTIONS: NavCategory[] = [
  {
    id: "brca",
    label: "BRCA status",
    children: [
      { id: "brca-pos-c1", label: "BRCA positive (cohort 1)" },
      { id: "brca-pos-c2", label: "BRCA positive (cohort 2)" },
      { id: "brca-neg-c1", label: "BRCA negative (cohort 1)" },
      { id: "brca-neg-c2", label: "BRCA negative (cohort 2)" },
      { id: "brca1-pos", label: "BRCA1 positive (cohort 2)" },
      { id: "brca2-pos", label: "BRCA2 positive (cohort 2)" },
    ]
  },
  {
    id: "hrr",
    label: "HRR status",
    children: [
      { id: "hrr-pos-c1", label: "HRR positive (cohort 1)" },
      { id: "hrr-pos-c2", label: "HRR positive (cohort 2)" },
      { id: "hrr-neg-c1", label: "HRR negative (cohort 1)" },
    ]
  },
  {
    id: "other-genes",
    label: "Other gene mutations",
    children: [
      { id: "atm", label: "ATM positive" },
      { id: "cdk12", label: "CDK12 positive" },
      { id: "chek2", label: "CHEK2 positive" },
      { id: "palb2", label: "PALB2 positive" },
    ]
  },
  {
    id: "gleason",
    label: "Gleason score",
    children: [
      { id: "gleason-lt8", label: "Gleason score <8" },
      { id: "gleason-gt8", label: "Gleason score >8" },
    ]
  },
  {
    id: "burden",
    label: "Metastatic burden",
    children: [
      { id: "visceral", label: "Visceral metastases" },
      { id: "no-visceral", label: "No visceral metastases" },
      { id: "measurable", label: "Measurable disease at baseline" },
      { id: "no-measurable", label: "No measurable disease at baseline" },
    ]
  },
  {
    id: "factors",
    label: "Patient factors",
    children: [
      { id: "age-lt70", label: "Age <70" },
      { id: "age-gt70", label: "Age >70" },
      { id: "ecog-01", label: "ECOG PS 0–1" },
      { id: "ecog-2", label: "ECOG PS 2" },
    ]
  },
  {
    id: "endpoint",
    label: "Endpoint type",
    children: [
      { id: "rpfs-pop", label: "Radiographic PFS (overall population)" },
      { id: "rpfs-bicr", label: "Radiographic PFS (BICR)" },
      { id: "rpfs-inv", label: "Radiographic PFS (INV)" },
      { id: "comp-pfs", label: "Composite PFS (overall population)" },
    ]
  }
];

export const MOCK_FOREST_DATA: Record<string, ForestPlotData> = {
  "os": {
    id: "os",
    title: "Overall Survival | Primary Analysis",
    outcome: "overall survival",
    treatment: "immunotherapy",
    control: "placebo",
    studies: [
      { id: "1", name: "Motzer et al 2024", trialName: "CHECKMATE-914 PART B", hr: 0.87, ci: [0.62, 1.22], weight: 14.3 },
      { id: "2", name: "Choueiri et al 2024", trialName: "KEYNOTE-564", hr: 0.72, ci: [0.59, 0.87], weight: 34.1 },
      { id: "3", name: "Motzer et al 2023", trialName: "CHECKMATE-914 PART A", hr: 0.92, ci: [0.71, 1.19], weight: 22.1 },
      { id: "4", name: "Pal et al 2022", trialName: "IMMOTION010", hr: 0.93, ci: [0.75, 1.15], weight: 29.6 },
      { id: "5", name: "Rini et al 2023", trialName: "CLEAR", hr: 0.66, ci: [0.49, 0.90], weight: 25.0 },
      { id: "6", name: "Powles et al 2024", trialName: "JAVELIN Renal 101", hr: 0.82, ci: [0.68, 0.98], weight: 31.0 },
    ],
    pooledHr: 0.79,
    pooledCi: [0.71, 0.88],
    heterogeneity: { i2: "24.5%", t2: "0.0052", p: "0.2145" }
  },
  "pfs": {
    id: "pfs",
    title: "Progression-free Survival | Primary Analysis",
    outcome: "progression-free survival",
    treatment: "immunotherapy",
    control: "placebo",
    studies: [
      { id: "p1", name: "Smith et al 2023", trialName: "ONCO-STAR 1", hr: 0.65, ci: [0.48, 0.88], weight: 25.0 },
      { id: "p2", name: "Johnson et al 2022", trialName: "LUMEN-B", hr: 0.78, ci: [0.60, 1.02], weight: 35.0 },
      { id: "p3", name: "Chen et al 2024", trialName: "RECEPTOR-X", hr: 0.52, ci: [0.39, 0.69], weight: 40.0 },
      { id: "p4", name: "Lee et al 2024", trialName: "ORBIT-2", hr: 0.59, ci: [0.44, 0.79], weight: 28.0 },
    ],
    pooledHr: 0.61,
    pooledCi: [0.54, 0.70],
    heterogeneity: { i2: "41.8%", t2: "0.0110", p: "0.0850" }
  },
  "brca-pos-c1": {
    id: "brca-pos-c1",
    title: "Overall Survival | BRCA positive (cohort 1)",
    outcome: "overall survival",
    treatment: "immunotherapy",
    control: "placebo",
    studies: [
      { id: "s1", name: "Motzer et al 2024", trialName: "CHECKMATE-914 PART B", hr: 0.87, ci: [0.62, 1.22], weight: 14.3 },
      { id: "s2", name: "Choueiri et al 2024", trialName: "KEYNOTE-564", hr: 0.72, ci: [0.59, 0.87], weight: 34.1 },
      { id: "s3", name: "Motzer et al 2023", trialName: "CHECKMATE-914 PART A", hr: 0.92, ci: [0.71, 1.19], weight: 22.1 },
      { id: "s4", name: "Pal et al 2022", trialName: "IMMOTION010", hr: 0.93, ci: [0.75, 1.15], weight: 29.6 },
    ],
    pooledHr: 0.84,
    pooledCi: [0.74, 0.96],
    heterogeneity: { i2: "21.2%", t2: "0.0041", p: "0.2828" }
  },
  "pfs-brca-pos-c1": {
    id: "pfs-brca-pos-c1",
    title: "Progression-free Survival | BRCA positive (cohort 1)",
    outcome: "progression-free survival",
    treatment: "immunotherapy",
    control: "placebo",
    studies: [
      { id: "sp1", name: "Motzer et al 2024", trialName: "CHECKMATE-914 PART B", hr: 0.87, ci: [0.62, 1.22], weight: 14.3 },
      { id: "sp2", name: "Choueiri et al 2024", trialName: "KEYNOTE-564", hr: 0.72, ci: [0.59, 0.87], weight: 34.1 },
      { id: "sp3", name: "Motzer et al 2023", trialName: "CHECKMATE-914 PART A", hr: 0.92, ci: [0.71, 1.19], weight: 22.1 },
      { id: "sp4", name: "Pal et al 2022", trialName: "IMMOTION010", hr: 0.93, ci: [0.75, 1.15], weight: 29.6 },
    ],
    pooledHr: 0.84,
    pooledCi: [0.74, 0.96],
    heterogeneity: { i2: "21.2%", t2: "0.0041", p: "0.2828" }
  }
};
