import React from "react";
import { TopNav } from "./TopNav";
import { AppSidebar } from "./AppSidebar";

/**
 * Shared page chrome.
 *
 * Figma node 1:3 places the "Sidebar nav" symbol at x=0, y=0 spanning the FULL
 * page height, with the "Navigation" symbol starting at x=222 beside it. So the
 * sidebar is the outer left column (and owns the wordmark), and the top bar
 * only spans the content column — its bottom border stops at the sidebar edge.
 */
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-white">
      <AppSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNav />
        <div className="flex-1 flex flex-col min-w-0">{children}</div>
      </div>
    </div>
  );
}
