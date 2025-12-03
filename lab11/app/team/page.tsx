import Navbar from "@/components/navbar"
import { Mail, Linkedin } from "lucide-react"

export const metadata = {
  title: "Team - PCC Event 2025",
  description: "Meet the organizing team behind PCC Tech Event 2025",
}

const teamMembers = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Event Director",
    department: "Computer Science",
    bio: "Leading the overall event planning and coordination with 3 years of experience.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Technical Lead",
    department: "Information Technology",
    bio: "Managing all technical aspects including website and infrastructure.",
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Marketing Head",
    department: "Business Administration",
    bio: "Handling promotions, social media, and sponsor relations.",
  },
  {
    id: 4,
    name: "James Wilson",
    role: "Workshop Coordinator",
    department: "Software Engineering",
    bio: "Organizing workshops and coordinating with guest speakers.",
  },
  {
    id: 5,
    name: "Priya Patel",
    role: "Design Lead",
    department: "Graphic Design",
    bio: "Creating visual identity and all design materials for the event.",
  },
  {
    id: 6,
    name: "David Kim",
    role: "Logistics Manager",
    department: "Management Studies",
    bio: "Handling venue setup, equipment, and day-to-day operations.",
  },
]

export default function Team() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen py-12 px-6 animate-fade-in">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Our Team</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Meet the dedicated individuals working behind the scenes to make PCC Tech Event 2025 a success
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-card/50 backdrop-blur-sm border-2 border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 group hover:shadow-xl hover:scale-105 animate-fade-in"
              >
                <div className="aspect-square relative bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-primary/20 border-2 border-primary/30 flex items-center justify-center text-4xl font-bold text-primary">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-1">{member.role}</p>
                  <p className="text-sm text-muted-foreground mb-3">{member.department}</p>
                  <p className="text-muted-foreground text-sm mb-4">{member.bio}</p>
                  <div className="flex gap-3">
                    <button 
                      className="p-2 bg-muted rounded-lg hover:bg-primary/20 hover:text-primary transition-all duration-300 hover:scale-110 hover:rotate-3"
                      aria-label={`Email ${member.name}`}
                      title={`Email ${member.name}`}
                    >
                      <Mail className="w-5 h-5" />
                    </button>
                    <button 
                      className="p-2 bg-muted rounded-lg hover:bg-primary/20 hover:text-primary transition-all duration-300 hover:scale-110 hover:rotate-3"
                      aria-label={`LinkedIn profile of ${member.name}`}
                      title={`LinkedIn profile of ${member.name}`}
                    >
                      <Linkedin className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Join the Team CTA */}
          <div className="mt-16 bg-gradient-to-r from-primary/20 to-primary/10 border-2 border-primary/20 rounded-xl p-8 text-center hover:border-primary/40 transition-all duration-300 hover:shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Want to Join Our Team?</h2>
            <p className="mb-6 text-muted-foreground">
              We're always looking for passionate volunteers to help organize future events.
            </p>
            <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
              Apply as Volunteer
            </button>
          </div>
        </div>
      </main>
    </>
  )
}
