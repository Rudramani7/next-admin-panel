"use client";
import ProtectedRoute from "../../components/ProtectedRoute";
import MiniStatCard from "../../components/MiniStatCard";
import { Users, Shield, Bell } from "lucide-react";

export default function SettingsPage() {
  return (
    <ProtectedRoute>
      <div className="space-y-8">
        {/* Page Title */}
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Configure your account, preferences, and notifications.
        </p>

        {/* Quick Settings Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <MiniStatCard
            title="User Management"
            value="Manage Users"
            subtitle="Add, edit, remove"
            icon={<Users />}
            color="teal"
            variant="solid"
          />
          <MiniStatCard
            title="Security"
            value="Account Safety"
            subtitle="Password & 2FA"
            icon={<Shield />}
            color="pink"
            variant="solid"
          />
          <MiniStatCard
            title="Notifications"
            value="Preferences"
            subtitle="Email & App"
            icon={<Bell />}
            color="yellow"
            variant="solid"
          />
        </section>

        {/* Account Settings Form */}
        <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4">
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            Account Settings
          </h2>
          <form className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label className="w-32 text-gray-700 dark:text-gray-200">
                Username:
              </label>
              <input
                type="text"
                className="flex-1 border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-gray-100"
                placeholder="John Doe"
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label className="w-32 text-gray-700 dark:text-gray-200">
                Email:
              </label>
              <input
                type="email"
                className="flex-1 border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-gray-100"
                placeholder="john@example.com"
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <label className="w-32 text-gray-700 dark:text-gray-200">
                Password:
              </label>
              <input
                type="password"
                className="flex-1 border rounded-lg px-3 py-2 dark:bg-gray-700 dark:text-gray-100"
                placeholder="********"
              />
            </div>
            <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
              Save Changes
            </button>
          </form>
        </section>
      </div>
    </ProtectedRoute>
  );
}
