# Information Architecture: mCRPC Clinical Decision Application

## Site Map

```
/ (mCRPC project root)
├── /home                         → Project overview (stats, description, section cards, search)
├── /prisma                       → PRISMA interactive flowchart
│   ├── ?view=current-state       → Standard PRISMA flowchart (current literature state)
│   ├── ?view=initial-search      → Standard PRISMA flowchart (initial search snapshot)
│   └── ?view=living-search       → Calendar grid (months × years, automated-screening counts)
├── /summary-tables               → Study & trial characteristics table
│   ├── ?tab=interactive-table    → Default: filterable, column-configurable data table
│   ├── ?tab=results-table        → [Placeholder]
│   └── ?tab=traffic-plot         → [Placeholder]
├── /meta-analysis                → Pairwise meta-analysis forest plots
│   ├── ?analysis=primary         → Primary analysis outcomes
│   └── ?analysis=sensitivity     → Sensitivity analysis outcomes
└── /summary-of-findings          → GRADE Summary of Findings table
    ├── ?analysis=primary         → Primary outcomes (checkable rows)
    └── ?analysis=sensitivity     → Sensitivity outcomes (checkable rows)
```

**URL strategy notes:**
- The project context (mCRPC) is implicit in this prototype; no URL segment needed yet.
- View/tab/analysis state is carried as a query parameter so URLs are shareable and bookmarkable.
- No nested routes needed within sections — all section state lives in the on-page nav.

---

## Navigation Model

### Primary navigation — SideIconRail (72px, persistent)
The vertical icon rail is always visible and provides section-level navigation. It is the only globally persistent structural element aside from TopNav.

| Icon | Label | Route |
|------|-------|-------|
| Home | Home | `/home` |
| FileText | Prisma | `/prisma` |
| Table | Summary Tables | `/summary-tables` |
| BarChart2 | Meta-Analysis | `/meta-analysis` |
| Layers | Summary of Findings | `/summary-of-findings` |
| MoreHorizontal | More | (future) |

- Maximum 5 primary sections + More. Do not add more items to this rail.
- Active section is highlighted with `#2E75B5` color + `bg-blue-50/50`.
- A collapse/expand toggle at the top of the rail shows/hides the OnPageNav panel.

### Secondary navigation — OnPageNav (280px, toggleable)
Section-aware. Content changes based on which section is active. This panel is the in-section navigation layer — it does not navigate between sections (that's the icon rail's job).

| Section | OnPageNav content |
|---------|------------------|
| Home | None (no on-page nav for Home) |
| PRISMA | Toggle: Current State / Initial Search / Living Search |
| Summary Tables | Toggle tabs: Interactive Table / Results Table / Traffic Plot |
| Meta-Analysis | Analysis type toggle (Primary / Sensitivity) + outcome tree (scrollspy) |
| Summary of Findings | Analysis type toggle (Primary / Sensitivity) + outcome checklist (checkbox selection drives table rows) |

- Panel animates open/closed (existing motion implementation — keep as-is).
- Width: 280px when open. Collapses to 0 with opacity fade.

### Utility navigation — TopNav (72px, sticky)
The global header. Contains:
- **Left**: Logo / wordmark (`logo.png`)
- **Center-left**: Project selector pill — `"Living Systematic Reviews · mCRPC ▾"` — dropdown for project switching
- **Right**: Tab links — Living Systematic Reviews (active) / Living Guidelines / About Us / Contact Us

The project selector sits between the logo and the right-side tabs. It identifies the current project context and allows switching without leaving the current section.

### Mobile navigation
Out of scope for this phase. The icon rail collapses; OnPageNav is hidden by default.

---

## Content Hierarchy

### Home `/home`
1. **Stats strip** — # of studies included, # of interventions, last updated date. Immediate proof the review is current and comprehensive.
2. **mCRPC description** — 2–3 sentence plain-language summary of the indication. Orients new users; confirms context for returning ones.
3. **Search interface** — Search bar for finding studies, outcomes, or interventions by keyword. Frequent use case for researchers who know what they're looking for.
4. **Section cards (quick links)** — Card grid linking to each of the 4 other sections with a short descriptor. Entry points for users who want to navigate visually.

