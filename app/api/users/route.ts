// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";

const roles = ["admin", "user", "manager", "guest"];
const statuses = ["active", "inactive"];

const randomDate = (start: Date, end: Date) => {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split("T")[0];
};

const generateUsers = (count: number) => {
  const users = [];
  for (let i = 1; i <= count; i++) {
    users.push({
      id: i,
      name: `User ${i}`,
      email: `user${i}@example.com`,
      role: roles[Math.floor(Math.random() * roles.length)],
      phone: `+1 9${Math.floor(100000000 + Math.random() * 900000000)}`,
      createdAt: randomDate(new Date(2023, 0, 1), new Date()),
      status: statuses[Math.floor(Math.random() * statuses.length)],
    });
  }
  return users;
};

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const start = Number(url.searchParams.get("start")) || 0;
  const limit = Number(url.searchParams.get("limit")) || 10;

  const allUsers = generateUsers(50); // total users
  const users = allUsers.slice(start, start + limit); // slice for this table

  return NextResponse.json(users);
}
