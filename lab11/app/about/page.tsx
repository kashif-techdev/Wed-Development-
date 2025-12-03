import Navbar from "@/components/navbar"
import { Target, Lightbulb, Award, Heart } from "lucide-react"

export const metadata = {
  title: "About - PCC Event 2025",
  description: "Learn about the PCC Annual Tech Event",
}

export default function About() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen py-12 px-6 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">About the Event</h1>
            <p className="text-xl text-muted-foreground">Discover what makes PCC Tech Event 2025 special</p>
          </div>

          <div className="bg-card/50 backdrop-blur-sm border-2 border-border rounded-xl p-8 mb-12 hover:border-primary/30 transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              The PCC Tech Event started in 2018 as a small gathering of technology enthusiasts. Over the years, it has
              grown into one of the most anticipated annual events in our college, bringing together students, faculty,
              and industry professionals.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              This year, we are celebrating our 7th edition with an expanded program featuring workshops, hackathons,
              guest lectures, and networking opportunities. Our theme for 2025 is "Innovation for Tomorrow" – focusing
              on emerging technologies that will shape our future.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Whether you're a beginner looking to learn new skills or an experienced developer wanting to share your
              knowledge, PCC Tech Event has something for everyone.
            </p>
          </div>

          {/* Values */}
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-card/50 backdrop-blur-sm border-2 border-border p-6 rounded-xl hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:scale-105 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Mission</h3>
              <p className="text-muted-foreground">
                To foster a community of learners and innovators who push the boundaries of technology.
              </p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border-2 border-border p-6 rounded-xl hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:scale-105 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Innovation</h3>
              <p className="text-muted-foreground">
                Encouraging creative thinking and practical problem-solving through hands-on experiences.
              </p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border-2 border-border p-6 rounded-xl hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:scale-105 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Excellence</h3>
              <p className="text-muted-foreground">
                Striving for the highest quality in all our sessions, workshops, and events.
              </p>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border-2 border-border p-6 rounded-xl hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:scale-105 group">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Community</h3>
              <p className="text-muted-foreground">
                Building lasting connections between students, mentors, and industry experts.
              </p>
            </div>
          </div>

          {/* Event Schedule Overview */}
          <div className="bg-card/50 backdrop-blur-sm border-2 border-border rounded-xl p-8 hover:border-primary/30 transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-bold mb-6">Event Schedule Overview</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4 pb-4 border-b border-border hover:bg-muted/30 transition-colors duration-200 p-2 rounded-lg -m-2">
                <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold shadow-md">Day 1</div>
                <div>
                  <h3 className="font-semibold">Opening Ceremony & Keynotes</h3>
                  <p className="text-muted-foreground">March 15, 2025 - 9:00 AM to 6:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-4 pb-4 border-b border-border hover:bg-muted/30 transition-colors duration-200 p-2 rounded-lg -m-2">
                <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold shadow-md">Day 2</div>
                <div>
                  <h3 className="font-semibold">Workshops & Hackathon</h3>
                  <p className="text-muted-foreground">March 16, 2025 - 9:00 AM to 8:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-4 hover:bg-muted/30 transition-colors duration-200 p-2 rounded-lg -m-2">
                <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold shadow-md">Day 3</div>
                <div>
                  <h3 className="font-semibold">Presentations & Closing</h3>
                  <p className="text-muted-foreground">March 17, 2025 - 9:00 AM to 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
