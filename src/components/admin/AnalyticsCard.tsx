
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

interface DataPoint {
  name: string;
  value: number;
}

interface AnalyticsCardProps {
  title: string;
  subtitle?: string;
  data: DataPoint[];
  color?: string;
  className?: string;
  height?: number;
  onClick?: () => void;
}

export const AnalyticsCard = ({
  title,
  subtitle,
  data,
  color = "hsl(var(--primary))",
  className,
  height = 200,
  onClick,
}: AnalyticsCardProps) => {
  return (
    <Card
      className={cn(
        "overflow-hidden transition-all", 
        onClick && "cursor-pointer hover:shadow-md",
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
        {subtitle && <CardDescription>{subtitle}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div style={{ width: "100%", height }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }} 
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                hide={true}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--popover))", 
                  borderColor: "hsl(var(--border))",
                  borderRadius: "var(--radius)",
                  fontSize: "12px" 
                }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke={color} 
                strokeWidth={2} 
                dot={{ r: 4, fill: color, strokeWidth: 2 }}
                activeDot={{ r: 6, fill: color, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
