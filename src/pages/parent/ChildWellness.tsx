
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const ChildWellness = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">Wellness Tracker</h2>
      </div>

      <Tabs defaultValue="mood">
        <TabsList>
          <TabsTrigger value="mood">Mood Trends</TabsTrigger>
          <TabsTrigger value="sleep">Sleep Patterns</TabsTrigger>
          <TabsTrigger value="activities">Wellness Activities</TabsTrigger>
        </TabsList>
        
        <TabsContent value="mood" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Mood Overview</CardTitle>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <p className="text-muted-foreground">Mood trend visualization coming soon</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Check-in Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <p className="text-sm text-muted-foreground">April 22, 2025</p>
                  <p className="font-medium">Had a great day at school!</p>
                  <p className="text-sm mt-1">Finished my science project and presented it to the class. Everyone liked it!</p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4 py-2">
                  <p className="text-sm text-muted-foreground">April 21, 2025</p>
                  <p className="font-medium">Feeling a bit nervous</p>
                  <p className="text-sm mt-1">Worried about tomorrow's presentation, but I practiced a lot.</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <p className="text-sm text-muted-foreground">April 20, 2025</p>
                  <p className="font-medium">Good day overall</p>
                  <p className="text-sm mt-1">Got an A on my math test! Spent time with friends at lunch.</p>
                </div>
              </div>
              <Button variant="link" className="mt-4 px-0">View more entries</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sleep" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Sleep Patterns</CardTitle>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <p className="text-muted-foreground">Sleep pattern visualization coming soon</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="activities" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Wellness Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">5-Minute Breathing Exercise</h3>
                    <span className="text-xs text-muted-foreground">Yesterday</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Category: Stress Management</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Gratitude Journal Entry</h3>
                    <span className="text-xs text-muted-foreground">3 days ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Category: Positive Mindset</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Guided Meditation</h3>
                    <span className="text-xs text-muted-foreground">5 days ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Category: Focus & Attention</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recommended Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Progressive Muscle Relaxation</h3>
                    <Button size="sm">Suggest to Child</Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Helps with tension and anxiety before tests</p>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Outdoor Nature Walk</h3>
                    <Button size="sm">Suggest to Child</Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Boost mood and focus with fresh air</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChildWellness;
