import React, { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Loader } from "@/components/ui/loader";
import { Button } from "@/components/ui/button";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import RiskTrendChart from "@/components/predictive-support/RiskTrendChart";
import InterventionRecommendations from "@/components/predictive-support/InterventionRecommendations";
import SelDomainScoresCard from "@/components/predictive-support/dashboard/SelDomainScoresCard";

const stats = [
  { title: "Students at Risk", value: "12", trend: "up", change: "+2" },
  { title: "Active Interventions", value: "28", trend: "up", change: "+5" },
  { title: "Success Rate", value: "84%", trend: "up", change: "+2.3%" },
  { title: "Avg Response Time", value: "1.2", unit: "days", trend: "down", change: "-0.3" }
];

const PredictiveSupport = () => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ error, resetErrorBoundary }) => (
        <Card className="border-red-300">
          <CardContent className="p-6">
            <h3 className="text-lg font-medium mb-2">Something went wrong</h3>
            <p className="text-muted-foreground mb-4">
              {error.message || "There was an error loading the predictive support dashboard."}
            </p>
            <button 
              onClick={resetErrorBoundary}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
            >
              Try again
            </button>
          </CardContent>
        </Card>
      )}
    >
      <Suspense fallback={
        <Card>
          <CardContent className="flex items-center justify-center min-h-[400px]">
            <Loader size="lg" />
          </CardContent>
        </Card>
      }>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Predictive Support</h2>
            <Badge variant="outline">AI-Powered Insights</Badge>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Badge variant={stat.trend === "up" ? "default" : "secondary"}>
                    {stat.change}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stat.value}
                    {stat.unit && <span className="text-sm font-normal ml-1">{stat.unit}</span>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="insights" className="space-y-4">
            <TabsList>
              <TabsTrigger value="insights">Insights & Trends</TabsTrigger>
              <TabsTrigger value="interventions">Interventions</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="insights" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2">
                <RiskTrendChart />
                <SelDomainScoresCard />
              </div>
              <InterventionRecommendations />
            </TabsContent>

            <TabsContent value="interventions">
              <Card>
                <CardHeader>
                  <CardTitle>Active Interventions</CardTitle>
                  <CardDescription>
                    Track and manage ongoing student support initiatives
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Array.from({length: 3}).map((_, i) => (
                      <div key={i} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium">Student Support Plan #{i+1}</h4>
                            <p className="text-sm text-muted-foreground">
                              Alex Johnson • Grade 9 • Started 4/15/2025
                            </p>
                          </div>
                          <Badge variant={
                            i === 0 ? "default" : 
                            i === 1 ? "secondary" : 
                            "outline"
                          }>
                            {i === 0 ? "In Progress" : i === 1 ? "Completed" : "Scheduled"}
                          </Badge>
                        </div>
                        <p className="text-sm mb-3">
                          {i === 0 ? "Weekly check-ins with school counselor to address social anxiety" : 
                           i === 1 ? "Math tutoring sessions with Ms. Garcia" :
                           "Parent-teacher conference to discuss learning accommodations"}
                        </p>
                        <div className="flex justify-between">
                          <div className="text-sm text-muted-foreground">
                            <span className="font-medium">Owner:</span> {i === 0 ? "Sarah Chen (Counselor)" : i === 1 ? "Maria Garcia (Math)" : "You"}
                          </div>
                          <Button size="sm" variant="outline">View Details</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports">
              <Card>
                <CardHeader>
                  <CardTitle>Analytics Reports</CardTitle>
                  <CardDescription>
                    Detailed analysis and outcome reporting
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {["Intervention Outcomes", "Risk Factor Analysis", "Monthly Wellness Report"].map((report, i) => (
                        <Card key={i}>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">{report}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">
                              {i === 0 ? "Effectiveness of completed interventions" : 
                               i === 1 ? "Breakdown of risk factors across student population" :
                               "Summary of wellness indicators for April 2025"}
                            </p>
                            <Button variant="outline" className="w-full">Generate Report</Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    <Card className="bg-muted/20">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Custom Report Builder</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          Create custom reports based on specific metrics, time periods, and student groups
                        </p>
                        <Button>Create Custom Report</Button>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Suspense>
    </ErrorBoundary>
  );
};

export default PredictiveSupport;
