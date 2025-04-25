
import React from "react";
import PageHeader from "@/components/layout/PageHeader";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { NotificationPreferences } from "@/components/profile/NotificationPreferences";

const UserProfile: React.FC = () => {
  return (
    <div className="space-y-6">
      <PageHeader title="Profile Settings" />
      <ProfileForm />
      <NotificationPreferences />
    </div>
  );
};

export default UserProfile;
