
import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { UserOpt } from "./usePeerUpliftUsers";

export interface KindnessNote {
  id: string;
  sender_id: string | null;
  recipient_id: string;
  message: string;
  anonymous: boolean;
  sent_at: string;
  signed: boolean;
  sender?: UserOpt | null;
  recipient?: UserOpt | null;
}

export function usePeerUpliftNotes(userId: string | undefined, users: UserOpt[]) {
  const { toast } = useToast();
  const [notes, setNotes] = useState<KindnessNote[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchNotes = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("kindness_notes")
      .select("*")
      .or(`sender_id.eq.${userId},recipient_id.eq.${userId}`)
      .order("sent_at", { ascending: false });
    if (error) {
      toast({ title: "Could not load notes.", variant: "destructive" });
      setNotes([]);
    } else {
      setNotes(
        (data || []).map((n: any) => ({
          ...n,
          sender: n.anonymous
            ? { id: "anon", name: "Anonymous", role: "anonymous" }
            : users.find((u) => u.id === n.sender_id) || null,
          recipient: users.find((u) => u.id === n.recipient_id) || null
        }))
      );
    }
    setLoading(false);
  }, [userId, users, toast]);

  return { notes, setNotes, loading, fetchNotes };
}
