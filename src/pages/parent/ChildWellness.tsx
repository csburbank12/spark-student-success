
import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, Cell
} from "recharts";

const ChildWellness = () => {
  // Mock data for mood trends - in a real app, this would be fetched from an API
  const moodData = [
    { date: "Apr 15", mood: 4, energy: 3, sleep: 7 },
    { date: "Apr 16", mood: 3, energy: 2, sleep: 6 },
    { date: "Apr 17", mood: 5, energy: 4, sleep: 8 },
    { date: "Apr 18", mood: 4, energy: 4, sleep: 7 },
    { date: "Apr 19", mood: 3, energy: 3, sleep: 7 },
    { date: "Apr 20", mood: 4, energy: 5, sleep: 8 },
    { date: "Apr 21", mood: 5, energy: 5, sleep: 9 },
  ];

  const sleepData = [
    { date: "Apr 15", hours: 7.5, quality: 72 },
    { date: "Apr 16", hours: 6.8, quality: 65 },
    { date: "Apr 17", hours: 8.2, quality: 85 },
    { date: "Apr 18", hours: 7.2, quality: 70 },
    { date: "Apr 19", hours: 7.5, quality: 75 },
    { date: "Apr 20", hours: 8.0, quality: 82 },
    { date: "Apr 21", hours: 8.5, quality: 90 },
  ];

  const wellnessActivities = [
    {
      name: "Breathing Exercises",
      completions: 5,
      lastCompleted: "Today",
      effectiveness: 85,
    },
    {
      name: "Guided Meditation",
      completions: 3,
      lastCompleted: "Yesterday",
      effectiveness: 90,
    },
    {
      name: "Journaling",
      completions: 7,
      lastCompleted: "Today",
      effectiveness: 75,
    },
    {
      name: "Physical Activity",
      completions: 4,
      lastCompleted: "2 days ago",
      effectiveness: 95,
    },
  ];

  const stressorsData = [
    { name: "School Work", value: 40 },
    { name: "Social Interactions", value: 30 },
    { name: "Time Management", value: 20 },
    { name: "Other", value: 10 },
  ];

  const COLORS = ['#8b5cf6', '#ec4899', '#14b8a6', '#f59e0b'];

  // Custom tooltip for mood chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const moodLabels = ["Very Low", "Low", "Neutral", "Good", "Great"];
      
      return (
        <div className="bg-card border rounded-md p-3 shadow-sm">
          <p className="font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name === "mood" ? 
                `Mood: ${moodLabels[entry.value - 1]}` : 
                entry.name === "energy" ? 
                  `Energy: ${entry.value}/5` : 
                  `Sleep: ${entry.value} hrs`
              }
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

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
          <TabsTrigger value="insights">Insights & Recommendations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="mood" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Mood Overview</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={moodData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="mood"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                    name="Mood"
                  />
                  <Line
                    type="monotone"
                    dataKey="energy"
                    stroke="#14b8a6"
                    strokeWidth={2}
                    name="Energy"
                  />
                </LineChart>
              </ResponsiveContainer>
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
                  <div className="flex items-center mt-2">
                    <span className="text-sm mr-2">Mood: </span>
                    <span className="text-xl">😃</span>
                  </div>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4 py-2">
                  <p className="text-sm text-muted-foreground">April 21, 2025</p>
                  <p className="font-medium">Feeling a bit nervous</p>
                  <p className="text-sm mt-1">Worried about tomorrow's presentation, but I practiced a lot.</p>
                  <div className="flex items-center mt-2">
                    <span className="text-sm mr-2">Mood: </span>
                    <span className="text-xl">😐</span>
                  </div>
                </div>
                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <p className="text-sm text-muted-foreground">April 20, 2025</p>
                  <p className="font-medium">Good day overall</p>
                  <p className="text-sm mt-1">Got an A on my math test! Spent time with friends at lunch.</p>
                  <div className="flex items-center mt-2">
                    <span className="text-sm mr-2">Mood: </span>
                    <span className="text-xl">🙂</span>
                  </div>
                </div>
              </div>
              <Button variant="link" className="mt-4 px-0">View more entries</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Potential Stressors</CardTitle>
            </CardHeader>
            <CardContent className="h-80 flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/2 h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={stressorsData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="name" type="category" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" name="Frequency Mentioned">
                      {stressorsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full md:w-1/2 p-4 space-y-4">
                <h4 className="font-medium">Common Topics in Check-ins:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-primary"></span>
                    <span>Homework and tests</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-pink-500"></span>
                    <span>Friend group dynamics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-teal-500"></span>
                    <span>After-school activities</span>
                  </li>
                </ul>
                <p className="text-sm text-muted-foreground mt-4">
                  Based on analysis of mood check-ins and journal entries from the past 30 days.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sleep" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Sleep Patterns</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={sleepData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" domain={[0, 12]} />
                  <YAxis yAxisId="right" orientation="right" domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="hours"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    name="Sleep Duration (hours)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="quality"
                    stroke="#14b8a6"
                    strokeWidth={2}
                    name="Sleep Quality (%)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sleep Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Average Sleep Duration</span>
                      <span className="text-sm font-medium">7.7 hrs</span>
                    </div>
                    <Progress value={77} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">Recommended: 8-10 hours</p>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Sleep Quality</span>
                      <span className="text-sm font-medium">77%</span>
                    </div>
                    <Progress value={77} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Bedtime Consistency</span>
                      <span className="text-sm font-medium">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sleep Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="text-sm border-l-2 border-primary pl-3 py-1">
                    Sleep improved on nights after physical activity
                  </li>
                  <li className="text-sm border-l-2 border-primary pl-3 py-1">
                    Screen time before bed correlates with lower sleep quality
                  </li>
                  <li className="text-sm border-l-2 border-primary pl-3 py-1">
                    Consistent bedtime routine shows positive impact
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-muted rounded-md">
                  <h4 className="font-medium text-sm mb-2">Recommendation:</h4>
                  <p className="text-sm">
                    Consider implementing a 30-minute wind-down period before bed without screens. Reading a physical book has shown positive results for similar sleep patterns.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="activities" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Wellness Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {wellnessActivities.map((activity, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">{activity.name}</h3>
                      <Badge variant="outline">{activity.completions} sessions</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">Last completed: {activity.lastCompleted}</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Reported Effectiveness</span>
                        <span>{activity.effectiveness}%</span>
                      </div>
                      <Progress value={activity.effectiveness} className="h-2" />
                    </div>
                  </div>
                ))}
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
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Gratitude Journaling</h3>
                    <Button size="sm">Suggest to Child</Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Improves outlook and emotional regulation</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center border-t p-4">
              <Button variant="outline">Browse Activity Library</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="insights" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Wellness Insights & Patterns</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 border-l-4 border-primary rounded-r-lg bg-muted/30">
                <h3 className="font-medium mb-2">Mood Pattern Detected</h3>
                <p className="text-sm">
                  There appears to be a consistent dip in mood on Mondays and Wednesdays, 
                  potentially correlating with math and science test schedules. 
                  Consider checking in about academic pressure on these days.
                </p>
              </div>
              
              <div className="p-4 border-l-4 border-green-500 rounded-r-lg bg-green-50/30">
                <h3 className="font-medium mb-2">Positive Trend</h3>
                <p className="text-sm">
                  Wellness activities have increased by 35% in the last month, with a 
                  corresponding 20% improvement in reported mood. The breathing exercises 
                  appear particularly effective based on check-in data.
                </p>
              </div>
              
              <div className="p-4 border-l-4 border-amber-500 rounded-r-lg bg-amber-50/30">
                <h3 className="font-medium mb-2">Suggestion</h3>
                <p className="text-sm">
                  Based on journal entries, Alex may benefit from additional support with 
                  time management. Consider discussing strategies for balancing schoolwork 
                  with extracurricular activities.
                </p>
              </div>
              
              <div className="bg-card border rounded-lg p-4">
                <h3 className="font-medium mb-3">Conversation Starters</h3>
                <ul className="space-y-2">
                  <li className="text-sm border-l-2 border-primary pl-3 py-1">
                    "I noticed you've been doing your breathing exercises consistently. How have they been helping you?"
                  </li>
                  <li className="text-sm border-l-2 border-primary pl-3 py-1">
                    "Your science project seems important to you. What aspects are you most excited about?"
                  </li>
                  <li className="text-sm border-l-2 border-primary pl-3 py-1">
                    "You mentioned feeling rushed with assignments lately. Would it help to talk about ways to manage your schedule?"
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Progress Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Wellness Check-in Completion</h4>
                  <div className="flex items-center">
                    <div className="w-full mr-2">
                      <Progress value={85} className="h-2" />
                    </div>
                    <span className="text-sm font-medium">85%</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">26 of 30 days completed</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Mood Improvement</h4>
                  <div className="flex items-center">
                    <div className="w-full mr-2">
                      <Progress value={25} className="h-2" />
                    </div>
                    <span className="text-sm font-medium">+25%</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Compared to previous month</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Wellness Activity Engagement</h4>
                  <div className="flex items-center">
                    <div className="w-full mr-2">
                      <Progress value={70} className="h-2" />
                    </div>
                    <span className="text-sm font-medium">70%</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">14 activities completed this month</p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Recommendations for Next Month</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Continue encouraging consistent sleep schedule</li>
                  <li>• Introduce more physical activity options</li>
                  <li>• Consider scheduling a check-in about academic pressures</li>
                  <li>• Review and update wellness goals together</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center border-t p-4">
              <Button>Download Full Report</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChildWellness;
