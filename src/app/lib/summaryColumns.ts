// AUTO-GENERATED from "Summary Tables column count by levels.pdf" — transcribed literally.
// Do not normalize, dedupe, or merge entries (PFS-rate variants, triple ORR, dual Baseline PSA are intentional).

export interface ColNode {
  key: string;
  label: string;
  children?: ColNode[];
}

export const COLUMN_SCHEMA: ColNode[] = [
  { key: "trial_characteristics", label: "Trial characteristics", children: [
    { key: "trial_characteristics.nct", label: "NCT" },
    { key: "trial_characteristics.pmid", label: "PMID" },
    { key: "trial_characteristics.trial_name", label: "Trial Name" },
    { key: "trial_characteristics.author", label: "Author" },
    { key: "trial_characteristics.year", label: "Year" },
    { key: "trial_characteristics.phase", label: "Phase" },
    { key: "trial_characteristics.original_follow_up", label: "Original/Follow up" },
    { key: "trial_characteristics.number_of_arms_included", label: "Number of Arms Included" },
    { key: "trial_characteristics.estimated_accrual", label: "Estimated Accrual" },
    { key: "trial_characteristics.actual_accrual", label: "Actual Accrual" },
    { key: "trial_characteristics.trial_accrual_met_y_n", label: "Trial Accrual Met - Y/N" },
    { key: "trial_characteristics.total_participants_n", label: "Total Participants - N" },
    { key: "trial_characteristics.n", label: "N", children: [
      { key: "trial_characteristics.n.treatment", label: "Treatment" },
      { key: "trial_characteristics.n.control", label: "Control" }
    ] },
    { key: "trial_characteristics.line_of_therapy", label: "Line of Therapy" },
    { key: "trial_characteristics.type_of_therapy", label: "Type of Therapy" },
    { key: "trial_characteristics.treatment_class", label: "Treatment Class" },
    { key: "trial_characteristics.treatment", label: "Treatment" },
    { key: "trial_characteristics.treatment_regimen", label: "Treatment Regimen" },
    { key: "trial_characteristics.control", label: "Control" },
    { key: "trial_characteristics.median_follow_up_duration_mo", label: "Median Follow up Duration (mo)" },
    { key: "trial_characteristics.prior_therapy_by_threshold", label: "Prior therapy by threshold" },
    { key: "trial_characteristics.prior_therapy_in_any_setting", label: "Prior Therapy in Any Setting" },
    { key: "trial_characteristics.prior_therapy_in_mhspc_setting", label: "Prior Therapy in mHSPC Setting" },
    { key: "trial_characteristics.prior_therapy_in_mcrpc_setting", label: "Prior Therapy in mCRPC Setting" },
    { key: "trial_characteristics.prior_therapy_in_m0_crpc_setting", label: "Prior Therapy in M0 CRPC Setting" }
  ] },
  { key: "population_characteristics", label: "Population characteristics", children: [
    { key: "population_characteristics.age_in_years_median_range", label: "Age in years - median (range)", children: [
      { key: "population_characteristics.age_in_years_median_range.overall_population", label: "Overall Population" },
      { key: "population_characteristics.age_in_years_median_range.treatment", label: "Treatment" },
      { key: "population_characteristics.age_in_years_median_range.control", label: "Control" }
    ] },
    { key: "population_characteristics.median_on_treatment_duration_mo", label: "Median On-Treatment Duration (mo)", children: [
      { key: "population_characteristics.median_on_treatment_duration_mo.treatment", label: "Treatment" },
      { key: "population_characteristics.median_on_treatment_duration_mo.control", label: "Control" }
    ] },
    { key: "population_characteristics.performance_status_n", label: "Performance Status - N (%)", children: [
      { key: "population_characteristics.performance_status_n.0", label: "0", children: [
        { key: "population_characteristics.performance_status_n.0.overall_population", label: "Overall population" },
        { key: "population_characteristics.performance_status_n.0.treatment", label: "Treatment" },
        { key: "population_characteristics.performance_status_n.0.control", label: "Control" }
      ] },
      { key: "population_characteristics.performance_status_n.1", label: "1", children: [
        { key: "population_characteristics.performance_status_n.1.overall_population", label: "Overall Population" },
        { key: "population_characteristics.performance_status_n.1.treatment", label: "Treatment" },
        { key: "population_characteristics.performance_status_n.1.control", label: "Control" }
      ] },
      { key: "population_characteristics.performance_status_n.0_or_1", label: "0 or 1", children: [
        { key: "population_characteristics.performance_status_n.0_or_1.overall_population", label: "Overall Population" },
        { key: "population_characteristics.performance_status_n.0_or_1.treatment", label: "Treatment" },
        { key: "population_characteristics.performance_status_n.0_or_1.control", label: "Control" }
      ] },
      { key: "population_characteristics.performance_status_n.2", label: "2", children: [
        { key: "population_characteristics.performance_status_n.2.overall_population", label: "Overall Population" },
        { key: "population_characteristics.performance_status_n.2.treatment", label: "Treatment" },
        { key: "population_characteristics.performance_status_n.2.control", label: "Control" }
      ] },
      { key: "population_characteristics.performance_status_n.1_and_2", label: "1 & 2", children: [
        { key: "population_characteristics.performance_status_n.1_and_2.overall_population", label: "Overall Population" },
        { key: "population_characteristics.performance_status_n.1_and_2.treatment", label: "Treatment" },
        { key: "population_characteristics.performance_status_n.1_and_2.control", label: "Control" }
      ] }
    ] },
    { key: "population_characteristics.gleason_score_ge_8_n", label: "Gleason Score ≥ 8 - N (%)", children: [
      { key: "population_characteristics.gleason_score_ge_8_n.overall_population", label: "Overall Population" },
      { key: "population_characteristics.gleason_score_ge_8_n.treatment", label: "Treatment" },
      { key: "population_characteristics.gleason_score_ge_8_n.control", label: "Control" }
    ] },
    { key: "population_characteristics.baseline_psa_median_iqr", label: "Baseline PSA - Median (IQR)", children: [
      { key: "population_characteristics.baseline_psa_median_iqr.overall_population", label: "Overall Population" }
    ] },
    { key: "population_characteristics.baseline_psa_ng_ml_median_iqr", label: "Baseline PSA (ng/mL) - Median (IQR)", children: [
      { key: "population_characteristics.baseline_psa_ng_ml_median_iqr.treatment", label: "Treatment" },
      { key: "population_characteristics.baseline_psa_ng_ml_median_iqr.control", label: "Control" }
    ] },
    { key: "population_characteristics.bone_metastasis_n", label: "Bone Metastasis - N (%)", children: [
      { key: "population_characteristics.bone_metastasis_n.overall_population", label: "Overall Population" },
      { key: "population_characteristics.bone_metastasis_n.treatment", label: "Treatment" },
      { key: "population_characteristics.bone_metastasis_n.control", label: "Control" }
    ] },
    { key: "population_characteristics.nodal_metastasis_n", label: "Nodal Metastasis - N (%)", children: [
      { key: "population_characteristics.nodal_metastasis_n.overall_population", label: "Overall Population" },
      { key: "population_characteristics.nodal_metastasis_n.treatment", label: "Treatment" },
      { key: "population_characteristics.nodal_metastasis_n.control", label: "Control" }
    ] },
    { key: "population_characteristics.visceral_metastasis_n", label: "Visceral Metastasis - N (%)", children: [
      { key: "population_characteristics.visceral_metastasis_n.liver", label: "Liver", children: [
        { key: "population_characteristics.visceral_metastasis_n.liver.overall_population", label: "Overall Population" },
        { key: "population_characteristics.visceral_metastasis_n.liver.treatment", label: "Treatment" },
        { key: "population_characteristics.visceral_metastasis_n.liver.control", label: "Control" }
      ] },
      { key: "population_characteristics.visceral_metastasis_n.lung", label: "Lung", children: [
        { key: "population_characteristics.visceral_metastasis_n.lung.overall_population", label: "Overall Population" },
        { key: "population_characteristics.visceral_metastasis_n.lung.treatment", label: "Treatment" },
        { key: "population_characteristics.visceral_metastasis_n.lung.control", label: "Control" }
      ] },
      { key: "population_characteristics.visceral_metastasis_n.all", label: "All", children: [
        { key: "population_characteristics.visceral_metastasis_n.all.overall_population", label: "Overall Population" },
        { key: "population_characteristics.visceral_metastasis_n.all.treatment", label: "Treatment" },
        { key: "population_characteristics.visceral_metastasis_n.all.control", label: "Control" }
      ] }
    ] },
    { key: "population_characteristics.prior_therapy_in_any_setting", label: "Prior Therapy in Any Setting" },
    { key: "population_characteristics.prior_therapy_in_any_setting_y_n", label: "Prior Therapy in Any Setting - Y/N", children: [
      { key: "population_characteristics.prior_therapy_in_any_setting_y_n.arpi", label: "ARPI" },
      { key: "population_characteristics.prior_therapy_in_any_setting_y_n.taxane_based_chemotherapy", label: "Taxane Based Chemotherapy" }
    ] },
    { key: "population_characteristics.prior_therapy_in_any_setting_n", label: "Prior Therapy in Any Setting - N (%)", children: [
      { key: "population_characteristics.prior_therapy_in_any_setting_n.docetaxel", label: "Docetaxel" },
      { key: "population_characteristics.prior_therapy_in_any_setting_n.arpi", label: "ARPI" },
      { key: "population_characteristics.prior_therapy_in_any_setting_n.abiraterone", label: "Abiraterone" },
      { key: "population_characteristics.prior_therapy_in_any_setting_n.enzalutamide", label: "Enzalutamide" },
      { key: "population_characteristics.prior_therapy_in_any_setting_n.apalutamide", label: "Apalutamide" }
    ] },
    { key: "population_characteristics.prior_therapy_in_mhspc_setting", label: "Prior Therapy in mHSPC Setting" },
    { key: "population_characteristics.prior_therapy_in_mhspc_setting_y_n", label: "Prior Therapy in mHSPC Setting - Y/N", children: [
      { key: "population_characteristics.prior_therapy_in_mhspc_setting_y_n.arpi", label: "ARPI" },
      { key: "population_characteristics.prior_therapy_in_mhspc_setting_y_n.taxane_based_chemotherapy", label: "Taxane Based Chemotherapy" }
    ] },
    { key: "population_characteristics.prior_therapy_in_mhspc_n", label: "Prior Therapy in mHSPC - N (%)", children: [
      { key: "population_characteristics.prior_therapy_in_mhspc_n.docetaxel", label: "Docetaxel" },
      { key: "population_characteristics.prior_therapy_in_mhspc_n.arpi", label: "ARPI" },
      { key: "population_characteristics.prior_therapy_in_mhspc_n.abiraterone", label: "Abiraterone" },
      { key: "population_characteristics.prior_therapy_in_mhspc_n.enzalutamide", label: "Enzalutamide" }
    ] },
    { key: "population_characteristics.prior_therapy_in_pre_mcrpc_setting_n", label: "Prior Therapy in Pre-mCRPC Setting - N (%)", children: [
      { key: "population_characteristics.prior_therapy_in_pre_mcrpc_setting_n.docetaxel", label: "Docetaxel" },
      { key: "population_characteristics.prior_therapy_in_pre_mcrpc_setting_n.adt", label: "ADT" },
      { key: "population_characteristics.prior_therapy_in_pre_mcrpc_setting_n.arpi", label: "ARPI" },
      { key: "population_characteristics.prior_therapy_in_pre_mcrpc_setting_n.abiraterone", label: "Abiraterone" }
    ] },
    { key: "population_characteristics.prior_therapy_in_mcrpc_setting", label: "Prior Therapy in mCRPC Setting" },
    { key: "population_characteristics.prior_therapy_in_mcrpc_setting_y_n", label: "Prior Therapy in mCRPC Setting - Y/N", children: [
      { key: "population_characteristics.prior_therapy_in_mcrpc_setting_y_n.arpi", label: "ARPI" },
      { key: "population_characteristics.prior_therapy_in_mcrpc_setting_y_n.taxane_based_chemotherapy", label: "Taxane Based Chemotherapy" }
    ] },
    { key: "population_characteristics.prior_therapy_in_mcrpc_n", label: "Prior Therapy in mCRPC - N (%)", children: [
      { key: "population_characteristics.prior_therapy_in_mcrpc_n.docetaxel", label: "Docetaxel" },
      { key: "population_characteristics.prior_therapy_in_mcrpc_n.arpi", label: "ARPI" },
      { key: "population_characteristics.prior_therapy_in_mcrpc_n.abiraterone", label: "Abiraterone" },
      { key: "population_characteristics.prior_therapy_in_mcrpc_n.enzalutamide", label: "Enzalutamide" },
      { key: "population_characteristics.prior_therapy_in_mcrpc_n.apalutamide", label: "Apalutamide" }
    ] },
    { key: "population_characteristics.prior_therapy_in_m0_crpc_setting", label: "Prior Therapy in M0 CRPC Setting" },
    { key: "population_characteristics.prior_therapy_m0_crpc_y_n", label: "Prior Therapy M0 CRPC - Y/N", children: [
      { key: "population_characteristics.prior_therapy_m0_crpc_y_n.arpi", label: "ARPI" }
    ] },
    { key: "population_characteristics.quality_of_life_reported", label: "Quality of Life Reported" },
    { key: "population_characteristics.quality_of_life_scale", label: "Quality of Life Scale" },
    { key: "population_characteristics.hrr_mutation_status", label: "HRR Mutation Status" },
    { key: "population_characteristics.genes_screened", label: "Genes Screened" },
    { key: "population_characteristics.genes_proportion_n", label: "Genes Proportion - N (%)", children: [
      { key: "population_characteristics.genes_proportion_n.hrrm", label: "HRRm", children: [
        { key: "population_characteristics.genes_proportion_n.hrrm.overall_population", label: "Overall Population" },
        { key: "population_characteristics.genes_proportion_n.hrrm.treatment", label: "Treatment" },
        { key: "population_characteristics.genes_proportion_n.hrrm.control", label: "Control" }
      ] },
      { key: "population_characteristics.genes_proportion_n.non_hrrm", label: "Non-HRRm", children: [
        { key: "population_characteristics.genes_proportion_n.non_hrrm.overall_population", label: "Overall Population" },
        { key: "population_characteristics.genes_proportion_n.non_hrrm.treatment", label: "Treatment" },
        { key: "population_characteristics.genes_proportion_n.non_hrrm.control", label: "Control" }
      ] },
      { key: "population_characteristics.genes_proportion_n.unknown_hrrm", label: "Unknown-HRRm", children: [
        { key: "population_characteristics.genes_proportion_n.unknown_hrrm.overall_population", label: "Overall Population" },
        { key: "population_characteristics.genes_proportion_n.unknown_hrrm.treatment", label: "Treatment" },
        { key: "population_characteristics.genes_proportion_n.unknown_hrrm.control", label: "Control" }
      ] },
      { key: "population_characteristics.genes_proportion_n.brca1", label: "BRCA1", children: [
        { key: "population_characteristics.genes_proportion_n.brca1.overall_population", label: "Overall Population" },
        { key: "population_characteristics.genes_proportion_n.brca1.treatment", label: "Treatment" },
        { key: "population_characteristics.genes_proportion_n.brca1.control", label: "Control" }
      ] },
      { key: "population_characteristics.genes_proportion_n.brca2", label: "BRCA2", children: [
        { key: "population_characteristics.genes_proportion_n.brca2.overall_population", label: "Overall Population" },
        { key: "population_characteristics.genes_proportion_n.brca2.treatment", label: "Treatment" },
        { key: "population_characteristics.genes_proportion_n.brca2.control", label: "Control" }
      ] },
      { key: "population_characteristics.genes_proportion_n.brca1_2", label: "BRCA1/2", children: [
        { key: "population_characteristics.genes_proportion_n.brca1_2.overall_population", label: "Overall Population" },
        { key: "population_characteristics.genes_proportion_n.brca1_2.treatment", label: "Treatment" },
        { key: "population_characteristics.genes_proportion_n.brca1_2.control", label: "Control" }
      ] },
      { key: "population_characteristics.genes_proportion_n.atm", label: "ATM", children: [
        { key: "population_characteristics.genes_proportion_n.atm.overall_population", label: "Overall Population" },
        { key: "population_characteristics.genes_proportion_n.atm.treatment", label: "Treatment" },
        { key: "population_characteristics.genes_proportion_n.atm.control", label: "Control" }
      ] }
    ] }
  ] },
  { key: "outcomes", label: "Outcomes", children: [
    { key: "outcomes.primary_endpoint_s", label: "Primary Endpoint(s)" },
    { key: "outcomes.secondary_endpoint_s", label: "Secondary Endpoint(s)" },
    { key: "outcomes.no_of_deaths", label: "No of Deaths", children: [
      { key: "outcomes.no_of_deaths.overall_population", label: "Overall Population" },
      { key: "outcomes.no_of_deaths.overall", label: "Overall", children: [
        { key: "outcomes.no_of_deaths.overall.treatment", label: "Treatment" },
        { key: "outcomes.no_of_deaths.overall.control", label: "Control" }
      ] },
      { key: "outcomes.no_of_deaths.hrrm", label: "HRRm", children: [
        { key: "outcomes.no_of_deaths.hrrm.overall_population", label: "Overall Population" },
        { key: "outcomes.no_of_deaths.hrrm.treatment", label: "Treatment" },
        { key: "outcomes.no_of_deaths.hrrm.control", label: "Control" }
      ] },
      { key: "outcomes.no_of_deaths.non_hrrm", label: "Non-HRRm", children: [
        { key: "outcomes.no_of_deaths.non_hrrm.overall_population", label: "Overall Population" },
        { key: "outcomes.no_of_deaths.non_hrrm.treatment", label: "Treatment" },
        { key: "outcomes.no_of_deaths.non_hrrm.control", label: "Control" }
      ] },
      { key: "outcomes.no_of_deaths.brca", label: "BRCA", children: [
        { key: "outcomes.no_of_deaths.brca.overall_population", label: "Overall Population" },
        { key: "outcomes.no_of_deaths.brca.treatment", label: "Treatment" },
        { key: "outcomes.no_of_deaths.brca.control", label: "Control" }
      ] },
      { key: "outcomes.no_of_deaths.atm", label: "ATM", children: [
        { key: "outcomes.no_of_deaths.atm.overall_population", label: "Overall Population" },
        { key: "outcomes.no_of_deaths.atm.treatment", label: "Treatment" },
        { key: "outcomes.no_of_deaths.atm.control", label: "Control" }
      ] }
    ] },
    { key: "outcomes.os_rate_at_years", label: "OS Rate at Years", children: [
      { key: "outcomes.os_rate_at_years.overall", label: "Overall", children: [
        { key: "outcomes.os_rate_at_years.overall.treatment", label: "Treatment" },
        { key: "outcomes.os_rate_at_years.overall.control", label: "Control" }
      ] },
      { key: "outcomes.os_rate_at_years.hrrm", label: "HRRm", children: [
        { key: "outcomes.os_rate_at_years.hrrm.treatment", label: "Treatment" },
        { key: "outcomes.os_rate_at_years.hrrm.control", label: "Control" }
      ] },
      { key: "outcomes.os_rate_at_years.non_hrrm", label: "Non-HRRm", children: [
        { key: "outcomes.os_rate_at_years.non_hrrm.treatment", label: "Treatment" },
        { key: "outcomes.os_rate_at_years.non_hrrm.control", label: "Control" }
      ] },
      { key: "outcomes.os_rate_at_years.brca", label: "BRCA", children: [
        { key: "outcomes.os_rate_at_years.brca.treatment", label: "Treatment" },
        { key: "outcomes.os_rate_at_years.brca.control", label: "Control" }
      ] },
      { key: "outcomes.os_rate_at_years.atm", label: "ATM", children: [
        { key: "outcomes.os_rate_at_years.atm.treatment", label: "Treatment" },
        { key: "outcomes.os_rate_at_years.atm.control", label: "Control" }
      ] }
    ] },
    { key: "outcomes.median_os_mo", label: "Median OS (mo)", children: [
      { key: "outcomes.median_os_mo.overall", label: "Overall", children: [
        { key: "outcomes.median_os_mo.overall.treatment", label: "Treatment" },
        { key: "outcomes.median_os_mo.overall.control", label: "Control" }
      ] },
      { key: "outcomes.median_os_mo.hrrm", label: "HRRm", children: [
        { key: "outcomes.median_os_mo.hrrm.treatment", label: "Treatment" },
        { key: "outcomes.median_os_mo.hrrm.control", label: "Control" }
      ] },
      { key: "outcomes.median_os_mo.non_hrrm", label: "Non-HRRm", children: [
        { key: "outcomes.median_os_mo.non_hrrm.treatment", label: "Treatment" },
        { key: "outcomes.median_os_mo.non_hrrm.control", label: "Control" }
      ] },
      { key: "outcomes.median_os_mo.brca", label: "BRCA", children: [
        { key: "outcomes.median_os_mo.brca.treatment", label: "Treatment" },
        { key: "outcomes.median_os_mo.brca.control", label: "Control" }
      ] },
      { key: "outcomes.median_os_mo.atm", label: "ATM", children: [
        { key: "outcomes.median_os_mo.atm.treatment", label: "Treatment" },
        { key: "outcomes.median_os_mo.atm.control", label: "Control" }
      ] }
    ] },
    { key: "outcomes.no_of_pts_progressed", label: "No of Pts Progressed", children: [
      { key: "outcomes.no_of_pts_progressed.overall_population", label: "Overall Population" },
      { key: "outcomes.no_of_pts_progressed.overall", label: "Overall", children: [
        { key: "outcomes.no_of_pts_progressed.overall.treatment", label: "Treatment" },
        { key: "outcomes.no_of_pts_progressed.overall.control", label: "Control" }
      ] },
      { key: "outcomes.no_of_pts_progressed.hrrm", label: "HRRm", children: [
        { key: "outcomes.no_of_pts_progressed.hrrm.overall_population", label: "Overall Population" },
        { key: "outcomes.no_of_pts_progressed.hrrm.treatment", label: "Treatment" },
        { key: "outcomes.no_of_pts_progressed.hrrm.control", label: "Control" }
      ] },
      { key: "outcomes.no_of_pts_progressed.non_hrrm", label: "Non-HRRm", children: [
        { key: "outcomes.no_of_pts_progressed.non_hrrm.overall_population", label: "Overall Population" },
        { key: "outcomes.no_of_pts_progressed.non_hrrm.treatment", label: "Treatment" },
        { key: "outcomes.no_of_pts_progressed.non_hrrm.control", label: "Control" }
      ] },
      { key: "outcomes.no_of_pts_progressed.brca", label: "BRCA", children: [
        { key: "outcomes.no_of_pts_progressed.brca.overall_population", label: "Overall Population" },
        { key: "outcomes.no_of_pts_progressed.brca.treatment", label: "Treatment" },
        { key: "outcomes.no_of_pts_progressed.brca.control", label: "Control" }
      ] },
      { key: "outcomes.no_of_pts_progressed.atm", label: "ATM", children: [
        { key: "outcomes.no_of_pts_progressed.atm.overall_population", label: "Overall Population" },
        { key: "outcomes.no_of_pts_progressed.atm.treatment", label: "Treatment" },
        { key: "outcomes.no_of_pts_progressed.atm.control", label: "Control" }
      ] }
    ] },
    { key: "outcomes.pfs_rate_at_yrs", label: "PFS Rate at yrs", children: [
      { key: "outcomes.pfs_rate_at_yrs.overall", label: "Overall", children: [
        { key: "outcomes.pfs_rate_at_yrs.overall.treatment", label: "Treatment" },
        { key: "outcomes.pfs_rate_at_yrs.overall.control", label: "Control" }
      ] }
    ] },
    { key: "outcomes.median_pfs_mo", label: "Median PFS (mo)", children: [
      { key: "outcomes.median_pfs_mo.overall", label: "Overall", children: [
        { key: "outcomes.median_pfs_mo.overall.treatment", label: "Treatment" },
        { key: "outcomes.median_pfs_mo.overall.control", label: "Control" }
      ] },
      { key: "outcomes.median_pfs_mo.hrrm", label: "HRRm", children: [
        { key: "outcomes.median_pfs_mo.hrrm.treatment", label: "Treatment" },
        { key: "outcomes.median_pfs_mo.hrrm.control", label: "Control" }
      ] },
      { key: "outcomes.median_pfs_mo.non_hrrm", label: "Non-HRRm", children: [
        { key: "outcomes.median_pfs_mo.non_hrrm.treatment", label: "Treatment" },
        { key: "outcomes.median_pfs_mo.non_hrrm.control", label: "Control" }
      ] },
      { key: "outcomes.median_pfs_mo.brca", label: "BRCA", children: [
        { key: "outcomes.median_pfs_mo.brca.treatment", label: "Treatment" },
        { key: "outcomes.median_pfs_mo.brca.control", label: "Control" }
      ] },
      { key: "outcomes.median_pfs_mo.atm", label: "ATM", children: [
        { key: "outcomes.median_pfs_mo.atm.treatment", label: "Treatment" },
        { key: "outcomes.median_pfs_mo.atm.control", label: "Control" }
      ] }
    ] },
    { key: "outcomes.pfs_rate_at_years", label: "PFS Rate at Years", children: [
      { key: "outcomes.pfs_rate_at_years.hrrm", label: "HRRm", children: [
        { key: "outcomes.pfs_rate_at_years.hrrm.treatment", label: "Treatment" },
        { key: "outcomes.pfs_rate_at_years.hrrm.control", label: "Control" }
      ] },
      { key: "outcomes.pfs_rate_at_years.brca", label: "BRCA", children: [
        { key: "outcomes.pfs_rate_at_years.brca.treatment", label: "Treatment" },
        { key: "outcomes.pfs_rate_at_years.brca.control", label: "Control" }
      ] },
      { key: "outcomes.pfs_rate_at_years.atm", label: "ATM", children: [
        { key: "outcomes.pfs_rate_at_years.atm.treatment", label: "Treatment" },
        { key: "outcomes.pfs_rate_at_years.atm.control", label: "Control" }
      ] }
    ] },
    { key: "outcomes.pfs_rate_at_years__2", label: "PFS rate at years", children: [
      { key: "outcomes.pfs_rate_at_years__2.non_hrrm", label: "Non-HRRm", children: [
        { key: "outcomes.pfs_rate_at_years__2.non_hrrm.treatment", label: "Treatment" },
        { key: "outcomes.pfs_rate_at_years__2.non_hrrm.control", label: "Control" }
      ] }
    ] },
    { key: "outcomes.ttpsa_mo", label: "TTPSA (mo)", children: [
      { key: "outcomes.ttpsa_mo.overall", label: "Overall", children: [
        { key: "outcomes.ttpsa_mo.overall.treatment", label: "Treatment" },
        { key: "outcomes.ttpsa_mo.overall.control", label: "Control" }
      ] },
      { key: "outcomes.ttpsa_mo.hrrm", label: "HRRm", children: [
        { key: "outcomes.ttpsa_mo.hrrm.treatment", label: "Treatment" },
        { key: "outcomes.ttpsa_mo.hrrm.control", label: "Control" }
      ] },
      { key: "outcomes.ttpsa_mo.non_hrrm", label: "Non-HRRm", children: [
        { key: "outcomes.ttpsa_mo.non_hrrm.treatment", label: "Treatment" },
        { key: "outcomes.ttpsa_mo.non_hrrm.control", label: "Control" }
      ] },
      { key: "outcomes.ttpsa_mo.brca", label: "BRCA", children: [
        { key: "outcomes.ttpsa_mo.brca.treatment", label: "Treatment" },
        { key: "outcomes.ttpsa_mo.brca.control", label: "Control" }
      ] }
    ] },
    { key: "outcomes.orr_n_treatment", label: "ORR - N (%) Treatment", children: [
      { key: "outcomes.orr_n_treatment.overall", label: "Overall" },
      { key: "outcomes.orr_n_treatment.cr", label: "CR" }
    ] },
    { key: "outcomes.orr_n", label: "ORR - N (%)", children: [
      { key: "outcomes.orr_n.hrrm", label: "HRRm" },
      { key: "outcomes.orr_n.treatment", label: "Treatment", children: [
        { key: "outcomes.orr_n.treatment.overall", label: "Overall" },
        { key: "outcomes.orr_n.treatment.cr", label: "CR" }
      ] },
      { key: "outcomes.orr_n.control", label: "Control", children: [
        { key: "outcomes.orr_n.control.overall", label: "Overall" },
        { key: "outcomes.orr_n.control.cr", label: "CR" }
      ] },
      { key: "outcomes.orr_n.non_hrrm", label: "Non-HRRm", children: [
        { key: "outcomes.orr_n.non_hrrm.treatment", label: "Treatment", children: [
          { key: "outcomes.orr_n.non_hrrm.treatment.overall", label: "Overall" },
          { key: "outcomes.orr_n.non_hrrm.treatment.cr", label: "CR" }
        ] },
        { key: "outcomes.orr_n.non_hrrm.control", label: "Control", children: [
          { key: "outcomes.orr_n.non_hrrm.control.overall", label: "Overall" },
          { key: "outcomes.orr_n.non_hrrm.control.cr", label: "CR" }
        ] }
      ] },
      { key: "outcomes.orr_n.brca", label: "BRCA", children: [
        { key: "outcomes.orr_n.brca.treatment", label: "Treatment", children: [
          { key: "outcomes.orr_n.brca.treatment.overall", label: "Overall" },
          { key: "outcomes.orr_n.brca.treatment.cr", label: "CR" }
        ] },
        { key: "outcomes.orr_n.brca.control", label: "Control", children: [
          { key: "outcomes.orr_n.brca.control.overall", label: "Overall" },
          { key: "outcomes.orr_n.brca.control.cr", label: "CR" }
        ] }
      ] }
    ] },
    { key: "outcomes.orr_n_control", label: "ORR - N (%) Control", children: [
      { key: "outcomes.orr_n_control.overall", label: "Overall" },
      { key: "outcomes.orr_n_control.cr", label: "CR" }
    ] }
  ] }
];
