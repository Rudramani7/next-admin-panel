"use client";

import { ReactNode } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

interface MiniStatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon?: ReactNode;
  color?: "blue" | "green" | "purple" | "orange" | "red" | "teal" | "pink" | "yellow";
  trend?: { value: string; up: boolean };
  hoverable?: boolean;
  variant?: "solid" | "gradient";
}

export default function MiniStatCard({
  title,
  value,
  subtitle,
  icon,
  color = "blue",
  trend,
  hoverable = false,
  variant = "solid",
}: MiniStatCardProps) {
  // Solid/light background colors
  const solidColors: Record<string, string> = {
    blue: "bg-blue-100 dark:bg-blue-900",
    green: "bg-green-100 dark:bg-green-900",
    purple: "bg-purple-100 dark:bg-purple-900",
    orange: "bg-orange-100 dark:bg-orange-900",
    red: "bg-red-100 dark:bg-red-900",
    teal: "bg-teal-100 dark:bg-teal-900",
    pink: "bg-pink-100 dark:bg-pink-900",
    yellow: "bg-yellow-100 dark:bg-yellow-900",
  };

  // Solid text colors for contrast
  const solidTextColors: Record<string, string> = {
    blue: "text-blue-900 dark:text-blue-100",
    green: "text-green-900 dark:text-green-100",
    purple: "text-purple-900 dark:text-purple-100",
    orange: "text-orange-900 dark:text-orange-100",
    red: "text-red-900 dark:text-red-100",
    teal: "text-teal-900 dark:text-teal-100",
    pink: "text-pink-900 dark:text-pink-100",
    yellow: "text-yellow-900 dark:text-yellow-100",
  };

  // Gradient colors
  const gradientColors: Record<string, string> = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
    orange: "from-orange-500 to-orange-600",
    red: "from-red-500 to-red-600",
    teal: "from-teal-500 to-teal-600",
    pink: "from-pink-500 to-pink-600",
    yellow: "from-yellow-500 to-yellow-600",
  };

  const hoverClass = hoverable ? "transform transition-transform duration-300 hover:scale-105" : "";

  // Determine background and text
  const bgClass =
    variant === "gradient"
      ? `bg-gradient-to-r ${gradientColors[color]} text-white`
      : `${solidColors[color]} ${solidTextColors[color]}`;

  return (
    <div className={`rounded-xl p-5 shadow-md ${bgClass} ${hoverClass}`}>
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm opacity-90">{title}</h4>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        {icon && <div className="text-4xl opacity-80">{icon}</div>}
      </div>

      <div className="mt-2 flex items-center justify-between">
        <p className="text-sm opacity-80">{subtitle}</p>
        {trend && (
          <span
            className={`flex items-center gap-1 text-sm font-semibold ${
              trend.up ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
            }`}
          >
            {trend.up ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
            {trend.value}
          </span>
        )}
      </div>
    </div>
  );
}
