import { usePlayer } from "@/contexts/PlayerContext";
import { Card } from "@/components/ui/card";
import { Music, Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

export function NowPlaying() {
  const { 
    currentTrack, 
    isPlaying, 
    isLoading,
    currentTime,
    duration,
    volume,
    togglePlay, 
    nextTrack, 
    prevTrack,
    seek,
    setVolume 
  } = usePlayer();

  if (!currentTrack) {
    return null;
  }

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-spotify-card/95 backdrop-blur-sm">
      <Card className="border-none shadow-lg bg-transparent">
        {/* Progress Bar */}
        <div className="relative h-1 bg-spotify-hover group cursor-pointer" onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const percentage = x / rect.width;
          seek(percentage * duration);
        }}>
          <div 
            className="absolute top-0 left-0 h-full bg-primary transition-all"
            style={{ width: `${progress}%` }}
          />
          <div 
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ left: `${progress}%` }}
          />
        </div>

        <div className="flex items-center gap-4 p-3 md:p-4">
          {/* Album Art with rotating animation */}
          <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden bg-spotify-hover flex-shrink-0">
            {currentTrack.coverImage ? (
              <img
                src={currentTrack.coverImage}
                alt={currentTrack.title}
                className={cn(
                  "w-full h-full object-cover",
                  isPlaying && "animate-[spin_3s_linear_infinite]"
                )}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Music className={cn(
                  "h-6 w-6 text-muted-foreground",
                  isPlaying && "animate-pulse"
                )} />
              </div>
            )}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>

          {/* Track Info */}
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-foreground truncate">
              {currentTrack.title}
            </h4>
            <p className="text-xs text-muted-foreground truncate">
              {currentTrack.artist}
            </p>
            <div className="text-xs text-muted-foreground mt-1">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          {/* Playback Controls */}
          <div className="flex items-center gap-1 md:gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={prevTrack}
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 md:h-10 md:w-10 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
              onClick={togglePlay}
              disabled={isLoading}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4 md:h-5 md:w-5 fill-current" />
              ) : (
                <Play className="h-4 w-4 md:h-5 md:w-5 fill-current ml-0.5" />
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={nextTrack}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>

          {/* Volume Control - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-2 w-32">
            <Volume2 className="h-4 w-4 text-muted-foreground" />
            <Slider
              value={[volume * 100]}
              onValueChange={(value) => setVolume(value[0] / 100)}
              max={100}
              step={1}
              className="w-full"
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
