
import React, { useState } from "react";
import PageHeader from "@/components/layout/PageHeader";
import ProfileForm from "@/components/profile/ProfileForm";
import NotificationPreferences from "@/components/profile/NotificationPreferences";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const UserProfile: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    avatarUrl: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: formData.name.split(' ')[0],
          last_name: formData.name.split(' ').slice(1).join(' '),
          avatar_url: formData.avatarUrl
        })
        .eq('id', user.id);

      if (error) throw error;
      
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
      name: "John Doe",
      email: "john.doe@example.com",
      avatarUrl: "",
    });
    toast.info("Changes cancelled");
  };

  return (
    <div className="space-y-8">
      <PageHeader title="Profile Settings" />
      <div className="grid gap-8">
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
        <div className="bg-card p-6 rounded-lg shadow-sm border">
          <h3 className="text-lg font-medium mb-4">Notification Settings</h3>
          <NotificationPreferences />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
