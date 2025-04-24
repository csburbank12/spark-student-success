
import React from "react";
import { Button } from "@/components/ui/button";
import { TermsAgreement } from "./TermsAgreement";
import { toast } from "sonner";
import { ErrorLoggingService, ProfileType } from "@/services/ErrorLoggingService";
import { UserRole } from "@/types/roles";
import { demoUsers } from "@/data/demoUsers";

interface DemoAccount {
  role: string;
  name: string;
  email: string;
  description: string;
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
      iconClass: "bg-emerald-100 text-emerald-600"
    },
    { 
      role: UserRole.teacher, 
      name: demoUsers[UserRole.teacher].name,
      email: demoUsers[UserRole.teacher].email,
      description: "View student data, assign interventions, and track progress",
      iconClass: "bg-blue-100 text-blue-600"
    },
    { 
      role: UserRole.admin, 
      name: demoUsers[UserRole.admin].name,
      email: demoUsers[UserRole.admin].email,
      description: "Manage school settings, users, and access analytics",
      iconClass: "bg-purple-100 text-purple-600"
    },
    { 
      role: UserRole.parent, 
      name: demoUsers[UserRole.parent].name,
      email: demoUsers[UserRole.parent].email,
      description: "Monitor child activities, wellness, and communicate with staff",
      iconClass: "bg-amber-100 text-amber-600"
    },
    { 
      role: UserRole.staff, 
      name: demoUsers[UserRole.staff].name,
      email: demoUsers[UserRole.staff].email,
      description: "Support student wellness, track interventions, access resources",
      iconClass: "bg-indigo-100 text-indigo-600"
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
    <div className="space-y-4">
      <div className="grid gap-2">
        {demoAccounts.map((account) => (
          <Button 
            key={account.role}
            onClick={() => handleAccountSelect(account.role)}
            variant="outline" 
            className="justify-start hover:bg-primary-50 border-primary-100 w-full transition-all"
            aria-label={`Select ${account.name} account`}
          >
            <div className="flex items-center w-full">
              <div className={`mr-3 h-10 w-10 rounded-full ${account.iconClass} flex items-center justify-center`}>
                <span className="text-sm font-medium">
                  {account.name[0]}
                </span>
              </div>
              <div className="text-left flex-1">
                <p className="font-medium">{account.name}</p>
                <p className="text-xs text-muted-foreground">
                  {account.description}
                </p>
              </div>
            </div>
          </Button>
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
