
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageHeader from "@/components/layout/PageHeader";
import { BarChart3 } from "lucide-react";

const DataAnalytics = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Data Analytics" 
        description="Insights and analytics for school performance" 
        icon={<BarChart3 className="h-6 w-6 text-primary" />}
        showBackButton
        backUrl="/admin-dashboard"
      />

      <Card>
        <CardHeader>
          <CardTitle>Analytics Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <p>The data analytics dashboard is coming soon.</p>
          <p className="text-muted-foreground mt-2">
            This page will include detailed analytics, charts and insights for school performance.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataAnalytics;
