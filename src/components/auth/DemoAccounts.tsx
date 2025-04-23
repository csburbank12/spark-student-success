
import { Button } from "@/components/ui/button";
import { TermsAgreement } from "./TermsAgreement";

interface DemoAccount {
  role: string;
  name: string;
  email: string;
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
    { role: "student", name: "Student Demo", email: "alex@school.edu" },
    { role: "teacher", name: "Teacher Demo", email: "rodriguez@school.edu" },
    { role: "admin", name: "Admin Demo", email: "wilson@district.edu" },
    { role: "parent", name: "Parent Demo", email: "sarah@family.com" },
  ];

  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        {demoAccounts.map((account) => (
          <Button 
            key={account.role}
            onClick={() => presetLogin(account.role)}
            variant="outline" 
            className="justify-start hover:bg-primary-50 border-primary-100 w-full"
          >
            <div className="flex items-center">
              <div className="mr-3 h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                <span className="text-sm font-medium text-primary-600">
                  {account.name[0]}
                </span>
              </div>
              <div className="text-left">
                <p className="font-medium">{account.name}</p>
                <p className="text-xs text-muted-foreground">
                  {account.role.charAt(0).toUpperCase() + account.role.slice(1)} Account
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
        disabled={!email || !password || !agreedToTerms}
        onClick={handleSubmit}
      >
        {isSubmitting ? "Logging in..." : "Log in with Selected Account"}
      </Button>
    </div>
  );
};
