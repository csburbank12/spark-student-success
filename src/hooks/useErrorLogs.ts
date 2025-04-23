
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface ErrorLog {
  id: string;
  timestamp: string;
  user_id: string | null;
  profile_type: string | null;
  action: string;
  error_message: string;
  status_code: string | null;
  resolved: boolean;
}

export function useErrorLogs(showResolved: boolean = false, limit: number = 100, offset: number = 0) {
  const [logs, setLogs] = useState<ErrorLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasRecurringIssues, setHasRecurringIssues] = useState(false);
  const { toast } = useToast();

  const fetchLogs = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.rpc('get_error_logs', {
        p_limit: limit,
        p_offset: offset,
        p_show_resolved: showResolved
      });

      if (error) throw error;
      setLogs(data || []);
    } catch (error) {
      console.error('Error fetching error logs:', error);
      toast({
        title: "Error",
        description: "Could not load error logs. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleResolution = async (logId: string, resolved: boolean) => {
    try {
      await supabase.rpc('resolve_error_log', {
        p_log_id: logId,
        p_resolved: resolved
      });
      
      await fetchLogs();
      
      toast({
        title: resolved ? "Error Resolved" : "Error Reopened",
        description: `The error has been marked as ${resolved ? 'resolved' : 'unresolved'}.`
      });
    } catch (error) {
      console.error('Error updating error resolution:', error);
      toast({
        title: "Error",
        description: "Could not update error status. Please try again.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [showResolved, limit, offset]);

  return {
    logs,
    isLoading,
    hasRecurringIssues,
    toggleResolution,
    refreshLogs: fetchLogs
  };
}
