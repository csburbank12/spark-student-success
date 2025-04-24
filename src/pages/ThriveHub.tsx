
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoodHistory } from "@/components/thrive-hub/MoodHistory";
import { GoalTracker } from "@/components/thrive-hub/GoalTracker";

export default function ThriveHub() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">My Thrive Hub</h1>
      
      <Tabs defaultValue="mood" className="space-y-6">
        <TabsList>
          <TabsTrigger value="mood">Mood Tracker</TabsTrigger>
          <TabsTrigger value="goals">My Goals</TabsTrigger>
          <TabsTrigger value="journal">My Journal</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="toolkit">My Toolkit</TabsTrigger>
        </TabsList>

        <TabsContent value="mood" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <MoodHistory />
            <GoalTracker />
          </div>
        </TabsContent>

        <TabsContent value="goals">
          {/* Goals content will go here */}
        </TabsContent>

        <TabsContent value="journal">
          {/* Journal content will go here */}
        </TabsContent>

        <TabsContent value="badges">
          {/* Badges content will go here */}
        </TabsContent>

        <TabsContent value="toolkit">
          {/* Toolkit content will go here */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
