"use client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", orders: 2400 },
  { name: "Feb", orders: 1398 },
  { name: "Mar", orders: 9800 },
  { name: "Apr", orders: 3908 },
  { name: "May", orders: 4800 },
  { name: "Jun", orders: 3800 },
];

export default function ChartBar() {
  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="name" stroke="#333" />
          <YAxis stroke="#333" />
          <Tooltip />
          <Bar dataKey="orders" fill="#F59E0B" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
