
import React from "react";
import { User } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileForm from "@/components/profile/ProfileForm";
import NotificationPreferences from "@/components/profile/NotificationPreferences";
import StudentAchievementsCard from "./StudentAchievementsCard";
import StudentMoodHistoryCard from "./StudentMoodHistoryCard";
import StudentTrustedAdultsCard from "./StudentTrustedAdultsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Heart, Users, Settings, Bell } from "lucide-react";
import { toast } from "sonner";

interface StudentProfileContentProps {
  user: User;
}

const StudentProfileContent: React.FC<StudentProfileContentProps> = ({ user }) => {
  const [formData, setFormData] = React.useState({
    name: user?.name || "Jada Thompson",
    email: user?.email || "jada@school.edu",
    avatarUrl: user?.avatarUrl || "",
    phone: "",
    gradeLevel: user?.gradeLevel || "10th",
    interests: "Basketball, Art, Science"
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
      name: user?.name || "Jada Thompson",
      email: user?.email || "jada@school.edu",
      avatarUrl: user?.avatarUrl || "",
      phone: "",
      gradeLevel: user?.gradeLevel || "10th",
      interests: "Basketball, Art, Science"
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
            role="student"
            avatarUrl={formData.avatarUrl}
          />
        </div>
        
        <Tabs defaultValue="achievements">
          <TabsList>
            <TabsTrigger value="achievements">
              <Award className="h-4 w-4 mr-2" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="wellness">
              <Heart className="h-4 w-4 mr-2" />
              Wellness
            </TabsTrigger>
            <TabsTrigger value="trusted-adults">
              <Users className="h-4 w-4 mr-2" />
              Trusted Adults
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
          
          <TabsContent value="achievements" className="space-y-6">
            <StudentAchievementsCard />
          </TabsContent>
          
          <TabsContent value="wellness" className="space-y-6">
            <StudentMoodHistoryCard />
          </TabsContent>
          
          <TabsContent value="trusted-adults" className="space-y-6">
            <StudentTrustedAdultsCard />
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

export default StudentProfileContent;
