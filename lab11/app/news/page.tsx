import Navbar from "@/components/navbar"
import Link from "next/link"
import { Calendar, ArrowRight, Rss } from "lucide-react"

export const metadata = {
  title: "News & Announcements - ARAINS 2025",
  description: "Latest news and announcements for ARAINS 2025",
}

// SSG - This data is fetched at build time (simulating getStaticProps behavior)
async function getNews() {
  const news = [
    {
      id: 1,
      title: "Registration Now Open for ARAINS 2025",
      date: "2025-01-15",
      category: "Announcement",
      excerpt: "Early bird registration is now open! Get 20% off when you register before February 1st.",
    },
    {
      id: 2,
      title: "Keynote Speaker Announced: Dr. Maria Santos",
      date: "2025-01-20",
      category: "Speaker",
      excerpt: "Renowned AI researcher Dr. Maria Santos will deliver the opening keynote on the future of AI.",
    },
    {
      id: 3,
      title: "New Workshop: Building with Next.js",
      date: "2025-01-25",
      category: "Workshop",
      excerpt: "Learn to build modern web applications with Next.js in this hands-on 3-hour workshop.",
    },
    {
      id: 4,
      title: "Hackathon Theme Revealed: Sustainable Tech",
      date: "2025-02-01",
      category: "Hackathon",
      excerpt: "This year's hackathon will focus on creating technology solutions for sustainability.",
    },
    {
      id: 5,
      title: "Partnership with TechCorp Announced",
      date: "2025-02-05",
      category: "Partnership",
      excerpt: "TechCorp joins as our platinum sponsor, offering internship opportunities to participants.",
    },
  ]

  return { news, generatedAt: new Date().toISOString() }
}

export default async function News() {
  const { news, generatedAt } = await getNews()

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-12 px-6 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">News & Announcements</h1>
            <p className="text-xl text-muted-foreground mb-4">
              Stay updated with the latest news about ARAINS 2025
            </p>
            <div className="inline-flex items-center gap-2 bg-primary/10 border-2 border-primary/20 px-4 py-2 rounded-lg text-sm text-primary shadow-md backdrop-blur-sm">
              <Rss className="w-4 h-4" />
              This page demonstrates Static Site Generation (SSG)
            </div>
          </div>

          {/* News List */}
          <div className="space-y-6">
            {news.map((item) => (
              <article
                key={item.id}
                className="bg-card/50 backdrop-blur-sm border-2 border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] animate-fade-in"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-sm font-medium">
                    {item.category}
                  </span>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm">
                    <Calendar className="w-4 h-4" />
                    {new Date(item.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
                <h2 className="text-xl font-bold mb-2">{item.title}</h2>
                <p className="text-muted-foreground mb-4">{item.excerpt}</p>
                <Link
                  href={`/posts/${item.id}`}
                  className="inline-flex items-center gap-2 text-primary font-medium hover:underline group/link transition-all duration-200"
                >
                  Read More <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-200" />
                </Link>
              </article>
            ))}
          </div>

          {/* SSG Info Box */}
          <div className="mt-12 bg-card/50 backdrop-blur-sm border-2 border-border rounded-xl p-6 hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
            <h3 className="font-bold mb-2">How SSG Works (App Router equivalent)</h3>
            <p className="text-muted-foreground text-sm mb-2">
              In App Router, static generation happens by default for Server Components. The data is fetched at build
              time and the HTML is pre-rendered, similar to{" "}
              <code className="bg-muted px-2 py-1 rounded text-primary">getStaticProps</code> in Pages Router.
            </p>
            <p className="text-xs text-muted-foreground">Page generated at: {new Date(generatedAt).toLocaleString()}</p>
          </div>
        </div>
      </main>
    </>
  )
}
