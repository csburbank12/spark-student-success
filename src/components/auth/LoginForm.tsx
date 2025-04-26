
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TermsAgreement } from "./TermsAgreement";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

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
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email
          </Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder="your.email@school.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={cn(
                "h-11 transition-all pr-10",
                "border-muted-foreground/20",
                "focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary"
              )}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={cn(
                "h-11 transition-all pr-10",
                "border-muted-foreground/20",
                "focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:border-primary"
              )}
              required
            />
            <button 
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
      </div>

      <TermsAgreement
        checked={agreedToTerms}
        onCheckedChange={setAgreedToTerms}
      />

      <Button
        type="submit"
        className={cn(
          "w-full h-11 text-base font-medium transition-all",
          "bg-gradient-to-r from-primary to-purple-600",
          "hover:brightness-110 hover:shadow-md",
          "disabled:opacity-70 disabled:cursor-not-allowed"
        )}
        disabled={isSubmitting || !agreedToTerms}
      >
        {isSubmitting ? (
          <>
            <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Logging in...
          </>
        ) : "Log in"}
      </Button>
    </form>
  );
};
