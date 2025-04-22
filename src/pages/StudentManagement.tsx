
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, AlertCircle, CheckCircle } from "lucide-react";
import StudentList from "./students/StudentList";
import StudentRiskDashboard from "./students/StudentRiskDashboard";
import MoodTrendsOverview from "./students/MoodTrendsOverview";
import { Loader } from "@/components/ui/loader";

const StudentManagement = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const { data: students = [], isLoading } = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      // In a real application, this would use a stored function to retrieve students
      // based on the teacher's relationship to them
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("role", "student");

      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
  });

  const filteredStudents = students.filter(student => {
    // Apply search filter
    const matchesSearch = searchQuery === "" || 
      student.full_name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply category filter
    if (selectedFilter === "all") return matchesSearch;
    if (selectedFilter === "concern") {
      // This would use actual risk assessment data in a real application
      return matchesSearch && Math.random() > 0.7;
    }
    if (selectedFilter === "ok") {
      return matchesSearch && Math.random() <= 0.7;
    }
    
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">Student Management</h2>
        <Button variant="outline">Export Data</Button>
      </div>

      <Tabs defaultValue="list" className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Student List</TabsTrigger>
          <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
          <TabsTrigger value="trends">Mood Trends</TabsTrigger>
        </TabsList>
        
        <div className="flex items-center space-x-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant={selectedFilter === "all" ? "default" : "outline"}
              onClick={() => setSelectedFilter("all")}
              size="sm"
            >
              All
            </Button>
            <Button 
              variant={selectedFilter === "concern" ? "default" : "outline"}
              onClick={() => setSelectedFilter("concern")}
              size="sm"
              className="flex items-center gap-1"
            >
              <AlertCircle className="h-4 w-4" /> Concerns
            </Button>
            <Button 
              variant={selectedFilter === "ok" ? "default" : "outline"}
              onClick={() => setSelectedFilter("ok")}
              size="sm"
              className="flex items-center gap-1"
            >
              <CheckCircle className="h-4 w-4" /> Doing Well
            </Button>
          </div>
        </div>
        
        <TabsContent value="list" className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center p-8">
              <Loader size="lg" />
            </div>
          ) : (
            <StudentList students={filteredStudents} />
          )}
        </TabsContent>
        
        <TabsContent value="risk">
          <StudentRiskDashboard students={filteredStudents} />
        </TabsContent>
        
        <TabsContent value="trends">
          <MoodTrendsOverview />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentManagement;
