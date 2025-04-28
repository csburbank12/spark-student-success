
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const mockData = [
  { name: "Critical", value: 5, color: "#ef4444" },
  { name: "Error", value: 12, color: "#f97316" },
  { name: "Warning", value: 18, color: "#eab308" },
  { name: "Info", value: 8, color: "#3b82f6" },
];

export const ErrorSeverityChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie
          data={mockData}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={80}
          paddingAngle={2}
          dataKey="value"
        >
          {mockData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Legend layout="horizontal" verticalAlign="bottom" align="center" />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};
