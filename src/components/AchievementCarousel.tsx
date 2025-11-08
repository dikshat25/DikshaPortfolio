import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Keyboard, Mousewheel } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Medal, Award, Star, X, ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePlayer } from "@/contexts/PlayerContext";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/effect-cards";

const achievements = [
  {
    id: "debugathon",
    icon: Trophy,
    title: "3rd Place - Debugathon",
    shortDescription: "Led team in JavaScript debugging competition",
    description: "Led a 2-member team in a JavaScript debugging competition during Codeverse by Community of Coders",
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
    spotifyPlaylistId: "37i9dQZF1DX4sWSpwq3LiO", // Motivation playlist
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
    icon: Medal,
    title: "Hackathon Leader",
    shortDescription: "Organized major hackathons with 200+ participants",
    description: "Led WeHack (24-hour) and HackHazards (7-day) hackathons on Devfolio, handling ideation and backend coordination",
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    spotifyPlaylistId: "37i9dQZF1DX0XUfTFmNBRM", // Tech/Focus playlist
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
    icon: Award,
    title: "Open Source Contributor",
    shortDescription: "Contributed to 5+ repositories in Hacktoberfest",
    description: "Contributed to 5+ GitHub repositories under Hacktoberfest 2024, demonstrating active participation in open-source",
    color: "text-green-400",
    bgColor: "bg-green-400/10",
    spotifyPlaylistId: "37i9dQZF1DWWQRwui0ExPn", // Coding/Lo-fi playlist
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
    icon: Star,
    title: "Design Head",
    shortDescription: "Leading creative strategy for college events",
    description: "Leading creative strategy for Community of Coders and Debates & Literary Arts Club, overseeing 10+ college events",
    color: "text-pink-400",
    bgColor: "bg-pink-400/10",
    spotifyPlaylistId: "37i9dQZF1DX4JAvHpjipBk", // Creative/Chill playlist
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

export function AchievementCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const { loadTrack, isPlaying } = usePlayer();

  const activeAchievement = achievements[activeIndex];

  useEffect(() => {
    // Auto-play when achievement changes
    if (activeAchievement) {
      loadTrack({
        id: activeAchievement.id,
        title: activeAchievement.title,
        artist: "Diksha Thongire",
        type: "achievement",
        audioUrl: `https://example.com/audio/achievement-${activeAchievement.id}.mp3`,
      }, true); // auto-play enabled
    }
  }, [activeIndex, activeAchievement, loadTrack]);

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
  };

  const handleNext = () => {
    swiperInstance?.slideNext();
  };

  const handlePrev = () => {
    swiperInstance?.slidePrev();
  };

  return (
    <section id="achievements" className="py-12 px-6 bg-gradient-to-b from-background to-spotify-card/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 animate-fade-in text-center">
          <h2 className="text-4xl font-bold text-foreground mb-2">
            Top Tracks
          </h2>
          <p className="text-muted-foreground">
            Swipe through achievements — each plays its own vibe
          </p>
        </div>

        {/* Main Carousel */}
        <div className="relative max-w-4xl mx-auto mb-12">
          <Swiper
            effect="cards"
            grabCursor={true}
            modules={[EffectCards, Keyboard, Mousewheel]}
            keyboard={{ enabled: true }}
            mousewheel={{ forceToAxis: true }}
            className="achievement-swiper"
            onSwiper={setSwiperInstance}
            onSlideChange={handleSlideChange}
            cardsEffect={{
              perSlideOffset: 8,
              perSlideRotate: 2,
              rotate: true,
              slideShadows: false,
            }}
          >
            {achievements.map((achievement) => (
              <SwiperSlide key={achievement.id}>
                <Card
                  className={`${achievement.bgColor} border-0 overflow-hidden cursor-grab active:cursor-grabbing`}
                  style={{ height: "500px" }}
                >
                  <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className={`mb-8 ${achievement.color}`}
                    >
                      <achievement.icon className="h-32 w-32 mx-auto" />
                    </motion.div>

                    <h3 className="text-3xl font-bold text-foreground mb-4">
                      {achievement.title}
                    </h3>
                    
                    <p className="text-lg text-muted-foreground mb-6 max-w-md">
                      {achievement.shortDescription}
                    </p>

                    <div className="flex gap-3 mt-4">
                      <Button
                        onClick={() => setExpandedId(achievement.id)}
                        className="gap-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Read Full Story
                      </Button>
                    </div>

                    {/* Mini Metrics */}
                    <div className="flex gap-6 mt-8">
                      {Object.entries(achievement.metrics).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-2xl font-bold text-primary">{value}</div>
                          <div className="text-xs text-muted-foreground uppercase">
                            {key}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/80 backdrop-blur-sm"
            onClick={handlePrev}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/80 backdrop-blur-sm"
            onClick={handleNext}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center gap-2 mb-8">
          {achievements.map((achievement, index) => (
            <button
              key={achievement.id}
              onClick={() => swiperInstance?.slideTo(index)}
              className={`transition-all duration-300 rounded-full ${
                activeIndex === index
                  ? "w-8 h-2 bg-primary"
                  : "w-2 h-2 bg-muted hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>

        {/* Spotify Player */}
        {activeAchievement && (
          <motion.div
            key={activeAchievement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <Card className="p-6 bg-card border-border">
              <h4 className="font-semibold mb-4 text-foreground text-center">
                🎵 Now Playing: {activeAchievement.title}
              </h4>
              <iframe
                style={{ borderRadius: '12px' }}
                src={`https://open.spotify.com/embed/playlist/${activeAchievement.spotifyPlaylistId}?utm_source=generator&theme=0`}
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
            </Card>
          </motion.div>
        )}
      </div>

      {/* Expanded Modal */}
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
              className="bg-card rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto"
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
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>

                    <h2 className="text-3xl font-bold text-foreground mb-4">
                      {achievement.title}
                    </h2>
                    
                    <p className="text-muted-foreground mb-6">
                      {achievement.description}
                    </p>

                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold text-lg text-foreground mb-3">
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
                        <h3 className="font-semibold text-lg text-foreground mb-3">
                          Impact
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {achievement.impact}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-3 pt-4">
                        {achievement.links.map((link, idx) => (
                          <Button key={idx} variant="outline" asChild>
                            <a href={link.url} target="_blank" rel="noopener noreferrer" className="gap-2">
                              <ExternalLink className="h-4 w-4" />
                              {link.title}
                            </a>
                          </Button>
                        ))}
                      </div>
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
