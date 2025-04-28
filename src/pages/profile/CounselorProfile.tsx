
import React from "react";
import { User } from "@/types";
import CounselorProfileContent from "@/components/counselor/profile/CounselorProfileContent";
import PageHeader from "@/components/layout/PageHeader";

interface CounselorProfileProps {
  user: User;
}

const CounselorProfile: React.FC<CounselorProfileProps> = ({ user }) => {
  return (
    <>
      <PageHeader title="Counselor Profile" />
      <CounselorProfileContent user={user} />
    </>
  );
};

export default CounselorProfile;
