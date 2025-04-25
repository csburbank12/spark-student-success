
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

  // Redirect to dashboard if already logged in
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
      
      // Log the error
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
    // Map roles to email addresses
    const demoEmails: Record<string, string> = {
      student: "jada@school.edu",
      teacher: "nguyen@school.edu",
      admin: "rodriguez@district.edu",
      parent: "sarah@family.com",
      staff: "chen@school.edu",
      counselor: "miguel@school.edu"  // Added counselor role
    };

    if (demoEmails[role]) {
      setEmail(demoEmails[role]);
      setPassword("password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <LoginHeader />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-sm border">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-heading font-bold">Welcome Back</h2>
            <p className="text-muted-foreground">
              Sign in to continue to your account
            </p>
          </div>

          {errorMessage && (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Login Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

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

          <DemoAccounts
            presetLogin={presetLogin}
            email={email}
            password={password}
            isSubmitting={isSubmitting}
            agreedToTerms={agreedToTerms}
            setAgreedToTerms={setAgreedToTerms}
            handleSubmit={handleSubmit}
          />

          <div className="mt-8 space-y-4">
            <ConfidentialityNotice />
            
            <Alert className="bg-blue-50 border-blue-200 text-blue-900">
              <Shield className="h-5 w-5" />
              <AlertTitle className="font-medium">FERPA Compliance</AlertTitle>
              <AlertDescription className="mt-2 text-sm">
                This platform is FERPA compliant. All educational records are protected in accordance with
                the Family Educational Rights and Privacy Act. By logging in, you agree to handle student data
                according to FERPA guidelines.
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
