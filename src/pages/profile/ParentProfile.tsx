
import React from "react";
import { User } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageHeader from "@/components/layout/PageHeader";
import ProfileForm from "@/components/profile/ProfileForm";
import NotificationPreferences from "@/components/profile/NotificationPreferences";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ParentChildrenManager from "@/pages/parent/ParentChildrenManager";
import { toast } from "sonner";

interface ParentProfileProps {
  user: User;
}

const ParentProfile: React.FC<ParentProfileProps> = ({ user }) => {
  const [formData, setFormData] = React.useState({
    name: user?.name || "Sarah Parker",
    email: user?.email || "sarah@family.com",
    avatarUrl: user?.avatarUrl || "",
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
      name: user?.name || "Sarah Parker",
      email: user?.email || "sarah@family.com",
      avatarUrl: user?.avatarUrl || "",
    });
    toast.info("Changes cancelled");
  };

  return (
    <div className="space-y-8">
      <PageHeader title="Parent Profile" />
      
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
            <TabsTrigger value="children">My Children</TabsTrigger>
            <TabsTrigger value="profile">Profile Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="children">
            <div className="bg-card p-6 rounded-lg shadow-sm border">
              <ParentChildrenManager />
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

export default ParentProfile;
