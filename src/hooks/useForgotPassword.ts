
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { toast } from 'sonner';

export function useForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const sendPasswordResetEmail = async (email: string) => {
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    
    setIsLoading(true);
    setIsSuccess(false);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password',
      });
      
      if (error) throw error;
      
      setIsSuccess(true);
      toast.success("Password reset instructions sent to your email");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send reset email';
      console.error("Reset password error:", errorMessage);
      toast.error(errorMessage);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sendPasswordResetEmail,
    isLoading,
    isSuccess
  };
}
