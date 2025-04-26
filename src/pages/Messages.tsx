
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types/roles";
import PageHeader from "@/components/layout/PageHeader";
import ParentMessages from "@/pages/parent/ParentMessages";

const Messages = () => {
  const { user } = useAuth();
  
  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  // For now, we only have the parent messages component
  // We can extend this later with role-specific message components
  switch (user.role as UserRole) {
    case UserRole.parent:
      return <ParentMessages />;
    default:
      return (
        <div className="space-y-6">
          <PageHeader title="Messages" />
          <div className="border rounded-lg p-12 text-center">
            <h3 className="text-lg font-medium mb-2">Coming Soon</h3>
            <p className="text-muted-foreground">
              The messaging feature for your user role is currently under development.
            </p>
          </div>
        </div>
      );
  }
};

export default Messages;
