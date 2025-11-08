import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { HeroSection } from "@/components/HeroSection";
import { ProjectCard } from "@/components/ProjectCard";
import { SkillsSection } from "@/components/SkillsSection";
import { AchievementsTabs } from "@/components/AchievementsTabs";
import { NowPlaying } from "@/components/NowPlaying";
import { PlayerProvider } from "@/contexts/PlayerContext";
import { useEffect } from "react";
import { usePlayer } from "@/contexts/PlayerContext";
import mealMatchImg from "@/assets/project-mealmatch.jpg";
import bookaroImg from "@/assets/project-bookaro.jpg";
import ttsImg from "@/assets/project-tts.jpg";

const projects = [
  {
    title: "MealMatch",
    description:
      "Recipe recommendation platform trained on 6,000+ recipes with personalized meal suggestions and dietary filters",
    image: mealMatchImg,
    technologies: ["Python", "Flutter", "Firebase", "ML", "KNN"],
    date: "January 2025",
    stats: "6K+ recipes",
    projectId: "mealmatch",
    githubUrl: "https://github.com/dikshat25/THE-HEIRS-INHERITANCE",
  },
  {
    title: "BooKaro",
    description:
      "Student book marketplace with ML modules including YOLO-based condition classifier and KNN recommendation engine",
    image: bookaroImg,
    technologies: ["Python", "Firebase", "OpenCV", "YOLO"],
    date: "March 2025",
    stats: "2K+ books",
    projectId: "bookaro",
    githubUrl: "https://github.com/Prachi-Shende/BooKaro",
  },
  {
    title: "Text-to-Speech System",
    description:
      "End-to-end TTS system using Tacotron 2 and Griffin-Lim to generate natural-sounding speech from phoneme input",
    image: ttsImg,
    technologies: ["Python", "PyTorch", "Tacotron 2", "NumPy"],
    date: "February 2025",
    stats: "3K audio pairs",
    projectId: "text-to-speech",
    githubUrl: "https://github.com/dikshat25/TextToSpeech",
  },
];

function KeyboardControls() {
  const { togglePlay, nextTrack, prevTrack, currentTrack } = usePlayer();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle keyboard shortcuts when not typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (!currentTrack) return;

      switch (e.key) {
        case ' ':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          prevTrack();
          break;
        case 'ArrowRight':
          e.preventDefault();
          nextTrack();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay, nextTrack, prevTrack, currentTrack]);

  return null;
}

const Index = () => {
  return (
    <PlayerProvider>
      <KeyboardControls />
      <SidebarProvider defaultOpen>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          
          <main className="flex-1 pb-24">
          <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border">
            <div className="flex items-center h-16 px-6">
              <SidebarTrigger className="mr-4" />
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">DT Playlist — Diksha Thongire</span>
              </div>
            </div>
          </header>

          <div className="relative">
            <HeroSection />

            <section id="projects" className="py-12 px-6">
              <div className="max-w-7xl mx-auto">
                <div className="mb-8 animate-fade-in">
                  <h2 className="text-3xl font-bold text-foreground mb-2">
                    Featured Projects
                  </h2>
                  <p className="text-muted-foreground">
                    My latest and greatest creative works
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project, index) => (
                    <div
                      key={project.title}
                      className="animate-slide-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <ProjectCard {...project} />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <AchievementsTabs />
            <SkillsSection />
          </div>
        </main>

        <NowPlaying />
        </div>
      </SidebarProvider>
    </PlayerProvider>
  );
};

export default Index;
