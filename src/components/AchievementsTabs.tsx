import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Medal, Award, Star, X, ExternalLink, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { usePlayer } from "@/contexts/PlayerContext";

interface Achievement {
  id: string;
  category: "hackathon" | "debugathon" | "design" | "opensource";
  icon: any;
  title: string;
  shortDescription: string;
  description: string;
  color: string;
  bgColor: string;
  highlights: string[];
  impact: string;
  metrics: Record<string, string>;
  links: { title: string; url: string }[];
}

const achievements: Achievement[] = [
  {
    id: "debugathon",
    category: "debugathon",
    icon: Trophy,
    title: "3rd Place - Debugathon",
    shortDescription: "Led team in JavaScript debugging competition",
    description: "Led a 2-member team in a JavaScript debugging competition during Codeverse by Community of Coders",
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
    highlights: [
      "Solved 12 complex debugging challenges in 3 hours",
      "Competed against 50+ teams from various colleges",
      "Demonstrated expertise in JavaScript, React, and Node.js"
    ],
    impact: "This achievement showcased my ability to work under pressure, debug complex codebases efficiently, and collaborate effectively in a team setting.",
    metrics: { teams: "50+", duration: "3 hours", challenges: "12" },
    links: [
      { title: "Competition Details", url: "#" },
      { title: "Certificate", url: "#" }
    ]
  },
  {
    id: "hackathon",
    category: "hackathon",
    icon: Medal,
    title: "Hackathon Leader",
    shortDescription: "Organized major hackathons with 200+ participants",
    description: "Led WeHack (24-hour) and HackHazards (7-day) hackathons on Devfolio, handling ideation and backend coordination",
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    highlights: [
      "Organized 2 major hackathons with 200+ participants",
      "Managed team coordination and technical infrastructure",
      "Secured sponsorships worth ₹50,000+"
    ],
    impact: "Gained valuable experience in project management, team leadership, and event organization while fostering innovation in the college tech community.",
    metrics: { participants: "200+", events: "2", sponsorship: "₹50K+" },
    links: [
      { title: "Event Page", url: "#" },
      { title: "Gallery", url: "#" }
    ]
  },
  {
    id: "opensource",
    category: "opensource",
    icon: Award,
    title: "Open Source Contributor",
    shortDescription: "Contributed to 5+ repositories in Hacktoberfest",
    description: "Contributed to 5+ GitHub repositories under Hacktoberfest 2024, demonstrating active participation in open-source",
    color: "text-green-400",
    bgColor: "bg-green-400/10",
    highlights: [
      "Made 10+ meaningful pull requests across various projects",
      "Fixed bugs and added features in Python, React, and Flutter",
      "Collaborated with developers from around the world"
    ],
    impact: "Enhanced my coding skills, learned best practices from experienced developers, and contributed to projects used by thousands of users globally.",
    metrics: { pullRequests: "10+", repos: "5+", languages: "3" },
    links: [
      { title: "GitHub Profile", url: "https://github.com/dikshat25" },
      { title: "Contributions", url: "#" }
    ]
  },
  {
    id: "design",
    category: "design",
    icon: Star,
    title: "Design Head",
    shortDescription: "Leading creative strategy for college events",
    description: "Leading creative strategy for Community of Coders and Debates & Literary Arts Club, overseeing 10+ college events",
    color: "text-pink-400",
    bgColor: "bg-pink-400/10",
    highlights: [
      "Designed branding for 10+ major college events",
      "Led a team of 5 designers creating promotional material",
      "Increased event engagement by 40% through creative campaigns"
    ],
    impact: "Developed strong design and leadership skills while creating visually appealing content that effectively communicates messages and drives participation.",
    metrics: { events: "10+", team: "5", engagement: "+40%" },
    links: [
      { title: "Portfolio", url: "#" },
      { title: "Design Work", url: "#" }
    ]
  },
];

const categoryLabels = {
  hackathon: "Hackathon",
  debugathon: "Debugathon",
  design: "Design Head",
  opensource: "Hacktober"
};

export function AchievementsTabs() {
  const [selectedCategory, setSelectedCategory] = useState<string>("hackathon");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { loadTrack } = usePlayer();

  const filteredAchievements = achievements.filter(
    (a) => a.category === selectedCategory
  );

  const handleCardClick = (achievement: Achievement) => {
    setExpandedId(achievement.id);
    loadTrack({
      id: achievement.id,
      title: achievement.title,
      artist: "Diksha Thongire",
      type: "achievement",
      audioUrl: `https://example.com/audio/achievement-${achievement.id}.mp3`,
    }, true);
  };

  return (
    <section id="achievements" className="py-16 px-6 bg-gradient-to-b from-background to-card/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <h2 className="text-4xl font-bold text-foreground mb-3">
            Album of Wins
          </h2>
          <p className="text-muted-foreground text-lg">
            Select a category to explore my achievements
          </p>
        </motion.div>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-10 bg-card h-auto p-1">
            {Object.entries(categoryLabels).map(([key, label]) => (
              <TabsTrigger
                key={key}
                value={key}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-3 text-sm md:text-base"
              >
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.keys(categoryLabels).map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {achievements
                  .filter((a) => a.category === category)
                  .map((achievement, index) => (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                    >
                      <Card
                        onClick={() => handleCardClick(achievement)}
                        className={`${achievement.bgColor} border-0 cursor-pointer group hover:scale-105 transition-all duration-300 overflow-hidden h-full`}
                      >
                        <div className="p-6 flex flex-col h-full">
                          <div className={`${achievement.color} mb-4`}>
                            <achievement.icon className="h-12 w-12" />
                          </div>
                          
                          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                            {achievement.title}
                          </h3>
                          
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                            {achievement.shortDescription}
                          </p>

                          <div className="mt-auto flex items-center gap-2 text-primary text-sm font-semibold">
                            View Details
                            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </div>

                          <div className="flex gap-4 mt-4 pt-4 border-t border-border/50">
                            {Object.entries(achievement.metrics).slice(0, 2).map(([key, value]) => (
                              <div key={key} className="text-center">
                                <div className="text-lg font-bold text-primary">{value}</div>
                                <div className="text-xs text-muted-foreground uppercase">{key}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {expandedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setExpandedId(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-border shadow-2xl"
            >
              {achievements
                .filter((a) => a.id === expandedId)
                .map((achievement) => (
                  <div key={achievement.id} className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className={`${achievement.color}`}>
                        <achievement.icon className="h-16 w-16" />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setExpandedId(null)}
                        className="hover:bg-destructive/20"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>

                    <h2 className="text-3xl font-bold text-foreground mb-4">
                      {achievement.title}
                    </h2>
                    
                    <p className="text-muted-foreground mb-6 text-lg">
                      {achievement.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h3 className="font-semibold text-lg text-foreground mb-3 flex items-center gap-2">
                          <span className="w-1 h-6 bg-primary rounded-full"></span>
                          Key Highlights
                        </h3>
                        <ul className="space-y-2">
                          {achievement.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span className="text-primary text-xl mt-1">•</span>
                              <span className="text-muted-foreground">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold text-lg text-foreground mb-3 flex items-center gap-2">
                          <span className="w-1 h-6 bg-primary rounded-full"></span>
                          Impact
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {achievement.impact}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
                      {achievement.links.map((link, idx) => (
                        <Button key={idx} variant="outline" asChild className="hover:bg-primary hover:text-primary-foreground transition-all">
                          <a href={link.url} target="_blank" rel="noopener noreferrer" className="gap-2">
                            <ExternalLink className="h-4 w-4" />
                            {link.title}
                          </a>
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
