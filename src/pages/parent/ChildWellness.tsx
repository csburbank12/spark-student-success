
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from "recharts";
import { 
  Calendar, 
  Moon, 
  Sun, 
  Heart, 
  Activity, 
  Lightbulb,
  Brain,
  Clock,
  MessageCircle,
  AlertCircle
} from "lucide-react";

// Fixed the Tooltip interface to match what recharts expects
interface TooltipContent {
  active?: boolean;
  payload?: Array<{
    value: any;
    name: string;
    dataKey: string;
    color?: string;
  }>;
  label?: string;
}

const CustomTooltip: React.FC<TooltipContent> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background p-3 border rounded-md shadow-md">
        <p className="font-medium">{`${label}`}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color || 'inherit' }} className="text-sm">
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const ChildWellness = () => {
  // Mock data for charts
  const moodTrendData = [
    { date: "4/15", mood: 3, energy: 2, sleep: 6 },
    { date: "4/16", mood: 2, energy: 2, sleep: 5 },
    { date: "4/17", mood: 3, energy: 3, sleep: 7 },
    { date: "4/18", mood: 4, energy: 4, sleep: 8 },
    { date: "4/19", mood: 3, energy: 3, sleep: 7 },
    { date: "4/20", mood: 5, energy: 4, sleep: 9 },
    { date: "4/21", mood: 4, energy: 5, sleep: 8 }
  ];

  const sleepQualityData = [
    { date: "4/15", quality: 60 },
    { date: "4/16", quality: 45 },
    { date: "4/17", quality: 70 },
    { date: "4/18", quality: 85 },
    { date: "4/19", quality: 75 },
    { date: "4/20", quality: 90 },
    { date: "4/21", quality: 80 }
  ];

  const emotionDistributionData = [
    { name: "Happy", value: 45, color: "#10B981" },
    { name: "Content", value: 25, color: "#3B82F6" },
    { name: "Neutral", value: 15, color: "#9CA3AF" },
    { name: "Sad", value: 10, color: "#6B7280" },
    { name: "Anxious", value: 5, color: "#EF4444" }
  ];

  const COLORS = ["#10B981", "#3B82F6", "#9CA3AF", "#6B7280", "#EF4444"];

  const wellnessInsights = [
    {
      id: 1,
      icon: <Activity className="h-5 w-5 text-emerald-500" />,
      title: "Mood Trend",
      insight: "Overall positive trend in the last 7 days, with an upward pattern",
      recommendation: "Continue with current wellness activities"
    },
    {
      id: 2,
      icon: <Moon className="h-5 w-5 text-blue-500" />,
      title: "Sleep Pattern",
      insight: "Improved sleep duration and quality since last week",
      recommendation: "Maintain consistent bedtime routine"
    },
    {
      id: 3,
      icon: <Brain className="h-5 w-5 text-purple-500" />,
      title: "Stress Management",
      insight: "Lower stress indicators than previous month",
      recommendation: "Continue with breathing exercises and mindfulness"
    },
    {
      id: 4,
      icon: <AlertCircle className="h-5 w-5 text-amber-500" />,
      title: "Alert",
      insight: "Mentioned feeling overwhelmed with homework on Tuesday",
      recommendation: "Discuss time management strategies"
    }
  ];

  const conversationStarters = [
    {
      id: 1,
      topic: "Recent Achievement",
      question: "Alex seemed proud of their science project. Ask what they enjoyed most about it.",
      icon: <Lightbulb className="h-4 w-4 text-amber-500" />
    },
    {
      id: 2,
      topic: "Emotional Support",
      question: "Alex mentioned feeling stressed about upcoming exams. Ask how you might help them prepare.",
      icon: <Heart className="h-4 w-4 text-pink-500" />
    },
    {
      id: 3,
      topic: "Social Connection",
      question: "Alex has been participating more in group activities. Ask about new friends they've made.",
      icon: <MessageCircle className="h-4 w-4 text-blue-500" />
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">Child Wellness</h2>
        <Button>Download Report</Button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="mood">Mood & Emotions</TabsTrigger>
          <TabsTrigger value="sleep">Sleep Patterns</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Weekly Wellness Summary</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={moodTrendData} margin={{ top: 5, right: 20, bottom: 25, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="date" 
                      stroke="hsl(var(--foreground))"
                      tick={{ fontSize: 12 }}
                      tickLine={{ stroke: 'hsl(var(--border))' }}
                    />
                    <YAxis 
                      stroke="hsl(var(--foreground))" 
                      tick={{ fontSize: 12 }}
                      tickLine={{ stroke: 'hsl(var(--border))' }}
                      domain={[0, 5]}
                      ticks={[0, 1, 2, 3, 4, 5]}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ paddingTop: 15 }} />
                    <Line 
                      type="monotone" 
                      dataKey="mood" 
                      name="Mood" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="energy" 
                      name="Energy" 
                      stroke="#10B981" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Emotion Distribution</CardTitle>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={emotionDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {emotionDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="mood">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Detailed Mood Trends</CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={moodTrendData} margin={{ top: 5, right: 30, bottom: 30, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="date" 
                    stroke="hsl(var(--foreground))"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    stroke="hsl(var(--foreground))" 
                    tick={{ fontSize: 12 }}
                    domain={[0, 5]}
                    ticks={[0, 1, 2, 3, 4, 5]}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ paddingTop: 20 }} />
                  <Line 
                    type="monotone" 
                    dataKey="mood" 
                    name="Mood (1-5)" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Regular Emotions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Happy</span>
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">45%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Content</span>
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">25%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Neutral</span>
                    <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">15%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Sad</span>
                    <Badge variant="outline" className="bg-gray-100 text-gray-600 border-gray-200">10%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Anxious</span>
                    <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">5%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Mood Triggers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Positive Mood Triggers</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Social activities</Badge>
                      <Badge variant="secondary">Creative projects</Badge>
                      <Badge variant="secondary">Outdoor play</Badge>
                      <Badge variant="secondary">Reading</Badge>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Negative Mood Triggers</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Test anxiety</Badge>
                      <Badge variant="outline">Conflicts with peers</Badge>
                      <Badge variant="outline">Lack of sleep</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="sleep">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Sleep Quality</CardTitle>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sleepQualityData} margin={{ top: 5, right: 30, bottom: 30, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="date" 
                    stroke="hsl(var(--foreground))"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    stroke="hsl(var(--foreground))" 
                    tick={{ fontSize: 12 }}
                    domain={[0, 100]}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar 
                    dataKey="quality" 
                    name="Sleep Quality (%)" 
                    fill="#8884d8"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sleep Duration</CardTitle>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={moodTrendData} margin={{ top: 5, right: 20, bottom: 25, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="date" 
                      stroke="hsl(var(--foreground))"
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis 
                      stroke="hsl(var(--foreground))" 
                      tick={{ fontSize: 12 }}
                      domain={[0, 12]}
                      ticks={[0, 2, 4, 6, 8, 10, 12]}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                      dataKey="sleep" 
                      name="Hours of Sleep" 
                      fill="#0EA5E9" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sleep Patterns</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Moon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Average Sleep Duration</p>
                      <p className="text-sm text-muted-foreground">7.1 hours (0.5 hours above last week)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <Clock className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="font-medium">Average Bedtime</p>
                      <p className="text-sm text-muted-foreground">10:15 PM (15 minutes earlier than last week)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                      <Sun className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-medium">Average Wake Time</p>
                      <p className="text-sm text-muted-foreground">7:20 AM (consistent with last week)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="insights">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Wellness Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {wellnessInsights.map(insight => (
                      <div key={insight.id} className="flex gap-4">
                        <div className="mt-0.5">
                          {insight.icon}
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">{insight.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{insight.insight}</p>
                          <p className="text-sm font-medium">Recommendation: {insight.recommendation}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Conversation Starters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {conversationStarters.map(starter => (
                    <div key={starter.id} className="p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-2 mb-1.5">
                        {starter.icon}
                        <span className="font-medium text-sm">{starter.topic}</span>
                      </div>
                      <p className="text-sm">{starter.question}</p>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">More Conversation Ideas</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChildWellness;
