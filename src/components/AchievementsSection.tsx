import { useState } from "react";
import { Trophy, Medal, Award, Star, Play, ExternalLink, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const achievements = [
  {
    icon: Trophy,
    title: "3rd Place - Debugathon",
    description:
      "Led a 2-member team in a JavaScript debugging competition during Codeverse by Community of Coders",
    color: "text-yellow-400",
    highlights: [
      "Solved 12 complex debugging challenges in 3 hours",
      "Competed against 50+ teams from various colleges",
      "Demonstrated expertise in JavaScript, React, and Node.js"
    ],
    impact: "This achievement showcased my ability to work under pressure, debug complex codebases efficiently, and collaborate effectively in a team setting."
  },
  {
    icon: Medal,
    title: "Hackathon Leader",
    description:
      "Led WeHack (24-hour) and HackHazards (7-day) hackathons on Devfolio, handling ideation and backend coordination",
    color: "text-blue-400",
    highlights: [
      "Organized 2 major hackathons with 200+ participants",
      "Managed team coordination and technical infrastructure",
      "Secured sponsorships worth ₹50,000+"
    ],
    impact: "Gained valuable experience in project management, team leadership, and event organization while fostering innovation in the college tech community."
  },
  {
    icon: Award,
    title: "Open Source Contributor",
    description:
      "Contributed to 5+ GitHub repositories under Hacktoberfest 2024, demonstrating active participation in open-source",
    color: "text-green-400",
    highlights: [
      "Made 10+ meaningful pull requests across various projects",
      "Fixed bugs and added features in Python, React, and Flutter",
      "Collaborated with developers from around the world"
    ],
    impact: "Enhanced my coding skills, learned best practices from experienced developers, and contributed to projects used by thousands of users globally."
  },
  {
    icon: Star,
    title: "Design Head",
    description:
      "Leading creative strategy for Community of Coders and Debates & Literary Arts Club, overseeing 10+ college events",
    color: "text-pink-400",
    highlights: [
      "Designed branding for 10+ major college events",
      "Led a team of 5 designers creating promotional material",
      "Increased event engagement by 40% through creative campaigns"
    ],
    impact: "Developed strong design and leadership skills while creating visually appealing content that effectively communicates messages and drives participation."
  },
];

export function AchievementsSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section id="achievements" className="py-12 px-6 bg-spotify-card/30">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 animate-fade-in text-center">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Top Tracks
          </h2>
          <p className="text-muted-foreground">
            Click to play each achievement track
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement, index) => (
            <Card
              key={achievement.title}
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              className={`cursor-pointer transition-all duration-500 border-0 group overflow-hidden ${
                expandedIndex === index
                  ? "md:col-span-2 bg-primary/10"
                  : "bg-card hover:bg-spotify-hover"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-6">
                {/* Compact View */}
                <div className="flex gap-4 items-start">
                  <div
                    className={`flex-shrink-0 w-16 h-16 rounded-lg bg-secondary flex items-center justify-center transition-all duration-300 ${
                      expandedIndex === index ? "scale-125" : "group-hover:scale-110"
                    } ${achievement.color}`}
                  >
                    <achievement.icon className="h-8 w-8" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className={`font-bold transition-all ${
                        expandedIndex === index ? "text-2xl" : "text-lg"
                      } text-foreground`}>
                        {achievement.title}
                      </h3>
                      {expandedIndex !== index && (
                        <Play className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>
                    <p className={`text-sm text-muted-foreground transition-all ${
                      expandedIndex === index ? "line-clamp-none" : "line-clamp-2"
                    }`}>
                      {achievement.description}
                    </p>
                  </div>
                </div>

                {/* Expanded View */}
                {expandedIndex === index && (
                  <div className="mt-6 pt-6 border-t border-border animate-fade-in space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Key Highlights</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          {achievement.highlights?.map((highlight, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span>{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Impact</h4>
                        <p className="text-sm text-muted-foreground">
                          {achievement.impact}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-3 mt-4">
                      <Button size="sm" variant="outline" className="gap-2">
                        <ExternalLink className="h-3 w-3" />
                        Learn More
                      </Button>
                      <Button size="sm" variant="ghost" className="gap-2">
                        <Heart className="h-3 w-3" />
                        Save
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
