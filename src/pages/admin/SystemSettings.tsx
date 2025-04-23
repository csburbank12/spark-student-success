
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Shield, Mail, Bell, FileText, Users, Globe } from "lucide-react";

const SystemSettings = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">System Settings</h2>
      </div>

      <Tabs defaultValue="security">
        <TabsList>
          <TabsTrigger value="security">
            <Shield className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="integration">
            <Globe className="mr-2 h-4 w-4" />
            Integrations
          </TabsTrigger>
          <TabsTrigger value="customization">
            <FileText className="mr-2 h-4 w-4" />
            Customization
          </TabsTrigger>
        </TabsList>

        <TabsContent value="security" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Authentication Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="mfa">Multi-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Require two-factor authentication for admin accounts
                  </p>
                </div>
                <Switch id="mfa" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="password-policy">Strong Password Policy</Label>
                  <p className="text-sm text-muted-foreground">
                    Enforce complex passwords with special characters
                  </p>
                </div>
                <Switch id="password-policy" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="session-timeout">Session Timeout</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically log out inactive users after 30 minutes
                  </p>
                </div>
                <Switch id="session-timeout" defaultChecked />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Data Protection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="encryption">Data Encryption</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable encryption for sensitive student data
                  </p>
                </div>
                <Switch id="encryption" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-backup">Automated Backups</Label>
                  <p className="text-sm text-muted-foreground">
                    Create daily backups of all system data
                  </p>
                </div>
                <Switch id="auto-backup" defaultChecked />
              </div>
              
              <div className="pt-4">
                <Button>
                  <Shield className="mr-2 h-4 w-4" />
                  Run Security Audit
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="system-alerts">System Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Send notifications for system errors and outages
                  </p>
                </div>
                <Switch id="system-alerts" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="security-alerts">Security Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Send notifications for suspicious login attempts
                  </p>
                </div>
                <Switch id="security-alerts" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="maintenance-alerts">Maintenance Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Send notifications about scheduled maintenance
                  </p>
                </div>
                <Switch id="maintenance-alerts" defaultChecked />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="smtp-server">SMTP Server</Label>
                  <Input id="smtp-server" defaultValue="smtp.beacon.edu" />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="sender-email">Sender Email</Label>
                  <Input id="sender-email" defaultValue="noreply@beacon.edu" />
                </div>
                
                <div className="pt-4">
                  <Button>
                    <Mail className="mr-2 h-4 w-4" />
                    Test Email Configuration
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="integration" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="api-access">External API Access</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow authenticated external systems to access the API
                  </p>
                </div>
                <Switch id="api-access" defaultChecked />
              </div>
              
              <div className="grid gap-2 pt-2">
                <Label htmlFor="api-key">API Key</Label>
                <div className="flex gap-2">
                  <Input id="api-key" type="password" value="•••••••••••••••••••••••••••" readOnly />
                  <Button variant="outline">Regenerate</Button>
                </div>
                <p className="text-xs text-muted-foreground">Last generated: 30 days ago</p>
              </div>
              
              <div className="pt-4">
                <Button>
                  <FileText className="mr-2 h-4 w-4" />
                  View API Documentation
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Third-Party Integrations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="google-classroom">Google Classroom</Label>
                  <p className="text-sm text-muted-foreground">
                    Connect with Google Classroom for assignment sync
                  </p>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="canvas-lms">Canvas LMS</Label>
                  <p className="text-sm text-muted-foreground">
                    Sync data with Canvas Learning Management System
                  </p>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="clever">Clever</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable Clever single sign-on integration
                  </p>
                </div>
                <Button variant="outline">Configure</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="customization" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Branding</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="system-name">System Name</Label>
                <Input id="system-name" defaultValue="Beacon SEL Platform" />
              </div>
              
              <div className="grid gap-2">
                <Label>System Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">Logo</span>
                  </div>
                  <Button variant="outline">Upload New Logo</Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="primary-color">Primary Color</Label>
                  <div className="flex gap-2">
                    <div className="h-10 w-10 rounded bg-primary"></div>
                    <Input id="primary-color" defaultValue="#9b87f5" />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="secondary-color">Secondary Color</Label>
                  <div className="flex gap-2">
                    <div className="h-10 w-10 rounded bg-purple-200"></div>
                    <Input id="secondary-color" defaultValue="#d6bcfa" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>System Defaults</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="default-language">Default Language</Label>
                <select id="default-language" className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="timezone">Default Timezone</Label>
                <select id="timezone" className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary">
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Denver">Mountain Time (MT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                </select>
              </div>
              
              <div className="pt-4">
                <Button>Save Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SystemSettings;
