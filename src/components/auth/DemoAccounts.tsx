
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { School, User, Users, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { demoUsers } from "@/data/demoUsers";
import { UserRole } from "@/types/roles";

interface DemoAccountsProps {
  presetLogin: (role: string) => void;
  email: string;
  password: string;
  isSubmitting: boolean;
  agreedToTerms: boolean;
  setAgreedToTerms: (agreed: boolean) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export const DemoAccounts = ({
  presetLogin,
  email,
  password,
  isSubmitting,
  agreedToTerms,
  setAgreedToTerms,
  handleSubmit,
}: DemoAccountsProps) => {
  const demoAccounts = [
    {
      role: UserRole.student,
      name: demoUsers[UserRole.student].name,
      email: demoUsers[UserRole.student].email,
      description: "Access student dashboard and resources",
      icon: <User className="h-5 w-5" />,
      iconClass: "bg-emerald-100 text-emerald-600"
    },
    {
      role: UserRole.teacher,
      name: demoUsers[UserRole.teacher].name,
      email: demoUsers[UserRole.teacher].email,
      description: "View student data and assign tasks",
      icon: <Users className="h-5 w-5" />,
      iconClass: "bg-blue-100 text-blue-600"
    },
    {
      role: UserRole.admin,
      name: demoUsers[UserRole.admin].name,
      email: demoUsers[UserRole.admin].email,
      description: "Manage school settings and analytics",
      icon: <School className="h-5 w-5" />,
      iconClass: "bg-purple-100 text-purple-600"
    },
    {
      role: UserRole.parent,
      name: demoUsers[UserRole.parent].name,
      email: demoUsers[UserRole.parent].email,
      description: "Monitor child progress and engage",
      icon: <UserPlus className="h-5 w-5" />,
      iconClass: "bg-amber-100 text-amber-600"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-1">Demo Accounts</h3>
        <p className="text-sm text-muted-foreground">
          Select a role to explore the platform
        </p>
      </div>

      <div className="grid gap-3">
        {demoAccounts.map((account) => (
          <Card
            key={account.role}
            className={cn(
              "border border-primary-100 cursor-pointer transition-all",
              "hover:shadow-md hover:-translate-y-0.5 hover:bg-primary-50/50"
            )}
            onClick={() => presetLogin(account.role)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center",
                  account.iconClass
                )}>
                  {account.icon}
                </div>
                <div className="text-left flex-1">
                  <p className="font-medium text-sm">{account.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {account.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {email && !password && (
        <p className="text-sm text-center text-muted-foreground">
          For demo accounts, use password: "password"
        </p>
      )}
    </div>
  );
};
