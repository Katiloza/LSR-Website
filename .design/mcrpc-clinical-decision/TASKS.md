# Build Tasks: mCRPC Clinical Decision Application

Generated from: `.design/mcrpc-clinical-decision/DESIGN_BRIEF.md`  
IA reference: `.design/mcrpc-clinical-decision/INFORMATION_ARCHITECTURE.md`  
Date: 2026-06-30

Stack: React 18 + Vite + Tailwind 4 + shadcn/ui (Radix) + lucide-react + motion + recharts  
File convention: PascalCase components in `src/app/components/`, pages in `src/app/pages/`, routes in `src/app/routes.tsx`

---

## Foundation

- [ ] **Routing: add all 5 section routes** — Add `/home`, `/prisma`, `/summary-tables`, `/meta-analysis`, `/summary-of-findings` to `routes.tsx`. Wire each to a stub page component (`<div>Page name</div>`) so the icon rail links resolve before pages are built. Confirm `SideIconRail` navigation works end-to-end. _Modifies: `routes.tsx`. Creates stub pages for: `HomePage`, `PrismaPage`, `SummaryTablesPage`, `SummaryOfFindingsPage` (MetaAnalysisPage already exists)._

- [ ] **TopNav: add project selector pill** — Add a clickable `ProjectSwitcher` pill reading `"Living Systematic Reviews · mCRPC ▾"` between the logo and the right-side tab links. Clicking opens a dropdown (popover) listing available projects; for now only "mCRPC" is listed. Dropdown closes on outside click or Escape. _Modifies: `TopNav.tsx`. New sub-component: `ProjectSwitcher.tsx`. Reuses: `@radix-ui/react-popover`, `lucide-react/ChevronDown`._

- [ ] **SideIconRail: wire navigation links** — Replace static button clicks with `react-router` `<Link>` or `useNavigate` so clicking an icon navigates to the correct route. Active item highlight should derive from the current route, not local state. _Modifies: `SideIconRail.tsx`._

- [ ] **OnPageNav: make section-aware** — Refactor `OnPageNav` to accept a `section` prop and render different content per section. Define the five content variants: none (Home), PRISMA toggle, Summary Tables tab bar, Meta-Analysis outcome tree (existing), Summary of Findings outcome checklist. The animation and panel shell stay unchanged. _Modifies: `OnPageNav.tsx`. Depends on: routing task above._

---

## Core UI — Home Page

- [ ] **StatsStrip component** — Build a horizontal row of 3 stat cards: "Studies included [n]", "Interventions covered [n]", "Last updated [date]". Each card has a large number, a label, and a subtle icon. Clinical authority aesthetic: clean white card, `#2E75B5` accent on the number, Inter font, generous padding. _New component: `StatsStrip.tsx`._

- [ ] **Home page layout + mCRPC description** — Build the `HomePage` with: `StatsStrip` at top, a 2–3 sentence plain-language mCRPC description block (Benton Modern D heading + Inter body), a search bar (full-width input with search icon; UI only, no backend), and the section card grid. Page background `#FDFDFD`, content max-width centered with side padding. _New page: `HomePage.tsx`. Reuses: `StatsStrip`, `Input` (shadcn)._

- [ ] **SectionCard component + grid** — Build 4 quick-link cards (PRISMA, Summary Tables, Meta-Analysis, Summary of Findings). Each card: section icon, section name, one-line description, hover state (subtle shadow lift + blue border). Cards link to their route via `<Link>`. Grid: 2×2 on desktop. _New component: `SectionCard.tsx`. Reuses: lucide-react icons, react-router `<Link>`._

---

## Core UI — PRISMA Page

- [ ] **PRISMA page shell + on-page nav** — Build `PrismaPage` with the section-aware `OnPageNav` showing the 3-way toggle (Current State / Initial Search / Living Search). The toggle controls a `view` query param. Main content area renders the correct sub-view based on `?view=`. Default: `current-state`. _New page: `PrismaPage.tsx`. Depends on: OnPageNav section-aware task._

- [ ] **PrismaFlowchart component (Current State + Initial Search)** — Build the PRISMA flowchart as a React component using positioned `div` nodes connected by SVG lines (or a lightweight SVG layout). Nodes: Identification → Screening → Eligibility → Included stages, each showing stage label + record count. Hover state: blue border highlight. Click state: node gets active ring. Pass `onNodeClick(stageId)` callback up. _New component: `PrismaFlowchart.tsx`. Risk: highest visual complexity in the app — build first within PRISMA._

- [ ] **StudyListPanel component** — Build a slide-in right panel (fixed or absolutely positioned, 320px wide) that appears when a PRISMA node is clicked. Shows: stage name as heading, scrollable list of studies (title, year, PMID). Close button (×) and Escape key dismiss it; focus returns to the triggering node on close. _New component: `StudyListPanel.tsx`. Reuses: `motion` (AnimatePresence slide), `ScrollArea` (shadcn). Depends on: PrismaFlowchart task._

- [ ] **PrismaLivingSearch component** — Build the calendar grid view. Columns = months (Jan–Dec), rows = years. Each cell shows the automated-screening count for that month/year as a number; empty months show "—". Cells with counts ≥ 1 get a light blue fill that darkens proportionally with count (heatmap scale). Months in the future are greyed out. Header row shows month abbreviations; row headers show years. _New component: `PrismaLivingSearch.tsx`._

---

## Core UI — Summary Tables Page

