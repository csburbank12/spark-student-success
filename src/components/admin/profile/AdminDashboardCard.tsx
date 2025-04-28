
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Server, Clock, ShieldAlert, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const AdminDashboardCard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Users className="h-5 w-5 mr-2" />
              User Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <div>
                  <div className="text-2xl font-bold">254</div>
                  <div className="text-xs text-muted-foreground">Total Users</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">12</div>
                  <div className="text-xs text-muted-foreground">Pending Approvals</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <div>Teachers</div>
                  <div className="font-medium">52</div>
                </div>
                <Progress value={20} className="h-1" />
                
                <div className="flex justify-between text-sm">
                  <div>Students</div>
                  <div className="font-medium">173</div>
                </div>
                <Progress value={68} className="h-1" />
                
                <div className="flex justify-between text-sm">
                  <div>Parents</div>
                  <div className="font-medium">21</div>
                </div>
                <Progress value={8} className="h-1" />
                
                <div className="flex justify-between text-sm">
                  <div>Staff</div>
                  <div className="font-medium">8</div>
                </div>
                <Progress value={3} className="h-1" />
              </div>
              
              <Button variant="outline" size="sm" className="w-full">
                Manage Users
                <ArrowRight className="h-3.5 w-3.5 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <ShieldAlert className="h-5 w-5 mr-2" />
              Security Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                  Secure
                </Badge>
                <span className="text-sm text-muted-foreground">Last audit: 7 days ago</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="text-sm">FERPA Compliance</div>
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                    Compliant
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-sm">Data Encryption</div>
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                    Enabled
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-sm">2FA Requirements</div>
                  <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                    Partial
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-sm">Password Policy</div>
                  <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                    Strong
                  </Badge>
                </div>
              </div>
              
              <Button variant="outline" size="sm" className="w-full">
                Security Dashboard
                <ArrowRight className="h-3.5 w-3.5 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Server className="h-5 w-5 mr-2" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                  Operational
                </Badge>
                <span className="text-sm text-muted-foreground">All systems running</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div className="text-sm">Server Uptime</div>
                  <div className="text-sm font-medium">99.98%</div>
                </div>
                <Progress value={99.98} className="h-1" />
                
                <div className="flex justify-between">
                  <div className="text-sm">Database Load</div>
                  <div className="text-sm font-medium">42%</div>
                </div>
                <Progress value={42} className="h-1" />
                
                <div className="flex justify-between">
                  <div className="text-sm">Storage Used</div>
                  <div className="text-sm font-medium">67%</div>
                </div>
                <Progress value={67} className="h-1" />
                
                <div className="flex justify-between">
                  <div className="text-sm">API Response Time</div>
                  <div className="text-sm font-medium">234ms</div>
                </div>
                <Progress value={23} className="h-1" />
              </div>
              
              <Button variant="outline" size="sm" className="w-full">
                System Monitoring
                <ArrowRight className="h-3.5 w-3.5 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-3">
                {[
                  { time: "Today, 10:23 AM", action: "New user registered", user: "Jamie Smith" },
                  { time: "Today, 9:41 AM", action: "Security setting updated", user: "You" },
                  { time: "Yesterday, 4:32 PM", action: "Data backup completed", user: "System" },
                  { time: "Yesterday, 1:15 PM", action: "User role modified", user: "You" },
                  { time: "Oct 5, 11:32 AM", action: "System update installed", user: "System" }
                ].map((activity, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 mt-1.5 rounded-full bg-primary flex-shrink-0" />
                    <div className="ml-2">
                      <div className="text-sm">{activity.action}</div>
                      <div className="text-xs flex gap-1 text-muted-foreground">
                        <span>{activity.time}</span>
                        <span>•</span>
                        <span>{activity.user}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="outline" size="sm" className="w-full">
                View Audit Log
                <ArrowRight className="h-3.5 w-3.5 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardCard;
