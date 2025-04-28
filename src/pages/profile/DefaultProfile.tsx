
import React, { useState, useCallback } from "react";
import { User } from "@/types";
import PageHeader from "@/components/layout/PageHeader";
import ProfileForm from "@/components/profile/ProfileForm";
import NotificationPreferences from "@/components/profile/NotificationPreferences";
import ProfileHeader from "@/components/profile/ProfileHeader";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";

interface DefaultProfileProps {
  user: User;
}

const DefaultProfile: React.FC<DefaultProfileProps> = ({ user }) => {
  const [formData, setFormData] = useState({
    name: user?.name || "Default User",
    email: user?.email || "user@example.com",
    avatarUrl: user?.avatarUrl || "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Update profile logic would go here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
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
      name: user?.name || "Default User",
      email: user?.email || "user@example.com",
      avatarUrl: user?.avatarUrl || "",
    });
    toast.info("Changes cancelled");
  }, [user]);

  return (
    <div className="space-y-8">
      <PageHeader title="Profile" />
      
      <div className="grid gap-8">
        <Card className="p-6">
          <ProfileHeader
            name={formData.name}
            email={formData.email}
            role={user?.role || "user"}
            avatarUrl={formData.avatarUrl}
          />
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Personal Information</h3>
          <ProfileForm 
            formData={formData} 
            setFormData={setFormData} 
            onSubmit={handleSubmit} 
            onCancel={handleCancel}
            isSubmitting={isSubmitting}
          />
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-medium mb-4">Notification Settings</h3>
          <NotificationPreferences />
        </Card>
      </div>
    </div>
  );
};

export default DefaultProfile;
