
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

// Mock data for the chart
const data = [
  { date: "Week 1", highRisk: 12, mediumRisk: 24, lowRisk: 64, avgMood: 7.2 },
  { date: "Week 2", highRisk: 15, mediumRisk: 22, lowRisk: 63, avgMood: 6.8 },
  { date: "Week 3", highRisk: 18, mediumRisk: 25, lowRisk: 57, avgMood: 6.5 },
  { date: "Week 4", highRisk: 20, mediumRisk: 28, lowRisk: 52, avgMood: 6.2 },
  { date: "Week 5", highRisk: 18, mediumRisk: 26, lowRisk: 56, avgMood: 6.7 },
  { date: "Week 6", highRisk: 16, mediumRisk: 23, lowRisk: 61, avgMood: 7.0 },
];

const RiskTrendsChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" domain={[0, 10]} />
        <Tooltip />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="highRisk"
          stroke="#ef4444"
          activeDot={{ r: 8 }}
          name="High Risk Students"
        />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="mediumRisk"
          stroke="#f59e0b"
          name="Medium Risk Students"
        />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="lowRisk"
          stroke="#22c55e"
          name="Low Risk Students"
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="avgMood"
          stroke="#3b82f6"
          strokeDasharray="5 5"
          name="Average Mood Score (1-10)"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RiskTrendsChart;
