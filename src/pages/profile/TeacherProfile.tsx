
import React from "react";
import { User } from "@/types";
import TeacherProfileContent from "@/components/teacher/profile/TeacherProfileContent";

interface TeacherProfileProps {
  user: User;
}

const TeacherProfile: React.FC<TeacherProfileProps> = ({ user }) => {
  return <TeacherProfileContent user={user} />;
};

export default TeacherProfile;
