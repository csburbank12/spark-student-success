
import { useState, useCallback } from "react";
import { User } from "@/types";
import { supabase } from "@/integrations/supabase/client";

type Note = {
  id: string;
  sender_id: string | null;
  sender_name?: string;
  recipient_id: string;
  recipient_name?: string;
  message: string;
  anonymous: boolean;
  sent_at: string;
};

export const usePeerUpliftNotes = (
  userId: string | undefined,
  users: any[]
) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch notes
  const fetchNotes = useCallback(async () => {
    setLoading(true);
    try {
      // In a real implementation, this would fetch notes from Supabase
      // For now, use demo data
      const demoNotes = [
        {
          id: "1",
          sender_id: "2",
          recipient_id: userId || "",
          message: "Great job on the presentation today!",
          anonymous: false,
          sent_at: new Date().toISOString()
        },
        {
          id: "2",
          sender_id: null,
          recipient_id: userId || "",
          message: "You're always so helpful in class discussions.",
          anonymous: true,
          sent_at: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: "3",
          sender_id: userId,
          recipient_id: "4",
          message: "Thanks for helping me understand that math problem!",
          anonymous: false,
          sent_at: new Date(Date.now() - 172800000).toISOString()
        }
      ];

      // Add sender and recipient names
      const notesWithNames = demoNotes.map(note => {
        const senderUser = users.find(u => u.id === note.sender_id);
        const recipientUser = users.find(u => u.id === note.recipient_id);
        
        return {
          ...note,
          sender_name: note.anonymous ? "Anonymous" : (senderUser?.name || "Unknown"),
          recipient_name: recipientUser?.name || "Unknown"
        };
      });
      
      setNotes(notesWithNames);
    } catch (error) {
      console.error("Error fetching peer uplift notes:", error);
    } finally {
      setLoading(false);
    }
  }, [userId, users]);

  return { notes, setNotes, loading, fetchNotes };
};
