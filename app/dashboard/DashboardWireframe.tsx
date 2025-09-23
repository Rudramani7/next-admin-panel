"use client";

import { Users, ShoppingCart, MessageCircle, UserPlus } from "lucide-react";
import StatCard from "../../components/StatCard";
import MiniStatCard from "../../components/MiniStatCard";
import ChartLine from "../../components/ChartLine";
import ChartPie from "../../components/ChartPie";
import ChartBar from "../../components/ChartBar";
import UsersTable from "../../components/UsersTable";
import ProductsTable from "../../components/ProductsTable";
import QuickLinks from "../../components/QuickLinks";
import NotificationsCard from "../../components/NotificationsCard";

export default function DashboardWireframe() {
  return (
    <div className="space-y-10">
      {/* KPIs */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Key Metrics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            title="Users"
            value="1,234"
            subtitle="+12% this month"
            icon="👥"
          />
          <StatCard
            title="Sales"
            value="₹92,400"
            subtitle="+8% this month"
            icon="💰"
          />
          <StatCard
            title="Revenue"
            value="$12,400"
            subtitle="Net revenue"
            icon="📈"
          />
        </div>
      </section>

      {/* Quick Stats */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Quick Insights
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <MiniStatCard
            title="Traffic"
            value="23,450"
            subtitle="Active now"
            icon={<Users />}
            color="blue"
            variant="gradient"
          />
          <MiniStatCard
            title="Orders"
            value="320"
            subtitle="Pending delivery"
            icon={<ShoppingCart />}
            color="green"
            variant="gradient"
          />
          <MiniStatCard
            title="Feedbacks"
            value="124"
            subtitle="This week"
            icon={<MessageCircle />}
            color="purple"
            variant="gradient"
          />
          <MiniStatCard
            title="New Users"
            value="56"
            subtitle="Today"
            icon={<UserPlus />}
            color="orange"
            variant="gradient"
          />
        </div>
      </section>

      {/* Analytics */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Analytics
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h3 className="text-lg font-medium mb-3">Sales Overview</h3>
            <ChartLine />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-3">Revenue Distribution</h3>
            <ChartPie />
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-3">Orders Overview</h3>
          <ChartBar />
        </div>
      </section>

      {/* Management */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Management
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Top Products</h3>
            <ProductsTable />
          </div>
          <div>
            <h3 className="text-lg font-medium mb-3">Recent Users</h3>
            <UsersTable limit={5} />
          </div>
        </div>
      </section>
      {/* Quick Links */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Quick Links
        </h2>
        <QuickLinks />
      </section>

      {/* Activity */}
      <section>
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Activity & Notifications
        </h2>
        <NotificationsCard />
      </section>
    </div>
  );
}
