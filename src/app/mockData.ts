import { ForestPlotData } from "./components/ForestPlot";

export const MOCK_FOREST_DATA: Record<string, ForestPlotData> = {
  // The 12 mCRPC trials backing Summary Tables / citations — per-study HRs and
  // CIs mirror the hrOs column of the Summary Tables dataset, weights are
  // proportional to trial size, and the pooled estimate matches the SoF
  // Overall-survival row (HR 0.79, 0.71–0.88, n=12).
  "os": {
    id: "os",
    title: "Overall Survival | Overall Population",
    outcome: "overall survival",
    treatment: "the investigational arm",
    control: "the control arm",
    studies: [
      { id: "1",  name: "Saad et al 2023",     trialName: "PROpel",      hr: 0.83, ci: [0.66, 1.03], weight: 7.6 },
      { id: "2",  name: "Agarwal et al 2023",  trialName: "TALAPRO-2",   hr: 0.89, ci: [0.69, 1.14], weight: 10.5 },
      { id: "3",  name: "Chi et al 2023",      trialName: "MAGNITUDE",   hr: 0.88, ci: [0.58, 1.34], weight: 4.0 },
      { id: "4",  name: "Sartor et al 2021",   trialName: "VISION",      hr: 0.62, ci: [0.52, 0.74], weight: 7.9 },
      { id: "5",  name: "de Wit et al 2019",   trialName: "CARD",        hr: 0.64, ci: [0.46, 0.89], weight: 2.4 },
      { id: "6",  name: "Fizazi et al 2023",   trialName: "TRITON3",     hr: 0.94, ci: [0.65, 1.35], weight: 2.6 },
      { id: "7",  name: "Hussain et al 2020",  trialName: "PROfound",    hr: 0.69, ci: [0.50, 0.97], weight: 3.7 },
      { id: "8",  name: "Ryan et al 2013",     trialName: "COU-AA-302",  hr: 0.75, ci: [0.61, 0.93], weight: 10.4 },
      { id: "9",  name: "Beer et al 2014",     trialName: "PREVAIL",     hr: 0.73, ci: [0.63, 0.85], weight: 16.4 },
      { id: "10", name: "Scher et al 2012",    trialName: "AFFIRM",      hr: 0.63, ci: [0.53, 0.75], weight: 11.5 },
      { id: "11", name: "de Bono et al 2011",  trialName: "COU-AA-301",  hr: 0.74, ci: [0.64, 0.86], weight: 11.4 },
      { id: "12", name: "Fizazi et al 2017",   trialName: "LATITUDE",    hr: 0.62, ci: [0.51, 0.76], weight: 11.5 },
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
