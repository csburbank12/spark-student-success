
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type SendNoteParams = {
  recipient: string;
  message: string;
  anonymous: boolean;
  resetFields: () => void;
};

export const useSendUpliftNote = (
  userId: string | undefined,
  users: any[],
  setNotes: React.Dispatch<React.SetStateAction<any[]>>
) => {
  const [submitting, setSubmitting] = useState(false);

  const sendNote = async ({
    recipient,
    message,
    anonymous,
    resetFields
  }: SendNoteParams) => {
    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }

    if (!recipient) {
      toast.error("Please select a recipient");
      return;
    }

    setSubmitting(true);

    try {
      // In a real implementation, this would send a note to Supabase
      // For now, simulate an API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newNote = {
        id: Math.random().toString(36).substring(2, 9),
        sender_id: anonymous ? null : userId,
        sender_name: anonymous ? "Anonymous" : "You",
        recipient_id: recipient,
        recipient_name: users.find(u => u.id === recipient)?.name || "Unknown",
        message,
        anonymous,
        sent_at: new Date().toISOString()
      };

      setNotes(prevNotes => [newNote, ...prevNotes]);
      resetFields();
      toast.success("Your message has been sent!");
    } catch (error) {
      console.error("Error sending uplift note:", error);
      toast.error("Failed to send your message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return { sendNote, submitting };
};
