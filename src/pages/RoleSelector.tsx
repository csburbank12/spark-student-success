
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '@/types/roles';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { School, User, Users, UserPlus } from 'lucide-react';
import { getFallbackDashboardByRole } from '@/utils/navigationUtils';
import { toast } from 'sonner';

const RoleSelector = () => {
  const navigate = useNavigate();
  const { setRole } = useAuth();

  const roles = [
    {
      role: UserRole.student,
      title: "Student",
      description: "Access your learning dashboard and resources",
      icon: <User className="h-5 w-5" />,
      iconClass: "bg-emerald-100 text-emerald-600"
    },
    {
      role: UserRole.teacher,
      title: "Teacher",
      description: "Manage your classes and track student progress",
      icon: <Users className="h-5 w-5" />,
      iconClass: "bg-blue-100 text-blue-600"
    },
    {
      role: UserRole.admin,
      title: "Administrator",
      description: "Access system settings and manage users",
      icon: <School className="h-5 w-5" />,
      iconClass: "bg-purple-100 text-purple-600"
    },
    {
      role: UserRole.parent,
      title: "Parent",
      description: "Monitor your child's progress",
      icon: <UserPlus className="h-5 w-5" />,
      iconClass: "bg-amber-100 text-amber-600"
    }
  ];

  const handleRoleSelect = (role: UserRole) => {
    setRole(role);
    const dashboardRoute = getFallbackDashboardByRole(role);
    toast.success(`Switched to ${role} account`);
    navigate(dashboardRoute);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">Select Your Role</h1>
          <p className="mt-2 text-muted-foreground">
            Choose your role to access the appropriate dashboard
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {roles.map((role) => (
            <Card
              key={role.role}
              className="p-6 cursor-pointer transition-all hover:shadow-md hover:-translate-y-0.5"
              onClick={() => handleRoleSelect(role.role)}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-lg ${role.iconClass}`}>
                  {role.icon}
                </div>
                <div>
                  <h3 className="font-semibold">{role.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {role.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="mt-4"
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;
