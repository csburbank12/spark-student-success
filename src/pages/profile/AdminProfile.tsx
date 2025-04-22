
import React from "react";
import { User } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { School, Users, AlertCircle, UserCheck } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface AdminProfileProps {
  user: User | null;
}

const AdminProfile: React.FC<AdminProfileProps> = ({ user }) => {
  // Mock data for admin profile
  const adminData = {
    role: "School Administrator",
    schools: [
      { name: "Washington High School", id: "whs001", students: 1250, staff: 85 },
      { name: "Lincoln Middle School", id: "lms002", students: 780, staff: 54 },
      { name: "Roosevelt Elementary", id: "res003", students: 560, staff: 42 },
    ],
    systemStats: {
      totalUsers: 2721,
      activeUsers: 2350,
      activationRate: 86,
      alertsThisWeek: 24,
      resolvedAlerts: 18,
    },
    pendingTasks: [
      { task: "Review Staff Accounts", priority: "high", due: "Today" },
      { task: "Approve New Student Registrations", priority: "medium", due: "Tomorrow" },
      { task: "Update System Settings", priority: "low", due: "This Week" },
    ],
    recentActivities: [
      {
        action: "Added new staff member",
        details: "Ms. Rodriguez - Science Teacher",
        timestamp: "2 hours ago",
      },
      {
        action: "Updated school settings",
        details: "Changed notification preferences for Washington High",
        timestamp: "Yesterday",
      },
      {
        action: "Reviewed student risk reports",
        details: "Processed 15 alerts from Lincoln Middle School",
        timestamp: "2 days ago",
      },
    ],
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800">High</Badge>;
      case "medium":
        return <Badge className="bg-amber-100 text-amber-800">Medium</Badge>;
      case "low":
        return <Badge className="bg-green-100 text-green-800">Low</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Administrative Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Role:</span>
              <span className="font-medium">{adminData.role}</span>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Managed Schools</h4>
              <ul className="space-y-2">
                {adminData.schools.map((school) => (
                  <li
                    key={school.id}
                    className="flex items-center justify-between p-2 rounded bg-muted/50"
                  >
                    <div className="flex items-center gap-2">
                      <School className="h-4 w-4 text-primary" />
                      <span>{school.name}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {school.students} students • {school.staff} staff
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <Button className="w-full">Manage Schools</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">System Analytics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center justify-center p-4 rounded-md bg-muted/50">
                <Users className="h-8 w-8 text-primary mb-2" />
                <span className="text-2xl font-bold">{adminData.systemStats.totalUsers}</span>
                <span className="text-sm text-muted-foreground">Total Users</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 rounded-md bg-muted/50">
                <UserCheck className="h-8 w-8 text-primary mb-2" />
                <span className="text-2xl font-bold">{adminData.systemStats.activeUsers}</span>
                <span className="text-sm text-muted-foreground">Active Users</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 rounded-md bg-muted/50">
                <AlertCircle className="h-8 w-8 text-amber-500 mb-2" />
                <span className="text-2xl font-bold">{adminData.systemStats.alertsThisWeek}</span>
                <span className="text-sm text-muted-foreground">Alerts This Week</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 rounded-md bg-muted/50">
                <AlertCircle className="h-8 w-8 text-green-500 mb-2" />
                <span className="text-2xl font-bold">{adminData.systemStats.resolvedAlerts}</span>
                <span className="text-sm text-muted-foreground">Resolved Alerts</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>User Activation Rate</span>
                <span className="font-medium">{adminData.systemStats.activationRate}%</span>
              </div>
              <Progress value={adminData.systemStats.activationRate} className="h-2" />
            </div>

            <Button variant="outline" className="w-full">View Analytics Dashboard</Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Pending Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {adminData.pendingTasks.map((task, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between p-2 rounded bg-muted/50"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary">📋</span>
                    </div>
                    <span>{task.task}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getPriorityBadge(task.priority)}
                    <span className="text-xs text-muted-foreground">{task.due}</span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-end">
              <Button variant="outline" size="sm">View All Tasks</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {adminData.recentActivities.map((activity, index) => (
                <li
                  key={index}
                  className="p-2 rounded bg-muted/50 space-y-1"
                >
                  <div className="flex justify-between">
                    <span className="font-medium">{activity.action}</span>
                    <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.details}</p>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-end">
              <Button variant="outline" size="sm">View Activity Log</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminProfile;
