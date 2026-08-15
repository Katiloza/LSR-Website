# Design Review: mCRPC Clinical Decision Application

Reviewed against: `.design/mcrpc-clinical-decision/DESIGN_BRIEF.md`  
Philosophy: **Clinical Authority** (Dieter Rams functionalism applied to medical evidence)  
Date: 2026-06-30

---

## Screenshots Captured

| Screenshot | Breakpoint | Description |
|------------|------------|-------------|
| Home — desktop | 1280×800 | Full home page with stats, description, cards |
| Home — tablet | 768×1024 | Tablet layout of home page |
| Home — mobile | 375×812 | Mobile layout showing nav/content constraints |
| PRISMA flowchart — desktop | 1280×800 | Current State view, all 4 phases |
| PRISMA + StudyListPanel — desktop | 1280×800 | "Studies included" node clicked, panel open |
| PRISMA Living Search — desktop | 1280×800 | Calendar heatmap 2021–2026 |
| Meta-Analysis — desktop | 1280×800 | Primary analysis forest plot |
| Summary Tables — desktop | 1280×800 | Interactive table with 12 studies, filter chips |
| Summary of Findings — desktop | 1280×800 | GRADE table with all 8 primary outcomes visible |
| Project Switcher — desktop | 1280×800 | TopNav dropdown open showing mCRPC |

> Screenshots captured via Claude Preview tool during design review session.

---

## Summary

The implementation is strong and cohesive — the clinical authority aesthetic reads clearly across all five sections, the data-heavy pages (Meta-Analysis, Summary Tables, Summary of Findings) are well-structured and readable, and the most ambitious interaction (PRISMA node click → study panel) works correctly and feels polished. The primary issues are concentrated in **mobile layout** (the fixed 72px icon rail leaves inadequate content width at 375px), **Summary Tables horizontal overflow** (rightmost columns clip), and a few **inconsistent spacing values** across pages. None of these break the desktop experience, which is the primary target per the brief.

---

## Must Fix

### 1. Mobile: Content area too narrow at 375px
The fixed `w-[72px]` `SideIconRail` consumes 19% of the screen width at mobile. Combined with the `max-w-4xl mx-auto px-8` constraint on `HomePage`, the usable content column is approximately 230px — causing `StatsStrip` numbers to truncate ("Ju" instead of "June 2026"), section card text to stack awkwardly, and the hero heading to be oversized for the available width.

**Fix:** At breakpoints below `md` (768px), collapse the `SideIconRail` to 0 or use a bottom tab bar, and adjust the `HomePage`'s horizontal padding to `px-4`.

**Files:** `SideIconRail.tsx`, `HomePage.tsx`

---

### 2. Summary Tables: Right columns clip without horizontal scroll indicator
At 1280px desktop, the "Primary Endpoint", "HR OS", "HR PFS" columns are cut off at the right edge of the table container. The table uses `overflow-x-auto` on the wrapper, which scrolls internally, but there is no scroll shadow or indicator telling the user there is more content to the right.

**Fix:** Add a right-side fade/shadow overlay to the table container when it is scrollable. Also consider making the "Study" and "Year" columns sticky (`position: sticky`) so they remain visible while scrolling horizontally.

**File:** `SummaryTable.tsx`

---

### 3. HTML: `<caption>` placed outside `<table>` in SummaryTable
In `SummaryTable.tsx`, the `<caption>` element appears after the closing `</table>` tag. This is invalid HTML — caption must be the first child of `<table>`. Screen readers will ignore it in this position.

**Fix:** Move `<caption className="sr-only">...</caption>` to immediately after the opening `<table>` tag, before `<thead>`.

**File:** `SummaryTable.tsx`

---

## Should Fix

### 4. PRISMA: No visual connector between the two Identification-phase nodes
The "Records identified via database searching" and "Records identified via other sources" nodes are stacked vertically in the Identification phase but have no arrow or connector showing they merge into the Screening phase. The current layout implies they are sequential when they are actually parallel inputs.

