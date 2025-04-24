
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { ErrorLog } from '@/hooks/useErrorLogs';

interface ErrorLogsChartProps {
  logs: ErrorLog[];
}

const ErrorLogsChart = ({ logs }: ErrorLogsChartProps) => {
  // Process logs to group them by day and count
  const groupedData = React.useMemo(() => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return {
        date: date.toISOString().split('T')[0],
        count: 0,
        resolved: 0
      };
    }).reverse();
    
    const dateMap: Record<string, { count: number; resolved: number }> = {};
    
    // Initialize the map with the last 7 days
    last7Days.forEach(day => {
      dateMap[day.date] = { count: 0, resolved: 0 };
    });
    
    // Count logs by date
    logs.forEach(log => {
      const date = new Date(log.timestamp).toISOString().split('T')[0];
      if (!dateMap[date]) {
        dateMap[date] = { count: 0, resolved: 0 };
      }
      dateMap[date].count++;
      if (log.resolved) {
        dateMap[date].resolved++;
      }
    });
    
    // Convert to array for chart
    return Object.entries(dateMap)
      .map(([date, data]) => ({
        date,
        errors: data.count,
        resolved: data.resolved,
      }))
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(-7); // Only show the last 7 days
  }, [logs]);

  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-3 border rounded shadow-sm">
          <p className="font-medium">{label}</p>
          <p className="text-sm text-destructive">{`Errors: ${payload[0].value}`}</p>
          <p className="text-sm text-emerald-500">{`Resolved: ${payload[1].value}`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Error Trends (Last 7 Days)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={groupedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="errors" fill="#ef4444" name="Errors" />
              <Bar dataKey="resolved" fill="#10b981" name="Resolved" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ErrorLogsChart;
