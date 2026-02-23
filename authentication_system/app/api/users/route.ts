import { NextResponse } from "next/server"
import { authStore } from "@/lib/auth-store"

export async function GET() {
  try {
    // Get all active users without sensitive data
    const activeUsers = authStore.getActiveUsers()

    return NextResponse.json(
      {
        success: true,
        count: activeUsers.length,
        users: activeUsers,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Get users error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error while fetching users",
      },
      { status: 500 },
    )
  }
}
