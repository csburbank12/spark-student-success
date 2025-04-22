
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format, subDays } from "date-fns";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area, ScatterChart, Scatter, Cell, Rectangle, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { AlertTriangle, TrendingUp, TrendingDown, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface JournalEntry {
  id: string;
  date: Date;
  content: string;
  sentiment: {
    score: number;
    label: "positive" | "neutral" | "negative" | "concerning";
    flagged: boolean;
  };
}

interface JournalSentimentChartProps {
  entries: JournalEntry[];
}

const JournalSentimentChart: React.FC<JournalSentimentChartProps> = ({ entries }) => {
  // Sort entries by date
  const sortedEntries = [...entries].sort((a, b) => a.date.getTime() - b.date.getTime());

  // Transform entries into chart data
  const chartData = sortedEntries.map((entry) => ({
    date: format(entry.date, "MMM d"),
    sentiment: entry.sentiment.score,
    label: entry.sentiment.label,
  }));

  // Calculate average sentiment score
  const averageSentiment = entries.length > 0
    ? Math.round((entries.reduce((acc, entry) => acc + entry.sentiment.score, 0) / entries.length) * 100) / 100
    : 0;

  // Count sentiment labels
  const sentimentCounts = entries.reduce(
    (acc, entry) => {
      acc[entry.sentiment.label] += 1;
      return acc;
    },
    { positive: 0, neutral: 0, negative: 0, concerning: 0 }
  );

  // Find most frequent sentiment
  const mostFrequentSentiment = Object.entries(sentimentCounts).reduce(
    (max, [key, value]) => (value > max.value ? { type: key, value } : max),
    { type: "", value: -1 }
  );

  // Calculate sentiment trend (simple linear regression)
  const calculateTrend = () => {
    if (entries.length < 3) return "stable";
    
    const recentEntries = sortedEntries.slice(-7); // Last 7 entries for trend
    const sentimentValues = recentEntries.map(entry => entry.sentiment.score);
    const firstHalf = sentimentValues.slice(0, Math.floor(sentimentValues.length/2));
    const secondHalf = sentimentValues.slice(Math.floor(sentimentValues.length/2));
    
    const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
    
    const diff = secondAvg - firstAvg;
    if (diff > 0.2) return "improving";
    if (diff < -0.2) return "declining";
    return "stable";
  };

  const sentimentTrend = calculateTrend();

  // Create heatmap data
  const getWeekDays = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      days.push(format(subDays(new Date(), i), "EEE"));
    }
    return days;
  };

  const weekDays = getWeekDays();
  
  // Group sentiment by day for the heatmap
  const heatmapData = weekDays.map(day => {
    const dayEntries = entries.filter(entry => 
      format(entry.date, "EEE") === day &&
      entry.date >= subDays(new Date(), 7)
    );
    
    const avgScore = dayEntries.length > 0
      ? dayEntries.reduce((acc, entry) => acc + entry.sentiment.score, 0) / dayEntries.length
      : null;
      
    return {
      day,
      value: avgScore,
      entries: dayEntries.length
    };
  });

  const getSentimentColor = (label: string) => {
    switch (label) {
      case "positive": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "neutral": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "negative": return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
      case "concerning": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default: return "";
    }
  };

  const getMoodDescription = (type: string) => {
    switch (type) {
      case "positive": return "You've been mostly positive in your journal entries. That's great!";
      case "neutral": return "Your entries have been mainly neutral. You're maintaining balance.";
      case "negative": return "You've been experiencing more negative emotions lately. Consider using the Self-Regulation Toolbox.";
      case "concerning": return "Your entries suggest you may be going through a difficult time. Please consider reaching out for support.";
      default: return "";
    }
  };

  const getHeatmapColor = (value: number | null) => {
    if (value === null) return "#f1f5f9"; // Light gray for no data
    if (value > 0.5) return "#86efac"; // Green for very positive
    if (value > 0) return "#bbf7d0"; // Light green for positive
    if (value > -0.5) return "#fcd34d"; // Yellow for slightly negative
    return "#fca5a5"; // Red for negative
  };

  const confidenceLevel = entries.length > 10 ? "high" : entries.length > 5 ? "medium" : "low";

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Mood Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageSentiment}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Scale: -1 (very negative) to 1 (very positive)
            </p>
            <div className="flex items-center mt-2">
              {sentimentTrend === "improving" ? (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Improving
                </Badge>
              ) : sentimentTrend === "declining" ? (
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex items-center">
                  <TrendingDown className="h-3 w-3 mr-1" />
                  Declining
                </Badge>
              ) : (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  Stable
                </Badge>
              )}
              <Badge variant="outline" className="ml-2 bg-gray-50 text-gray-700 border-gray-200">
                {confidenceLevel} confidence
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Most Common Mood</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${getSentimentColor(mostFrequentSentiment.type)}`}>
                {mostFrequentSentiment.type.charAt(0).toUpperCase() + mostFrequentSentiment.type.slice(1)}
              </span>
              <span className="text-sm text-muted-foreground ml-2">
                ({mostFrequentSentiment.value} entries)
              </span>
            </div>
            <div className="flex gap-1 flex-wrap mt-3">
              {Object.entries(sentimentCounts).map(([type, count]) => (
                count > 0 && (
                  <div key={type} className="flex items-center text-xs">
                    <div className={`w-2 h-2 rounded-full mr-1 ${
                      type === "positive" ? "bg-green-500" :
                      type === "neutral" ? "bg-blue-500" :
                      type === "negative" ? "bg-amber-500" :
                      "bg-red-500"
                    }`}></div>
                    <span>{type}: {count}</span>
                  </div>
                )
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Journal Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              {getMoodDescription(mostFrequentSentiment.type)}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mood Analysis</CardTitle>
          <CardDescription>
            Visualization of your emotional trends from journal entries
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <Tabs defaultValue="timeline" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="heatmap">Weekly Heatmap</TabsTrigger>
              <TabsTrigger value="radar">Emotion Radar</TabsTrigger>
            </TabsList>
            
            <TabsContent value="timeline">
              <div className="h-[300px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[-1, 1]} ticks={[-1, -0.5, 0, 0.5, 1]} />
                    <Tooltip 
                      formatter={(value, name) => {
                        return [`Score: ${value}`, "Sentiment"];
                      }}
                      labelFormatter={(label) => `Date: ${label}`}
                    />
                    <defs>
                      <linearGradient id="sentimentGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0.2}/>
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="sentiment"
                      stroke="#8884d8"
                      strokeWidth={2}
                      fill="url(#sentimentGradient)"
                      activeDot={{ r: 8 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="heatmap">
              <div className="h-[300px] mt-4">
                <div className="flex flex-col items-center">
                  <div className="flex w-full justify-between mb-2">
                    {weekDays.map((day, i) => (
                      <div key={i} className="text-center w-12">
                        <div className="text-xs font-medium">{day}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex w-full justify-between mb-6">
                    {heatmapData.map((data, i) => (
                      <div key={i} className="text-center w-12 flex flex-col items-center">
                        <div 
                          className="w-10 h-10 rounded-md flex items-center justify-center"
                          style={{ 
                            backgroundColor: getHeatmapColor(data.value),
                            opacity: data.entries ? 1 : 0.3
                          }}
                        >
                          <span className="text-xs font-medium">
                            {data.value !== null ? Math.round(data.value * 10) / 10 : ""}
                          </span>
                        </div>
                        <span className="text-[10px] mt-1 text-muted-foreground">
                          {data.entries || 0} entries
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center mt-4">
                    <div className="flex items-center">
                      <span className="text-xs mr-2">Mood Scale:</span>
                      <div className="w-4 h-4 bg-red-300 rounded-sm"></div>
                      <ArrowRight className="h-3 w-3 mx-1" />
                      <div className="w-4 h-4 bg-yellow-300 rounded-sm"></div>
                      <ArrowRight className="h-3 w-3 mx-1" />
                      <div className="w-4 h-4 bg-green-300 rounded-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="radar">
              <div className="h-[300px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={[
                    { subject: 'Positive', A: sentimentCounts.positive },
                    { subject: 'Neutral', A: sentimentCounts.neutral },
                    { subject: 'Negative', A: sentimentCounts.negative },
                    { subject: 'Concerning', A: sentimentCounts.concerning }
                  ]}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis />
                    <Radar name="Sentiment Distribution" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {sentimentCounts.concerning > 0 && (
        <Card className="border-red-300 dark:border-red-800">
          <CardHeader className="pb-2 text-red-700 dark:text-red-400">
            <CardTitle>Support Alert</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              We've detected {sentimentCounts.concerning} entries that may indicate distress. If you're going through a difficult time, please consider speaking with a trusted adult or school counselor.
            </p>
            <Button variant="outline" className="mt-4">
              View Support Resources
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default JournalSentimentChart;
