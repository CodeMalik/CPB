// app/api/test-db/route.js
import { connectDB } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({ status: "success", message: "Connected to MongoDB" });
  } catch (err) {
    return NextResponse.json({ status: "error", message: "Failed to connect", error: err.message });
  }
}
