import { createHashRouter, createMemoryRouter, Navigate, RouteObject } from "react-router";
import { MetaAnalysis } from "./pages/MetaAnalysis";
import { HomePage } from "./pages/HomePage";
import { PrismaPage } from "./pages/PrismaPage";
import { SummaryTablesPage } from "./pages/SummaryTablesPage";
import { SummaryOfFindingsPage } from "./pages/SummaryOfFindingsPage";
import { SearchResultsPage } from "./pages/SearchResultsPage";

const routes: RouteObject[] = [
  { path: "/", element: <Navigate to="/home" replace /> },
  { path: "/home", Component: HomePage },
  { path: "/prisma", Component: PrismaPage },
  { path: "/summary-tables", Component: SummaryTablesPage },
  { path: "/meta-analysis", Component: MetaAnalysis },
  { path: "/summary-of-findings", Component: SummaryOfFindingsPage },
  { path: "/search", Component: SearchResultsPage },
];

/**
 * Hash routing resolves links against the document URL. Preview surfaces that
 * render this single-file build inside a sandboxed `<iframe srcdoc>` give it an
 * opaque origin — `location.href` is "about:srcdoc" and `location.origin` is the
 * literal string "null" — so the router's URL construction throws
 * "Failed to construct 'URL': Invalid URL" and the page renders blank.
 *
 * `new URL("/", location.href)` is the discriminator: it resolves on file://,
 * http(s):// and blob:, and throws only on a non-hierarchical document URL.
 * When it throws, fall back to in-memory routing — navigation still works, it
 * just isn't reflected in the address bar.
 */
function canUseUrlRouting(): boolean {
  if (typeof window === "undefined") return false;
  try {
    new URL("/", window.location.href);
    return true;
  } catch {
    return false;
  }
}

export const router = canUseUrlRouting()
  ? createHashRouter(routes)
  : createMemoryRouter(routes, { initialEntries: ["/"] });
