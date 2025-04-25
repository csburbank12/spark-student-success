
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TermsAgreement } from "./TermsAgreement";

interface LoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  isSubmitting: boolean;
  agreedToTerms: boolean;
  setAgreedToTerms: (agreed: boolean) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  isSubmitting,
  agreedToTerms,
  setAgreedToTerms,
  handleSubmit
}: LoginFormProps) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@school.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-11 transition-colors focus:ring-2"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11 transition-colors focus:ring-2"
            required
          />
        </div>
      </div>

      <TermsAgreement
        checked={agreedToTerms}
        onCheckedChange={setAgreedToTerms}
      />

      <Button
        type="submit"
        className="w-full h-11 text-base font-medium transition-all bg-gradient-to-r from-primary to-primary-600 hover:brightness-110"
        disabled={isSubmitting || !agreedToTerms}
      >
        {isSubmitting ? "Logging in..." : "Log in"}
      </Button>
    </form>
  );
};
