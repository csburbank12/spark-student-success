
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { KindnessNote } from "./usePeerUpliftNotes";
import type { UserOpt } from "./usePeerUpliftUsers";

export function useSendUpliftNote(
  userId: string | undefined,
  users: UserOpt[],
  setNotes: React.Dispatch<React.SetStateAction<KindnessNote[]>>
) {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const sendNote = async (
    {
      recipient,
      message,
      anonymous,
      resetFields
    }: {
      recipient: string;
      message: string;
      anonymous: boolean;
      resetFields: () => void;
    }
  ) => {
    if (!recipient || !message.trim()) {
      toast({ title: "Please fill in recipient and message." });
      return;
    }
    if (recipient === "anon") {
      toast({ title: "You must choose a real recipient." });
      return;
    }
    setSubmitting(true);
    const newNote = {
      sender_id: anonymous ? null : userId,
      recipient_id: recipient,
      message: message.trim(),
      anonymous,
      signed: !anonymous,
      sent_at: new Date().toISOString()
    };
    const { data, error } = await supabase
      .from("kindness_notes")
      .insert([newNote])
      .select("*")
      .single();
    if (error) {
      toast({ title: "Failed to send uplift.", description: error.message, variant: "destructive" });
    } else {
      setNotes((prev) => [
        {
          ...data,
          sender: anonymous
            ? { id: "anon", name: "Anonymous", role: "anonymous" }
            : users.find((u) => u.id === data.sender_id) || null,
          recipient: users.find((u) => u.id === data.recipient_id) || null
        },
        ...prev
      ]);
      resetFields();
      toast({
        title: "Uplift sent!",
        description: "Your kindness note has been sent."
      });
    }
    setSubmitting(false);
  };

  return { sendNote, submitting };
}
