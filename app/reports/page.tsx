"use client";

import ProtectedRoute from "../../components/ProtectedRoute";
import ChartStacked from "../../components/ChartStacked";
import ChartLine from "../../components/ChartLine";
import MiniStatCard from "../../components/MiniStatCard";
import UsersTable from "../../components/UsersTable";
import { Users, ShoppingCart, MessageCircle } from "lucide-react";

export default function ReportsPage() {
  return (
    <ProtectedRoute>
      <div className="space-y-8">

        {/* Page Title */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Reports</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Detailed insights of the system’s performance.
          </p>
        </div>

        {/* Quick Metrics */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  <MiniStatCard 
    title="Active Users" 
    value="1,234" 
    subtitle="Today" 
    icon={<Users />} 
    color="blue" 
    variant="solid"
    hoverable={true} 
    trend={{ value: "+5%", up: true }}
  />
  <MiniStatCard 
    title="New Orders" 
    value="320" 
    subtitle="This week" 
    icon={<ShoppingCart />} 
    color="green" 
    variant="solid"
    hoverable={true} 
    trend={{ value: "-2%", up: false }} 
  />
  <MiniStatCard 
    title="Support Tickets" 
    value="124" 
    subtitle="Pending" 
    icon={<MessageCircle />} 
    color="purple" 
    variant="solid"
    hoverable={true} 
    trend={{ value: "+10%", up: true }} 
  />
</section>


        {/* Charts */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-gray-100">Sales Trends</h3>
            <ChartLine />
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-gray-100">Orders vs Revenue</h3>
            <ChartStacked />
          </div>
        </section>

        {/* Users Table */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-gray-100">Top Users</h3>
          <UsersTable limit={10} />
        </section>

      </div>
    </ProtectedRoute>
  );
}
