
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BoxBreathing from "../BoxBreathing";
import GroundingExercise from "../GroundingExercise";
import BodyScan from "../BodyScan";
import PositiveAffirmations from "../PositiveAffirmations";
import GuidedMeditation from "../../wellness-tools/GuidedMeditation";
import MusicPlayer from "../../wellness-tools/MusicPlayer";

const ActivityTabs: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState("breathing");

  return (
    <Card>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="breathing">Breathing</TabsTrigger>
            <TabsTrigger value="grounding">Grounding</TabsTrigger>
            <TabsTrigger value="body-scan">Body Scan</TabsTrigger>
            <TabsTrigger value="affirmations">Affirmations</TabsTrigger>
            <TabsTrigger value="meditation">Meditation</TabsTrigger>
          </TabsList>

          <TabsContent value="breathing">
            <BoxBreathing />
          </TabsContent>

          <TabsContent value="grounding">
            <GroundingExercise />
          </TabsContent>

          <TabsContent value="body-scan">
            <BodyScan />
          </TabsContent>

          <TabsContent value="affirmations">
            <PositiveAffirmations />
          </TabsContent>

          <TabsContent value="meditation">
            <GuidedMeditation />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ActivityTabs;
