
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { StatCard } from "@/components/ui/stat-card";
import { AnalyticsCard } from "@/components/admin/AnalyticsCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  School, 
  AlertCircle, 
  BarChart, 
  UserPlus, 
  Flag,
  Download,
  FileText,
  Activity,
  Settings,
  Plus
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

const AdminDashboard = () => {
  const { user } = useAuth();

  // Mock data for analytics
  const weeklyUsage = [
    { name: "Mon", value: 65 },
    { name: "Tue", value: 72 },
    { name: "Wed", value: 84 },
    { name: "Thu", value: 76 },
    { name: "Fri", value: 80 },
    { name: "Sat", value: 30 },
    { name: "Sun", value: 25 },
  ];
  
  const alertTrend = [
    { name: "Week 1", value: 12 },
    { name: "Week 2", value: 15 },
    { name: "Week 3", value: 10 },
    { name: "Week 4", value: 7 },
  ];
  
  const moodDistribution = [
    { name: "Happy", value: 42 },
    { name: "Good", value: 28 },
    { name: "Okay", value: 15 },
    { name: "Sad", value: 8 },
    { name: "Stressed", value: 7 },
  ];

  // Mock data for schools
  const schools = [
    {
      id: "s1",
      name: "Washington High School",
      students: 1250,
      staff: 85,
      activeUsers: 920,
      activation: 74,
    },
    {
      id: "s2",
      name: "Lincoln Middle School",
      students: 780,
      staff: 54,
      activeUsers: 705,
      activation: 90,
    },
    {
      id: "s3",
      name: "Roosevelt Elementary",
      students: 560,
      staff: 42,
      activeUsers: 530,
      activation: 95,
    },
  ];

  // Mock data for recent alerts
  const recentAlerts = [
    {
      id: "a1",
      school: "Washington High School",
      type: "Student Concern",
      details: "Multiple students reporting high stress",
      level: "medium",
      time: "2 hours ago",
    },
    {
      id: "a2",
      school: "Roosevelt Elementary",
      type: "System Alert",
      details: "Unusual check-in pattern detected",
      level: "low",
      time: "5 hours ago",
    },
    {
      id: "a3",
      school: "Lincoln Middle School",
      type: "Urgent Alert",
      details: "Student flagged for immediate support",
      level: "high",
      time: "1 day ago",
    },
  ];

  const handleAction = (action: string) => {
    toast.success(`Action triggered: ${action}`);
    // In a real app, this would perform the actual action
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">Admin Dashboard</h2>
        <div className="flex items-center gap-2">
          <Button>
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            System Settings
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Students"
          value="2,590"
          description="Across 3 schools"
          icon={<Users className="h-4 w-4" />}
          trend="up"
          trendValue="54 new this month"
        />
        <StatCard
          title="Schools"
          value="3"
          description="Active in the platform"
          icon={<School className="h-4 w-4" />}
        />
        <StatCard
          title="Active Alerts"
          value="12"
          description="Requiring attention"
          icon={<AlertCircle className="h-4 w-4" />}
          trend="down"
          trendValue="5 fewer than last week"
        />
        <StatCard
          title="Platform Usage"
          value="84%"
          description="User engagement rate"
          icon={<Activity className="h-4 w-4" />}
          trend="up"
          trendValue="7% increase"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnalyticsCard
          title="Weekly Platform Usage"
          subtitle="Number of check-ins per day"
          data={weeklyUsage}
          color="hsl(var(--primary))"
        />
        <AnalyticsCard
          title="Alert Trend"
          subtitle="Past 4 weeks"
          data={alertTrend}
          color="#f59e0b"
        />
        <AnalyticsCard
          title="Mood Distribution"
          subtitle="Current week"
          data={moodDistribution}
          color="#14b8a6"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">Schools Overview</CardTitle>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-1" />
              Add School
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>School Name</TableHead>
                  <TableHead className="text-right">Students</TableHead>
                  <TableHead className="text-right">Staff</TableHead>
                  <TableHead className="text-right">Activation</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {schools.map((school) => (
                  <TableRow key={school.id}>
                    <TableCell className="font-medium">{school.name}</TableCell>
                    <TableCell className="text-right">{school.students}</TableCell>
                    <TableCell className="text-right">{school.staff}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-24">
                          <Progress value={school.activation} className="h-2" />
                        </div>
                        <span>{school.activation}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => handleAction(`View ${school.name}`)}>
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-center mt-4">
              <Button variant="outline">View All Schools</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">Recent Alerts</CardTitle>
            <Badge className="bg-amber-500">12 Active</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 border-b pb-3 last:border-0 last:pb-0">
                <div className={`h-10 w-10 rounded flex items-center justify-center 
                  ${alert.level === 'high' ? 'bg-red-100 text-red-600' : 
                    alert.level === 'medium' ? 'bg-amber-100 text-amber-600' : 
                    'bg-blue-100 text-blue-600'}`}>
                  <Flag className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{alert.type}</p>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        alert.level === 'high' ? 'bg-red-50 text-red-600 border-red-200' : 
                        alert.level === 'medium' ? 'bg-amber-50 text-amber-600 border-amber-200' : 
                        'bg-blue-50 text-blue-600 border-blue-200'
                      }`}
                    >
                      {alert.level}
                    </Badge>
                  </div>
                  <p className="text-sm">{alert.details}</p>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-muted-foreground">{alert.school}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              View All Alerts
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-6 space-y-2" onClick={() => handleAction('Add School')}>
            <School className="h-8 w-8 text-primary" />
            <span className="text-sm font-medium">Add School</span>
          </Button>
          <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-6 space-y-2" onClick={() => handleAction('Add User')}>
            <UserPlus className="h-8 w-8 text-primary" />
            <span className="text-sm font-medium">Add User</span>
          </Button>
          <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-6 space-y-2" onClick={() => handleAction('Data Export')}>
            <Download className="h-8 w-8 text-primary" />
            <span className="text-sm font-medium">Data Export</span>
          </Button>
          <Button variant="outline" className="h-auto flex flex-col items-center justify-center py-6 space-y-2" onClick={() => handleAction('Analytics')}>
            <BarChart className="h-8 w-8 text-primary" />
            <span className="text-sm font-medium">Advanced Analytics</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
