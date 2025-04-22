
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";

const RiskTrendsChart = () => {
  // Mock data for risk trends over time
  const trendData = [
    { month: "Jan", highRisk: 12, mediumRisk: 18, lowRisk: 45, avgMoodScore: 7.2 },
    { month: "Feb", highRisk: 14, mediumRisk: 22, lowRisk: 39, avgMoodScore: 6.8 },
    { month: "Mar", highRisk: 19, mediumRisk: 25, lowRisk: 31, avgMoodScore: 6.2 },
    { month: "Apr", highRisk: 22, mediumRisk: 21, lowRisk: 32, avgMoodScore: 5.9 },
    { month: "May", highRisk: 16, mediumRisk: 19, lowRisk: 40, avgMoodScore: 6.5 },
    { month: "Jun", highRisk: 15, mediumRisk: 17, lowRisk: 43, avgMoodScore: 6.7 },
    { month: "Jul", highRisk: 13, mediumRisk: 15, lowRisk: 47, avgMoodScore: 7.0 },
    { month: "Aug", highRisk: 11, mediumRisk: 16, lowRisk: 48, avgMoodScore: 7.3 },
    { month: "Sep", highRisk: 18, mediumRisk: 20, lowRisk: 37, avgMoodScore: 6.4 },
    { month: "Oct", highRisk: 20, mediumRisk: 23, lowRisk: 32, avgMoodScore: 6.0 },
    { month: "Nov", highRisk: 17, mediumRisk: 20, lowRisk: 38, avgMoodScore: 6.3 },
    { month: "Dec", highRisk: 15, mediumRisk: 18, lowRisk: 42, avgMoodScore: 6.9 },
  ];

  // Distribution data for current risk levels
  const riskDistributionData = [
    { name: "High Risk", value: 38, color: "#ef4444" },
    { name: "Medium Risk", value: 62, color: "#f59e0b" },
    { name: "Low Risk", value: 147, color: "#10b981" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium mb-4">Year-to-Date Risk Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="highRisk" stroke="#ef4444" name="High Risk" />
            <Line type="monotone" dataKey="mediumRisk" stroke="#f59e0b" name="Medium Risk" />
            <Line type="monotone" dataKey="lowRisk" stroke="#10b981" name="Low Risk" />
            <Line 
              type="monotone" 
              dataKey="avgMoodScore" 
              stroke="#8b5cf6" 
              name="Avg Mood Score" 
              yAxisId={1} 
              stroke="#8b5cf6" 
              strokeDasharray="5 5"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Current Risk Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={riskDistributionData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" name="Number of Students">
              {riskDistributionData.map((entry, index) => (
                <rect key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RiskTrendsChart;
