
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const TrendsForecastingTab: React.FC = () => (
  <div className="grid gap-6 md:grid-cols-2">
    <Card>
      <CardHeader>
        <CardTitle>Risk Trends (30 Days)</CardTitle>
        <CardDescription>Changes in student risk levels</CardDescription>
      </CardHeader>
      <CardContent className="h-80 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Trend visualization coming soon</p>
          <div className="flex justify-center gap-8">
            <div className="text-center">
              <div className="flex items-center gap-1 mb-1">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <div className="text-xs">Improving</div>
              </div>
              <div className="text-lg font-bold">28%</div>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-1 mb-1">
                <div className="h-3 w-3 rounded-full bg-gray-400"></div>
                <div className="text-xs">Stable</div>
              </div>
              <div className="text-lg font-bold">56%</div>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-1 mb-1">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="text-xs">Worsening</div>
              </div>
              <div className="text-lg font-bold">16%</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>Intervention Impact</CardTitle>
        <CardDescription>Effectiveness of applied interventions</CardDescription>
      </CardHeader>
      <CardContent className="h-80 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Impact visualization coming soon</p>
          <div className="flex justify-center gap-8">
            <div className="text-center">
              <div className="flex items-center gap-1 mb-1">
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <div className="text-xs">Successful</div>
              </div>
              <div className="text-lg font-bold">72%</div>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-1 mb-1">
                <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                <div className="text-xs">Partial</div>
              </div>
              <div className="text-lg font-bold">18%</div>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-1 mb-1">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="text-xs">No Effect</div>
              </div>
              <div className="text-lg font-bold">10%</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

export default TrendsForecastingTab;
