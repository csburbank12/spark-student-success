
import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/branding/Logo";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Get the access token from the URL
  const accessToken = searchParams.get("access_token");

  useEffect(() => {
    if (!accessToken) {
      setErrorMessage("Invalid or missing access token. Please request a new password reset link.");
    }
  }, [accessToken]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    try {
      if (!accessToken) {
        throw new Error("No access token provided");
      }

      // Set the new password using the access token
      const { error } = await supabase.auth.updateUser(
        { password }
      );

      if (error) throw error;

      setIsSuccess(true);
      toast.success("Password reset successfully!");
      
      // Redirect to login page after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to reset password";
      setErrorMessage(errorMessage);
      console.error("Error resetting password:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <div className="flex flex-col items-center justify-center w-full p-6 md:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-5">
            <Logo className="h-14 w-auto mx-auto" />
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Reset Your Password
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your new password below
              </p>
            </div>
          </div>

          {isSuccess ? (
            <div className="bg-card border rounded-xl p-8 shadow-sm space-y-6 animate-fadeIn">
              <div className="flex flex-col items-center justify-center py-4 text-center space-y-4">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <Check className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-lg">Password Reset Successful</h3>
                  <p className="text-sm text-muted-foreground">
                    Your password has been reset successfully. You'll be redirected to the login page shortly.
                  </p>
                </div>
                <Button 
                  className="mt-4" 
                  onClick={() => navigate("/login")}
                >
                  Go to Login
                </Button>
              </div>
            </div>
          ) : (
            <div className="bg-card border rounded-xl p-8 shadow-sm space-y-6 animate-fadeIn">
              {errorMessage && (
                <Alert variant="destructive" className="animate-fadeIn border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}

              {!accessToken ? (
                <div className="text-center py-4">
                  <p className="text-muted-foreground mb-4">
                    Invalid or expired password reset link. Please request a new one.
                  </p>
                  <Button onClick={() => navigate("/login")}>
                    Back to Login
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="password">New Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="********"
                        className="h-11"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="********"
                        className="h-11"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-11 text-base font-medium"
                    disabled={isSubmitting || !password || !confirmPassword}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Resetting...
                      </>
                    ) : "Reset Password"}
                  </Button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
