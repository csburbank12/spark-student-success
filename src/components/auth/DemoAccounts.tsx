
import { Button } from "@/components/ui/button";
import { TermsAgreement } from "./TermsAgreement";

interface DemoAccountProps {
  role: string;
  name: string;
  presetLogin: (role: string) => void;
}

const DemoAccount = ({ role, name, presetLogin }: DemoAccountProps) => (
  <Button 
    onClick={() => presetLogin(role)}
    variant="outline" 
    className="justify-start hover:bg-primary-50 border-primary-100"
  >
    <div className="flex items-center">
      <div className="mr-3 h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
        <span className="text-sm font-medium text-primary-600">{name[0]}</span>
      </div>
      <div className="text-left">
        <p className="font-medium">{name}</p>
        <p className="text-xs text-muted-foreground">{role.charAt(0).toUpperCase() + role.slice(1)} Account</p>
      </div>
    </div>
  </Button>
);

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
    { role: "student", name: "Alex Johnson" },
    { role: "teacher", name: "Ms. Rodriguez" },
    { role: "admin", name: "Principal Wilson" },
    { role: "parent", name: "Sarah Johnson" },
    { role: "staff", name: "Jamie Smith" },
  ];

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Choose a demo account to experience the platform:
      </p>
      <div className="grid gap-2">
        {demoAccounts.map((account) => (
          <DemoAccount
            key={account.role}
            role={account.role}
            name={account.name}
            presetLogin={presetLogin}
          />
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
        {isSubmitting ? "Logging in..." : "Log in with Demo Account"}
      </Button>
    </div>
  );
};
