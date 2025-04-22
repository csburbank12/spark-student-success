
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, BarChart3, Download, Calendar, Users, BookOpen } from "lucide-react";
import StudentRiskDashboard from "./students/StudentRiskDashboard";
import { Link } from "react-router-dom";

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
          <Button variant="outline" asChild>
            <Link to="/filters" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/export" className="flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Link>
          </Button>
          <Button asChild>
            <Link to="/predictive-support" className="flex items-center">
              <BarChart3 className="h-4 w-4 mr-2" />
              Advanced Dashboard
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <Users className="h-8 w-8 text-primary mb-2" />
            <div className="text-2xl font-bold">247</div>
            <p className="text-sm text-muted-foreground">Total Students</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <BookOpen className="h-8 w-8 text-amber-500 mb-2" />
            <div className="text-2xl font-bold">38</div>
            <p className="text-sm text-muted-foreground">At-Risk Students</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <Calendar className="h-8 w-8 text-green-500 mb-2" />
            <div className="text-2xl font-bold">42</div>
            <p className="text-sm text-muted-foreground">Active Interventions</p>
          </CardContent>
        </Card>
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
