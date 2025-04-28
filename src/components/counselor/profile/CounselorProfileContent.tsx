
import React from "react";
import { User } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileForm from "@/components/profile/ProfileForm";
import NotificationPreferences from "@/components/profile/NotificationPreferences";
import CounselorStudentsCard from "./CounselorStudentsCard";
import CounselorScheduleCard from "./CounselorScheduleCard";
import CounselorResourcesCard from "./CounselorResourcesCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, BookOpen, Settings, Bell } from "lucide-react";
import { toast } from "sonner";

interface CounselorProfileContentProps {
  user: User;
}

const CounselorProfileContent: React.FC<CounselorProfileContentProps> = ({ user }) => {
  const [formData, setFormData] = React.useState({
    name: user?.name || "Miguel Torres",
    email: user?.email || "miguel@school.edu",
    avatarUrl: user?.avatarUrl || "",
    phone: "555-789-6543",
    specialties: "College Counseling, Mental Health",
    certifications: "Licensed School Counselor, Certified Career Counselor"
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
      name: user?.name || "Miguel Torres",
      email: user?.email || "miguel@school.edu",
      avatarUrl: user?.avatarUrl || "",
      phone: "555-789-6543",
      specialties: "College Counseling, Mental Health",
      certifications: "Licensed School Counselor, Certified Career Counselor"
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
            role="counselor"
            avatarUrl={formData.avatarUrl}
          />
        </div>
        
        <Tabs defaultValue="students">
          <TabsList>
            <TabsTrigger value="students">
              <Users className="h-4 w-4 mr-2" />
              My Students
            </TabsTrigger>
            <TabsTrigger value="schedule">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule
            </TabsTrigger>
            <TabsTrigger value="resources">
              <BookOpen className="h-4 w-4 mr-2" />
              Resources
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
          
          <TabsContent value="students" className="space-y-6">
            <CounselorStudentsCard />
          </TabsContent>
          
          <TabsContent value="schedule" className="space-y-6">
            <CounselorScheduleCard />
          </TabsContent>
          
          <TabsContent value="resources" className="space-y-6">
            <CounselorResourcesCard />
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

export default CounselorProfileContent;
