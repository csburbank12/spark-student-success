
import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HeatmapGrid } from "@/components/student-support/HeatmapGrid";
import { HeatmapFilters } from "@/components/student-support/HeatmapFilters";
import { HeatmapStats } from "@/components/student-support/HeatmapStats";
import { SelectView } from "@/components/student-support/SelectView";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/roles";
import { Search, Filter } from "lucide-react";
import { toast } from "sonner";

// We'll expand this with real data from Supabase
const StudentSupportHeatmap = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedView, setSelectedView] = useState<"class" | "grade" | "school">("class");
  const [selectedGrade, setSelectedGrade] = useState<string>("");
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<string>("all");
  const [isRealTimeEnabled, setIsRealTimeEnabled] = useState(true);
  
  // Mock data - this would come from Supabase in a real implementation
  const mockData = useMemo(() => {
    return [
      {
        id: "s1",
        name: "Alex Johnson",
        photoUrl: null,
        grade: "8",
        class: "8A",
        teacher: "Ms. Smith",
        status: "at_risk",
        confidenceScore: 85,
        moodTrend: "declining",
        absences: 3,
        tardies: 2,
        behaviorReports: 1,
        currentInterventions: ["Weekly check-in with counselor"],
      },
      {
        id: "s2",
        name: "Emma Davis",
        photoUrl: null,
        grade: "8",
        class: "8A",
        teacher: "Ms. Smith",
        status: "stable",
        confidenceScore: 92,
        moodTrend: "stable",
        absences: 0,
        tardies: 1,
        behaviorReports: 0,
        currentInterventions: [],
      },
      {
        id: "s3",
        name: "Michael Lee",
        photoUrl: null,
        grade: "7",
        class: "7C",
        teacher: "Mr. Johnson",
        status: "concerning",
        confidenceScore: 68,
        moodTrend: "fluctuating",
        absences: 2,
        tardies: 3,
        behaviorReports: 0,
        currentInterventions: [],
      },
      {
        id: "s4",
        name: "Sophia Wilson",
        photoUrl: null,
        grade: "6",
        class: "6B",
        teacher: "Mrs. Garcia",
        status: "at_risk",
        confidenceScore: 74,
        moodTrend: "declining",
        absences: 5,
        tardies: 2,
        behaviorReports: 2,
        currentInterventions: ["Parent meeting scheduled"],
      },
      {
        id: "s5",
        name: "James Taylor",
        photoUrl: null,
        grade: "8",
        class: "8B",
        teacher: "Mr. Brown",
        status: "stable",
        confidenceScore: 95,
        moodTrend: "improving",
        absences: 0,
        tardies: 0,
        behaviorReports: 0,
        currentInterventions: [],
      },
      {
        id: "s6",
        name: "Olivia Miller",
        photoUrl: null,
        grade: "7",
        class: "7A",
        teacher: "Ms. Wilson",
        status: "concerning",
        confidenceScore: 79,
        moodTrend: "recent decline",
        absences: 1,
        tardies: 2,
        behaviorReports: 1,
        currentInterventions: [],
      },
      {
        id: "s7",
        name: "Noah Anderson",
        photoUrl: null,
        grade: "6",
        class: "6A",
        teacher: "Mrs. Davis",
        status: "stable",
        confidenceScore: 88,
        moodTrend: "stable",
        absences: 1,
        tardies: 0,
        behaviorReports: 0,
        currentInterventions: [],
      },
      {
        id: "s8",
        name: "Isabella Thomas",
        photoUrl: null,
        grade: "8",
        class: "8A",
        teacher: "Ms. Smith",
        status: "at_risk",
        confidenceScore: 65,
        moodTrend: "rapid decline",
        absences: 4,
        tardies: 3,
        behaviorReports: 2,
        currentInterventions: ["Counselor sessions", "Behavior plan"],
      },
    ];
  }, []);

  // Filter data based on search and filters
  const filteredData = useMemo(() => {
    return mockData.filter((student) => {
      // Search filter
      const matchesSearch = searchQuery === "" || 
        student.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Grade filter
      const matchesGrade = selectedGrade === "" || student.grade === selectedGrade;
      
      // Class filter
      const matchesClass = selectedClass === "" || student.class === selectedClass;
      
      // Risk level filter
      const matchesRiskLevel = 
        selectedRiskLevel === "all" || 
        (selectedRiskLevel === "at_risk" && student.status === "at_risk") ||
        (selectedRiskLevel === "concerning" && student.status === "concerning") ||
        (selectedRiskLevel === "stable" && student.status === "stable");
      
      return matchesSearch && matchesGrade && matchesClass && matchesRiskLevel;
    });
  }, [mockData, searchQuery, selectedGrade, selectedClass, selectedRiskLevel]);

  // Count students by status
  const statusCounts = useMemo(() => {
    const counts = {
      at_risk: 0,
      concerning: 0,
      stable: 0,
      total: mockData.length,
    };
    
    mockData.forEach((student) => {
      counts[student.status as keyof typeof counts] += 1;
    });
    
    return counts;
  }, [mockData]);

  // Available filters based on data
  const availableGrades = useMemo(() => {
    return Array.from(new Set(mockData.map((student) => student.grade)));
  }, [mockData]);
  
  const availableClasses = useMemo(() => {
    return Array.from(new Set(mockData.map((student) => student.class)));
  }, [mockData]);

  // Toggle real-time updates
  const toggleRealTime = () => {
    setIsRealTimeEnabled(!isRealTimeEnabled);
    toast.success(`Real-time updates ${!isRealTimeEnabled ? "enabled" : "disabled"}`);
  };

  const handleExportData = () => {
    toast.success("Exporting data...");
    // Implementation would connect to a real export service
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-heading font-bold">Student Support Heatmap</h2>
          <p className="text-muted-foreground">
            Monitor student wellness across classes and grade levels
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={toggleRealTime}>
            {isRealTimeEnabled ? "Disable" : "Enable"} Real-time
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportData}>
            Export Data
          </Button>
        </div>
      </div>

      <HeatmapStats 
        atRiskCount={statusCounts.at_risk}
        concerningCount={statusCounts.concerning}
        stableCount={statusCounts.stable}
        totalCount={statusCounts.total}
      />
      
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <SelectView 
            view={selectedView} 
            onViewChange={setSelectedView} 
            availableGrades={availableGrades}
            availableClasses={availableClasses}
            selectedGrade={selectedGrade}
            selectedClass={selectedClass}
            onGradeChange={setSelectedGrade}
            onClassChange={setSelectedClass}
            userRole={user?.role as UserRole}
          />
        </div>
      </div>

      <HeatmapFilters 
        selectedRiskLevel={selectedRiskLevel}
        onRiskLevelChange={setSelectedRiskLevel}
      />

      <Tabs defaultValue="grid">
        <TabsList>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>
        
        <TabsContent value="grid" className="pt-4">
          <HeatmapGrid 
            students={filteredData}
            view={selectedView}
          />
        </TabsContent>
        
        <TabsContent value="list" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Student List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredData.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">No students match your search criteria</p>
                ) : (
                  filteredData.map((student) => (
                    <div 
                      key={student.id}
                      className="flex items-center justify-between p-3 border rounded hover:bg-muted/30 cursor-pointer transition-all"
                    >
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-muted-foreground">
                          Grade {student.grade}, {student.class}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={
                          student.status === "at_risk" ? "bg-red-100 text-red-800 border-red-300" :
                          student.status === "concerning" ? "bg-yellow-100 text-yellow-800 border-yellow-300" :
                          "bg-green-100 text-green-800 border-green-300"
                        }>
                          {student.status === "at_risk" ? "At Risk" :
                           student.status === "concerning" ? "Concerning" : "Stable"}
                        </Badge>
                        <Button size="sm">View</Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="insights" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Insights & Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="py-8 text-center">
                <p className="text-muted-foreground">
                  AI-powered insights coming soon...
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentSupportHeatmap;
