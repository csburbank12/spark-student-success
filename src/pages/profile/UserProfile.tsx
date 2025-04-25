
import React, { useState } from "react";
import PageHeader from "@/components/layout/PageHeader";
import ProfileForm from "@/components/profile/ProfileForm";
import NotificationPreferences from "@/components/profile/NotificationPreferences";
import { toast } from "sonner";

const UserProfile: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "John Doe", // Default value, typically would be loaded from user context/API
    email: "john.doe@example.com", // Default value, typically would be loaded from user context/API
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // This would typically be an API call to update the user profile
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile. Please try again.");
      console.error("Profile update error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleCancel = () => {
    // Reset form to original values
    setFormData({
      name: "John Doe", // Would reset to original values from API/context
      email: "john.doe@example.com",
    });
    toast.info("Changes cancelled");
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Profile Settings" />
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium mb-4">Personal Information</h3>
        <ProfileForm 
          formData={formData} 
          setFormData={setFormData} 
          onSubmit={handleSubmit} 
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
        />
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-medium mb-4">Notification Settings</h3>
        <NotificationPreferences />
      </div>
    </div>
  );
};

export default UserProfile;
