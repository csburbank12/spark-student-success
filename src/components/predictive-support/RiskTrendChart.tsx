
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { format } from 'date-fns';

// Define demo data for risk trends over the past week
const demoData = [
  { date: '2025-04-17', riskScore: 45, interventions: 2 },
  { date: '2025-04-18', riskScore: 52, interventions: 3 },
  { date: '2025-04-19', riskScore: 48, interventions: 2 },
  { date: '2025-04-20', riskScore: 58, interventions: 4 },
  { date: '2025-04-21', riskScore: 51, interventions: 3 },
  { date: '2025-04-22', riskScore: 45, interventions: 2 },
  { date: '2025-04-23', riskScore: 42, interventions: 1 },
  { date: '2025-04-24', riskScore: 38, interventions: 1 },
];

// Format data for better display
const formattedData = demoData.map(item => ({
  ...item,
  date: format(new Date(item.date), 'MMM dd')
}));

const RiskTrendChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk Score Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={formattedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" domain={[0, 10]} />
              <Tooltip 
                formatter={(value, name) => [
                  value, 
                  name === "riskScore" ? "Risk Score" : "Interventions"
                ]}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="riskScore" 
                stroke="#ef4444" 
                name="Risk Score"
                strokeWidth={2}
                yAxisId="left"
                dot={{ r: 4 }}
                activeDot={{ r: 6, stroke: "#ef4444", strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="interventions" 
                stroke="#22c55e" 
                name="Interventions"
                strokeWidth={2}
                yAxisId="right"
                dot={{ r: 4 }}
                activeDot={{ r: 6, stroke: "#22c55e", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskTrendChart;
