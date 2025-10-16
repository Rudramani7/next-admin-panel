"use client";

import { Suspense, lazy } from "react";
import ProtectedRoute from "../../components/ProtectedRoute";

const GraphFlow = lazy(() => import("../../components/GraphFlow"));
const ForceTree = lazy(() => import("../../components/ForceTree"));

export default function VisualsPage() {
  return (
    <ProtectedRoute>
      <main className="space-y-8 px-4 py-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          Graphs & Visuals
        </h2>

        {/* Each section now stacked vertically */}
        <section
          aria-labelledby="user-journey-flow"
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
        >
          <h3
            id="user-journey-flow"
            className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200"
          >
            User Journey Flow
          </h3>
          <Suspense fallback={<p>Loading chart...</p>}>
            <GraphFlow />
          </Suspense>
        </section>

        <section
          aria-labelledby="monthly-sales-performance"
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
        >
          <h3
            id="monthly-sales-performance"
            className="text-lg font-medium mb-3 text-gray-800 dark:text-gray-200"
          >
            Monthly Sales Performance
          </h3>
          <Suspense fallback={<p>Loading chart...</p>}>
            <ForceTree />
          </Suspense>
        </section>
      </main>
    </ProtectedRoute>
  );
}
