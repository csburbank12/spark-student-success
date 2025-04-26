
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import TeacherProfileContent from "@/components/teacher/profile/TeacherProfileContent";
import PageHeader from "@/components/layout/PageHeader";
import Layout from "@/components/Layout";
import { useProfileAccess } from "@/hooks/useProfileAccess";
import { UserRole } from "@/types/roles";

const TeacherProfilePage: React.FC = () => {
  const { user } = useProfileAccess([UserRole.teacher, UserRole.admin]);

  if (!user) {
    return null;
  }

  return (
    <Layout>
      <PageHeader 
        title="Teacher Profile" 
        description="Manage your personal information and teacher settings"
      />
      <TeacherProfileContent user={user} />
    </Layout>
  );
};

export default TeacherProfilePage;
