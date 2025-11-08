import { cn } from "@/lib/utils";

interface RotatingDiscProps {
  isPlaying: boolean;
  coverImage?: string;
  size?: "sm" | "md" | "lg";
}

export function RotatingDisc({ isPlaying, coverImage, size = "md" }: RotatingDiscProps) {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  };

  return (
    <div className={cn("relative", sizeClasses[size])}>
      {/* Outer ring */}
      <div
        className={cn(
          "absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/30",
          isPlaying && "animate-spin"
        )}
        style={{
          animationDuration: isPlaying ? "3s" : "0s",
          animationTimingFunction: "linear",
        }}
      />
      
      {/* Inner disc with image */}
      <div
        className={cn(
          "absolute inset-1 rounded-full overflow-hidden shadow-lg",
          isPlaying && "animate-spin"
        )}
        style={{
          animationDuration: isPlaying ? "3s" : "0s",
          animationTimingFunction: "linear",
        }}
      >
        {coverImage ? (
          <img
            src={coverImage}
            alt="Album cover"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-spotify-card to-spotify-darker flex items-center justify-center">
            <div className="w-2 h-2 bg-background rounded-full" />
          </div>
        )}
      </div>
      
      {/* Center dot */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-2 h-2 bg-background rounded-full shadow-md z-10" />
      </div>
    </div>
  );
}
