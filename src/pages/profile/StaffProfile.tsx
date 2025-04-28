
import React from "react";
import { User } from "@/types";
import StaffProfileContent from "@/components/staff/profile/StaffProfileContent";
import PageHeader from "@/components/layout/PageHeader";

interface StaffProfileProps {
  user: User;
}

const StaffProfile: React.FC<StaffProfileProps> = ({ user }) => {
  return (
    <>
      <PageHeader title="Staff Profile" />
      <StaffProfileContent user={user} />
    </>
  );
};

export default StaffProfile;
