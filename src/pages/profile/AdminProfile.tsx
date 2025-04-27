
import React, { useState, useCallback } from "react";
import { User } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageHeader from "@/components/layout/PageHeader";
import ProfileForm from "@/components/profile/ProfileForm";
import NotificationPreferences from "@/components/profile/NotificationPreferences";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Settings, Server, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface AdminProfileProps {
  user: User;
}

const AdminProfile: React.FC<AdminProfileProps> = ({ user }) => {
  const [formData, setFormData] = useState({
    name: user?.name || "Miguel Rodriguez",
    email: user?.email || "rodriguez@district.edu",
    avatarUrl: user?.avatarUrl || "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
      console.error("Profile update error:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);
  
  const handleCancel = useCallback(() => {
    setFormData({
      name: user?.name || "Miguel Rodriguez",
      email: user?.email || "rodriguez@district.edu",
      avatarUrl: user?.avatarUrl || "",
    });
    toast.info("Changes cancelled");
  }, [user]);

  return (
    <div className="space-y-8">
      <PageHeader title="Admin Profile" />
      
      <div className="grid gap-8">
        <div className="bg-card p-6 rounded-lg shadow-sm border">
          <ProfileHeader
            name={formData.name}
            email={formData.email}
            role="admin"
            avatarUrl={formData.avatarUrl}
          />
        </div>
        
        <Tabs defaultValue="admin">
          <TabsList>
            <TabsTrigger value="admin">Admin Panel</TabsTrigger>
            <TabsTrigger value="profile">Profile Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="admin" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    User Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Manage users, roles, and permissions across the platform.
                  </p>
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
                  <Button size="sm" variant="outline" className="w-full" asChild>
                    <Link to="/admin/users">Manage Users</Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    System Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Configure system-wide settings, customization, and branding.
                  </p>
                  <div className="flex justify-between">
                    <div>
                      <div className="text-2xl font-bold">1</div>
                      <div className="text-xs text-muted-foreground">School District</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">4</div>
                      <div className="text-xs text-muted-foreground">Schools</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="w-full" asChild>
                    <Link to="/admin/settings">System Settings</Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Security & Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Monitor security alerts, compliance, and system audits.
                  </p>
                  <div className="flex justify-between">
                    <div>
                      <div className="text-2xl font-bold text-green-600">0</div>
                      <div className="text-xs text-muted-foreground">Active Alerts</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">7d</div>
                      <div className="text-xs text-muted-foreground">Since Last Audit</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="w-full" asChild>
                    <Link to="/admin/security">Security Dashboard</Link>
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Server className="h-5 w-5 mr-2" />
                    Data Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Manage data imports/exports, backups, and reporting.
                  </p>
                  <div className="flex justify-between">
                    <div>
                      <div className="text-2xl font-bold">24h</div>
                      <div className="text-xs text-muted-foreground">Last Backup</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold">3</div>
                      <div className="text-xs text-muted-foreground">Pending Imports</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="w-full" asChild>
                    <Link to="/admin/data">Data Center</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="profile">
            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-medium mb-4">Personal Information</h3>
              <ProfileForm 
                formData={formData} 
                setFormData={setFormData} 
                onSubmit={handleSubmit} 
                onCancel={handleCancel}
                isSubmitting={isSubmitting}
              />
            </div>
            <div className="bg-card p-6 rounded-lg shadow-sm border mt-6">
              <h3 className="text-lg font-medium mb-4">Notification Settings</h3>
              <NotificationPreferences />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminProfile;
