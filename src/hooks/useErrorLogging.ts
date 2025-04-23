
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useLocation } from "react-router-dom";

export const useErrorLogging = () => {
  const { user } = useAuth();
  const location = useLocation();

  const log404Error = async (attemptedPath: string) => {
    try {
      if (user) {
        await supabase.from('page_not_found_logs').insert({
          user_id: user.id,
          attempted_path: attemptedPath,
          referrer_path: document.referrer,
          user_agent: navigator.userAgent
        });
      }
    } catch (error) {
      console.error('Failed to log 404 error:', error);
    }
  };

  return { log404Error };
};
