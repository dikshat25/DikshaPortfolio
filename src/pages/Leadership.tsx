import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Users, Award, BookOpen, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlayerProvider, usePlayer } from "@/contexts/PlayerContext";
import { NowPlaying } from "@/components/NowPlaying";

const leadershipData = [
  {
    id: "coc-design",
    role: "Design Head",
    organization: "Community of Coders",
    location: "Mumbai",
    period: "Aug 2024 – Present",
    icon: Users,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    description: "Lead design and event initiatives, branding, and contests.",
    highlights: [
      "Designed branding for 10+ major college events",
      "Led creative strategy for hackathons with 200+ participants",
      "Increased event engagement by 40% through innovative campaigns",
      "Managed a team of 5 designers",
    ],
    audioUrl: "https://example.com/audio/coc-design.mp3",
  },
  {
    id: "opencv-mentor",
    role: "Workshop Support Mentor",
    organization: "Xplore OpenCV Workshop 2",
    location: "Mumbai",
    period: "Apr 2024",
    icon: BookOpen,
    color: "text-green-400",
    bgColor: "bg-green-400/10",
    description: "Mentored 60+ students, helped debug OpenCV code during 3-day workshop.",
    highlights: [
      "Guided 60+ students through complex OpenCV concepts",
      "Conducted live debugging sessions",
      "Created supplementary learning materials",
      "Received 4.8/5 average mentor rating",
    ],
    audioUrl: "https://example.com/audio/opencv-mentor.mp3",
  },
  {
    id: "webgenesis-mentor",
    role: "Web Development Mentor",
    organization: "COC WebGenesis Mentorship Program 2",
    location: "Mumbai",
    period: "Feb–Apr 2024",
    icon: Award,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    description: "Mentored 4 junior students in HTML/CSS. Led interactive sessions and project-based learning.",
    highlights: [
      "Mentored 4 students from beginner to intermediate level",
      "Conducted 12 interactive coding sessions",
      "Guided students through 3 portfolio projects",
      "All mentees successfully completed the program",
    ],
    audioUrl: "https://example.com/audio/webgenesis-mentor.mp3",
  },
];

function LeadershipContent() {
  const navigate = useNavigate();
  const { loadTrack } = usePlayer();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleCardClick = (item: typeof leadershipData[0]) => {
    setExpandedId(expandedId === item.id ? null : item.id);
    loadTrack(
      {
        id: item.id,
        title: item.role,
        artist: item.organization,
        type: "achievement",
        audioUrl: item.audioUrl,
      },
      true
    );
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="flex items-center h-16 px-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-black text-foreground mb-4">
            Leadership & Extracurriculars
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Building communities, mentoring future developers, and leading creative initiatives
          </p>
        </div>
      </section>

      {/* Leadership Cards */}
      <section className="px-6 pb-12">
        <div className="max-w-5xl mx-auto space-y-6">
          {leadershipData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                  expandedId === item.id ? item.bgColor : "bg-card"
                } border-border`}
                onClick={() => handleCardClick(item)}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex-shrink-0 w-14 h-14 rounded-lg ${item.bgColor} flex items-center justify-center ${item.color}`}
                  >
                    <item.icon className="h-7 w-7" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-1">
                          {item.role}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {item.organization} • {item.location}
                        </p>
                      </div>
                      <ChevronRight
                        className={`h-5 w-5 text-muted-foreground transition-transform ${
                          expandedId === item.id ? "rotate-90" : ""
                        }`}
                      />
                    </div>

                    <p className="text-sm text-primary font-medium mb-3">{item.period}</p>
                    <p className="text-foreground mb-4">{item.description}</p>

                    {expandedId === item.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-3 pt-4 border-t border-border"
                      >
                        <h4 className="font-semibold text-foreground">Key Highlights:</h4>
                        <ul className="space-y-2">
                          {item.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-primary text-lg mt-0.5">•</span>
                              <span className="text-muted-foreground">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <NowPlaying />
    </div>
  );
}

export default function Leadership() {
  return (
    <PlayerProvider>
      <LeadershipContent />
    </PlayerProvider>
  );
}
