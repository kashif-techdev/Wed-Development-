import { type NextRequest, NextResponse } from "next/server"
import { authStore } from "@/lib/auth-store"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, password } = body

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required (name, email, password)",
        },
        { status: 400 },
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email format",
        },
        { status: 400 },
      )
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must be at least 6 characters long",
        },
        { status: 400 },
      )
    }

    // Check for duplicate email
    const existingUser = authStore.findByEmail(email)
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is already registered. Please use a different email or login.",
        },
        { status: 409 },
      )
    }

    // Create new user
    const newUser = authStore.createUser(name, email, password)

    // Return success response (exclude password)
    const { password: _, ...userWithoutPassword } = newUser
    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
        user: userWithoutPassword,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] Registration error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error during registration",
      },
      { status: 500 },
    )
  }
}
