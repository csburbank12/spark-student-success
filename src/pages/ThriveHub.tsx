
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoodHistory } from "@/components/thrive-hub/MoodHistory";
import { GoalTracker } from "@/components/thrive-hub/GoalTracker";
import { JournalTab } from "@/components/thrive-hub/JournalTab";
import { BadgesTab } from "@/components/thrive-hub/BadgesTab";
import { ToolkitTab } from "@/components/thrive-hub/ToolkitTab";
import { TrendingUp, Target, Book, Award, Sparkles } from "lucide-react";

export default function ThriveHub() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">My Thrive Hub</h1>
      
      <Tabs defaultValue="mood" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="mood" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span className="hidden md:inline">Mood Tracker</span>
            <span className="inline md:hidden">Mood</span>
          </TabsTrigger>
          <TabsTrigger value="goals" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            <span className="hidden md:inline">My Goals</span>
            <span className="inline md:hidden">Goals</span>
          </TabsTrigger>
          <TabsTrigger value="journal" className="flex items-center gap-2">
            <Book className="h-4 w-4" />
            <span className="hidden md:inline">My Journal</span>
            <span className="inline md:hidden">Journal</span>
          </TabsTrigger>
          <TabsTrigger value="badges" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            <span className="hidden md:inline">Badges</span>
            <span className="inline md:hidden">Badges</span>
          </TabsTrigger>
          <TabsTrigger value="toolkit" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <span className="hidden md:inline">My Toolkit</span>
            <span className="inline md:hidden">Toolkit</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="mood" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <MoodHistory />
            <GoalTracker />
          </div>
        </TabsContent>

        <TabsContent value="goals">
          <div className="grid gap-6">
            <GoalTracker />
          </div>
        </TabsContent>

        <TabsContent value="journal">
          <JournalTab />
        </TabsContent>

        <TabsContent value="badges">
          <BadgesTab />
        </TabsContent>

        <TabsContent value="toolkit">
          <ToolkitTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
