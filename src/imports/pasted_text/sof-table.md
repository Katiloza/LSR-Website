MAIN CONTENT AREA
Left margin: 240px. Padding: 40px top, 48px left/right.
Page header block:

Eyebrow: "Systematic Review – mCRPC" in Articulate CF 13px #6B7280
H1: "Summary of Findings" in Articulate CF 48px navy bold, line-height 1.1
Body description to the right of the H1 (two-column layout, H1 left ~340px, description fills remaining width): "The Summary of Findings (SoF) table is designed to summarize the key results of pairwise meta-analysis and to evaluate confidence in the estimates of effect. This table summarizes results for patient-important outcomes for all treatment options investigated in included trials as compared to control, in mCRPC." Articulate CF 14px #374151, line-height 1.6.

32px vertical space below header block.
Search bar — full width, 48px tall, 1px #E5E7EB border, 8px border-radius, white fill. Placeholder: "Search patient outcomes, treatment options, etc" with search icon in #9CA3AF. Articulate CF 14px.
16px below search bar.
Filter chips row — horizontally arranged pill chips with dropdown arrows, Articulate CF 13px, 1px #D1D5DB border, white fill, 6px border-radius, 32px tall: "Type of therapy ▼", "Treatment class ▼", "Treatment ▼", "Control ▼", "Line of therapy ▼", "Trial phase ▼". 8px gap between chips.
32px below filter chips.
Section label: "Summary of findings table" in Articulate CF 24px navy semibold.
16px below.
Toolbar row — single horizontal row, left-aligned, 8px gap between items. Toggle switch style: label in Articulate CF 13px #374151 followed by a 28×16px pill toggle (teal #0D6E6E fill when on, #D1D5DB when off, white circular thumb). Items left to right:

"Risk per" label + dropdown selector showing "1,000" default, options 1,000 / 10,000 / 100,000. Small select input, 1px #D1D5DB border, 32px tall, Articulate CF 13px, chevron icon right-aligned.
"Show CI" + toggle (on by default)
"Show ARD" + toggle (on by default)
"Show Survival Data" + toggle (on by default)
"Show Raw Data" + toggle (off by default)

Right-aligned in toolbar: circular avatar "K", 32px diameter, dark navy fill, white Articulate CF 14px bold initial.
Toolbar behavior note for handoff: Show CI reveals confidence interval sub-text beneath primary values in Relative and Risk Difference cells. Show ARD reveals absolute risk difference percentage sub-text in Risk Difference cells. Show Survival Data reveals survival time sub-text (e.g. "Survival: 14.1 mo") in Intervention and Control cells. Show Raw Data reveals a RAW column showing events and participant counts. Risk per dropdown changes the denominator in Intervention, Control, and Risk Difference absolute figures.

SOF TABLE
Full width, white background, 1px #E5E7EB outer border, 8px border-radius. Built as a static prototype table with representative data rows using Auto Layout throughout so cell content can expand vertically.
Column header row — navy #00488A fill, white Articulate CF 13px uppercase letterspacing 0.06em bold, 48px tall. Columns: OUTCOMES | RELATIVE | INTERVENTION | CONTROL | RISK DIFFERENCE | CERTAINTY OF EVIDENCE.
Each column header has a tooltip on hover only (no click interaction). Tooltip style: small dark #1F2937 rounded rectangle, white Articulate CF 12px text, 4px border-radius, appearing above the header. Placeholder content for all: "Explanation placeholder – to be defined with clinical team."
Section divider rows — navy #00488A fill, white text. Left cell: collapse triangle icon + group icon + label ("Primary" or "Sensitivity") in Articulate CF 13px bold white.
Data rows — white background, 1px #E5E7EB bottom border, minimum 56px tall, expands to accommodate multi-line cell content. All cell text in Articulate CF 13px #374151.
Row hover state: Full row background changes to teal tint #E6F3F3 (teal #0D6E6E at 8% opacity), with a 3px solid #0D6E6E left border accent. Cursor changes to pointer. Communicates row is clickable. No click interaction wired in this prompt — hover state only.
Row hover note for handoff: Clicking a row will navigate to a detail view to be built in a future prompt.
Populate with the following static data under Primary:

Disease-free survival (all patients) — HR 0.84 [0.74; 0.96] — 423 per 1,000 — 534 per 1,000 — 111 fewer — Moderate
Overall survival – all patients — HR 0.90 [0.76; 1.07] — 423 per 1,000 — 534 per 1,000 — 43 fewer — Low
Adverse events (grade ≥ 3) — RD 0.18 — 480 per 1,000 — NA — NA — Low
Disease-free survival (intermediate-to-high risk) — HR 0.72 [0.59; 0.87] — 390 per 1,000 — 534 per 1,000 — 144 fewer — High
Disease-free survival (high risk) — HR 0.68 [0.52; 0.88] — 370 per 1,000 — 534 per 1,000 — 164 fewer — Moderate

Under Sensitivity:

Composite PFS (overall population) — RD 0.18 — 480 per 1,000 — NA — NA — Low
Radiographic PFS (overall population) — HR 0.72 [0.59; 0.87] — 390 per 1,000 — 534 per 1,000 — 144 fewer — High
Radiographic PFS (BICR) — HR 0.68 [0.52; 0.88] — 370 per 1,000 — 534 per 1,000 — 164 fewer — Moderate

Certainty of Evidence badges: Pill shaped, 6px border-radius, Articulate CF 12px semibold. High = #166534 dark green fill, white text. Moderate = #1D4ED8 navy-blue fill, white text. Low = #B45309 amber fill, white text. Very Low = #991B1B red fill, white text. Small circle info icon to the right of each badge in matching color.
Far right of each data row: "View forest plot" link in Articulate CF 13px teal #0D6E6E, underline on hover.
Table footer — Articulate CF 12px #6B7280 italic: "* Absolute risk differences based on entered baseline risk. GRADE certainty ratings shown inline. M = Meta-analysis included"

STATES TO BUILD AS SEPARATE FRAMES
Build two additional frames on the same Figma page, spaced 120px apart horizontally:
"Summary of Findings – Row Hover State" — identical to default but with "Overall survival – all patients" row showing teal hover treatment: background #E6F3F3, 3px left border #0D6E6E, pointer cursor indicator.
"Summary of Findings – Column Header Tooltip" — identical to default but with a tooltip visible above the "RELATIVE" column header: dark #1F2937 rounded rectangle, white Articulate CF 12px text reading "Explanation placeholder – to be defined with clinical team."

COMPONENT & STYLE NOTES
Use Auto Layout throughout for all rows, toolbar items, filter chips, and table cells. Do not use absolute positioning for table row content. Do not alter any existing frames, components, or pages in this file.