"use client";

import ProtectedRoute from "../../components/ProtectedRoute";
import UsersTable from "../../components/UsersTable";

export default function UsersPage() {
  return (
    <ProtectedRoute>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Users Management
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage all users, search, sort, and paginate.
        </p>

        {/* Total Users Table */}
        <section className="mt-6">
          <h2 className="text-lg font-medium mb-3 text-gray-900 dark:text-gray-100">
            All Users
          </h2>
          <UsersTable limit={10}/>
        </section>
      </div>
    </ProtectedRoute>
  );
}