### PRISMA `/prisma`
1. **On-page nav toggle** — Current State / Initial Search / Living Search. Sets the entire page context; must be immediately visible.
2. **PRISMA flowchart** (Current State + Initial Search views) — The primary content. Each stage node shows a label and count. Clickable.
3. **Study list panel** (slides in on node click) — The detail layer. Shows the studies behind each count. Dismissable.
4. **Living Search calendar grid** (Living Search view only) — Month columns × year rows. Cells show automated-screening count per date.

### Summary Tables `/summary-tables`
1. **Tab bar** — Interactive Table / Results Table / Traffic Plot. Above the table; sets the view context.
2. **Filter chip row** — Therapy type, treatment class, treatment, control, line of therapy, trial phase. Immediately above the table.
3. **Column visibility control** — Toolbar button that opens column show/hide panel. Alongside other table toolbar actions.
4. **Interactive table** — The primary content. Sortable, filterable rows of study/trial characteristics.
5. **Results Table placeholder** — Tab visible but content is a "Coming soon" placeholder.
6. **Traffic Plot placeholder** — Tab visible but content is a "Coming soon" placeholder.

### Meta-Analysis `/meta-analysis`
1. **Analysis type toggle** (OnPageNav) — Primary / Sensitivity. Sets the entire outcome tree.
2. **Outcome tree** (OnPageNav) — Hierarchical list of outcome categories → outcomes → sub-outcomes. Scrollspy tracks position.
3. **Filter chip row** — Above the forest plot area. Same chip types as Summary Tables.
4. **Forest plots** — One per outcome section. The primary data visualization.
5. **Section headings + evidence summaries** — Between forest plots; contextual text.

### Summary of Findings `/summary-of-findings`
1. **Analysis type toggle** (OnPageNav) — Primary / Sensitivity.
2. **Outcome checklist** (OnPageNav) — Checkboxes for each outcome. Checked = row shown in table. Minimum one checked.
3. **GRADE SoF table** — Primary content. Columns: Outcome / No. of studies / Relative effect (95% CI) / Absolute effect — Intervention / Absolute effect — Control / Risk difference / Certainty of evidence (GRADE badge).
4. **Table legend** — Below the table; explains GRADE certainty color coding.

---

## User Flows

### Flow 1: Clinician checking latest OS evidence for mCRPC
1. User opens the app → lands on `/meta-analysis` (current default)
2. User sees the Meta-Analysis page with forest plots
3. User confirms "Primary" analysis is selected in OnPageNav
4. User clicks "Overall survival" in the outcome tree
5. Page scrolls to the Overall Survival forest plot section
6. User reads the effect estimate and CI

### Flow 2: Researcher verifying study inclusion
1. User navigates to `/prisma` via icon rail
2. PRISMA defaults to "Current State" view
3. User reads the flowchart; wants to know which studies are in "Included" node
4. User clicks the "Included" node
5. Study list panel slides in showing the study list
6. User reads titles and PMIDs; can scroll the list

### Flow 3: Researcher checking how the review has grown over time
1. User is on `/prisma`, Current State view
2. User clicks "Living Search" in the on-page nav
3. View transitions to the calendar grid
4. User reads monthly/yearly screening counts to assess activity

### Flow 4: Clinician comparing treatment characteristics
1. User navigates to `/summary-tables`
2. Table loads with all columns visible, no filters
3. User applies a filter chip: "Line of therapy → First-line"
4. Table rows filter to first-line trials only
5. User hides irrelevant columns via the column visibility control
6. User reads the narrowed table

### Flow 5: Researcher assessing evidence certainty
1. User navigates to `/summary-of-findings`
2. "Primary" analysis is default
3. All outcomes are shown (all checkboxes checked by default)
4. User unchecks outcomes they are not interested in
5. Table rows collapse for unchecked outcomes
6. User reads GRADE certainty badges for remaining outcomes

### Flow 6: Project context check (future project switching)
1. User is anywhere in the app
2. User clicks the "mCRPC ▾" pill in TopNav
3. Dropdown opens showing available projects (currently only mCRPC)
4. User selects a project (or dismisses)
5. App context updates (no navigation change, just project label refresh for now)

---

