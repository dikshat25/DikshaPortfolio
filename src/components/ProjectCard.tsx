import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Calendar, TrendingUp, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { usePlayer } from "@/contexts/PlayerContext";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  date: string;
  stats: string;
  projectId: string;
  githubUrl?: string;
}

export function ProjectCard({
  title,
  description,
  image,
  technologies,
  date,
  stats,
  projectId,
  githubUrl,
}: ProjectCardProps) {
  const navigate = useNavigate();
  const { loadTrack } = usePlayer();

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Load track into player and auto-play
    loadTrack({
      id: projectId,
      title: title,
      artist: "Diksha Thongire",
      type: "project",
      coverImage: image,
      audioUrl: `https://example.com/audio/${projectId}.mp3`,
    }, true); // auto-play enabled
    
    // Navigate to project detail page
    navigate(`/project/${projectId}`);
  };

  const handleCardClick = () => {
    // Also auto-play when clicking anywhere on card
    loadTrack({
      id: projectId,
      title: title,
      artist: "Diksha Thongire",
      type: "project",
      coverImage: image,
      audioUrl: `https://example.com/audio/${projectId}.mp3`,
    }, true);
    
    navigate(`/project/${projectId}`);
  };

  return (
    <Card className="group overflow-hidden border-spotify-hover hover:border-primary/50 bg-spotify-card hover:bg-spotify-hover transition-all duration-300 relative">
      {/* Play button overlay */}
      <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          size="icon"
          className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:scale-110 transition-transform"
          onClick={handlePlayClick}
        >
          <Play className="h-5 w-5 fill-current ml-0.5" />
        </Button>
      </div>
      
      <div className="cursor-pointer" onClick={handleCardClick}>
        {/* Project Image */}
        <div className="relative h-48 overflow-hidden bg-spotify-hover">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-spotify-card to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="text-xs bg-spotify-hover hover:bg-primary/20 transition-colors"
              >
                {tech}
              </Badge>
            ))}
          </div>

          {/* Metadata */}
          <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-spotify-hover">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {date}
            </span>
            <span className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              {stats}
            </span>
          </div>

          {/* GitHub Button */}
          {githubUrl && (
            <div className="pt-3 border-t border-spotify-hover" onClick={(e) => e.stopPropagation()}>
              <Button
                size="sm"
                variant="outline"
                asChild
                className="w-full hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
              >
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="gap-2">
                  <Github className="h-4 w-4" />
                  View on GitHub
                </a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
