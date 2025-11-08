import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Play, Pause, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { usePlayer } from "@/contexts/PlayerContext";
import { PlayerProvider } from "@/contexts/PlayerContext";
import mealMatchImg from "@/assets/project-mealmatch.jpg";
import bookaroImg from "@/assets/project-bookaro.jpg";
import ttsImg from "@/assets/project-tts.jpg";

const projectData = {
  mealmatch: {
    title: "MealMatch",
    description: "Recipe recommendation platform trained on 6,000+ recipes with personalized meal suggestions and dietary filters",
    image: mealMatchImg,
    technologies: ["Python", "Flutter", "Firebase", "ML", "KNN"],
    date: "January 2025",
    stats: "6K+ recipes",
    spotifyEmbed: "3IBcauSj5M2A6lTNk1LoIf", // Cooking-related playlist
    fullDescription: `MealMatch is an intelligent recipe recommendation system that leverages machine learning to provide personalized meal suggestions. The platform was trained on over 6,000 diverse recipes and uses a K-Nearest Neighbors algorithm to match users with recipes based on their preferences, dietary restrictions, and nutritional goals.`,
    features: [
      "Smart recipe matching using KNN algorithm",
      "Dietary filters (vegan, gluten-free, keto, etc.)",
      "Nutritional information tracking",
      "Personalized meal planning",
      "Real-time Firebase synchronization",
      "Cross-platform Flutter mobile app"
    ],
    challenges: "Building a scalable recommendation engine that could handle diverse dietary preferences while maintaining fast response times. Implemented efficient data structures and caching strategies to optimize performance.",
    impact: "Helped users discover new recipes tailored to their tastes, reducing meal planning time by 60% on average."
  },
  bookaro: {
    title: "BooKaro",
    description: "Student book marketplace with ML modules including YOLO-based condition classifier and KNN recommendation engine",
    image: bookaroImg,
    technologies: ["Python", "Firebase", "OpenCV", "YOLO"],
    date: "March 2025",
    stats: "2K+ books",
    spotifyEmbed: "37i9dQZF1DX8Uebhn9wzrS", // Study/Focus playlist
    fullDescription: `BooKaro revolutionizes the student book marketplace by combining computer vision and machine learning. The platform uses YOLO (You Only Look Once) for automated book condition assessment and a recommendation engine to help students find the books they need.`,
    features: [
      "YOLO-based automatic book condition grading",
      "KNN recommendation system for textbook discovery",
      "Real-time marketplace with Firebase",
      "OpenCV-powered image processing",
      "Price prediction based on condition and demand",
      "Student verification system"
    ],
    challenges: "Training the YOLO model to accurately assess book condition from user-uploaded images. Created a custom dataset of 2,000+ book images with various wear levels to achieve 92% accuracy.",
    impact: "Connected 1,000+ students in the pilot program, facilitating book exchanges worth over ₹5 lakhs and reducing textbook costs by 40%."
  },
  "text-to-speech": {
    title: "Text-to-Speech System",
    description: "End-to-end TTS system using Tacotron 2 and Griffin-Lim to generate natural-sounding speech from phoneme input",
    image: ttsImg,
    technologies: ["Python", "PyTorch", "Tacotron 2", "NumPy"],
    date: "February 2025",
    stats: "3K audio pairs",
    spotifyEmbed: "37i9dQZF1DWWEJlAGA9gs0", // Classical/ambient music
    fullDescription: `An advanced text-to-speech system built from scratch using deep learning. Implements the Tacotron 2 architecture for mel-spectrogram generation and Griffin-Lim algorithm for audio synthesis, trained on 3,000 high-quality audio-text pairs.`,
    features: [
      "Tacotron 2 sequence-to-sequence architecture",
      "Custom phoneme encoding system",
      "Griffin-Lim vocoder for waveform generation",
      "Multi-speaker voice synthesis capability",
      "Emotion and prosody control",
      "Real-time inference optimization"
    ],
    challenges: "Achieving natural-sounding prosody and handling edge cases in phoneme conversion. Implemented attention mechanisms and custom loss functions to improve speech quality and reduce artifacts.",
    impact: "Generated natural-sounding speech with 4.2/5 Mean Opinion Score (MOS), comparable to commercial TTS systems. Open-sourced the implementation, gaining 200+ GitHub stars."
  }
};

