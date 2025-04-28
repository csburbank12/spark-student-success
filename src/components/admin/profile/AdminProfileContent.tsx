
import React from "react";
import { User } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileForm from "@/components/profile/ProfileForm";
import NotificationPreferences from "@/components/profile/NotificationPreferences";
import AdminDashboardCard from "./AdminDashboardCard";
import AdminSecurityCard from "./AdminSecurityCard";
import AdminSystemSettingsCard from "./AdminSystemSettingsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutDashboard, Shield, Settings, Bell, User as UserIcon } from "lucide-react";
import { toast } from "sonner";

interface AdminProfileContentProps {
  user: User;
}

const AdminProfileContent: React.FC<AdminProfileContentProps> = ({ user }) => {
  const [formData, setFormData] = React.useState({
    name: user?.name || "Dr. Maria Rodriguez",
    email: user?.email || "rodriguez@district.edu",
    avatarUrl: user?.avatarUrl || "",
    phone: "555-789-0123",
    position: user?.position || "Principal",
    adminLevel: user?.adminLevel || "District",
  });
  
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
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
  };
  
  const handleCancel = () => {
    setFormData({
      name: user?.name || "Dr. Maria Rodriguez",
      email: user?.email || "rodriguez@district.edu",
      avatarUrl: user?.avatarUrl || "",
      phone: "555-789-0123",
      position: user?.position || "Principal",
      adminLevel: user?.adminLevel || "District",
    });
    toast.info("Changes cancelled");
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-8">
        <div className="bg-card p-6 rounded-lg shadow-sm border">
          <ProfileHeader
            name={formData.name}
            email={formData.email}
            role="admin"
            avatarUrl={formData.avatarUrl}
          />
        </div>
        
        <Tabs defaultValue="dashboard">
          <TabsList>
            <TabsTrigger value="dashboard">
              <LayoutDashboard className="h-4 w-4 mr-2" />
              Admin Dashboard
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="h-4 w-4 mr-2" />
              Security & Compliance
            </TabsTrigger>
            <TabsTrigger value="system">
              <Settings className="h-4 w-4 mr-2" />
              System Settings
            </TabsTrigger>
            <TabsTrigger value="profile">
              <UserIcon className="h-4 w-4 mr-2" />
              Profile Settings
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-6">
            <AdminDashboardCard />
          </TabsContent>
          
          <TabsContent value="security" className="space-y-6">
            <AdminSecurityCard />
          </TabsContent>
          
          <TabsContent value="system" className="space-y-6">
            <AdminSystemSettingsCard />
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
          </TabsContent>
          
          <TabsContent value="notifications">
            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-medium mb-4">Notification Settings</h3>
              <NotificationPreferences />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminProfileContent;
