"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Users,
  BarChart2,
  Settings,
  Menu,
  ChevronLeft,
  X,
  BarChart,
} from "lucide-react";
import { useState } from "react";

const links = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/visuals", label: "Visuals", icon: BarChart },
  { href: "/users", label: "Users", icon: Users },
  { href: "/reports", label: "Reports", icon: BarChart2 },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar({
  mobileOpen,
  setMobileOpen,
}: {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const companyName = "MyCompany"; // Replace with your company name
  const logoUrl = ""; // If empty or broken, fallback will show first letter

  return (
    <>
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 lg:hidden"
        />
      )}
      <aside
        className={`${
          collapsed ? "w-20" : "w-64"
        } fixed lg:static top-0 left-0 h-screen bg-gray-100 dark:bg-gray-900 p-4 transition-all duration-300 flex flex-col z-40 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo / Company */}
        <div className="flex items-center justify-between mb-8">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={companyName}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  {companyName[0].toUpperCase()}
                </div>
              )}
              <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                {companyName}
              </span>
            </div>
          )}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              {collapsed ? (
                <Menu className="h-5 w-5" />
              ) : (
                <ChevronLeft className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 lg:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-2 flex-1">
          {links.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
                }`}
              >
                <Icon className="h-5 w-5 mr-2" />
                {!collapsed && <span>{label}</span>}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
