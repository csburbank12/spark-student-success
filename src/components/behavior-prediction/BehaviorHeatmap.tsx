
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, subDays } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Tooltip } from "@/components/ui/tooltip"; 
import { Info } from "lucide-react";

interface HeatmapData {
  date: string;
  dow: string;
  isToday: boolean;
  values: {
    [key: string]: {
      value: number;
      label: string;
    };
  };
}

interface BehaviorHeatmapProps {
  studentId: string;
  studentName: string;
  domains: string[];
}

// Sample domain info for tooltips
const domainInfo: Record<string, { title: string; description: string }> = {
  "emotional": {
    title: "Emotional Regulation",
    description: "Ability to manage and respond to emotional experiences"
  },
  "social": {
    title: "Social Skills",
    description: "Ability to interact positively with peers and adults"
  },
  "academic": {
    title: "Academic Engagement",
    description: "Level of focus, participation and task completion"
  },
  "behavioral": {
    title: "Behavioral Control",
    description: "Ability to follow rules and manage disruptive behaviors"
  },
};

// Mock data generation function
const generateMockData = (days: number, domains: string[]): HeatmapData[] => {
  const today = new Date();
  const data: HeatmapData[] = [];
  
  for (let i = days - 1; i >= 0; i--) {
    const date = subDays(today, i);
    const values: { [key: string]: { value: number; label: string } } = {};
    
    domains.forEach(domain => {
      // Generate a random value between 0 and 10, with some continuity from previous days
      const prevValue = i < days - 1 ? data[days - i - 2].values[domain]?.value : 5;
      const change = Math.random() * 2 - 1; // Random change between -1 and 1
      const newValue = Math.min(10, Math.max(0, prevValue + change));
      
      let label: string;
      if (newValue >= 8) label = "Excellent";
      else if (newValue >= 6) label = "Good";
      else if (newValue >= 4) label = "Average";
      else if (newValue >= 2) label = "Concerning";
      else label = "Critical";
      
      values[domain] = { value: newValue, label };
    });
    
    data.push({
      date: format(date, "yyyy-MM-dd"),
      dow: format(date, "EEE"),
      isToday: i === 0,
      values
    });
  }
  
  return data;
};

// Get color based on value (0-10 scale)
const getValueColor = (value: number): string => {
  if (value >= 8) return "bg-green-500";
  if (value >= 6) return "bg-green-300";
  if (value >= 4) return "bg-yellow-300";
  if (value >= 2) return "bg-orange-400";
  return "bg-red-500";
};

const BehaviorHeatmap: React.FC<BehaviorHeatmapProps> = ({ 
  studentId, 
  studentName,
  domains 
}) => {
  // Generate mock data for 14 days
  const heatmapData = generateMockData(14, domains);
  const [timeframe, setTimeframe] = React.useState("week");
  
  // Filter data based on timeframe
  const displayedData = timeframe === "week" 
    ? heatmapData.slice(-7) // Last 7 days
    : heatmapData; // All 14 days
    
  // Calculate confidence scores for each domain
  const calculateConfidence = (domain: string): number => {
    // Simulate confidence based on data consistency
    // In a real implementation, this would use statistical methods
    const values = heatmapData.map(d => d.values[domain]?.value || 0);
    const variance = values.reduce((acc, val) => {
      const diff = val - (values.reduce((sum, v) => sum + v, 0) / values.length);
      return acc + (diff * diff);
    }, 0) / values.length;
    
    // Higher variance = lower confidence
    return Math.min(100, Math.max(0, 100 - variance * 15));
  };
  
  const confidenceScores = domains.reduce((acc, domain) => {
    acc[domain] = calculateConfidence(domain);
    return acc;
  }, {} as Record<string, number>);
  
  const getConfidenceLabel = (score: number): string => {
    if (score >= 80) return "Very High";
    if (score >= 60) return "High";
    if (score >= 40) return "Moderate";
    if (score >= 20) return "Low";
    return "Very Low";
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Behavior Heatmap</CardTitle>
          <Tabs defaultValue={timeframe} onValueChange={setTimeframe} className="w-auto">
            <TabsList className="grid grid-cols-2 w-[180px]">
              <TabsTrigger value="week">Last 7 Days</TabsTrigger>
              <TabsTrigger value="twoweek">Last 14 Days</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="text-left text-sm font-medium text-muted-foreground px-2 py-1 w-24">Domain</th>
                {displayedData.map((day) => (
                  <th key={day.date} className={`text-center px-1 py-1 text-xs ${day.isToday ? "font-bold" : ""}`}>
                    <div>{day.dow}</div>
                    <div className="text-[10px] text-muted-foreground">{day.date.split("-")[2]}</div>
                  </th>
                ))}
                <th className="text-center px-1 py-1 text-xs font-medium text-muted-foreground">
                  <div>Confidence</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {domains.map((domain) => (
                <tr key={domain} className="border-t border-muted">
                  <td className="px-2 py-2 text-sm font-medium flex items-center gap-1">
                    {domain.charAt(0).toUpperCase() + domain.slice(1)}
                    <div className="relative group">
                      <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                      <div className="absolute left-0 bottom-full mb-2 w-64 p-2 bg-popover text-popover-foreground text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                        <p className="font-medium mb-1">{domainInfo[domain]?.title}</p>
                        <p>{domainInfo[domain]?.description}</p>
                      </div>
                    </div>
                  </td>
                  {displayedData.map((day) => {
                    const value = day.values[domain]?.value || 0;
                    const label = day.values[domain]?.label || "N/A";
                    return (
                      <td key={`${domain}-${day.date}`} className="text-center p-0.5">
                        <div className="relative group">
                          <div 
                            className={`w-10 h-7 mx-auto rounded flex items-center justify-center ${getValueColor(value)}`}
                          >
                            <span className="text-xs font-medium text-white">
                              {Math.round(value)}
                            </span>
                          </div>
                          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 w-32 p-1 bg-black/90 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                            <p className="text-center">{label}</p>
                            <p className="text-center text-[10px]">{day.date}</p>
                          </div>
                        </div>
                      </td>
                    );
                  })}
                  <td className="text-center">
                    <div className="w-16 mx-auto">
                      <Badge variant="outline" className={`text-xs ${
                        confidenceScores[domain] >= 80 ? "bg-green-50 text-green-700" :
                        confidenceScores[domain] >= 60 ? "bg-green-50/70 text-green-600" :
                        confidenceScores[domain] >= 40 ? "bg-yellow-50 text-yellow-700" :
                        confidenceScores[domain] >= 20 ? "bg-orange-50 text-orange-700" :
                        "bg-red-50 text-red-700"
                      }`}>
                        {getConfidenceLabel(confidenceScores[domain])}
                      </Badge>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="text-xs text-muted-foreground space-y-1">
          <p>
            <span className="font-medium">Color scale:</span> Red (0) → Yellow (5) → Green (10)
          </p>
          <p>
            <span className="font-medium">Confidence:</span> Measures the reliability of the prediction based on data consistency
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BehaviorHeatmap;
