
import React from "react";
import { User } from "@/types";
import StudentProfileContent from "@/components/student/profile/StudentProfileContent";
import PageHeader from "@/components/layout/PageHeader";

interface StudentProfileProps {
  user: User;
}

const StudentProfile: React.FC<StudentProfileProps> = ({ user }) => {
  return (
    <>
      <PageHeader title="Student Profile" />
      <StudentProfileContent user={user} />
    </>
  );
};

export default StudentProfile;