## Naming Conventions

| Concept | Label in UI | Notes |
|---------|-------------|-------|
| The app section listing evidence sources | "PRISMA" | Standard term; do not abbreviate or rename |
| The PRISMA calendar view | "Living Search" | Distinguishes from static snapshots |
| The PRISMA standard flowchart (current) | "Current State" | Reflects the most up-to-date literature state |
| The PRISMA standard flowchart (baseline) | "Initial Search" | The founding search; fixed snapshot |
| The forest plot section | "Meta-Analysis" | Not "Pairwise meta-analysis" in nav; full label in page headings |
| Evidence certainty | "Certainty of evidence" | GRADE preferred term; not "quality of evidence" (deprecated) |
| The GRADE table section | "Summary of Findings" | Standard GRADE terminology |
| A single analysis dimension | "Analysis type" | Shown in OnPageNav header above the Primary/Sensitivity toggle |
| The outcome navigation panel | "Explore" | Already used in the existing `OnPageNav` heading — keep consistent |
| Project dropdown trigger | "Living Systematic Reviews · [Project] ▾" | Full label keeps context clear |
| Automated screening count (calendar cell) | "[n] records" | Keep consistent across PRISMA views |

---

## Component Reuse Map

| Component | Used on | Behavior differences |
|-----------|---------|----------------------|
| `TopNav` | All pages | Same across all pages; project selector always visible |
| `SideIconRail` | All pages | Active item changes per route |
| `OnPageNav` | PRISMA, Summary Tables, Meta-Analysis, Summary of Findings | Content is section-specific (see Navigation Model above); animation is the same |
| `FilterChip` | Summary Tables, Meta-Analysis | Same component; filter options differ per page |
| `ForestPlot` | Meta-Analysis | One instance per outcome section |
| `SectionCard` | Home only | Quick-link cards to other sections |
| `StatsStrip` | Home only | Summary statistics bar |
| `GradeTable` | Summary of Findings only | GRADE-specific table structure |
| `SummaryTable` | Summary Tables only | General study characteristics table |
| `PrismaFlowchart` | PRISMA (Current State + Initial Search) | Same component; data differs |
| `PrismaLivingSearch` | PRISMA (Living Search) | Distinct calendar-grid component |
| `StudyListPanel` | PRISMA | Triggered by flowchart node click |
| `CertaintyBadge` | Summary of Findings, (optionally Summary Tables) | Consistent color mapping |
| `ProjectSwitcher` | TopNav (all pages) | Dropdown; future-ready for multi-project |

---

## Content Growth Plan

| Section | Growth pattern | How IA accommodates it |
|---------|----------------|------------------------|
| PRISMA | New studies added periodically; counts update | Flowchart nodes receive new count data; study list panel is dynamically populated |
| Summary Tables | New trials added as they are published | Table rows grow; filtering becomes more important; virtualization may be needed above ~200 rows |
| Meta-Analysis | New outcomes added as evidence accumulates | Outcome tree in OnPageNav grows; new forest plot sections added below existing ones |
| Summary of Findings | New outcomes added; certainty grades updated | New rows added to GRADE table; checkbox list in OnPageNav grows accordingly |
| Projects | New indications added (beyond mCRPC) | Project switcher dropdown grows; each project is an isolated data context |

---

## URL Strategy

- **Pattern**: `/{section}?{state-params}`
- **Sections**: `home`, `prisma`, `summary-tables`, `meta-analysis`, `summary-of-findings`
- **Dynamic segments**: None at this stage (project is implicit; single-project prototype)
- **Query parameters**:
  - `?view=current-state|initial-search|living-search` — PRISMA view mode
  - `?tab=interactive-table|results-table|traffic-plot` — Summary Tables tab
  - `?analysis=primary|sensitivity` — Meta-Analysis and Summary of Findings analysis type
  - `?outcomes=os,pfs,ae-g3` — Summary of Findings checked outcomes (comma-separated IDs, for shareability)
- **Defaults**: Each section loads with a sensible default (`?analysis=primary`, `?view=current-state`, `?tab=interactive-table`) if no query param is present
- **Hash anchors**: Meta-Analysis uses `#outcome-id` for scrollspy deep-linking within the page
