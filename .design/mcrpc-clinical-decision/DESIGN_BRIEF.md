# Design Brief: mCRPC Clinical Decision Application

## Problem

Oncologists and research doctors treating metastatic castration-resistant prostate cancer (mCRPC) must make high-stakes treatment decisions, but the evidence base is scattered across dozens of clinical trials and constantly evolving. They cannot quickly locate the most current, synthesized evidence — forest plots, certainty grades, study characteristics — in one place. They end up digging through PDFs, out-of-date publications, and static documents that don't reflect the living nature of the review. The result is clinical decisions made with less confidence than the evidence actually supports.

## Solution

A structured, living evidence hub organized around a single cancer indication (mCRPC) where clinicians and researchers can move fluidly from high-level project overview to granular trial-level data. The interface is organized into five evidence layers — Home, PRISMA, Summary Tables, Meta-Analysis, Summary of Findings — each surfacing a different angle of the same underlying systematic review. Navigation is persistent and structural; data is filterable and interactive. The experience feels like consulting a trusted clinical database, not reading a PDF.

## Experience Principles

1. **Evidence first, chrome second** — Every pixel of chrome (nav, filters, controls) exists to get out of the way of the data. Generous white space and restrained decoration keep cognitive load low when the content itself is dense.

2. **Progressive disclosure over upfront complexity** — Start with the summary. Let the user drill down. On-page navigation, collapsible categories, and click-to-reveal interactions surface detail only when the user asks for it.

3. **Credibility through consistency** — Typography hierarchy, color use, and table formatting must be rigorous and uniform. Inconsistent spacing or arbitrary color use erodes trust in a clinical context. Every visual decision should feel deliberate and earned.

## Aesthetic Direction

