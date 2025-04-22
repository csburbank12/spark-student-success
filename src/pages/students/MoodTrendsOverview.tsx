
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MoodTrendsOverview = () => {
  // In a real application, this data would come from the database
  const moodTrendData = [
    { date: "Mon", happy: 24, good: 35, okay: 20, sad: 12, stressed: 9 },
    { date: "Tue", happy: 20, good: 36, okay: 21, sad: 14, stressed: 9 },
    { date: "Wed", happy: 18, good: 30, okay: 25, sad: 15, stressed: 12 },
    { date: "Thu", happy: 22, good: 32, okay: 22, sad: 14, stressed: 10 },
    { date: "Fri", happy: 26, good: 34, okay: 20, sad: 12, stressed: 8 },
  ];
  
  const moodDistributionData = [
    { name: "Happy", value: 24, color: "#10b981" },
    { name: "Good", value: 35, color: "#3b82f6" },
    { name: "Okay", value: 20, color: "#f59e0b" },
    { name: "Sad", value: 12, color: "#6b7280" },
    { name: "Stressed", value: 9, color: "#ef4444" },
  ];
  
  const riskTrendData = [
    { date: "Jan", high: 5, medium: 12, low: 83 },
    { date: "Feb", high: 6, medium: 14, low: 80 },
    { date: "Mar", high: 8, medium: 15, low: 77 },
    { date: "Apr", high: 7, medium: 16, low: 77 },
    { date: "May", high: 6, medium: 13, low: 81 },
    { date: "Jun", high: 5, medium: 12, low: 83 },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
        <div>
          <h3 className="text-lg font-medium">Mood Tracking Dashboard</h3>
          <p className="text-muted-foreground text-sm">Monitor student emotional wellness trends over time</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Select defaultValue="week">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="semester">This Semester</SelectItem>
            </SelectContent>
          </Select>
          
          <Select defaultValue="all">
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Grade Level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Grades</SelectItem>
              <SelectItem value="9">Grade 9</SelectItem>
              <SelectItem value="10">Grade 10</SelectItem>
              <SelectItem value="11">Grade 11</SelectItem>
              <SelectItem value="12">Grade 12</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Daily Mood Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={moodTrendData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`${value} students`, '']}
                  wrapperStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }}
                />
                <Bar dataKey="happy" name="Happy" stackId="a" fill="#10b981" />
                <Bar dataKey="good" name="Good" stackId="a" fill="#3b82f6" />
                <Bar dataKey="okay" name="Okay" stackId="a" fill="#f59e0b" />
                <Bar dataKey="sad" name="Sad" stackId="a" fill="#6b7280" />
                <Bar dataKey="stressed" name="Stressed" stackId="a" fill="#ef4444" />
                <Legend />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Current Mood Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={moodDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {moodDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip 
                  formatter={(value) => [`${value} students`, '']}
                  wrapperStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Risk Level Trends</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={riskTrendData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`${value}%`, '']}
                wrapperStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)"
                }}
              />
              <Line type="monotone" dataKey="high" name="High Risk" stroke="#ef4444" strokeWidth={2} />
              <Line type="monotone" dataKey="medium" name="Medium Risk" stroke="#f59e0b" strokeWidth={2} />
              <Line type="monotone" dataKey="low" name="Low Risk" stroke="#10b981" strokeWidth={2} />
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Mood Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-red-50 border border-red-100 rounded-md">
                <h4 className="font-medium text-sm">Stress levels increased by 5%</h4>
                <p className="text-xs text-muted-foreground">Compared to previous week</p>
              </div>
              
              <div className="p-3 bg-green-50 border border-green-100 rounded-md">
                <h4 className="font-medium text-sm">Happiness up 3% on Fridays</h4>
                <p className="text-xs text-muted-foreground">Weekend anticipation effect</p>
              </div>
              
              <div className="p-3 bg-amber-50 border border-amber-100 rounded-md">
                <h4 className="font-medium text-sm">Mid-week dip identified</h4>
                <p className="text-xs text-muted-foreground">Wednesday shows lowest mood scores</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Mood Correlations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Academic Stress & Mood</span>
                <span className="text-sm font-medium">High correlation</span>
              </div>
              <div className="h-2 bg-muted rounded-full">
                <div className="h-2 bg-primary rounded-full" style={{ width: '80%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Sleep & Energy Levels</span>
                <span className="text-sm font-medium">Medium correlation</span>
              </div>
              <div className="h-2 bg-muted rounded-full">
                <div className="h-2 bg-primary rounded-full" style={{ width: '65%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Social Activities & Happiness</span>
                <span className="text-sm font-medium">High correlation</span>
              </div>
              <div className="h-2 bg-muted rounded-full">
                <div className="h-2 bg-primary rounded-full" style={{ width: '85%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Weather & Mood</span>
                <span className="text-sm font-medium">Low correlation</span>
              </div>
              <div className="h-2 bg-muted rounded-full">
                <div className="h-2 bg-primary rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Recommended Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border rounded-md">
                <h4 className="font-medium text-sm">Schedule Stress-Relief Workshop</h4>
                <p className="text-xs text-muted-foreground mb-2">For 9th graders showing stress indicators</p>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Impact: High</span>
                  <span className="text-primary font-medium">Suggested</span>
                </div>
              </div>
              
              <div className="p-3 border rounded-md">
                <h4 className="font-medium text-sm">Contact Parents of At-Risk Students</h4>
                <p className="text-xs text-muted-foreground mb-2">5 students showing persistent low mood</p>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Priority: High</span>
                  <span className="text-destructive font-medium">Urgent</span>
                </div>
              </div>
              
              <div className="p-3 border rounded-md">
                <h4 className="font-medium text-sm">Implement Midweek Wellness Break</h4>
                <p className="text-xs text-muted-foreground mb-2">To address Wednesday mood dips</p>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Impact: Medium</span>
                  <span className="text-amber-500 font-medium">Consider</span>
                </div>
              </div>
              
              <div className="p-3 border rounded-md">
                <h4 className="font-medium text-sm">Review Academic Pressure</h4>
                <p className="text-xs text-muted-foreground mb-2">High correlation with stress levels</p>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Impact: High</span>
                  <span className="text-primary font-medium">Suggested</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MoodTrendsOverview;
