import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  if (email === "demo@test.com" && password === "password123") {
    return NextResponse.json({ success: true, token: "demo-jwt-token-12345" }, { status: 200 });
  }
  return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
}
