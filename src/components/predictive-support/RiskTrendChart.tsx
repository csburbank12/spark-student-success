
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const demoData = [
  { date: '2025-04-17', riskScore: 45, interventions: 2 },
  { date: '2025-04-18', riskScore: 52, interventions: 3 },
  { date: '2025-04-19', riskScore: 48, interventions: 2 },
  { date: '2025-04-20', riskScore: 58, interventions: 4 },
  { date: '2025-04-21', riskScore: 51, interventions: 3 },
  { date: '2025-04-22', riskScore: 45, interventions: 2 },
  { date: '2025-04-23', riskScore: 42, interventions: 1 },
];

const RiskTrendChart = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk Score Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={demoData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="riskScore" 
                stroke="#ef4444" 
                name="Risk Score"
              />
              <Line 
                type="monotone" 
                dataKey="interventions" 
                stroke="#22c55e" 
                name="Interventions"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskTrendChart;
