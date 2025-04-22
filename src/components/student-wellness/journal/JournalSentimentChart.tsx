
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Added Button import
import { format, subDays } from "date-fns";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

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
          <CardTitle>Mood Over Time</CardTitle>
          <CardDescription>
            Visualization of your emotional trends from journal entries
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[-1, 1]} ticks={[-1, -0.5, 0, 0.5, 1]} />
                <Tooltip 
                  formatter={(value, name) => {
                    return [`Score: ${value}`, "Sentiment"];
                  }}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="sentiment"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                  dot={{ strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
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
