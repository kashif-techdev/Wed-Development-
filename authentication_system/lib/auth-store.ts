// In-memory user storage simulating a database
export interface User {
  id: string
  name: string
  email: string
  password: string
  createdAt: string
  isActive: boolean
}

// Simulated database using JSON variable
let users: User[] = []

export const authStore = {
  // Get all users
  getAllUsers: () => users,

  // Find user by email
  findByEmail: (email: string) => {
    return users.find((user) => user.email.toLowerCase() === email.toLowerCase())
  },

  // Create new user
  createUser: (name: string, email: string, password: string) => {
    const newUser: User = {
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      email: email.toLowerCase(),
      password,
      createdAt: new Date().toISOString(),
      isActive: true,
    }
    users.push(newUser)
    return newUser
  },

  // Get active users (excluding passwords)
  getActiveUsers: () => {
    return users.filter((user) => user.isActive).map(({ password, ...userWithoutPassword }) => userWithoutPassword)
  },

  // Reset store (for testing purposes)
  reset: () => {
    users = []
  },
}
