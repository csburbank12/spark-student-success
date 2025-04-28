
import React from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface BarChartProps {
  data: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      backgroundColor: string;
      borderColor: string;
      borderWidth: number;
    }>;
  };
  height?: string | number;
}

export const BarChart: React.FC<BarChartProps> = ({ data, height = "100%" }) => {
  // Transform the data format to what recharts expects
  const transformedData = data.labels.map((label, index) => {
    const entry: Record<string, any> = { name: label };
    
    data.datasets.forEach((dataset) => {
      entry[dataset.label] = dataset.data[index];
    });
    
    return entry;
  });

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart
        data={transformedData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
        <XAxis dataKey="name" fontSize={12} tickMargin={10} />
        <YAxis fontSize={12} />
        <Tooltip />
        {data.datasets.map((dataset, index) => (
          <Bar
            key={index}
            dataKey={dataset.label}
            fill={dataset.backgroundColor}
            stroke={dataset.borderColor}
            strokeWidth={dataset.borderWidth}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

export default BarChart;
