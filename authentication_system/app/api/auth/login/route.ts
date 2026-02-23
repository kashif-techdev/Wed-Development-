import { type NextRequest, NextResponse } from "next/server"
import { authStore } from "@/lib/auth-store"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required",
        },
        { status: 400 },
      )
    }

    // Find user by email
    const user = authStore.findByEmail(email)

    // Check if user exists
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Email not found. Please check your email or register for a new account.",
        },
        { status: 404 },
      )
    }

    // Validate password
    if (user.password !== password) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid password. Please try again.",
        },
        { status: 401 },
      )
    }

    // Check if user is active
    if (!user.isActive) {
      return NextResponse.json(
        {
          success: false,
          message: "Account is inactive. Please contact support.",
        },
        { status: 403 },
      )
    }

    // Login successful - exclude password from response
    const { password: _, ...userWithoutPassword } = user
    return NextResponse.json(
      {
        success: true,
        message: "Login successful",
        user: userWithoutPassword,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Login error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error during login",
      },
      { status: 500 },
    )
  }
}
