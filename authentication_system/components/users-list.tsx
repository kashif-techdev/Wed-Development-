"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Users, RefreshCw, Loader2 } from "lucide-react"

interface User {
  id: string
  name: string
  email: string
  createdAt: string
  isActive: boolean
}

export function UsersList() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchUsers = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/users")
      const data = await response.json()

      if (data.success) {
        setUsers(data.users)
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError("Failed to connect to the server")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <Card className="border-border/50 shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <div className="p-2 rounded-lg bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              Active Users
            </CardTitle>
            <CardDescription className="text-base">
              {users.length} {users.length === 1 ? "employee" : "employees"} registered in the system
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchUsers}
            disabled={loading}
            className="h-9 gap-2 bg-transparent"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
            <span className="hidden sm:inline">Refresh</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-6 border-l-4">
            <AlertDescription className="font-medium">{error}</AlertDescription>
          </Alert>
        )}

        {loading && users.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">Loading users...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <div className="p-3 rounded-full bg-muted">
              <Users className="h-8 w-8 text-muted-foreground" />
            </div>
            <div className="text-center space-y-1">
              <p className="font-medium">No users registered yet</p>
              <p className="text-sm text-muted-foreground">Create your first employee account to get started</p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-start justify-between p-4 rounded-xl border border-border/50 bg-card hover:bg-accent/5 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 mt-0.5">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold text-base">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <p className="text-xs text-muted-foreground">
                      Joined{" "}
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
                    </span>
                    Active
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
