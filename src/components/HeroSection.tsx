import { Button } from "@/components/ui/button";
import { Play, ExternalLink } from "lucide-react";
import profileHero from "@/assets/profile-hero.jpg";

export function HeroSection() {
  return (
    <section className="relative w-full h-[400px] bg-gradient-to-b from-spotify-card to-background overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      
      <div className="relative h-full max-w-7xl mx-auto px-6 flex items-end pb-8">
        <div className="flex items-end gap-6 w-full animate-fade-in">
          <div className="flex-1 pb-4 text-center">
            <div className="flex items-center gap-2 mb-4 justify-center">
              <span className="flex items-center gap-1 text-xs font-semibold text-foreground bg-secondary px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Available for opportunities
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-foreground mb-4">
              Diksha Thongire
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-6">
              DT Playlist — Interactive Music-Portfolio
            </p>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              <span>CS @ VJTI</span>
              <span>•</span>
              <span>Design Head @ CoC</span>
              <span>•</span>
              <span>3 Projects</span>
            </div>

            <div className="flex items-center gap-3 justify-center md:justify-start">
              <Button
                size="lg"
                onClick={() => {
                  const projectsSection = document.getElementById('projects');
                  if (projectsSection) {
                    // Smooth scroll through all sections
                    const sections = ['projects', 'skills', 'achievements'];
                    let currentIndex = 0;
                    
                    const scrollToNext = () => {
                      if (currentIndex < sections.length) {
                        const section = document.getElementById(sections[currentIndex]);
                        section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        currentIndex++;
                        setTimeout(scrollToNext, 1500);
                      }
                    };
                    scrollToNext();
                  }
                }}
                className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 shadow-lg hover:scale-105 transition-transform"
              >
                <Play className="h-5 w-5 mr-2 fill-current" />
                A Glimpse of Everything
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-foreground/20 hover:border-foreground/40 hover:bg-spotify-hover"
                asChild
              >
                <a
                  href="https://www.linkedin.com/in/diksha-thongire-88a51728a"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Check Full Profile
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
