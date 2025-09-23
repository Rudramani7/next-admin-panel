"use client";

import ProtectedRoute from "../../components/ProtectedRoute";
import DashboardWireframe from "./DashboardWireframe";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardWireframe />
    </ProtectedRoute>
  );
}
