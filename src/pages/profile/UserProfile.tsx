
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/roles";
import StudentProfile from "./StudentProfile";
import TeacherProfile from "./TeacherProfile";
import ParentProfile from "./ParentProfile";
import CounselorProfile from "./CounselorProfile";
import AdminProfile from "./AdminProfile";
import DefaultProfile from "./DefaultProfile";
import { Loader } from "@/components/ui/loader";

const UserProfile: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="h-8 w-8" />
      </div>
    );
  }

  // Render role-specific profile views
  switch (user.role as UserRole) {
    case UserRole.admin:
      return <AdminProfile user={user} />;
    case UserRole.teacher:
      return <TeacherProfile user={user} />;
    case UserRole.parent:
      return <ParentProfile user={user} />;
    case UserRole.counselor:
      return <CounselorProfile user={user} />;
    case UserRole.student:
      return <StudentProfile user={user} />;
    default:
      return <DefaultProfile user={user} />;
  }
};

export default UserProfile;
