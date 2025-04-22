
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface Student {
  id: string;
  full_name: string;
  email: string;
}

interface StudentRiskDashboardProps {
  students: Student[];
}

const StudentRiskDashboard: React.FC<StudentRiskDashboardProps> = ({ students }) => {
  // In a real application, these would be calculated from actual data
  const highRiskCount = Math.floor(students.length * 0.15);
  const mediumRiskCount = Math.floor(students.length * 0.25);
  const lowRiskCount = students.length - highRiskCount - mediumRiskCount;
  
  // Mock data for risk factors (in a real app, this would be from actual data)
  const riskFactors = [
    { name: "Mood Decline", count: Math.floor(highRiskCount * 0.7), percentage: 70 },
    { name: "Attendance Issues", count: Math.floor(highRiskCount * 0.5), percentage: 50 },
    { name: "Social Isolation", count: Math.floor(highRiskCount * 0.4), percentage: 40 },
    { name: "Academic Struggles", count: Math.floor(highRiskCount * 0.6), percentage: 60 },
    { name: "Behavioral Concerns", count: Math.floor(highRiskCount * 0.3), percentage: 30 },
  ];
  
  // Mock data for high risk students
  const highRiskStudents = students
    .slice(0, highRiskCount)
    .map(student => ({
      ...student,
      riskFactors: riskFactors
        .filter(() => Math.random() > 0.5)
        .map(factor => factor.name),
      daysInRisk: Math.floor(Math.random() * 14) + 1
    }));
    
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Risk Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">High Risk</span>
                  <Badge variant="destructive">{highRiskCount}</Badge>
                </div>
                <Progress value={(highRiskCount / students.length) * 100} className="h-2 bg-red-100" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Medium Risk</span>
                  <Badge variant="warning">{mediumRiskCount}</Badge>
                </div>
                <Progress value={(mediumRiskCount / students.length) * 100} className="h-2 bg-amber-100" />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Low Risk</span>
                  <Badge variant="outline">{lowRiskCount}</Badge>
                </div>
                <Progress value={(lowRiskCount / students.length) * 100} className="h-2 bg-gray-100" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Top Risk Factors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riskFactors.map((factor, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{factor.name}</span>
                    <span className="text-xs text-muted-foreground">{factor.count} students</span>
                  </div>
                  <Progress value={factor.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Action Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-red-50 border border-red-100 rounded-md">
                <h4 className="font-medium text-sm mb-1">{highRiskCount} students require immediate attention</h4>
                <p className="text-xs text-muted-foreground mb-2">Students showing multiple risk factors</p>
                <Button size="sm" className="w-full">Review High Risk Students</Button>
              </div>
              
              <div className="p-3 bg-amber-50 border border-amber-100 rounded-md">
                <h4 className="font-medium text-sm mb-1">{mediumRiskCount} students need monitoring</h4>
                <p className="text-xs text-muted-foreground mb-2">Students showing early warning signs</p>
                <Button size="sm" variant="outline" className="w-full">Review Medium Risk Students</Button>
              </div>
              
              <div className="p-3 bg-blue-50 border border-blue-100 rounded-md">
                <h4 className="font-medium text-sm mb-1">Support Plan Update</h4>
                <p className="text-xs text-muted-foreground mb-2">3 support plans need updating this week</p>
                <Button size="sm" variant="outline" className="w-full">Review Support Plans</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>High Risk Students</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {highRiskStudents.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No high risk students identified</p>
            ) : (
              <Tabs defaultValue="list">
                <TabsList className="mb-4">
                  <TabsTrigger value="list">List View</TabsTrigger>
                  <TabsTrigger value="cards">Card View</TabsTrigger>
                </TabsList>
                
                <TabsContent value="list">
                  <div className="border rounded-md">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted/50">
                          <th className="text-left p-3 text-sm">Student</th>
                          <th className="text-left p-3 text-sm">Risk Factors</th>
                          <th className="text-left p-3 text-sm">Days at Risk</th>
                          <th className="text-left p-3 text-sm">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {highRiskStudents.map((student) => (
                          <tr key={student.id} className="hover:bg-muted/20">
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                  <span className="text-xs font-medium text-primary">
                                    {student.full_name.charAt(0)}
                                  </span>
                                </div>
                                <div>
                                  <div className="font-medium text-sm">{student.full_name}</div>
                                  <div className="text-xs text-muted-foreground">{student.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="p-3">
                              <div className="flex flex-wrap gap-1">
                                {student.riskFactors.map((factor, idx) => (
                                  <Badge key={idx} variant="outline" className="bg-background">{factor}</Badge>
                                ))}
                              </div>
                            </td>
                            <td className="p-3">
                              <Badge 
                                variant={student.daysInRisk > 7 ? "destructive" : "outline"}
                                className={student.daysInRisk > 7 ? "" : "bg-background"}
                              >
                                {student.daysInRisk} {student.daysInRisk === 1 ? 'day' : 'days'}
                              </Badge>
                            </td>
                            <td className="p-3">
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">Create Plan</Button>
                                <Button size="sm">Contact</Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
                
                <TabsContent value="cards">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {highRiskStudents.map((student) => (
                      <Card key={student.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-sm font-medium text-primary">
                                {student.full_name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <div className="font-medium">{student.full_name}</div>
                              <div className="text-sm text-muted-foreground">At risk for {student.daysInRisk} days</div>
                            </div>
                          </div>
                          
                          <div className="mb-3">
                            <div className="text-sm font-medium mb-2">Risk Factors:</div>
                            <div className="flex flex-wrap gap-1">
                              {student.riskFactors.map((factor, idx) => (
                                <Badge key={idx} variant="outline" className="bg-background">{factor}</Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="flex-1">Create Plan</Button>
                            <Button size="sm" className="flex-1">Contact</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentRiskDashboard;
