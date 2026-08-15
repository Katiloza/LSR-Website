import { RouterProvider } from "react-router";
import { router } from "./routes";
import { FilterProvider } from "./lib/FilterContext";
import { CitationProvider } from "./lib/CitationContext";
import { CitationModal } from "./components/CitationModal";
import { TrialListModal } from "./components/TrialListModal";

export default function App() {
  return (
    <FilterProvider>
      <CitationProvider>
        <RouterProvider router={router} />
        <CitationModal />
        <TrialListModal />
      </CitationProvider>
    </FilterProvider>
  );
}
