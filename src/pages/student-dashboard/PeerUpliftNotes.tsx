
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail } from "lucide-react";
import KindnessNoteList from "./KindnessNoteList";
import SendUpliftForm from "./SendUpliftForm";

interface UserOpt {
  id: string;
  name: string;
  role: string;
}

interface KindnessNote {
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

const PeerUpliftNotes: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState<UserOpt[]>([]);
  const [notes, setNotes] = useState<KindnessNote[]>([]);
  const [recipient, setRecipient] = useState(""); // user id
  const [message, setMessage] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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
          { id: user?.id || "self", name: "Myself", role: user?.role ?? "Student" }
        ]);
      } else {
        const formatted = (data || []).map((u: any) => ({
          id: u.id,
          name: u.full_name,
          role: u.role
        }));
        setUsers([
          { id: "anon", name: "Anonymous", role: "anonymous" },
          { id: user?.id || "self", name: "Myself", role: user?.role ?? "Student" },
          ...formatted.filter(u => u.id !== user?.id)
        ]);
      }
      setLoading(false);
    }
    fetchUsers();
  }, [user?.id, user?.role, toast]);

  async function fetchNotes() {
    setLoading(true);
    const { data, error } = await supabase
      .from("kindness_notes")
      .select("*")
      .or(`sender_id.eq.${user?.id},recipient_id.eq.${user?.id}`)
      .order("sent_at", { ascending: false });
    if (error) {
      toast({ title: "Could not load notes.", variant: "destructive" });
      setNotes([]);
      setLoading(false);
      return;
    }
    setNotes(
      (data || []).map((n: any) => ({
        ...n,
        sender: n.anonymous
          ? { id: "anon", name: "Anonymous", role: "anonymous" }
          : users.find((u) => u.id === n.sender_id) || null,
        recipient: users.find((u) => u.id === n.recipient_id) || null
      }))
    );
    setLoading(false);
  }

  useEffect(() => {
    if (user?.id && users.length > 0) {
      fetchNotes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, users]);

  const handleSend = async () => {
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
      sender_id: anonymous ? null : user?.id,
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
      setMessage("");
      setRecipient("");
      setAnonymous(false);
      toast({
        title: "Uplift sent!",
        description: "Your kindness note has been sent."
      });
    }
    setSubmitting(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="text-indigo-700" size={20} /> Peer Uplift System
        </CardTitle>
        <div className="text-muted-foreground text-sm">
          Send an anonymous or signed note of kindness to a peer or staff member. Notes will appear here and be recorded for SEL insights.
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <SendUpliftForm
          users={users}
          recipient={recipient}
          setRecipient={setRecipient}
          message={message}
          setMessage={setMessage}
          anonymous={anonymous}
          setAnonymous={setAnonymous}
          loading={loading}
          submitting={submitting}
          onSend={handleSend}
          userId={user?.id}
        />
        <KindnessNoteList notes={notes} userId={user?.id} loading={loading} />
      </CardContent>
    </Card>
  );
};

export default PeerUpliftNotes;
