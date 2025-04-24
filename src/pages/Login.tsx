
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LoginForm } from "@/components/auth/LoginForm";
import { LoginHeader } from "@/components/auth/LoginHeader";
import { ConfidentialityNotice } from "@/components/auth/ConfidentialityNotice";
import { DemoAccounts } from "@/components/auth/DemoAccounts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ErrorLoggingService, ProfileType } from "@/services/ErrorLoggingService";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const redirectTo = searchParams.get("redirectTo") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("demo");

  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (user) {
      const from = location.state?.from || redirectTo;
      navigate(from);
    }
  }, [user, navigate, location.state, redirectTo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await login(email, password);
      navigate(redirectTo);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to login";
      console.error(errorMessage);
      
      ErrorLoggingService.logError({
        action: "login_failed",
        error_message: errorMessage,
        profile_type: email.includes("@") ? email.split("@")[0] as ProfileType : "unknown"
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
      staff: "chen@school.edu"
    };

    if (demoEmails[role]) {
      setEmail(demoEmails[role]);
      setPassword("password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <LoginHeader />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-background w-full max-w-md p-6 rounded-xl shadow-sm border">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="demo">Demo Accounts</TabsTrigger>
              <TabsTrigger value="login">Login</TabsTrigger>
            </TabsList>

            <TabsContent value="demo" className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-heading font-bold">Demo Accounts</h2>
                <p className="text-muted-foreground">
                  Select a role to experience the platform
                </p>
              </div>

              <DemoAccounts
                presetLogin={presetLogin}
                email={email}
                password={password}
                isSubmitting={isSubmitting}
                agreedToTerms={agreedToTerms}
                setAgreedToTerms={setAgreedToTerms}
                handleSubmit={handleSubmit}
              />
            </TabsContent>

            <TabsContent value="login" className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-heading font-bold">Welcome Back</h2>
                <p className="text-muted-foreground">
                  Sign in to continue to your account
                </p>
              </div>

              <LoginForm
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                agreedToTerms={agreedToTerms}
                setAgreedToTerms={setAgreedToTerms}
                handleSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
            </TabsContent>
          </Tabs>

          <div className="mt-8 space-y-4">
            <ConfidentialityNotice />
            
            {/* Add FERPA Compliance Notice */}
            <Alert className="bg-blue-50 border-blue-200 text-blue-900">
              <Shield className="h-5 w-5" />
              <AlertTitle className="font-medium">FERPA Compliance</AlertTitle>
              <AlertDescription className="mt-2 text-sm">
                This platform is FERPA compliant. All educational records are protected in accordance with
                the Family Educational Rights and Privacy Act. By logging in, you agree to handle student data
                according to FERPA guidelines.
                <div className="mt-2">
                  <Link to="/privacy-policy" className="text-blue-600 hover:underline">
                    View our Privacy Policy
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
