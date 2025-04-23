
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { UserRole } from "@/types/roles";
import { LoginHeader } from "@/components/auth/LoginHeader";
import { ConfidentialityNotice } from "@/components/auth/ConfidentialityNotice";
import { DemoAccounts } from "@/components/auth/DemoAccounts";
import { ErrorLoggingService } from "@/services/ErrorLoggingService";

const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      redirectBasedOnRole(user.role as UserRole);
    }
  }, [user]);

  const redirectBasedOnRole = (role: UserRole) => {
    switch (role) {
      case UserRole.student:
        navigate("/student-dashboard-enhanced");
        break;
      case UserRole.teacher:
      case UserRole.staff:
        navigate("/teacher-dashboard-enhanced");
        break;
      case UserRole.admin:
        navigate("/admin-dashboard-enhanced");
        break;
      case UserRole.parent:
        navigate("/parent-dashboard-enhanced");
        break;
      default:
        navigate("/dashboard");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }
    
    if (!agreedToTerms) {
      toast.error("You must agree to the terms and conditions");
      return;
    }
    
    setIsSubmitting(true);

    try {
      const user = await login(email, password);
      
      if (user) {
        // Success message is shown in the AuthContext
        // Redirect based on role
        redirectBasedOnRole(user.role as UserRole);
      }
    } catch (error) {
      const errorMessage = error instanceof Error 
        ? error.message 
        : "Failed to log in. Please check your credentials.";
      
      toast.error(errorMessage);
      
      ErrorLoggingService.logError({
        action: "login_attempt",
        error_message: `Login failure: ${errorMessage}`,
        profile_type: email.includes("@") ? email.split("@")[0] : "unknown"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const presetLogin = (role: string) => {
    let email = "";
    switch (role) {
      case "student":
        email = "alex@school.edu";
        break;
      case "teacher":
        email = "rodriguez@school.edu";
        break;
      case "admin":
        email = "wilson@district.edu";
        break;
      case "parent":
        email = "sarah@family.com";
        break;
    }
    setEmail(email);
    setPassword("password");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-primary-50 to-background p-4">
      <div className="w-full max-w-md space-y-8">
        <LoginHeader />
        <ConfidentialityNotice />

        <Card className="border-2">
          <CardHeader>
            <CardTitle className="text-2xl">Welcome to ThriveTrackED</CardTitle>
            <CardDescription>
              Choose a demo account to explore the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DemoAccounts 
              presetLogin={presetLogin}
              email={email}
              password={password}
              isSubmitting={isSubmitting}
              agreedToTerms={agreedToTerms}
              setAgreedToTerms={setAgreedToTerms}
              handleSubmit={handleSubmit}
            />
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-center w-full text-sm text-muted-foreground">
              Protected by ThriveTrackED's secure authentication
            </div>
          </CardFooter>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} ThriveTrackED. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