**Fix:** Render these two nodes side-by-side (or with a merge connector) and a single downward arrow flowing from both into "Records screened". A simple SVG connector or a `flex-row` layout with a shared tail line would make the parallel input relationship clear.

**File:** `PrismaFlowchart.tsx`

---

### 5. PRISMA: No visual affordance that nodes are clickable
The brief specifies click-to-reveal as the primary PRISMA interaction, but there is no persistent hint that nodes are interactive. A user encountering this for the first time would not know to click. The cursor changes to pointer on hover (correct), but this is only discoverable by mousing over.

**Fix:** Add a small "click to view studies" hint below the included node count (or a `cursor-pointer` `title` attribute is not enough on touch devices). Consider adding a subtle info icon (`ⓘ`) at the top of each node with a tooltip, or a one-line instruction at the top of the page: "Click any stage to view the studies at that step."

**Files:** `PrismaFlowchart.tsx`, `PrismaPage.tsx`

---

### 6. TopNav project switcher label breaks at tablet
At 768px, the "Living Systematic Reviews ·" prefix text wraps inside the pill button, causing it to display as a two-line button that is taller than the 72px nav bar, pushing content slightly. The `hidden sm:inline` class hides the prefix text below `sm` (640px), but the 768px tablet breakpoint is between `sm` and `md`.

**Fix:** Change the prefix text class to `hidden md:inline` so it is hidden at tablet and only shows at 1024px+.

**File:** `TopNav.tsx`

---

### 7. OnPageNav border missing on Meta-Analysis page
The `NavPanelShell` component adds a `border-r border-gray-100` right border. However, the original `OnPageNav` component used on the Meta-Analysis page does not have this border. The two sidebars look slightly different — one has a subtle dividing line, the other does not.

**Fix:** Add `border-r border-gray-100` to the outer container of `OnPageNav.tsx` to match.

**File:** `OnPageNav.tsx`

---

### 8. Home page: panel toggle shows but opens nothing
On `/home`, the `SideIconRail` toggle button (PanelLeftOpen icon) is visible and clickable, but `isPanelOpen` is initialized to `false` and there is no `NavPanelShell` content for the Home section. Toggling it does nothing visible. This is correct per the IA (Home has no on-page nav), but the toggle button still shows, implying that something will open.

**Fix:** In `HomePage.tsx`, either hide the panel toggle (pass a prop to `SideIconRail` indicating no panel is available for this section), or keep the toggle but wire it to a collapsed state that clearly resolves to "nothing to show". The simplest fix is to remove the toggle from `SideIconRail` on pages where no panel content exists.

**Files:** `HomePage.tsx`, `SideIconRail.tsx`

---

### 9. SummaryTable: hardcoded indigo used for treatment class badge
The `treatmentClass` badge in `SummaryTable.tsx` uses `bg-indigo-50 text-indigo-600` — a color not in the design system and not derived from a CSS variable. All other badge colors use the brand blue (`#2E75B5`/`#E4F0FE`). Indigo is close enough to go unnoticed but it diverges from the "one authoritative color" principle in the brief.

**Fix:** Replace with `bg-[#E4F0FE] text-[#2E75B5]` to match the rest of the system, or define a `treatmentClass`-specific color in `theme.css` if semantic differentiation is needed.

**File:** `SummaryTable.tsx`

---

### 10. SoF page: "Sensitivity" tab label should be "Sensitivity" not "Secondary"
The brief consistently uses "Sensitivity" analysis as the paired alternative to "Primary." The `OnPageNav` on the original Meta-Analysis page uses "Sensitivity" correctly. Confirm the `SummaryOfFindingsPage.tsx` uses "Sensitivity" (it does in code), but the brief also used the word "Secondary" in one place — clarify with the team which term to use and standardize it everywhere.

**File:** `SummaryOfFindingsPage.tsx`, `MetaAnalysis.tsx`

---

## Could Improve

### 11. Home page: header banner gradient needs more contrast at tablet
At 768px, the hero section's gradient (`rgba(133,200,250,0.15)`) is so subtle it is nearly invisible. The "LIVING SYSTEMATIC REVIEW" label, the serif heading, and the description body float on a near-white background with nothing anchoring them visually. At desktop the width creates a contained card feel; at tablet the width is enough that the gradient feels absent.

