"use client";

const notifications = [
  { id: 1, message: "New user registered" },
  { id: 2, message: "Order #3456 has been shipped" },
  { id: 3, message: "Server maintenance scheduled" },
];

export default function NotificationsCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
      <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-gray-100">Notifications</h3>
      <ul className="space-y-2">
        {notifications.map((n) => (
          <li key={n.id} className="text-gray-700 dark:text-gray-300">
            • {n.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
