import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Newspaper, Clock, FileText, Sparkles, Zap, Globe } from "lucide-react"

export default function HomePage() {
  const features = [
    {
      icon: Calendar,
      title: "Event Schedule",
      description: "View the complete event timeline and plan your participation",
      href: "/about",
    },
    {
      icon: Users,
      title: "Meet the Team",
      description: "Get to know the dedicated organizers behind ARAINS",
      href: "/team",
    },
    {
      icon: Newspaper,
      title: "News & Updates",
      description: "Stay informed with the latest announcements (SSG)",
      href: "/news",
    },
    {
      icon: Clock,
      title: "Live Server Time",
      description: "Real-time server rendering demonstration (SSR)",
      href: "/server-time",
    },
    {
      icon: FileText,
      title: "Event Posts",
      description: "Browse individual event details (Dynamic Routes)",
      href: "/posts/1",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        <section className="relative overflow-hidden py-24 md:py-32 animate-fade-in">
          {/* Enhanced gradient background effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6 shadow-lg backdrop-blur-sm animate-scale-in">
              <Sparkles className="w-4 h-4 text-primary animate-spin-slow" />
              <span className="text-sm text-primary font-medium">March 15-17, 2025</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance animate-slide-in">
              Welcome to <span className="text-primary bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">ARAINS 2025</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty animate-fade-in">
              Join us for an incredible celebration of technology, innovation, and community
            </p>
            <div className="flex flex-wrap justify-center gap-4 animate-fade-in">
              <Button asChild size="lg" className="gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Link href="/about">
                  <Zap className="w-4 h-4" />
                  Learn More
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="gap-2 bg-transparent border-2 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300 hover:scale-105">
                <Link href="/news">
                  <Globe className="w-4 h-4" />
                  View Updates
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore the Event</h2>
            <p className="text-muted-foreground text-center mb-4 max-w-xl mx-auto">
              Navigate through different sections to learn about Next.js routing, SSG, SSR, and dynamic pages
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Link 
                key={feature.title} 
                href={feature.href}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Card className="h-full hover:border-primary/50 transition-all duration-300 cursor-pointer group bg-card/50 backdrop-blur-sm hover:shadow-xl hover:scale-105 border-2">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <feature.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors duration-300">{feature.title}</CardTitle>
                    <CardDescription className="group-hover:text-foreground/80 transition-colors duration-300">{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Info Section */}
        <section className="py-16 animate-fade-in">
          <div className="container mx-auto px-4">
            <Card className="max-w-3xl mx-auto bg-card/50 backdrop-blur-sm border-2 border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                    <FileText className="w-4 h-4 text-primary" />
                  </div>
                  About This Project
                </CardTitle>
              </CardHeader>
              <div className="px-6 pb-6 space-y-4 text-muted-foreground">
                <p className="text-base">This ARAINS website demonstrates key Next.js concepts including:</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 group/item">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0 group-hover/item:scale-150 transition-transform duration-300" />
                    <span>
                      <strong className="text-foreground">Static Pages</strong> - Home, About, and Team pages with
                      shared navigation
                    </span>
                  </li>
                  <li className="flex items-start gap-3 group/item">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0 group-hover/item:scale-150 transition-transform duration-300" />
                    <span>
                      <strong className="text-foreground">Static Site Generation (SSG)</strong> - News page with
                      pre-rendered content
                    </span>
                  </li>
                  <li className="flex items-start gap-3 group/item">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0 group-hover/item:scale-150 transition-transform duration-300" />
                    <span>
                      <strong className="text-foreground">Server-Side Rendering (SSR)</strong> - Live server time page
                    </span>
                  </li>
                  <li className="flex items-start gap-3 group/item">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0 group-hover/item:scale-150 transition-transform duration-300" />
                    <span>
                      <strong className="text-foreground">Dynamic Routes</strong> - Individual post pages with URL
                      parameters
                    </span>
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-border bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 ARAINS. Built with Next.js</p>
        </div>
      </footer>
    </div>
  )
}
