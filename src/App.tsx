import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";

// Lazy load route components
const RecyclingPage = lazy(
  () => import("./components/recycling/RecyclingPage"),
);
const CollectionPointsPage = lazy(
  () => import("./components/collection/CollectionPointsPage"),
);
const JobsPage = lazy(() => import("./components/jobs/JobsPage"));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recycling" element={<RecyclingPage />} />
          <Route path="/collection-points" element={<CollectionPointsPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