**Suggestion:** Slightly increase the gradient opacity to `0.22` at tablet, or add a very light `border border-blue-50` to the hero container so it reads as a contained card at all breakpoints.

---

### 12. PRISMA Living Search: no column/row totals visible at desktop
The calendar heatmap's rightmost "Total" column and bottom summary row exist in code but the desktop view cuts them off because the table is wide. The row totals (507 / 963 / 844 / etc.) are part of the data story — they show the year-over-year growth of the living review.

**Suggestion:** Wrap the heatmap table in a full-width container instead of constraining it to the main content column. Or make the table horizontally scrollable with a visible scroll affordance and the totals column sticky.

**File:** `PrismaLivingSearch.tsx`

---

### 13. Summary Tables: "Treatment" and "Control" columns redundant with filter chips
At 1280px, the full treatment and control names in the table columns ("Olaparib + Abiraterone", "Placebo + Abiraterone") take up substantial horizontal space and repeat information already available in the filter chips. This is not wrong, but it contributes to the overflow problem (item #2).

**Suggestion:** Consider abbreviating treatment/control to a code in the table (e.g., "Olap + Abi") with a full name in a tooltip, freeing column width for the effect size columns that are more clinically meaningful.

---

### 14. Meta-Analysis: page header style inconsistency vs. new pages
The Meta-Analysis page pre-dates the new design system applied to Home, PRISMA, Summary Tables, and SoF. It lacks the `"Systematic Review — mCRPC"` breadcrumb line and the gradient hero card header that all four new pages share. It uses a different page-level structure (full-bleed gradient inside the white card vs. the new pages' contained gradient on top of the card).

**Suggestion:** Refactor the Meta-Analysis page header to match the header pattern established in the new pages. This is a visual consistency fix, not a functional one.

**File:** `MetaAnalysis.tsx`

---

### 15. SoF table: no column for "No. of participants" label wraps awkwardly
The "PARTICIPANTS" column header in `GradeTable.tsx` shows correctly, but the absolute/intervention/control column headers ("ABS. — INTERVENTION", "ABS. — CONTROL") are verbose and wrap to two lines at moderate viewport widths (around 1100px), misaligning the header row height with the data rows.

**Suggestion:** Shorten to "Intervention" / "Control" for the absolute columns, and add the "per 1,000" context in a parenthetical inside the first data cell (or in a table footnote) rather than in the column header.

**File:** `GradeTable.tsx`

---

## What Works Well

**PRISMA interaction is production-quality.** The node click → `StudyListPanel` animation is smooth, the panel contains real study data with PubMed links, focus management is implemented correctly (focus moves to close button on open), and the `Escape` key dismisses the panel. The active ring on the clicked node provides clear state feedback.

**GradeTable certainty badges are distinctive and accessible.** The four GRADE levels (High/Moderate/Low/Very Low) use color + text label + border — meeting the brief's requirement to never rely on color alone. The badge sizes are consistent, the dot + label pattern is clear at small sizes.

**Living Search calendar heatmap reads immediately.** The proportional blue intensity scale communicates the growth of the living review at a glance. Future months are correctly greyed out. The year-over-year trend (210 records in 2021 → 963 in 2025) is visible without reading any numbers.

**TopNav project switcher is contextually correct.** The "Living Systematic Reviews · mCRPC ▾" pattern clearly identifies both the section and the project. The dropdown is well-formed (role="listbox", aria-selected, checkmark on active item), and the "More projects coming soon" footer sets correct expectations.

**Routing and navigation state are properly wired.** All five routes work, `SideIconRail` derives active state from the URL (not local state), and all view/analysis/tab states are reflected in shareable query params (`?view=`, `?analysis=`, `?tab=`). Browser back/forward work correctly across all sections.

**Typographic hierarchy is consistent.** Benton Modern D appears on all five page headings at 40–48px. Articulat CF handles all UI labels, section headers, and navigation. Inter handles body paragraphs and table cell text. The three-font system is applied correctly throughout.
