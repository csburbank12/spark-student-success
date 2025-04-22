
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Expand } from "lucide-react";

interface VisualItem {
  id: string;
  title: string;
  imageUrl: string;
  type: "animation" | "static";
  description: string;
}

const CalmingVisuals: React.FC = () => {
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);
  
  const visuals: VisualItem[] = [
    {
      id: "v1",
      title: "Ocean Waves",
      imageUrl: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=640",
      type: "animation",
      description: "Gentle ocean waves on a calm beach"
    },
    {
      id: "v2",
      title: "Forest Path",
      imageUrl: "https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=640",
      type: "static",
      description: "Peaceful forest walkway with sunlight filtering through trees"
    },
    {
      id: "v3",
      title: "Mountain Vista",
      imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=640",
      type: "static",
      description: "Breathtaking mountain landscape at sunrise"
    },
    {
      id: "v4",
      title: "Night Sky",
      imageUrl: "https://images.unsplash.com/photo-1527066579998-dbbae57f45ce?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=640",
      type: "static",
      description: "Starry night sky over peaceful landscape"
    }
  ];

  // Toggle fullscreen visualization
  const toggleFullscreen = (imageUrl: string | null) => {
    setFullscreenImage(imageUrl);
    
    if (imageUrl) {
      document.body.style.overflow = "hidden"; // Prevent scrolling when fullscreen
    } else {
      document.body.style.overflow = ""; // Restore scrolling
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-semibold">Calming Visuals</h3>
        <p className="text-muted-foreground">Visual imagery to help you relax and center yourself</p>
      </div>
      
      <Tabs defaultValue="scenes" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="scenes">Nature Scenes</TabsTrigger>
          <TabsTrigger value="patterns">Patterns</TabsTrigger>
          <TabsTrigger value="interactive">Interactive</TabsTrigger>
        </TabsList>
        
        <TabsContent value="scenes" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {visuals.map((visual) => (
              <Card 
                key={visual.id}
                className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => toggleFullscreen(visual.imageUrl)}
              >
                <div className="relative">
                  <img 
                    src={visual.imageUrl} 
                    alt={visual.title}
                    className="w-full h-48 object-cover"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 bg-black/30 text-white hover:bg-black/50"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFullscreen(visual.imageUrl);
                    }}
                  >
                    <Expand className="h-4 w-4" />
                  </Button>
                </div>
                <div className="p-3">
                  <h4 className="font-medium">{visual.title}</h4>
                  <p className="text-sm text-muted-foreground">{visual.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="patterns" className="h-80 flex items-center justify-center">
          <p className="text-muted-foreground">Calming patterns coming soon</p>
        </TabsContent>
        
        <TabsContent value="interactive" className="h-80 flex items-center justify-center">
          <p className="text-muted-foreground">Interactive visuals coming soon</p>
        </TabsContent>
      </Tabs>
      
      {fullscreenImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={() => toggleFullscreen(null)}
        >
          <img 
            src={fullscreenImage} 
            alt="Fullscreen calming visual"
            className="max-w-full max-h-full object-contain"
          />
          <Button
            variant="ghost"
            className="absolute top-4 right-4 text-white hover:bg-white/20"
            onClick={() => toggleFullscreen(null)}
          >
            Close
          </Button>
        </div>
      )}
    </div>
  );
};

export default CalmingVisuals;
