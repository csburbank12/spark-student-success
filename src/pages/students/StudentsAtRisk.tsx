
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, AlertCircle, Clock, Calendar } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

interface Student {
  id: string;
  name: string;
  grade: string;
  riskScore: number;
  riskTrend: "up" | "down" | "stable";
  riskFactors: string[];
  lastUpdated: string;
}

const StudentsAtRisk = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Mock data for at-risk students
  const students: Student[] = [
    {
      id: "s1",
      name: "Alex Johnson",
      grade: "8",
      riskScore: 82,
      riskTrend: "up",
      riskFactors: ["Declining grades", "Increased absences", "Negative journal sentiment"],
      lastUpdated: "Today, 8:15 AM",
    },
    {
      id: "s2",
      name: "Maya Patel",
      grade: "7",
      riskScore: 65,
      riskTrend: "stable",
      riskFactors: ["Peer conflict", "Recent mood decline"],
      lastUpdated: "Today, 9:30 AM",
    },
    {
      id: "s3",
      name: "Ethan Brown",
      grade: "6",
      riskScore: 45,
      riskTrend: "down",
      riskFactors: ["Moderate absences"],
      lastUpdated: "Yesterday, 2:45 PM",
    },
    {
      id: "s4",
      name: "Zoe Martinez",
      grade: "8",
      riskScore: 78,
      riskTrend: "up",
      riskFactors: ["Behavioral incidents", "Declining grades"],
      lastUpdated: "Today, 7:50 AM",
    }
  ];

  const filteredStudents = students.filter(student => {
    // Apply search filter
    const matchesSearch = searchQuery === "" || 
      student.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply risk level filter
    if (selectedFilter === "all") return matchesSearch;
    if (selectedFilter === "high") return matchesSearch && student.riskScore >= 75;
    if (selectedFilter === "medium") return matchesSearch && student.riskScore >= 50 && student.riskScore < 75;
    if (selectedFilter === "low") return matchesSearch && student.riskScore < 50;
    
    return matchesSearch;
  });

  const handleViewDetails = (studentId: string) => {
    navigate(`/predictive-support?student=${studentId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">
          Students At Risk
        </h2>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => navigate("/wellens")}
            variant="outline"
          >
            View WellLens™ Dashboard
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
              <div className="text-2xl font-bold">{students.filter(s => s.riskScore >= 75).length}</div>
              <p className="text-sm text-muted-foreground">High Risk</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <AlertCircle className="h-8 w-8 text-amber-500 mb-2" />
              <div className="text-2xl font-bold">{students.filter(s => s.riskScore >= 50 && s.riskScore < 75).length}</div>
              <p className="text-sm text-muted-foreground">Medium Risk</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <AlertCircle className="h-8 w-8 text-green-500 mb-2" />
              <div className="text-2xl font-bold">{students.filter(s => s.riskScore < 50).length}</div>
              <p className="text-sm text-muted-foreground">Low Risk</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center">
              <Calendar className="h-8 w-8 text-primary mb-2" />
              <div className="text-2xl font-bold">8</div>
              <p className="text-sm text-muted-foreground">Active Interventions</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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
            variant={selectedFilter === "high" ? "default" : "outline"}
            onClick={() => setSelectedFilter("high")}
            size="sm"
            className="flex items-center gap-1"
          >
            <AlertCircle className="h-4 w-4 text-red-500" /> High Risk
          </Button>
          <Button 
            variant={selectedFilter === "medium" ? "default" : "outline"}
            onClick={() => setSelectedFilter("medium")}
            size="sm"
            className="flex items-center gap-1"
          >
            <AlertCircle className="h-4 w-4 text-amber-500" /> Medium Risk
          </Button>
          <Button 
            variant={selectedFilter === "low" ? "default" : "outline"}
            onClick={() => setSelectedFilter("low")}
            size="sm"
            className="flex items-center gap-1"
          >
            <AlertCircle className="h-4 w-4 text-green-500" /> Low Risk
          </Button>
        </div>
      </div>

      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Students Requiring Support</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredStudents.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No students match your filters</p>
                ) : (
                  filteredStudents.map(student => (
                    <div 
                      key={student.id}
                      className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-muted/20 cursor-pointer transition-colors"
                      onClick={() => handleViewDetails(student.id)}
                    >
                      <div className="space-y-2 md:space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{student.name}</h3>
                          <Badge variant="outline">Grade {student.grade}</Badge>
                          {student.riskTrend === "up" && (
                            <Badge variant="destructive">Increasing Risk</Badge>
                          )}
                          {student.riskTrend === "down" && (
                            <Badge variant="secondary">Decreasing Risk</Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          <span>Risk Factors: </span>
                          <span>{student.riskFactors.join(", ")}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>Updated: {student.lastUpdated}</span>
                        </div>
                      </div>

                      <div className="flex flex-col items-center mt-4 md:mt-0">
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-bold">
                            {student.riskScore}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            Risk Score
                          </span>
                        </div>
                        <div className="w-full max-w-[120px] mt-1">
                          <Progress 
                            value={student.riskScore} 
                            className={
                              student.riskScore >= 75 ? "bg-red-200" : 
                              student.riskScore >= 50 ? "bg-amber-200" : 
                              "bg-green-200"
                            }
                          />
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="grid" className="mt-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredStudents.length === 0 ? (
              <p className="col-span-full text-center text-muted-foreground py-8">No students match your filters</p>
            ) : (
              filteredStudents.map(student => (
                <Card 
                  key={student.id}
                  className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleViewDetails(student.id)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{student.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">Grade {student.grade}</p>
                      </div>
                      <Badge 
                        className={
                          student.riskScore >= 75 ? "bg-red-500" : 
                          student.riskScore >= 50 ? "bg-amber-500" : 
                          "bg-green-500"
                        }
                      >
                        {student.riskScore}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="font-medium">Risk Factors: </span>
                        <span className="text-muted-foreground">{student.riskFactors.join(", ")}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs">Risk Level</div>
                        <Progress 
                          value={student.riskScore} 
                          className={
                            student.riskScore >= 75 ? "bg-red-200" : 
                            student.riskScore >= 50 ? "bg-amber-200" : 
                            "bg-green-200"
                          }
                        />
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
                        <Clock className="h-3 w-3" />
                        <span>Updated: {student.lastUpdated}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentsAtRisk;
