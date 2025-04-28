
import React from "react";
import { User } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileForm from "@/components/profile/ProfileForm";
import NotificationPreferences from "@/components/profile/NotificationPreferences";
import ParentChildrenCard from "./ParentChildrenCard";
import ParentMeetingsCard from "./ParentMeetingsCard";
import ParentPreferencesCard from "./ParentPreferencesCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, Settings, Bell, Shield } from "lucide-react";
import { toast } from "sonner";

interface ParentProfileContentProps {
  user: User;
}

const ParentProfileContent: React.FC<ParentProfileContentProps> = ({ user }) => {
  const [formData, setFormData] = React.useState({
    name: user?.name || "Sarah Thompson",
    email: user?.email || "sarah@family.com",
    avatarUrl: user?.avatarUrl || "",
    phone: "555-987-6543",
    address: "1234 Family Lane, Parentville, PA 12345",
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
      name: user?.name || "Sarah Thompson",
      email: user?.email || "sarah@family.com",
      avatarUrl: user?.avatarUrl || "",
      phone: "555-987-6543",
      address: "1234 Family Lane, Parentville, PA 12345",
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
            role="parent"
            avatarUrl={formData.avatarUrl}
          />
        </div>
        
        <Tabs defaultValue="children">
          <TabsList>
            <TabsTrigger value="children">
              <Users className="h-4 w-4 mr-2" />
              My Children
            </TabsTrigger>
            <TabsTrigger value="meetings">
              <Calendar className="h-4 w-4 mr-2" />
              Meetings & Events
            </TabsTrigger>
            <TabsTrigger value="preferences">
              <Shield className="h-4 w-4 mr-2" />
              Privacy Settings
            </TabsTrigger>
            <TabsTrigger value="profile">
              <Settings className="h-4 w-4 mr-2" />
              Profile Settings
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="children" className="space-y-6">
            <ParentChildrenCard />
          </TabsContent>
          
          <TabsContent value="meetings" className="space-y-6">
            <ParentMeetingsCard />
          </TabsContent>
          
          <TabsContent value="preferences" className="space-y-6">
            <ParentPreferencesCard />
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

export default ParentProfileContent;
