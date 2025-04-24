
import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LoginForm } from "@/components/auth/LoginForm";
import { LoginHeader } from "@/components/auth/LoginHeader";
import { ConfidentialityNotice } from "@/components/auth/ConfidentialityNotice";
import { DemoAccounts } from "@/components/auth/DemoAccounts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ErrorLoggingService, ProfileType } from "@/services/ErrorLoggingService";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("demo");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await login(email, password);
      navigate(redirectTo);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Failed to login";
      console.error(errorMsg);
      
      ErrorLoggingService.logError({
        action: "login_failed",
        error_message: errorMsg,
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

          <div className="mt-8">
            <ConfidentialityNotice />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
