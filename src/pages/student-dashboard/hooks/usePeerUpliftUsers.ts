
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface UserOpt {
  id: string;
  name: string;
  role: string;
}

export function usePeerUpliftUsers(loggedInUser: { id?: string; role?: string } | null) {
  const [users, setUsers] = useState<UserOpt[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      const { data, error } = await supabase
        .from("users")
        .select("id, full_name, role")
        .order("full_name", { ascending: true });

      if (error) {
        toast({ title: "Could not load users for recipient list.", variant: "destructive" });
        setUsers([
          { id: "anon", name: "Anonymous", role: "anonymous" },
          { id: loggedInUser?.id || "self", name: "Myself", role: loggedInUser?.role ?? "Student" }
        ]);
      } else {
        const formatted = (data || []).map((u: any) => ({
          id: u.id,
          name: u.full_name,
          role: u.role
        }));
        setUsers([
          { id: "anon", name: "Anonymous", role: "anonymous" },
          { id: loggedInUser?.id || "self", name: "Myself", role: loggedInUser?.role ?? "Student" },
          ...formatted.filter(u => u.id !== loggedInUser?.id)
        ]);
      }
      setLoading(false);
    }
    fetchUsers();
  }, [loggedInUser?.id, loggedInUser?.role, toast]);

  return { users, loading };
}