- **Philosophy**: Clinical authority — the visual language of trusted medical publishing (NEJM, Cochrane, GRADE working group) brought into a modern interactive interface. Not academic gray; not consumer-app bright. Clean, typographically rich, structured.
- **Tone**: Calm, authoritative, precise. The interface should feel like a senior clinician presenting evidence at a tumor board — composed, thorough, trustworthy.
- **Reference points**: NEJM Evidence digital platform, Cochrane Reviews interface, UpToDate data tables, the Figma reference provided (https://note-flat-91081385.figma.site/).
- **Anti-references**: Consumer health apps (too friendly), generic SaaS dashboards (too corporate), dark-mode analytics tools (too techie). Nothing that reads as "startup."

## Existing Patterns

These are established in the codebase and must be respected:

- **Typography**: `Articulat CF` (sans-serif, body + UI), `Benton Modern D` (serif, display headings), `Inter` (paragraphs, small text)
- **Brand color**: `#2E75B5` — the primary authoritative blue. Active states use `#E4F0FE` (light blue tint). Used for active nav items, section headers, interactive highlights.
- **Background**: `#FDFDFD` page background; `#FFFFFF` panel/card surfaces; no dark mode required at this stage.
- **Border/separator**: `rgba(0,0,0,0.1)` — subtle, not heavy.
- **Spacing rhythm**: Components use `px-6`, `py-4`, `gap-6`, `gap-8` patterns. Sidebar panels use 24px horizontal padding.
- **Existing components in use**: `TopNav` (72px sticky), `SideIconRail` (72px wide, persistent), `OnPageNav` (280px animated panel), `ForestPlot`, `FilterChip`, full shadcn/ui library, `lucide-react` icons, `motion` (Framer Motion), `recharts`.
- **Layout model**: Full-height flex row — TopNav (full width sticky) + [SideIconRail | OnPageNav | MainContent] in a horizontal stack.

## Component Inventory

| Component | Status | Notes |
|-----------|--------|-------|
| `TopNav` | Modify | Add project selector pill (e.g., "mCRPC ▾") next to "Living Systematic Reviews" label |
| `SideIconRail` | Exists | No changes needed; already has all 5 sections + More |
| `OnPageNav` | Modify | Make section-aware — different nav content per active section |
| `HomePage` | New | Project overview: stats strip, mCRPC description, quick-link section cards, search bar |
| `PrismaPage` | New | Interactive PRISMA flowchart + study list panel; three view modes (Current State, Initial Search, Living Search) |
| `SummaryTablesPage` | New | Interactive table with column show/hide + filter chips; placeholder tabs for Results Table and Traffic Plot |
| `MetaAnalysisPage` | Exists | Already built; keep Primary/Sensitivity toggle + scrollspy outcome navigation |
| `SummaryOfFindingsPage` | New | GRADE-style SoF table; sidebar nav drives which outcome rows are shown via checkbox selection; Primary/Sensitivity toggle |
| `PrismaFlowchart` | New | SVG/React flowchart with clickable nodes; click reveals study list panel |
| `PrismaLivingSearch` | New | Calendar-style grid (months across top, years down side); cells show automated-screening counts per date |
| `StudyListPanel` | New | Right-side panel showing studies for a selected PRISMA stage |
| `SummaryTable` | New | Sortable, filterable table; column visibility toggle; virtualized if > 100 rows |
| `GradeTable` | New | GRADE SoF table with color-coded certainty badges (high/moderate/low/very low) |
| `CertaintyBadge` | New | Color-coded pill: green=High, yellow=Moderate, orange=Low, red=Very Low |
| `ProjectSwitcher` | New | Dropdown in TopNav; shows current project name + chevron; opens project list |
| `StatsStrip` | New | Horizontal row of stat cards (# studies, # interventions, last updated) for HomePage |
| `SectionCard` | New | Quick-link card for HomePage sections (Home → PRISMA, Summary Tables, etc.) |
| `ForestPlot` | Exists | Already built for Meta-Analysis |
| `FilterChip` | Exists | Already built; reuse for Summary Tables filtering |

## Key Interactions

**Project switcher (TopNav)**
- User clicks "mCRPC ▾" pill → dropdown opens listing available projects
- Selecting a project updates the entire app context (all pages reflect the selected project)
- Current implementation: UI only; no routing changes needed for the mCRPC prototype

**PRISMA flowchart click**
- User clicks a stage node (e.g., "Records identified: 4,821") → study list panel slides in from the right
- Panel shows a scrollable list of studies with title, year, PMID
- Clicking the same node again or pressing Escape closes the panel
- Hover state: node highlights with blue border before click

**PRISMA view toggle (on-page nav)**
- User selects Current State / Initial Search / Living Search in the sidebar
- Current State and Initial Search: render the standard PRISMA flowchart
- Living Search: renders the calendar grid view (months × years, cells = automated screening count)

**Summary Tables column visibility**
- User opens a column visibility panel (button in table toolbar)
- Toggles checkboxes to show/hide columns
- Table reflows in place; no page reload

**Summary Tables filtering**
- FilterChip row above the table; chips for therapy type, treatment class, line of therapy, etc.
- Selecting a chip value filters rows in real time

**Summary of Findings outcome selection (on-page nav)**
- Sidebar shows a checkbox list of outcomes under Primary / Sensitivity toggle
- Checking/unchecking outcomes shows/hides corresponding rows in the GRADE table
- At least one outcome must remain checked (last checkbox is non-removable)

**Meta-Analysis (existing)**
- Primary/Sensitivity toggle + scrollspy navigation — keep as-is

## Responsive Behavior

This application is primarily used on desktop (clinical workstation, large monitor). Mobile is not a priority for this phase.

- **Desktop (≥1280px)**: Full 3-column layout — SideIconRail (72px) + OnPageNav (280px, toggleable) + MainContent (flex-1). This is the primary target.
- **Tablet (768–1279px)**: OnPageNav defaults to collapsed; user can open it. MainContent fills most of the viewport.
- **Mobile (<768px)**: Out of scope for this phase. Navigation collapses to icon rail only; content is scrollable but not optimized.

## Accessibility Requirements

- **Contrast**: All text on white backgrounds must meet WCAG AA (4.5:1 for body text, 3:1 for large text). The brand blue `#2E75B5` on white passes AA for large text.
- **Keyboard navigation**: All interactive elements (nav items, table controls, PRISMA nodes, FilterChips) must be keyboard-reachable and have visible focus styles.
- **Screen readers**: PRISMA flowchart nodes must have `aria-label` describing the stage and count. Tables must use proper `<thead>`, `<th scope>`, and `<caption>` markup.
- **GRADE certainty badges**: Must not rely on color alone; include text label inside the badge (High / Moderate / Low / Very Low).
- **Focus management**: When the study list panel opens (PRISMA click), focus moves to the panel. When it closes, focus returns to the triggering node.

## Out of Scope

- Landing/project selection page (separate future work)
- Authentication or user accounts
- Data persistence or backend API integration (all data is static/mock for this phase)
- Dark mode
- Mobile-optimized layout
- Results Table and Traffic Plot under Summary Tables (placeholder tabs only)
- Export or print functionality
- Real-time data updates or WebSocket integration