- [ ] **SummaryTablesPage shell + tab bar** — Build `SummaryTablesPage` with a tab bar (Interactive Table / Results Table / Traffic Plot) driven by `?tab=` query param. Default: `interactive-table`. Results Table and Traffic Plot tabs render a placeholder state ("This view is coming soon"). _New page: `SummaryTablesPage.tsx`. Reuses: `Tabs` (shadcn)._

- [ ] **SummaryTable component — structure + column visibility** — Build the data table for study/trial characteristics. Columns: Study, Year, Treatment, Control, Line of therapy, Phase, N (patients), Primary endpoint, and key results columns. Include a toolbar button "Columns ▾" that opens a popover with a checkbox list for toggling column visibility. Table reflows immediately on toggle. Seed with mock data from `mockData.ts`. _New component: `SummaryTable.tsx`. Reuses: `Table`, `Popover`, `Checkbox` (shadcn). Depends on: SummaryTablesPage shell._

- [ ] **SummaryTable filtering** — Add a `FilterChip` row above the table. Chips: Therapy type, Treatment class, Treatment, Control, Line of therapy, Trial phase. Selecting a chip value filters table rows in real time. Multiple chips can be active simultaneously (AND logic). A "Clear all" control appears when any filter is active. _Modifies: `SummaryTable.tsx`. Reuses: existing `FilterChip.tsx`._

---

## Core UI — Summary of Findings Page

- [ ] **CertaintyBadge component** — Build a color-coded pill badge for GRADE certainty levels. Four variants: High (green `#2D9A5E`), Moderate (yellow `#D4A017`), Low (orange `#E07B2A`), Very Low (red `#C0392B`). Each shows the text label inside the badge (not color alone). _New component: `CertaintyBadge.tsx`._

- [ ] **GradeTable component** — Build the GRADE Summary of Findings table. Columns: Outcome / No. of studies / No. of participants / Relative effect (95% CI) / Absolute effect — Intervention / Absolute effect — Control / Risk difference / Certainty (`CertaintyBadge`). Rows are outcome entries. Rows can be shown/hidden based on which outcomes are checked in the OnPageNav checklist (driven by `?outcomes=` query param). Include a table legend below explaining the 4 certainty levels. _New component: `GradeTable.tsx`. Reuses: `CertaintyBadge`, `Table` (shadcn). New component._

- [ ] **SummaryOfFindingsPage + OnPageNav outcome checklist** — Build `SummaryOfFindingsPage`. Wire the OnPageNav outcome checklist: Primary and Sensitivity analysis toggles, each with a list of outcomes as checkboxes. Checking/unchecking an outcome shows/hides its row in the `GradeTable`. At least one outcome must stay checked (last active checkbox is non-removable; show a tooltip explaining why). Default: all outcomes checked, Primary analysis. _New page: `SummaryOfFindingsPage.tsx`. Depends on: GradeTable, OnPageNav section-aware task._

---

## Interactions & States

- [ ] **PRISMA node click → StudyListPanel interaction** — Wire up the full PRISMA click interaction: clicking a node opens `StudyListPanel` with the correct study list for that stage, with a slide-in animation. Clicking the same node again, clicking × in the panel, or pressing Escape closes it and returns focus to the node. Hover state on nodes shows a blue ring preview before click. _Modifies: `PrismaPage.tsx`, `PrismaFlowchart.tsx`, `StudyListPanel.tsx`._

- [ ] **Meta-Analysis: connect to router** — Ensure the existing `MetaAnalysis` page reads `?analysis=primary|sensitivity` from the URL and reflects that in the UI (so links and browser back/forward work). Update `SideIconRail` active state to highlight "Meta-Analysis" when on `/meta-analysis`. _Modifies: `MetaAnalysis.tsx`, `SideIconRail.tsx`._

- [ ] **Empty and loading states** — Add skeleton loading states for: `SummaryTable` (shimmer rows), `GradeTable` (shimmer rows), `PrismaFlowchart` (placeholder node boxes), `StudyListPanel` (shimmer list items). Add empty states for: `SummaryTable` with no results after filtering ("No studies match your filters" + clear filters button). _Modifies: all four components. Reuses: `Skeleton` (shadcn)._

---

## Responsive & Polish

- [ ] **Tablet layout pass (768–1279px)** — Verify that on tablet widths, the `OnPageNav` defaults to collapsed, the icon rail remains visible, and the main content area fills the viewport without horizontal scroll. Adjust any hardcoded widths that break at this breakpoint. _Modifies: `MetaAnalysis.tsx`, new pages as needed._

- [ ] **Accessibility pass** — (1) Add `aria-label` to all `SideIconRail` icon buttons. (2) Add `aria-current="page"` to the active rail item. (3) Ensure all `PrismaFlowchart` nodes have `aria-label` with stage name + count. (4) Ensure `StudyListPanel` traps focus while open and returns focus on close. (5) Ensure `GradeTable` uses `<th scope="col">` headers and a `<caption>`. (6) Confirm all `CertaintyBadge` labels are readable by screen readers (not just color). (7) Verify keyboard navigation through `FilterChip` row and `ProjectSwitcher` dropdown. _Modifies: multiple components._

- [ ] **Typography and spacing audit** — Do a final pass ensuring: Benton Modern D is used for all page-level headings (H1/H2), Articulat CF for UI labels and nav items, Inter for body paragraphs and table cell text. Confirm consistent spacing rhythm (24px section padding, 8px internal gaps, 16px between elements). _Modifies: multiple pages and components._

---

## Review

- [ ] **Design review** — Run `/design-review` against the brief once the core pages are built. Checks visual hierarchy, consistency, responsiveness, accessibility, and fidelity to the clinical authority aesthetic.
