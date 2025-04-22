
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, Play, Pause } from "lucide-react";

interface Meditation {
  id: string;
  title: string;
  duration: string;
  description: string;
  category: string;
}

const GuidedMeditation: React.FC = () => {
  const [activeSession, setActiveSession] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const meditations: Meditation[] = [
    {
      id: "med-1",
      title: "Calm Mind",
      duration: "5 min",
      description: "A quick meditation to clear your mind and reduce anxiety.",
      category: "Stress Relief"
    },
    {
      id: "med-2",
      title: "Body Scan",
      duration: "8 min",
      description: "A guided full body relaxation to release tension.",
      category: "Relaxation"
    },
    {
      id: "med-3",
      title: "Focus Builder",
      duration: "3 min",
      description: "Short meditation to help improve concentration before study or tests.",
      category: "Focus"
    },
    {
      id: "med-4",
      title: "Kindness Practice",
      duration: "6 min",
      description: "Build compassion for yourself and others with this meditation.",
      category: "Emotional"
    }
  ];

  const togglePlay = (id: string) => {
    if (activeSession === id) {
      setIsPlaying(!isPlaying);
    } else {
      setActiveSession(id);
      setIsPlaying(true);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-semibold">Guided Meditations</h3>
        <p className="text-muted-foreground">Take a moment to rest your mind</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {meditations.map((meditation) => (
          <Card 
            key={meditation.id} 
            className={`p-4 cursor-pointer transition-all hover:shadow-md ${
              activeSession === meditation.id ? "border-primary" : ""
            }`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold">{meditation.title}</h4>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{meditation.duration}</span>
                  <span className="mx-1">•</span>
                  <span>{meditation.category}</span>
                </div>
                <p className="text-sm mt-2">{meditation.description}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full"
                onClick={() => togglePlay(meditation.id)}
              >
                {activeSession === meditation.id && isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </Button>
            </div>
            
            {activeSession === meditation.id && isPlaying && (
              <div className="mt-3">
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary animate-pulse"
                    style={{ width: "30%" }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>1:30</span>
                  <span>{meditation.duration}</span>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
      
      <div className="flex justify-center mt-4">
        <Button variant="outline">View All Meditations</Button>
      </div>
    </div>
  );
};

export default GuidedMeditation;
