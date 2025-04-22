
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  category: string;
}

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<string>("track-1");
  const [volume, setVolume] = useState([70]);
  const [progress, setProgress] = useState(0);
  
  const tracks: Track[] = [
    {
      id: "track-1",
      title: "Ambient Study",
      artist: "WellBeat",
      duration: "3:45",
      category: "Focus"
    },
    {
      id: "track-2",
      title: "Ocean Waves",
      artist: "Nature Sounds",
      duration: "5:20",
      category: "Relaxation"
    },
    {
      id: "track-3",
      title: "Deep Meditation",
      artist: "MindCalm",
      duration: "8:10",
      category: "Meditation"
    },
    {
      id: "track-4",
      title: "Gentle Rain",
      artist: "Nature Sounds",
      duration: "4:30",
      category: "Sleep"
    }
  ];

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    
    if (!isPlaying) {
      // Simulate track progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 0;
          }
          return prev + 0.5;
        });
      }, 500);
    }
  };
  
  const selectTrack = (trackId: string) => {
    setCurrentTrack(trackId);
    setProgress(0);
    setIsPlaying(true);
  };
  
  const getCurrentTrack = () => tracks.find(track => track.id === currentTrack);

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-semibold">Calming Music</h3>
        <p className="text-muted-foreground">Sounds to help you focus, relax, or energize</p>
      </div>
      
      <Card className="p-6 mb-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center">
            <div className={`w-16 h-16 rounded-full bg-primary flex items-center justify-center ${isPlaying ? 'animate-pulse' : ''}`}>
              {isPlaying ? (
                <Pause className="h-8 w-8 text-primary-foreground" />
              ) : (
                <Play className="h-8 w-8 ml-1 text-primary-foreground" />
              )}
            </div>
          </div>
          
          <div className="text-center">
            <h4 className="font-medium text-lg">{getCurrentTrack()?.title}</h4>
            <p className="text-sm text-muted-foreground">{getCurrentTrack()?.artist}</p>
            <span className="text-xs bg-primary/10 px-2 py-0.5 rounded-full">
              {getCurrentTrack()?.category}
            </span>
          </div>
          
          <div className="w-full space-y-2">
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-1000"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{Math.floor(progress / 100 * parseFloat(getCurrentTrack()?.duration?.split(":")[0] || "0") * 60 + 
                              parseFloat(getCurrentTrack()?.duration?.split(":")[1] || "0"))}s</span>
              <span>{getCurrentTrack()?.duration}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <SkipBack className="h-5 w-5" />
            </Button>
            <Button 
              onClick={togglePlay}
              variant="outline" 
              size="icon" 
              className="h-12 w-12 rounded-full border-2"
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6 ml-0.5" />
              )}
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="flex items-center w-full max-w-xs gap-2">
            <Volume2 className="h-4 w-4 text-muted-foreground" />
            <Slider
              value={volume}
              max={100}
              step={1}
              className="flex-1"
              onValueChange={setVolume}
            />
          </div>
        </div>
      </Card>
      
      <div className="space-y-2">
        <h4 className="font-medium">Recommended Tracks</h4>
        <div className="space-y-1">
          {tracks.map((track) => (
            <div 
              key={track.id}
              className={`flex justify-between items-center p-2 rounded-md cursor-pointer
                ${currentTrack === track.id ? 'bg-primary/10' : 'hover:bg-muted'}`}
              onClick={() => selectTrack(track.id)}
            >
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full"
                >
                  {currentTrack === track.id && isPlaying ? (
                    <Pause className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4 ml-0.5" />
                  )}
                </Button>
                <div>
                  <p className="text-sm font-medium">{track.title}</p>
                  <p className="text-xs text-muted-foreground">{track.artist}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-0.5 bg-muted rounded-full">
                  {track.category}
                </span>
                <span className="text-sm text-muted-foreground">{track.duration}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
