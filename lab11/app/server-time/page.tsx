import Navbar from "@/components/navbar"
import { Clock, RefreshCw, Server, Zap } from "lucide-react"

export const metadata = {
  title: "Live Server Time - ARAINS 2025",
  description: "Real-time server clock for ARAINS using Server-Side Rendering",
}

// Force dynamic rendering (SSR) - equivalent to getServerSideProps
export const dynamic = "force-dynamic"

export default async function ServerTime() {
  const now = new Date()
  const serverTime = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  })
  const serverDate = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const timestamp = now.getTime()

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-12 px-6 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Live Event Timing</h1>
            <p className="text-xl text-muted-foreground mb-4">Real-time server clock for event synchronization</p>
            <div className="inline-flex items-center gap-2 bg-primary/10 border-2 border-primary/20 px-4 py-2 rounded-lg text-sm text-primary shadow-md backdrop-blur-sm">
              <Zap className="w-4 h-4" />
              This page uses Server-Side Rendering (SSR)
            </div>
          </div>

          {/* Main Time Display */}
          <div className="bg-card/50 backdrop-blur-sm border-2 border-border rounded-xl p-8 mb-8 hover:border-primary/30 transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <div className="text-center">
                <p className="text-5xl md:text-6xl font-bold font-mono text-primary">{serverTime}</p>
                <p className="text-xl text-muted-foreground mt-2">{serverDate}</p>
              </div>
            </div>

            <div className="flex justify-center">
              <a
                href="/server-time"
                className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <RefreshCw className="w-5 h-5" />
                Refresh Time
              </a>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card/50 backdrop-blur-sm border-2 border-border rounded-xl p-6 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Server className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-lg">Server Information</h3>
              </div>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-muted-foreground">Timezone:</span> {timezone}
                </p>
                <p>
                  <span className="text-muted-foreground">Timestamp:</span> {timestamp}
                </p>
              </div>
            </div>

            <div className="bg-card/50 backdrop-blur-sm border-2 border-border rounded-xl p-6 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <RefreshCw className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-lg">How SSR Works</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Every time you refresh this page, the server generates a new HTML response with the current time. This
                ensures data is always fresh.
              </p>
            </div>
          </div>

          {/* Event Sessions */}
          <div className="bg-card/50 backdrop-blur-sm border-2 border-border rounded-xl p-8 hover:border-primary/30 transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-center">Event Sessions Today</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/50 border border-border rounded-lg hover:bg-muted/70 transition-all duration-200 hover:scale-[1.02]">
                <div>
                  <p className="font-semibold">Opening Ceremony</p>
                  <p className="text-sm text-muted-foreground">Main Auditorium</p>
                </div>
                <span className="text-primary font-mono font-semibold">09:00 AM</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-muted/50 border border-border rounded-lg hover:bg-muted/70 transition-all duration-200 hover:scale-[1.02]">
                <div>
                  <p className="font-semibold">Keynote: Future of Web Development</p>
                  <p className="text-sm text-muted-foreground">Hall A</p>
                </div>
                <span className="text-primary font-mono font-semibold">10:30 AM</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-muted/50 border border-border rounded-lg hover:bg-muted/70 transition-all duration-200 hover:scale-[1.02]">
                <div>
                  <p className="font-semibold">Workshop: Building with Next.js</p>
                  <p className="text-sm text-muted-foreground">Lab 101</p>
                </div>
                <span className="text-primary font-mono font-semibold">02:00 PM</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-muted/50 border border-border rounded-lg hover:bg-muted/70 transition-all duration-200 hover:scale-[1.02]">
                <div>
                  <p className="font-semibold">Networking Session</p>
                  <p className="text-sm text-muted-foreground">Cafeteria</p>
                </div>
                <span className="text-primary font-mono font-semibold">05:00 PM</span>
              </div>
            </div>
          </div>

          {/* SSR Info Box */}
          <div className="mt-8 bg-primary/10 border-2 border-primary/20 rounded-xl p-6 hover:border-primary/40 transition-all duration-300 hover:shadow-lg">
            <h3 className="font-bold mb-2">Server-Side Rendering Benefits</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-center gap-2">
                <span className="text-primary">&#10003;</span> Fresh data on every request
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">&#10003;</span> SEO-friendly pre-rendered HTML
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">&#10003;</span> Real-time information without client-side fetching
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">&#10003;</span> Secure - server-only data never exposed to client
              </li>
            </ul>
          </div>
        </div>
      </main>
    </>
  )
}
