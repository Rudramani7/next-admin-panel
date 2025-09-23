"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { month: "Jan", orders: 400, revenue: 2400 },
  { month: "Feb", orders: 300, revenue: 1398 },
  { month: "Mar", orders: 500, revenue: 9800 },
  { month: "Apr", orders: 200, revenue: 3908 },
  { month: "May", orders: 278, revenue: 4800 },
  { month: "Jun", orders: 189, revenue: 3800 },
];

export default function ChartStacked() {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="month" stroke="#333" />
          <YAxis stroke="#333" />
          <Tooltip />
          <Legend />
          <Bar dataKey="orders" stackId="a" fill="#F59E0B" />
          <Bar dataKey="revenue" stackId="a" fill="#3B82F6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
