
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from 'recharts';
import { format, parseISO } from 'date-fns';

interface MoodComparisonChartProps {
  studentMoods: any[];
  teacherMoods: any[];
  isLoading?: boolean;
}

const moodToValue = (mood: string): number => {
  switch (mood) {
    case 'happy': return 5;
    case 'good': return 4;
    case 'okay': return 3;
    case 'sad': return 2;
    case 'stressed': return 1;
    default: return 3;
  }
};

const MoodComparisonChart: React.FC<MoodComparisonChartProps> = ({
  studentMoods = [],
  teacherMoods = [],
  isLoading = false
}) => {
  // Process and merge the data
  const processedData = () => {
    const dateMap: Record<string, { date: string, studentMood?: number, teacherMood?: number }> = {};
    
    // Process student moods
    studentMoods.forEach(entry => {
      const date = format(new Date(entry.date), 'yyyy-MM-dd');
      if (!dateMap[date]) {
        dateMap[date] = { date };
      }
      dateMap[date].studentMood = moodToValue(entry.mood_type);
    });
    
    // Process teacher moods
    teacherMoods.forEach(entry => {
      const date = format(new Date(entry.date), 'yyyy-MM-dd');
      if (!dateMap[date]) {
        dateMap[date] = { date };
      }
      dateMap[date].teacherMood = moodToValue(entry.mood_type);
    });
    
    // Convert to array and sort by date
    return Object.values(dateMap)
      .sort((a, b) => a.date.localeCompare(b.date));
  };

  const data = processedData();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Mood Comparison</CardTitle>
          <CardDescription>Loading mood data...</CardDescription>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center">
          <div className="animate-pulse">Loading...</div>
        </CardContent>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Mood Comparison</CardTitle>
          <CardDescription>Student vs. Teacher Perception</CardDescription>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <p>No mood data available to compare.</p>
            <p className="text-sm">Once both student and teacher log moods, they'll appear here.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mood Comparison</CardTitle>
        <CardDescription>Student Self-Report vs. Teacher Perception</CardDescription>
      </CardHeader>
      <CardContent className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(date) => format(new Date(date), 'MMM dd')}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis 
              domain={[1, 5]}
              ticks={[1, 2, 3, 4, 5]}
              tickFormatter={(value) => {
                switch(value) {
                  case 5: return 'Happy';
                  case 4: return 'Good';
                  case 3: return 'Okay';
                  case 2: return 'Sad';
                  case 1: return 'Stressed';
                  default: return '';
                }
              }}
            />
            <Tooltip
              labelFormatter={(date) => format(new Date(date), 'MMM dd, yyyy')}
              formatter={(value: number) => {
                switch(value) {
                  case 5: return ['Happy', 'Mood'];
                  case 4: return ['Good', 'Mood'];
                  case 3: return ['Okay', 'Mood'];
                  case 2: return ['Sad', 'Mood'];
                  case 1: return ['Stressed', 'Mood'];
                  default: return ['Unknown', 'Mood'];
                }
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="studentMood" 
              name="Student Self-Report" 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={{ r: 4 }}
              connectNulls
            />
            <Line 
              type="monotone" 
              dataKey="teacherMood" 
              name="Teacher Perception" 
              stroke="#f43f5e"
              strokeWidth={2}
              dot={{ r: 4 }}
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default MoodComparisonChart;
