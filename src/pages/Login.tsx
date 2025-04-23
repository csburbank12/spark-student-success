
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserRole } from "@/types/roles";
import { LoginHeader } from "@/components/auth/LoginHeader";
import { ConfidentialityNotice } from "@/components/auth/ConfidentialityNotice";
import { LoginForm } from "@/components/auth/LoginForm";
import { DemoAccounts } from "@/components/auth/DemoAccounts";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const user = await login(email, password);
      
      // Redirect based on role
      if (user?.role === UserRole.student) {
        navigate("/student-dashboard-enhanced");
      } else if (user?.role === UserRole.teacher || user?.role === UserRole.staff) {
        navigate("/teacher-dashboard-enhanced");
      } else if (user?.role === UserRole.admin) {
        navigate("/admin-dashboard-enhanced");
      } else if (user?.role === UserRole.parent) {
        navigate("/parent-dashboard-enhanced");
      } else {
        navigate("/dashboard");
      }
      
      toast.success("Logged in successfully!");
    } catch (error) {
      toast.error("Failed to log in. Please check your credentials.");
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
      case "staff":
        email = "jamie@school.edu";
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
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>
              Log in to access your student support dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="login">Log In</TabsTrigger>
                <TabsTrigger value="demo">Demo Access</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <LoginForm 
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  isSubmitting={isSubmitting}
                  agreedToTerms={agreedToTerms}
                  setAgreedToTerms={setAgreedToTerms}
                  onSubmit={handleSubmit}
                />
              </TabsContent>
              
              <TabsContent value="demo">
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
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-center w-full text-sm text-muted-foreground">
              Protected by Spark's secure authentication
            </div>
          </CardFooter>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Spark Student Success. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
