
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BarChart3, Activity, Download, Calendar, Filter } from "lucide-react";

const DataAnalytics = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('30days');
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-3xl font-heading font-bold">Data Analytics</h2>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Select Time Range
          </Button>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter Data
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Reports
          </Button>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Key Performance Metrics</h3>
        <div className="flex items-center gap-2">
          <select 
            className="rounded-md border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Check-in Completion Rate</p>
                <h3 className="text-2xl font-bold">84%</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <Activity className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <div className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">+5%</div>
              <p className="text-xs text-muted-foreground">vs. previous period</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Intervention Effectiveness</p>
                <h3 className="text-2xl font-bold">76%</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Activity className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <div className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">+2%</div>
              <p className="text-xs text-muted-foreground">vs. previous period</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">SEL Pathway Completion</p>
                <h3 className="text-2xl font-bold">68%</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Activity className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <div className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-800">-3%</div>
              <p className="text-xs text-muted-foreground">vs. previous period</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="usage">
        <TabsList>
          <TabsTrigger value="usage">Platform Usage</TabsTrigger>
          <TabsTrigger value="mood">Mood Trends</TabsTrigger>
          <TabsTrigger value="sel">SEL Progress</TabsTrigger>
          <TabsTrigger value="intervention">Interventions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="usage" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Platform Usage by School</CardTitle>
              <CardDescription>Daily active users as percentage of total population</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-80 flex items-center justify-center">
                <div className="flex items-center">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mr-4" />
                  <p className="text-muted-foreground">Usage analytics visualization coming soon</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Feature Adoption</CardTitle>
                <CardDescription>Most used platform features</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Daily Check-ins</span>
                      <span className="text-sm text-muted-foreground">92%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded">
                      <div className="h-2 bg-blue-600 rounded" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">SEL Lessons</span>
                      <span className="text-sm text-muted-foreground">78%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded">
                      <div className="h-2 bg-blue-600 rounded" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Digital Journal</span>
                      <span className="text-sm text-muted-foreground">65%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded">
                      <div className="h-2 bg-blue-600 rounded" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Reset Room</span>
                      <span className="text-sm text-muted-foreground">42%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded">
                      <div className="h-2 bg-blue-600 rounded" style={{ width: '42%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>User Engagement</CardTitle>
                <CardDescription>Weekly active users by role</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-64 flex items-center justify-center">
                  <p className="text-muted-foreground">Engagement analytics visualization coming soon</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="mood" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>School-wide Mood Trends</CardTitle>
              <CardDescription>Average reported mood by school over time</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-80 flex items-center justify-center">
                <p className="text-muted-foreground">Mood trends visualization coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sel" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>SEL Pathway Analytics</CardTitle>
              <CardDescription>Progress metrics across schools</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-80 flex items-center justify-center">
                <p className="text-muted-foreground">SEL analytics visualization coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="intervention" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Intervention Effectiveness</CardTitle>
              <CardDescription>Impact analysis by intervention type</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-80 flex items-center justify-center">
                <p className="text-muted-foreground">Intervention analytics visualization coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>Data Insights & Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md bg-blue-50 p-4">
            <h3 className="font-medium text-blue-800">Key Findings</h3>
            <ul className="list-disc list-inside text-sm text-blue-700 mt-2 space-y-1">
              <li>Washington High School shows 15% higher engagement rates than other schools</li>
              <li>Mindfulness activities are the most effective intervention across all schools</li>
              <li>Morning check-ins (8-10 AM) show higher completion rates than afternoon sessions</li>
              <li>Students with regular check-ins show 23% better SEL pathway progress</li>
            </ul>
          </div>
          
          <div className="rounded-md bg-green-50 p-4">
            <h3 className="font-medium text-green-800">Recommendations</h3>
            <ul className="list-disc list-inside text-sm text-green-700 mt-2 space-y-1">
              <li>Expand mindfulness training program to all schools</li>
              <li>Prioritize morning check-in schedules and reminders</li>
              <li>Target intervention resources toward Lincoln Middle School where engagement is lowest</li>
              <li>Implement Washington High School's teacher training approach across other schools</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataAnalytics;
