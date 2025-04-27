
import React from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";

const moodData = [
  { day: "Mon", mood: 80, energy: 65 },
  { day: "Tue", mood: 70, energy: 60 },
  { day: "Wed", mood: 85, energy: 75 },
  { day: "Thu", mood: 75, energy: 80 },
  { day: "Fri", mood: 90, energy: 85 },
  { day: "Sat", mood: 85, energy: 70 },
  { day: "Sun", mood: 80, energy: 75 }
];

const MoodChart: React.FC = () => {
  return (
    <div className="w-full h-[300px] p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={moodData}
          margin={{ top: 5, right: 30, left: 5, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis 
            dataKey="day" 
            axisLine={false}
            tickLine={false}
            className="text-xs"
          />
          <YAxis 
            domain={[0, 100]} 
            axisLine={false}
            tickLine={false}
            className="text-xs"
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--background)",
              borderColor: "var(--border)",
              borderRadius: "var(--radius)",
              fontSize: "0.875rem",
            }}
            formatter={(value: number) => [`${value}%`, ""]}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="mood"
            name="Mood"
            stroke="var(--primary)"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="energy"
            name="Energy"
            stroke="#FF8C00"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MoodChart;
