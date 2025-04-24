
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  TooltipProps
} from "recharts";

// Mock data for the risk chart
const data = [
  { name: 'Week 1', high: 2, medium: 3, low: 8 },
  { name: 'Week 2', high: 3, medium: 4, low: 6 },
  { name: 'Week 3', high: 2, medium: 5, low: 6 },
  { name: 'Week 4', high: 4, medium: 3, low: 6 },
  { name: 'Week 5', high: 5, medium: 6, low: 3 },
  { name: 'Week 6', high: 4, medium: 5, low: 4 },
];

// Custom formatter for tooltip
const CustomTooltipFormatter = (value: number, name: string) => {
  const formattedName = name.charAt(0).toUpperCase() + name.slice(1) + " Risk";
  return [value, formattedName];
};

const RiskLevelChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        stackOffset="expand"
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value, name) => {
          if (typeof name === 'string') {
            return [value, name.charAt(0).toUpperCase() + name.slice(1) + " Risk"];
          }
          return [value, name];
        }} />
        <Legend />
        <Bar dataKey="high" stackId="a" fill="#ef4444" name="High Risk" />
        <Bar dataKey="medium" stackId="a" fill="#f59e0b" name="Medium Risk" />
        <Bar dataKey="low" stackId="a" fill="#22c55e" name="Low Risk" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RiskLevelChart;
