
import React from "react";
import { ProfileCard } from "./ProfileCard";

interface ProfileListProps {
  profiles: Array<{
    id: string;
    name: string;
    role: string;
    grade?: string;
    department?: string;
    children?: string;
    avatar: string;
    status: string;
    wellLensAccess: boolean;
    lastActive: string;
  }>;
}

export const ProfileList = ({ profiles }: ProfileListProps) => {
  return (
    <div className="grid gap-4">
      {profiles.map((profile) => (
        <ProfileCard key={profile.id} profile={profile} />
      ))}
    </div>
  );
};
