import { RegisterForm } from "@/components/register-form"
import { LoginForm } from "@/components/login-form"
import { UsersList } from "@/components/users-list"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
      <div className="relative">
        <div className="container mx-auto px-4 py-12 lg:py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Authentication System
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-3 text-balance">
                Employee Management Portal
              </h1>
              <p className="text-muted-foreground text-lg text-balance max-w-2xl mx-auto">
                Secure authentication and user management for your organization
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2 mb-8">
              <RegisterForm />
              <LoginForm />
            </div>

            <UsersList />
          </div>
        </div>
      </div>
    </div>
  )
}
