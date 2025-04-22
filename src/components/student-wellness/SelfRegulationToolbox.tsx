
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Heart, Music, Smile, Star, Wind } from "lucide-react";
import BreathingExercise from "./wellness-tools/BreathingExercise";
import GuidedMeditation from "./wellness-tools/GuidedMeditation";
import AffirmationGenerator from "./wellness-tools/AffirmationGenerator";
import CalmingVisuals from "./wellness-tools/CalmingVisuals";
import MusicPlayer from "./wellness-tools/MusicPlayer";

const SelfRegulationToolbox: React.FC = () => {
  const [activeTab, setActiveTab] = useState("breathing");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">Self-Regulation Toolbox</h2>
        <Button variant="outline">Add to Favorites</Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Wellness Tools</CardTitle>
          <CardDescription>
            Choose from these tools to help you calm down, focus, or feel better.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 mb-6">
              <TabsTrigger value="breathing" className="flex flex-col items-center gap-1 py-2">
                <Wind className="h-4 w-4" />
                <span className="text-xs">Breathing</span>
              </TabsTrigger>
              <TabsTrigger value="meditation" className="flex flex-col items-center gap-1 py-2">
                <Heart className="h-4 w-4" />
                <span className="text-xs">Meditation</span>
              </TabsTrigger>
              <TabsTrigger value="affirmations" className="flex flex-col items-center gap-1 py-2">
                <Star className="h-4 w-4" />
                <span className="text-xs">Affirmations</span>
              </TabsTrigger>
              <TabsTrigger value="visuals" className="flex flex-col items-center gap-1 py-2">
                <Smile className="h-4 w-4" />
                <span className="text-xs">Visuals</span>
              </TabsTrigger>
              <TabsTrigger value="music" className="flex flex-col items-center gap-1 py-2">
                <Music className="h-4 w-4" />
                <span className="text-xs">Music</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="breathing">
              <BreathingExercise />
            </TabsContent>
            <TabsContent value="meditation">
              <GuidedMeditation />
            </TabsContent>
            <TabsContent value="affirmations">
              <AffirmationGenerator />
            </TabsContent>
            <TabsContent value="visuals">
              <CalmingVisuals />
            </TabsContent>
            <TabsContent value="music">
              <MusicPlayer />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SelfRegulationToolbox;
