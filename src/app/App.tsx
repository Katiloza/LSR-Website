import { RouterProvider } from "react-router";
import { router } from "./routes";
import { FilterProvider } from "./lib/FilterContext";

export default function App() {
  return (
    <FilterProvider>
      <RouterProvider router={router} />
    </FilterProvider>
  );
}
