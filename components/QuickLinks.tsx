"use client";

const links = [
  { label: "Add User", href: "/users" },
  { label: "View Reports", href: "/reports" },
  { label: "Settings", href: "/settings" },
];

export default function QuickLinks() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="block bg-blue-600 hover:bg-blue-700 text-white text-center py-3 rounded-xl shadow"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}
