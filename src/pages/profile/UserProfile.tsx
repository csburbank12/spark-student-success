import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/roles";
import { Navigate } from "react-router-dom";
import ParentProfile from "./ParentProfile";
import TeacherProfile from "./TeacherProfile";
import PageHeader from "@/components/layout/PageHeader";
import ProfileForm from "@/components/profile/ProfileForm";
import NotificationPreferences from "@/components/profile/NotificationPreferences";
import { toast } from "sonner";

const UserProfile: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  // All roles now use the /profile route
  switch (user.role as UserRole) {
    case UserRole.teacher:
      return <TeacherProfile user={user} />;
    case UserRole.parent:
      return <ParentProfile user={user} />;
    default:
      return <DefaultProfile user={user} />;
  }
};

// Default profile component for roles without specific profile components
const DefaultProfile: React.FC<{ user: any }> = ({ user }) => {
  const [formData, setFormData] = useState({
    name: user?.name || "John Doe",
    email: user?.email || "john.doe@example.com",
    avatarUrl: user?.avatarUrl || "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Update profile logic would go here
      
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
      name: user?.name || "John Doe",
      email: user?.email || "john.doe@example.com",
      avatarUrl: user?.avatarUrl || "",
    });
    toast.info("Changes cancelled");
  }, [user]);

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
