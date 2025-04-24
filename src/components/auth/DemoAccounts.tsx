
import React from "react";
import { Button } from "@/components/ui/button";
import { TermsAgreement } from "./TermsAgreement";
import { toast } from "sonner";
import { ErrorLoggingService, ProfileType } from "@/services/ErrorLoggingService";
import { UserRole } from "@/types/roles";
import { demoUsers } from "@/data/demoUsers";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { 
  School, 
  User, 
  Users, 
  UserPlus, 
  Briefcase 
} from "lucide-react";

interface DemoAccount {
  role: string;
  name: string;
  email: string;
  description: string;
  icon: React.ReactNode;
  iconClass: string;
}

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
  const demoAccounts: DemoAccount[] = [
    { 
      role: UserRole.student, 
      name: demoUsers[UserRole.student].name,
      email: demoUsers[UserRole.student].email,
      description: "Access student dashboard, mood tracking, SEL resources, and digital journal",
      icon: <User className="h-5 w-5" />,
      iconClass: "bg-emerald-100 text-emerald-600"
    },
    { 
      role: UserRole.teacher, 
      name: demoUsers[UserRole.teacher].name,
      email: demoUsers[UserRole.teacher].email,
      description: "View student data, assign interventions, and track progress",
      icon: <Users className="h-5 w-5" />,
      iconClass: "bg-blue-100 text-blue-600"
    },
    { 
      role: UserRole.admin, 
      name: demoUsers[UserRole.admin].name,
      email: demoUsers[UserRole.admin].email,
      description: "Manage school settings, users, and access analytics",
      icon: <School className="h-5 w-5" />,
      iconClass: "bg-purple-100 text-purple-600"
    },
    { 
      role: UserRole.parent, 
      name: demoUsers[UserRole.parent].name,
      email: demoUsers[UserRole.parent].email,
      description: "Monitor child activities, wellness, and communicate with staff",
      icon: <UserPlus className="h-5 w-5" />,
      iconClass: "bg-amber-100 text-amber-600"
    },
    { 
      role: UserRole.staff, 
      name: "Dr. James Chen",
      email: "chen@school.edu",
      description: "Access staff tools, provide support services, and manage resources",
      icon: <Briefcase className="h-5 w-5" />,
      iconClass: "bg-teal-100 text-teal-600"
    }
  ];

  const handleAccountSelect = (role: string) => {
    try {
      presetLogin(role);
      toast.info(`${role.charAt(0).toUpperCase() + role.slice(1)} demo account selected`);
    } catch (error) {
      console.error("Error selecting demo account:", error);
      ErrorLoggingService.logError({
        action: "demo_account_selection",
        error_message: `Failed to select ${role} demo account: ${error instanceof Error ? error.message : String(error)}`,
        profile_type: role as ProfileType
      });
      toast.error(`Could not load ${role} demo account`);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    try {
      handleSubmit(e);
    } catch (error) {
      console.error("Error in form submission:", error);
      ErrorLoggingService.logError({
        action: "demo_login_submit",
        error_message: `Demo login form submission failed: ${error instanceof Error ? error.message : String(error)}`,
        profile_type: email.includes("@") ? email.split("@")[0] as ProfileType : "unknown"
      });
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-3">
        {demoAccounts.map((account) => (
          <Card 
            key={account.role}
            className="border border-primary-100 cursor-pointer hover:bg-primary-50 transition-all"
            onClick={() => handleAccountSelect(account.role)}
          >
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className={`mr-3 h-10 w-10 rounded-full ${account.iconClass} flex items-center justify-center`}>
                  {account.icon}
                </div>
                <div className="text-left flex-1">
                  <p className="font-medium">{account.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {account.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <TermsAgreement
        checked={agreedToTerms}
        onCheckedChange={setAgreedToTerms}
        id="terms-demo"
      />
      
      <Button 
        className="w-full"
        disabled={!email || !password || !agreedToTerms || isSubmitting}
        onClick={handleFormSubmit}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? "Logging in..." : "Log in with Selected Account"}
      </Button>

      {email && !password && (
        <p className="text-sm text-muted-foreground text-center">
          For demo accounts, the password is always "password"
        </p>
      )}
      <p className="text-xs text-center text-muted-foreground">
        All demo profiles are fully functional with realistic data
      </p>
    </div>
  );
};
