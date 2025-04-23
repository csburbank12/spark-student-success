
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { SmileIcon, FrownIcon, MehIcon, ActivityIcon } from "lucide-react";

export function EmotionFilterSection() {
  const [minEnergyLevel, setMinEnergyLevel] = useState([3]);
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("emotions");

  const emotions = [
    { name: "Happy", color: "bg-green-100 text-green-800" },
    { name: "Calm", color: "bg-blue-100 text-blue-800" },
    { name: "Sad", color: "bg-indigo-100 text-indigo-800" },
    { name: "Tired", color: "bg-purple-100 text-purple-800" },
    { name: "Anxious", color: "bg-yellow-100 text-yellow-800" },
    { name: "Angry", color: "bg-red-100 text-red-800" },
  ];

  const handleEmotionClick = (emotion: string) => {
    if (selectedEmotions.includes(emotion)) {
      setSelectedEmotions(selectedEmotions.filter(e => e !== emotion));
    } else {
      setSelectedEmotions([...selectedEmotions, emotion]);
    }
  };

  const handleApplyFilter = () => {
    // Apply filters to the main student list
    console.log("Applying filters:", {
      emotions: selectedEmotions,
      minEnergyLevel: minEnergyLevel[0]
    });
  };

  const handleClearFilters = () => {
    setSelectedEmotions([]);
    setMinEnergyLevel([3]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Emotion Filters</CardTitle>
        <CardDescription>
          Filter students by their emotional states
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full">
            <TabsTrigger value="emotions" className="flex-1">
              <SmileIcon className="h-4 w-4 mr-2" />
              Emotions
            </TabsTrigger>
            <TabsTrigger value="energy" className="flex-1">
              <ActivityIcon className="h-4 w-4 mr-2" />
              Energy Level
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {activeTab === "emotions" ? (
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {emotions.map(emotion => (
                <Badge
                  key={emotion.name}
                  className={`cursor-pointer ${
                    selectedEmotions.includes(emotion.name)
                      ? emotion.color
                      : "bg-muted text-muted-foreground"
                  }`}
                  onClick={() => handleEmotionClick(emotion.name)}
                >
                  {emotion.name}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Click to select emotions to filter by
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Min Energy Level:</span>
                <span className="font-medium">{minEnergyLevel[0]}/10</span>
              </div>
              <Slider
                value={minEnergyLevel}
                onValueChange={setMinEnergyLevel}
                min={1}
                max={10}
                step={1}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span className="flex items-center">
                <FrownIcon className="h-3 w-3 mr-1" /> Low Energy
              </span>
              <span className="flex items-center">
                High Energy <ActivityIcon className="h-3 w-3 ml-1" />
              </span>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button onClick={handleApplyFilter} className="flex-1">
            Apply Filters
          </Button>
          <Button variant="outline" onClick={handleClearFilters}>
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
