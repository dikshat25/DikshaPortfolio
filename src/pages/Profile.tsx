import { useNavigate } from "react-router-dom";
import { ArrowLeft, GraduationCap, Briefcase, Trophy, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlayerProvider } from "@/contexts/PlayerContext";

export default function Profile() {
  const navigate = useNavigate();

  return (
    <PlayerProvider>
      <div className="min-h-screen bg-background">
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

        {/* Hero */}
        <section className="py-12 px-6 text-center">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-black text-foreground mb-4">
              Full Profile
            </h1>
            <p className="text-xl text-muted-foreground">
              Diksha Thongire • CS @ VJTI • ML & Full-Stack Developer
            </p>
          </div>
        </section>

        {/* Content */}
        <div className="max-w-5xl mx-auto px-6 pb-12 space-y-8">
          {/* Education */}
          <Card className="p-8 bg-card border-border animate-slide-in">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Education</h2>
                <p className="text-muted-foreground">Academic background</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  B.Tech in Computer Science
                </h3>
                <p className="text-muted-foreground">
                  Veermata Jijabai Technological Institute (VJTI), Mumbai
                </p>
                <p className="text-sm text-primary">2022 – 2026 (Expected)</p>
              </div>
            </div>
          </Card>

          {/* Experience */}
          <Card className="p-8 bg-card border-border animate-slide-in" style={{ animationDelay: "100ms" }}>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-blue-400/10 flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Experience</h2>
                <p className="text-muted-foreground">Leadership & technical roles</p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Design Head</h3>
                <p className="text-muted-foreground">Community of Coders, VJTI</p>
                <p className="text-sm text-primary mb-2">Aug 2024 – Present</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Leading design initiatives for 10+ college events</li>
                  <li>Managing creative campaigns and branding</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Workshop Mentor</h3>
                <p className="text-muted-foreground">Xplore OpenCV Workshop 2</p>
                <p className="text-sm text-primary mb-2">Apr 2024</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Mentored 60+ students in computer vision concepts</li>
                  <li>Conducted debugging and problem-solving sessions</li>
                </ul>
              </div>
            </div>
          </Card>

          {/* Achievements */}
          <Card className="p-8 bg-card border-border animate-slide-in" style={{ animationDelay: "200ms" }}>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 rounded-lg bg-yellow-400/10 flex items-center justify-center">
                <Trophy className="h-6 w-6 text-yellow-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Achievements</h2>
                <p className="text-muted-foreground">Awards & recognitions</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground">3rd Place - Debugathon</h3>
                <p className="text-muted-foreground">Codeverse by Community of Coders</p>
                <p className="text-sm text-primary">2024</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Hackathon Organizer</h3>
                <p className="text-muted-foreground">WeHack & HackHazards (200+ participants)</p>
                <p className="text-sm text-primary">2024</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Open Source Contributor</h3>
                <p className="text-muted-foreground">Hacktoberfest 2024 (5+ repositories)</p>
                <p className="text-sm text-primary">2024</p>
              </div>
            </div>
          </Card>

          {/* CTA */}
          <div className="text-center pt-8 animate-fade-in">
            <Button size="lg" asChild>
              <a href="mailto:diksha.thongire257@gmail.com" className="gap-2">
                <Mail className="h-5 w-5" />
                Get in Touch
              </a>
            </Button>
          </div>
        </div>
      </div>
    </PlayerProvider>
  );
}
