
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface RiskTrendsChartProps {
  weeklyData?: any[];
  monthlyData?: any[];
  yearlyData?: any[];
}

const RiskTrendsChart: React.FC<RiskTrendsChartProps> = ({
  weeklyData = [],
  monthlyData = [],
  yearlyData = [],
}) => {
  // Default mock data if none provided
  const defaultWeeklyData = weeklyData.length > 0 ? weeklyData : [
    { name: "Mon", high: 3, medium: 5, low: 12 },
    { name: "Tue", high: 4, medium: 6, low: 10 },
    { name: "Wed", high: 5, medium: 4, low: 11 },
    { name: "Thu", high: 3, medium: 7, low: 10 },
    { name: "Fri", high: 4, medium: 5, low: 11 },
  ];

  const defaultMonthlyData = monthlyData.length > 0 ? monthlyData : [
    { name: "Week 1", high: 12, medium: 22, low: 45 },
    { name: "Week 2", high: 15, medium: 25, low: 40 },
    { name: "Week 3", high: 14, medium: 20, low: 46 },
    { name: "Week 4", high: 13, medium: 24, low: 43 },
  ];

  const defaultYearlyData = yearlyData.length > 0 ? yearlyData : [
    { name: "Jan", high: 40, medium: 94, low: 158 },
    { name: "Feb", high: 45, medium: 85, low: 162 },
    { name: "Mar", high: 42, medium: 92, low: 158 },
    { name: "Apr", high: 50, medium: 88, low: 154 },
    { name: "May", high: 38, medium: 96, low: 158 },
    { name: "Jun", high: 42, medium: 90, low: 160 },
    { name: "Jul", high: 35, medium: 88, low: 169 },
    { name: "Aug", high: 40, medium: 85, low: 167 },
    { name: "Sep", high: 45, medium: 89, low: 158 },
    { name: "Oct", high: 48, medium: 90, low: 154 },
    { name: "Nov", high: 52, medium: 85, low: 155 },
    { name: "Dec", high: 44, medium: 92, low: 156 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk Level Trends</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="weekly">
          <TabsList className="mb-4">
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>
          
          <TabsContent value="weekly">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={defaultWeeklyData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="high" 
                    stackId="1" 
                    stroke="#ef4444" 
                    fill="#ef4444" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="medium" 
                    stackId="1" 
                    stroke="#f97316" 
                    fill="#f97316" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="low" 
                    stackId="1" 
                    stroke="#22c55e" 
                    fill="#22c55e" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="monthly">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={defaultMonthlyData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="high" 
                    stackId="1" 
                    stroke="#ef4444" 
                    fill="#ef4444" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="medium" 
                    stackId="1" 
                    stroke="#f97316" 
                    fill="#f97316" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="low" 
                    stackId="1" 
                    stroke="#22c55e" 
                    fill="#22c55e" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="yearly">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={defaultYearlyData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="high" 
                    stackId="1" 
                    stroke="#ef4444" 
                    fill="#ef4444" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="medium" 
                    stackId="1" 
                    stroke="#f97316" 
                    fill="#f97316" 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="low" 
                    stackId="1" 
                    stroke="#22c55e" 
                    fill="#22c55e" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RiskTrendsChart;
