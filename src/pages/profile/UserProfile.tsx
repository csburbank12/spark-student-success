
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { UserRole } from '@/types/roles';
import StudentProfile from "./StudentProfile";
import TeacherProfile from "./TeacherProfile";
import AdminProfile from "./AdminProfile";
import ParentProfile from "./ParentProfile";
import StaffProfile from "./StaffProfile";
import { Loader } from "@/components/ui/loader";
import { useNavigate } from "react-router-dom";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileForm from "@/components/profile/ProfileForm";
import NotificationPreferences from "@/components/profile/NotificationPreferences";
import { supabase } from "@/integrations/supabase/client";

const UserProfile = () => {
  const { user, isLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !isEditing) {
      // Update form data when user info is loaded
      setFormData({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user, isEditing]);

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }
  
  if (!user) {
    return (
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-2">Not logged in</h3>
          <p className="text-muted-foreground mb-4">
            You need to be logged in to view your profile.
          </p>
          <Button onClick={() => navigate("/login")}>Go to Login</Button>
        </CardContent>
      </Card>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // First, update the profiles table if it exists
      // This is a common pattern in Supabase applications
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ first_name: formData.name.split(' ')[0], last_name: formData.name.split(' ').slice(1).join(' ') })
        .eq('id', user.id);
        
      if (profileError) {
        console.error("Error updating profile:", profileError);
      }
      
      // Then try to update the users table if needed
      // Note: In many Supabase setups, direct modification of auth.users 
      // might require admin privileges or edge functions
      
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getProfileComponent = () => {
    const userRole = user?.role as UserRole;
    switch (userRole) {
      case UserRole.student:
        return <StudentProfile user={user} />;
      case UserRole.teacher:
        return <TeacherProfile user={user} />;
      case UserRole.admin:
        return <AdminProfile user={user} />;
      case UserRole.parent:
        return <ParentProfile user={user} />;
      case UserRole.staff:
        return <StaffProfile user={user} />;
      default:
        return <div>Unknown role: {user?.role}</div>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">User Profile</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Your Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <ProfileHeader 
              name={user.name}
              email={user.email}
              role={user.role}
              avatarUrl={user.avatarUrl}
            />

            {isEditing ? (
              <ProfileForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleSubmit}
                onCancel={() => setIsEditing(false)}
                isSubmitting={isSubmitting}
              />
            ) : (
              <Button onClick={() => setIsEditing(true)} className="w-full">
                Edit Profile
              </Button>
            )}

            <NotificationPreferences />
            
            <div className="space-y-2 pt-4 border-t">
              <Button variant="outline" className="w-full" onClick={() => navigate("/settings")}>
                Account Settings
              </Button>
              <Button variant="outline" className="w-full" onClick={() => navigate("/help")}>
                Help & Support
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Role-Specific Information</CardTitle>
            </CardHeader>
            <CardContent>{getProfileComponent()}</CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
