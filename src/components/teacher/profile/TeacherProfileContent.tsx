
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from "@/types";
import ProfileHeader from "@/components/profile/ProfileHeader";
import TeacherInformationCard from "./TeacherInformationCard";
import TeacherScheduleCard from "./TeacherScheduleCard";
import QuickActionsCard from "./QuickActionsCard";
import TeacherClassesCard from "./TeacherClassesCard";
import TeacherResourcesCard from "./TeacherResourcesCard";

interface TeacherProfileContentProps {
  user: User;
}

const TeacherProfileContent: React.FC<TeacherProfileContentProps> = ({ user }) => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto px-4 py-6">
      <ProfileHeader 
        name={user?.name || "Teacher"}
        email={user?.email || ""}
        role={user?.role || "teacher"}
        avatarUrl={user?.avatarUrl}
      />
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="classes">Classes & Students</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TeacherInformationCard />
            <TeacherScheduleCard />
          </div>
          <QuickActionsCard />
        </TabsContent>

        <TabsContent value="classes" className="space-y-4">
          <TeacherClassesCard />
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <TeacherResourcesCard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeacherProfileContent;
