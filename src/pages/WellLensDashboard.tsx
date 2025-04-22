
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, BarChart3 } from "lucide-react";
import StudentRiskDashboard from "./students/StudentRiskDashboard";

const WellLensDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock student data that would come from your database
  const students = Array(25).fill(null).map((_, idx) => ({
    id: `s${idx + 1}`,
    full_name: `Student ${idx + 1}`,
    email: `student${idx + 1}@example.com`,
    grade: Math.floor(Math.random() * 12) + 1,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">
          WellLens™ Predictive Support
        </h2>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button>
            <BarChart3 className="h-4 w-4 mr-2" />
            View Reports
          </Button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search students, interventions, or risk factors..."
          className="pl-8 w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
          <TabsTrigger value="overview">Risk Overview</TabsTrigger>
          <TabsTrigger value="trends">Trend Analysis</TabsTrigger>
          <TabsTrigger value="interventions">Interventions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 mt-4">
          <StudentRiskDashboard students={students} />
        </TabsContent>
        
        <TabsContent value="trends" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Mood & Engagement Trends</CardTitle>
            </CardHeader>
            <CardContent className="h-96 flex items-center justify-center">
              <p className="text-muted-foreground">
                Trend visualizations coming soon
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="interventions" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Intervention Tracking</CardTitle>
            </CardHeader>
            <CardContent className="h-96 flex items-center justify-center">
              <p className="text-muted-foreground">
                Intervention tracking dashboard coming soon
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WellLensDashboard;
