
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import TeacherProfileContent from "@/components/teacher/profile/TeacherProfileContent";
import PageHeader from "@/components/layout/PageHeader";
import Layout from "@/components/Layout";

const TeacherProfilePage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-full">
          <p>Please log in to view your profile</p>
        </div>
      </Layout>
    );
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