export default function ProjectDetail() {
  return (
    <PlayerProvider>
      <ProjectDetailContent />
    </PlayerProvider>
  );
}

function ProjectDetailContent() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const { setCurrentTrack, isPlaying, togglePlay } = usePlayer();

  const project = projectData[projectId as keyof typeof projectData];

  useEffect(() => {
    if (project) {
      setCurrentTrack({
        id: projectId || '',
        title: project.title,
        artist: "Diksha Thongire",
        type: "project",
        coverImage: project.image,
        audioUrl: `https://example.com/audio/${projectId}.mp3`, // Placeholder
      });
    }
  }, [project, projectId, setCurrentTrack]);

  useEffect(() => {
    if (!project) return;
    
    const interval = setInterval(() => {
      setCurrentSection((prev) => (prev + 1) % 3);
    }, 5000);

    return () => clearInterval(interval);
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Project Not Found</h1>
          <Button onClick={() => navigate("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const sections = [
    { title: "Overview", content: project.fullDescription },
    { title: "Key Features", content: project.features.join(" • ") },
    { title: "Impact", content: project.impact }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="flex items-center justify-between h-16 px-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              onClick={togglePlay}
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-background" />
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 flex items-end">
          <div className="p-8 pb-12">
            <p className="text-sm text-muted-foreground mb-2">{project.date}</p>
            <h1 className="text-6xl font-bold text-foreground mb-4 animate-fade-in">
              {project.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              {project.description}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-8">
            {/* Spotify Player */}
            <div className="bg-card rounded-lg p-6 border border-border animate-fade-in">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Play className="h-5 w-5 text-primary" />
                Now Playing: {project.title}
              </h3>
              <iframe
                style={{ borderRadius: '12px' }}
                src={`https://open.spotify.com/embed/playlist/${project.spotifyEmbed}?utm_source=generator&theme=0`}
                width="100%"
                height="352"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="w-full"
              ></iframe>
            </div>

            {/* Dynamic Content Section (Like Lyrics) */}
            <div className="bg-card rounded-lg p-8 border border-border min-h-[400px] animate-slide-in">
              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-6">
                  {sections.map((section, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSection(idx)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        currentSection === idx
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {section.title}
                    </button>
                  ))}
                </div>

                <div className="animate-fade-in" key={currentSection}>
                  <h2 className="text-2xl font-bold mb-4 text-foreground">
                    {sections[currentSection].title}
                  </h2>
                  <div className="text-muted-foreground leading-relaxed space-y-4">
                    {currentSection === 1 ? (
                      <ul className="space-y-3">
                        {project.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="text-primary text-xl">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-lg">{sections[currentSection].content}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Challenges Section */}
            <div className="bg-card rounded-lg p-8 border border-border animate-slide-in">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Technical Challenges</h2>
              <p className="text-muted-foreground leading-relaxed">
                {project.challenges}
              </p>
            </div>
          </div>

          {/* Sidebar - Right Side */}
          <div className="space-y-6">
            {/* Technologies */}
            <div className="bg-card rounded-lg p-6 border border-border sticky top-24 animate-fade-in">
              <h3 className="font-semibold mb-4 text-foreground">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <h3 className="font-semibold mb-3 text-foreground">Stats</h3>
                <p className="text-2xl font-bold text-primary">{project.stats}</p>
              </div>

              <div className="mt-6 pt-6 border-t border-border space-y-3">
                <Button className="w-full" variant="outline">
                  <Github className="mr-2 h-4 w-4" />
                  View Code
                </Button>
                <Button className="w-full" variant="outline">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
