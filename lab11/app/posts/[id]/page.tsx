import Navbar from "@/components/navbar"
import Link from "next/link"
import { ArrowLeft, Calendar, User, Tag, Link2 } from "lucide-react"

export const metadata = {
  title: "Event Details - ARAINS 2025",
  description: "View individual ARAINS event details",
}

// Mock data for events/posts
const eventsData: Record<
  string,
  { title: string; date: string; author: string; category: string; content: string; details: string[] }
> = {
  "1": {
    title: "Opening Ceremony & Welcome Address",
    date: "March 15, 2025",
    author: "Event Committee",
    category: "Ceremony",
    content:
      "Join us for the grand opening of ARAINS 2025! The ceremony will feature welcome addresses from college leadership, introduction of guest speakers, and an overview of the exciting three days ahead.",
    details: [
      "Venue: Main Auditorium",
      "Time: 9:00 AM - 10:00 AM",
      "Dress Code: Smart Casual",
      "Open to all registered participants",
    ],
  },
  "2": {
    title: "Keynote: The Future of AI in Education",
    date: "March 15, 2025",
    author: "Dr. Maria Santos",
    category: "Keynote",
    content:
      "Renowned AI researcher Dr. Maria Santos will share insights on how artificial intelligence is transforming education. Learn about the latest developments and what the future holds for students and educators alike.",
    details: ["Venue: Hall A", "Time: 10:30 AM - 12:00 PM", "Q&A session included", "Live streaming available"],
  },
  "3": {
    title: "Workshop: Building Modern Web Apps with Next.js",
    date: "March 16, 2025",
    author: "Michael Chen",
    category: "Workshop",
    content:
      "Get hands-on experience building modern web applications with Next.js in this comprehensive 3-hour workshop. You'll learn about routing, data fetching, SSR, SSG, and deployment.",
    details: [
      "Venue: Computer Lab 101",
      "Time: 2:00 PM - 5:00 PM",
      "Prerequisite: Basic React knowledge",
      "Bring your laptop with Node.js installed",
    ],
  },
  "4": {
    title: "Hackathon: Sustainable Tech Solutions",
    date: "March 16-17, 2025",
    author: "Hackathon Committee",
    category: "Hackathon",
    content:
      "Put your skills to the test in our 24-hour hackathon! This year's theme focuses on creating technology solutions for sustainability challenges. Form teams of 3-5 and compete for exciting prizes.",
    details: ["Venue: Innovation Hub", "Start: March 16, 6:00 PM", "End: March 17, 6:00 PM", "Prizes worth $5000"],
  },
  "5": {
    title: "Closing Ceremony & Awards",
    date: "March 17, 2025",
    author: "Event Committee",
    category: "Ceremony",
    content:
      "Celebrate the conclusion of ARAINS 2025 with our closing ceremony. Awards will be presented to hackathon winners, best workshop participants, and outstanding volunteers.",
    details: ["Venue: Main Auditorium", "Time: 4:00 PM - 5:30 PM", "Certificate distribution", "Refreshments provided"],
  },
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function PostDetail({ params }: PageProps) {
  const { id } = await params
  const event = eventsData[id]

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-12 px-6 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          {/* Back Navigation */}
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-all duration-200 hover:gap-3 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to News
          </Link>

          <div className="bg-primary/10 border-2 border-primary/20 rounded-lg px-4 py-3 mb-8 flex items-center gap-2 shadow-md backdrop-blur-sm">
            <Link2 className="w-4 h-4 text-primary" />
            <p className="text-sm">
              <strong>Dynamic Route:</strong> This page uses{" "}
              <code className="bg-muted px-2 py-1 rounded text-primary">[id]/page.tsx</code> to display content based on
              the URL parameter. Current ID: <strong className="text-primary">{id}</strong>
            </p>
          </div>

          {event ? (
            <>
              {/* Event Header */}
              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {event.category}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{event.title}</h1>
                <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    {event.author}
                  </div>
                </div>
              </div>

              {/* Event Content */}
              <div className="bg-card/50 backdrop-blur-sm border-2 border-border rounded-xl p-8 mb-8 hover:border-primary/30 transition-all duration-300 hover:shadow-xl">
                <p className="text-lg leading-relaxed text-muted-foreground">{event.content}</p>
              </div>

              {/* Event Details */}
              <div className="bg-muted/50 border-2 border-border rounded-xl p-8 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                <h2 className="text-xl font-bold mb-4">Event Details</h2>
                <ul className="space-y-3">
                  {event.details.map((detail, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Tag className="w-4 h-4 text-primary" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            /* Event Not Found */
            <div className="bg-card/50 backdrop-blur-sm border-2 border-border rounded-xl p-8 text-center hover:border-primary/30 transition-all duration-300 hover:shadow-xl">
              <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
              <p className="text-muted-foreground mb-4">
                The event with ID <strong className="text-primary">{id}</strong> could not be found.
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                This demonstrates how dynamic routes work - any ID can be passed through the URL!
              </p>
              <div className="bg-muted/50 border border-border rounded-lg p-4 text-left">
                <p className="text-sm font-medium mb-2">Try these valid event IDs:</p>
                <div className="flex flex-wrap gap-2">
                  {["1", "2", "3", "4", "5"].map((validId) => (
                    <Link
                      key={validId}
                      href={`/posts/${validId}`}
                      className="bg-primary text-primary-foreground px-3 py-1 rounded-lg text-sm hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105"
                    >
                      Event {validId}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation to Other Events */}
          <div className="mt-12">
            <h3 className="text-xl font-bold mb-4">Other Events</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(eventsData)
                .filter(([eventId]) => eventId !== id)
                .slice(0, 4)
                .map(([eventId, eventInfo]) => (
                  <Link
                    key={eventId}
                    href={`/posts/${eventId}`}
                    className="bg-card/50 backdrop-blur-sm p-4 rounded-lg border-2 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:scale-105"
                  >
                    <p className="font-semibold">{eventInfo.title}</p>
                    <p className="text-sm text-muted-foreground">{eventInfo.date}</p>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
