import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Alert, AlertDescription } from "@/components/ui/alert";

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
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-heading font-bold">Spark</h1>
          </div>
          <p className="text-xl text-muted-foreground">Student Success Platform</p>
        </div>

        <Alert className="bg-amber-50 border-amber-200 text-amber-900">
          <Lock className="h-5 w-5" />
          <AlertDescription className="mt-2 text-sm">
            <strong className="block mb-2">Confidential Platform Access</strong>
            This website contains proprietary educational data, tools, and intellectual property belonging to ThriveTrackED. 
            By logging in, you agree not to disclose, distribute, or misuse any information accessed within. 
            Unauthorized use or sharing is strictly prohibited and may result in legal or administrative action.
          </AlertDescription>
        </Alert>

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
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@school.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="terms" 
                      checked={agreedToTerms}
                      onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I understand and agree to the confidentiality terms
                    </label>
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting || !agreedToTerms}
                  >
                    {isSubmitting ? "Logging in..." : "Log in"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="demo">
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Choose a demo account to experience the platform:
                  </p>
                  <div className="grid gap-2">
                    <Button 
                      onClick={() => presetLogin("student")}
                      variant="outline" 
                      className="justify-start hover:bg-primary-50 border-primary-100"
                    >
                      <div className="flex items-center">
                        <div className="mr-3 h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary-600">S</span>
                        </div>
                        <div className="text-left">
                          <p className="font-medium">Alex Johnson</p>
                          <p className="text-xs text-muted-foreground">Student Account</p>
                        </div>
                      </div>
                    </Button>
                    
                    <Button 
                      onClick={() => presetLogin("teacher")}
                      variant="outline" 
                      className="justify-start hover:bg-primary-50 border-primary-100"
                    >
                      <div className="flex items-center">
                        <div className="mr-3 h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary-600">T</span>
                        </div>
                        <div className="text-left">
                          <p className="font-medium">Ms. Rodriguez</p>
                          <p className="text-xs text-muted-foreground">Teacher Account</p>
                        </div>
                      </div>
                    </Button>
                    
                    <Button 
                      onClick={() => presetLogin("admin")}
                      variant="outline" 
                      className="justify-start hover:bg-primary-50 border-primary-100"
                    >
                      <div className="flex items-center">
                        <div className="mr-3 h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary-600">A</span>
                        </div>
                        <div className="text-left">
                          <p className="font-medium">Principal Wilson</p>
                          <p className="text-xs text-muted-foreground">Administrator Account</p>
                        </div>
                      </div>
                    </Button>
                    
                    <Button 
                      onClick={() => presetLogin("parent")}
                      variant="outline" 
                      className="justify-start hover:bg-primary-50 border-primary-100"
                    >
                      <div className="flex items-center">
                        <div className="mr-3 h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary-600">P</span>
                        </div>
                        <div className="text-left">
                          <p className="font-medium">Sarah Johnson</p>
                          <p className="text-xs text-muted-foreground">Parent Account</p>
                        </div>
                      </div>
                    </Button>
                    
                    <Button 
                      onClick={() => presetLogin("staff")}
                      variant="outline" 
                      className="justify-start hover:bg-primary-50 border-primary-100"
                    >
                      <div className="flex items-center">
                        <div className="mr-3 h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary-600">S</span>
                        </div>
                        <div className="text-left">
                          <p className="font-medium">Jamie Smith</p>
                          <p className="text-xs text-muted-foreground">Staff Account</p>
                        </div>
                      </div>
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-4">
                    <Checkbox 
                      id="terms-demo" 
                      checked={agreedToTerms}
                      onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                    />
                    <label
                      htmlFor="terms-demo"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I understand and agree to the confidentiality terms
                    </label>
                  </div>
                  
                  <Button 
                    className="w-full"
                    disabled={!email || !password || !agreedToTerms}
                    onClick={handleSubmit}
                  >
                    {isSubmitting ? "Logging in..." : "Log in with Demo Account"}
                  </Button>
                </div>
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
