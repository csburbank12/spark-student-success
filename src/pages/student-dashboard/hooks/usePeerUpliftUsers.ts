
import { useState, useEffect } from "react";
import { User } from "@/types";
import { supabase } from "@/integrations/supabase/client";

type PeerUpliftUser = {
  id: string;
  name: string;
  role: string;
};

export const usePeerUpliftUsers = (currentUser: User | null) => {
  const [users, setUsers] = useState<PeerUpliftUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        // In a real implementation, this would fetch users from Supabase
        // For now, use demo data
        const demoUsers = [
          { id: "1", name: "Alex Johnson", role: "Student" },
          { id: "2", name: "Jamie Smith", role: "Student" },
          { id: "3", name: "Casey Williams", role: "Teacher" },
          { id: "4", name: "Morgan Lee", role: "Student" },
          { id: "5", name: "Taylor Wilson", role: "Student" }
        ];

        // Remove current user from list
        const filteredUsers = demoUsers.filter(
          user => user.id !== currentUser?.id
        );
        
        setUsers(filteredUsers);
      } catch (error) {
        console.error("Error fetching peer uplift users:", error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchUsers();
    }
  }, [currentUser]);

  return { users, loading };
};
