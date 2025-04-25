import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LoginForm } from "@/components/auth/LoginForm";
import { LoginHeader } from "@/components/auth/LoginHeader";
import { ConfidentialityNotice } from "@/components/auth/ConfidentialityNotice";
import { DemoAccounts } from "@/components/auth/DemoAccounts";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Shield, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { ErrorLoggingService } from "@/services/ErrorLoggingService";
import { getFallbackDashboardByRole } from "@/utils/navigationUtils";
import { UserRole } from "@/types/roles";
import { cn } from "@/lib/utils";

const Login = () => {
  const { login, user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const redirectTo = searchParams.get("redirectTo");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (!isLoading && user) {
      const dashboardRoute = getFallbackDashboardByRole(user.role as UserRole);
      const from = location.state?.from || redirectTo || dashboardRoute;
      navigate(from, { replace: true });
    }
  }, [user, isLoading, navigate, location.state, redirectTo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const loggedInUser = await login(email, password);
      
      if (loggedInUser) {
        const dashboardRoute = getFallbackDashboardByRole(loggedInUser.role as UserRole);
        const from = location.state?.from || redirectTo || dashboardRoute;
        navigate(from, { replace: true });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to login";
      console.error(errorMessage);
      setErrorMessage(errorMessage);
      
      ErrorLoggingService.logError({
        action: 'login_attempt_failed',
        error_message: errorMessage,
        profile_type: 'unauthenticated'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const presetLogin = (role: string) => {
    const demoEmails: Record<string, string> = {
      student: "jada@school.edu",
      teacher: "nguyen@school.edu",
      admin: "rodriguez@district.edu",
      parent: "sarah@family.com",
      staff: "chen@school.edu",
      counselor: "miguel@school.edu"
    };

    if (demoEmails[role]) {
      setEmail(demoEmails[role]);
      setPassword("password");
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-400 to-primary-700 p-12 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
        <div className="relative z-10 text-white max-w-2xl">
          <h1 className="text-4xl font-bold mb-6">ThriveTrackED</h1>
          <p className="text-lg opacity-90">
            Empowering education through emotional intelligence and data-driven insights.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 md:p-12 bg-background">
        <div className="w-full max-w-md space-y-8">
          <LoginHeader />
          
          {errorMessage && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Login Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          <div className={cn(
            "bg-card border rounded-xl p-6 shadow-sm space-y-6",
            "transition-all duration-200 hover:shadow-md"
          )}>
            <LoginForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              isSubmitting={isSubmitting}
              agreedToTerms={agreedToTerms}
              setAgreedToTerms={setAgreedToTerms}
              handleSubmit={handleSubmit}
            />
          </div>

          <div className="mt-8 space-y-6">
            <DemoAccounts
              presetLogin={presetLogin}
              email={email}
              password={password}
              isSubmitting={isSubmitting}
              agreedToTerms={agreedToTerms}
              setAgreedToTerms={setAgreedToTerms}
              handleSubmit={handleSubmit}
            />

            <ConfidentialityNotice />
            
            <Alert className="bg-blue-50 border-blue-200 text-blue-900">
              <Shield className="h-5 w-5" />
              <AlertTitle className="font-medium">FERPA Compliance</AlertTitle>
              <AlertDescription className="mt-2 text-sm">
                This platform is FERPA compliant. All educational records are protected in accordance with
                the Family Educational Rights and Privacy Act.
                <div className="mt-2">
                  <Link to="/privacy-policy" className="text-blue-600 hover:underline flex items-center gap-1">
                    View our Privacy Policy 
                    <ExternalLink size={14} />
                  </Link>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
