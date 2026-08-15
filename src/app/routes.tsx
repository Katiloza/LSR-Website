import { createHashRouter as createBrowserRouter, Navigate } from "react-router";
import { MetaAnalysis } from "./pages/MetaAnalysis";
import { HomePage } from "./pages/HomePage";
import { PrismaPage } from "./pages/PrismaPage";
import { SummaryTablesPage } from "./pages/SummaryTablesPage";
import { SummaryOfFindingsPage } from "./pages/SummaryOfFindingsPage";

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/home" replace /> },
  { path: "/home", Component: HomePage },
  { path: "/prisma", Component: PrismaPage },
  { path: "/summary-tables", Component: SummaryTablesPage },
  { path: "/meta-analysis", Component: MetaAnalysis },
  { path: "/summary-of-findings", Component: SummaryOfFindingsPage },
]);
