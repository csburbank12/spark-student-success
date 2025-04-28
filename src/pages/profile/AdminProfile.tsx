
import React from "react";
import { User } from "@/types";
import AdminProfileContent from "@/components/admin/profile/AdminProfileContent";
import PageHeader from "@/components/layout/PageHeader";

interface AdminProfileProps {
  user: User;
}

const AdminProfile: React.FC<AdminProfileProps> = ({ user }) => {
  return (
    <>
      <PageHeader title="Admin Profile" />
      <AdminProfileContent user={user} />
    </>
  );
};

export default AdminProfile;
