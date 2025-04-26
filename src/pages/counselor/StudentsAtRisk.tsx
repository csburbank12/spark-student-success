import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

// Mock data for at-risk students
const atRiskStudents = [
  { 
    id: "s1", 
    name: "Alex Johnson", 
    grade: "10th", 
    riskLevel: "high",
    riskFactors: ["Mood decline", "Attendance issues", "Recent family change"],
    lastCheckIn: "3 days ago",
    assignedTo: "Dr. Martinez"
  },
  { 
    id: "s2", 
    name: "Lily Chen", 
    grade: "9th", 
    riskLevel: "medium",
    riskFactors: ["Academic pressure", "Social isolation"],
    lastCheckIn: "Yesterday",
    assignedTo: "Ms. Thompson"
  },
  { 
    id: "s3", 
    name: "Emma Davis", 
    grade: "11th", 
    riskLevel: "medium",
    riskFactors: ["Chronic stress", "Sleep issues"],
    lastCheckIn: "5 days ago",
    assignedTo: "Unassigned"
  },
  { 
    id: "s4", 
    name: "Noah Williams", 
    grade: "8th", 
    riskLevel: "high",
    riskFactors: ["Behavioral incidents", "Peer conflict", "Home stressors"],
    lastCheckIn: "Today",
    assignedTo: "Dr. Johnson"
  },
  { 
    id: "s5", 
    name: "Sofia Martinez", 
    grade: "12th", 
    riskLevel: "low",
    riskFactors: ["College transition anxiety"],
    lastCheckIn: "2 days ago",
    assignedTo: "Ms. Reynolds"
  },
];

const StudentsAtRisk: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-3xl font-heading font-bold">Students At Risk</h2>
        
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search students..." 
              className="pl-8 w-full sm:w-[200px] lg:w-[300px]" 
            />
          </div>
          <Button>New Intervention</Button>
        </div>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Students</TabsTrigger>
          <TabsTrigger value="high">High Risk</TabsTrigger>
          <TabsTrigger value="medium">Medium Risk</TabsTrigger>
          <TabsTrigger value="low">Low Risk</TabsTrigger>
          <TabsTrigger value="unassigned">Unassigned</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Students Requiring Support</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {atRiskStudents.map((student) => (
                  <div key={student.id} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{student.name}</h3>
                          <span className="text-sm text-muted-foreground">{student.grade} Grade</span>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          {student.riskFactors.map((factor, idx) => (
                            <span 
                              key={idx} 
                              className="inline-block text-xs px-2 py-1 rounded-full bg-muted"
                            >
                              {factor}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          student.riskLevel === 'high' 
                            ? 'bg-red-100 text-red-800' 
                            : student.riskLevel === 'medium'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-green-100 text-green-800'
                        }`}>
                          {student.riskLevel === 'high' ? 'High Risk' : student.riskLevel === 'medium' ? 'Medium Risk' : 'Low Risk'}
                        </span>
                        <Button size="sm">View Profile</Button>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-3 pt-3 border-t gap-2">
                      <div className="flex items-center gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Last Check-in:</span> {student.lastCheckIn}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Assigned to:</span> {student.assignedTo}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">Assign Staff</Button>
                        <Button variant="outline" size="sm">Create Plan</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="high" className="pt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>High Risk Students</CardTitle>
              <div className="inline-flex items-center space-x-1 rounded-md bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                <AlertCircle className="h-3 w-3 mr-1" />
                Immediate Attention Required
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {atRiskStudents
                  .filter(student => student.riskLevel === 'high')
                  .map((student) => (
                    <div key={student.id} className="p-4 border rounded-lg border-red-200 bg-red-50">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{student.name}</h3>
                            <span className="text-sm text-muted-foreground">{student.grade} Grade</span>
                          </div>
                          <div className="flex gap-2 flex-wrap">
                            {student.riskFactors.map((factor, idx) => (
                              <span 
                                key={idx} 
                                className="inline-block text-xs px-2 py-1 rounded-full bg-muted"
                              >
                                {factor}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm">View Profile</Button>
                          <Button size="sm" variant="destructive">Urgent Action</Button>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-3 pt-3 border-t gap-2">
                        <div className="flex items-center gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Last Check-in:</span> {student.lastCheckIn}
                          </div>
                          <div>
                            <span className="text-muted-foreground">Assigned to:</span> {student.assignedTo}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">Intervention History</Button>
                          <Button variant="outline" size="sm">Team Meeting</Button>
                        </div>
                      </div>
                    </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Other tabs would have similar content filtered by risk level */}
        <TabsContent value="medium" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Medium Risk Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-40">
                <p className="text-muted-foreground">Content filtered for medium risk students</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="low" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Low Risk Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-40">
                <p className="text-muted-foreground">Content filtered for low risk students</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="unassigned" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Unassigned Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-40">
                <p className="text-muted-foreground">Content filtered for unassigned students</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentsAtRisk;
