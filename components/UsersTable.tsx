"use client";

import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface UsersTableProps {
  limit?: number;       // rows per page default
  role?: string;        // filter by role
}

export default function UsersTable({ limit = 5, role }: UsersTableProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<keyof User>("id");
  const [sortAsc, setSortAsc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(limit);

  // Fetch users
  useEffect(() => {
    fetch("/api/users")
      .then(res => res.json())
      .then(data => {
        let dataFiltered = role ? data.filter((u: User) => u.role === role) : data;
        setUsers(dataFiltered);
        setFilteredUsers(dataFiltered);
      })
      .finally(() => setLoading(false));
  }, [role]);

  // Search filter
  useEffect(() => {
    const filtered = users.filter(
      u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.role.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [search, users]);

  // Sort
  const handleSort = (key: keyof User) => {
    const asc = key === sortKey ? !sortAsc : true;
    setSortKey(key);
    setSortAsc(asc);

    const sorted = [...filteredUsers].sort((a, b) => {
      if (a[key] < b[key]) return asc ? -1 : 1;
      if (a[key] > b[key]) return asc ? 1 : -1;
      return 0;
    });

    setFilteredUsers(sorted);
  };

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const roleColors: Record<string, string> = {
    admin: "bg-red-200 text-red-800",
    user: "bg-blue-200 text-blue-800",
    manager: "bg-green-200 text-green-800",
    guest: "bg-gray-200 text-gray-800",
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
      {/* Top controls */}
      <div className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full sm:w-64 dark:bg-gray-700 dark:text-gray-100"
        />
        <div className="flex items-center gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Total users: {filteredUsers.length}
          </p>
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border rounded-lg px-2 py-1 dark:bg-gray-700 dark:text-gray-100"
          >
            {[5, 10, 20].map(n => (
              <option key={n} value={n}>{n} per page</option>
            ))}
          </select>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              {(["id", "name", "email", "role"] as (keyof User)[]).map((key) => (
                <th
                  key={key}
                  onClick={() => handleSort(key)}
                  className="px-4 py-2 text-left cursor-pointer select-none"
                >
                  {key.toUpperCase()} {sortKey === key ? (sortAsc ? "↑" : "↓") : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user, idx) => (
              <tr key={user.id} className={idx % 2 === 0 ? "bg-gray-50 dark:bg-gray-900" : ""}>
                <td className="px-4 py-2">{user.id}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${roleColors[user.role.toLowerCase()] || "bg-gray-200 text-gray-800"}`}>
                    {user.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-4">
        {paginatedUsers.map(user => (
          <div key={user.id} className="p-4 border rounded-lg dark:border-gray-700 bg-gray-50 dark:bg-gray-900 shadow">
            <p className="font-semibold text-gray-900 dark:text-gray-100">{user.name}</p>
            <p className="text-gray-500 dark:text-gray-300">{user.email}</p>
            <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-semibold ${roleColors[user.role.toLowerCase()] || "bg-gray-200 text-gray-800"}`}>
              {user.role}
            </span>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center text-sm text-gray-700 dark:text-gray-300">
        <button
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
