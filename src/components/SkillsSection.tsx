import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Code2, Database, Palette, Wrench } from "lucide-react";

const skillCategories = [
  {
    title: "Languages",
    icon: Code2,
    skills: ["C++", "Python", "HTML", "CSS", "Flutter"],
    color: "text-blue-400",
  },
  {
    title: "Technologies",
    icon: Wrench,
    skills: ["Machine Learning", "OpenCV", "Linux CLI", "GitHub"],
    color: "text-green-400",
  },
  {
    title: "Databases",
    icon: Database,
    skills: ["MariaDB", "Firestore", "Firebase"],
    color: "text-purple-400",
  },
  {
    title: "Design Tools",
    icon: Palette,
    skills: ["Figma", "Canva", "Traditional Art"],
    color: "text-pink-400",
  },
];

export function SkillsSection() {
  const [currentCategory, setCurrentCategory] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCategory((prev) => (prev + 1) % skillCategories.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="skills" className="py-12 px-6 bg-gradient-to-b from-background to-spotify-card/30">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 animate-fade-in text-center">
          <h2 className="text-4xl font-bold text-foreground mb-2">My Genres</h2>
          <p className="text-muted-foreground">
            Spotify Wrapped style - Skills that define my creative sound
          </p>
        </div>

        {/* Spotify Wrapped Style - Large Featured Skill */}
        <div className="mb-12 relative h-[500px] flex items-center justify-center overflow-hidden">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className={`absolute inset-0 transition-all duration-1000 ${
                currentCategory === index
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95"
              }`}
            >
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <div className={`mb-8 ${category.color} animate-scale-in`}>
                  <category.icon className="h-32 w-32" />
                </div>
                <h3 className="text-6xl font-bold text-foreground mb-6 animate-fade-in">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-4 justify-center max-w-2xl">
                  {category.skills.map((skill, idx) => (
                    <div
                      key={skill}
                      className="text-2xl text-muted-foreground animate-slide-in"
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          
          {/* Progress Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {skillCategories.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCategory(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentCategory === index ? "w-8 bg-primary" : "w-2 bg-muted"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Compact Grid View */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {skillCategories.map((category, index) => (
            <Card
              key={category.title}
              onClick={() => setCurrentCategory(index)}
              className={`p-4 cursor-pointer transition-all duration-300 border-0 ${
                currentCategory === index
                  ? "bg-primary text-primary-foreground scale-105"
                  : "bg-card hover:bg-spotify-hover"
              }`}
            >
              <div className="flex flex-col items-center gap-2">
                <category.icon className={`h-8 w-8 ${currentCategory === index ? "" : category.color}`} />
                <span className="font-semibold text-sm text-center">
                  {category.title}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
