import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Send, Heart } from "lucide-react";

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
        <div className="flex flex-col md:flex-row gap-2">
          <Input
            placeholder="Recipient (type to search)"
            list="uplift-recipients"
            value={
              recipient
                ? users.find((u) => u.id === recipient)?.name || ""
                : ""
            }
            onChange={(e) => {
              const name = e.target.value;
              const found = users.find((u) => u.name === name);
              if (found) setRecipient(found.id);
              else setRecipient("");
            }}
            className="md:w-56"
            disabled={loading}
            autoComplete="off"
          />
          <datalist id="uplift-recipients">
            {users.map((u) =>
              u.id !== "anon" ? (
                <option key={u.id} value={u.name} />
              ) : null
            )}
          </datalist>
          <Textarea
            placeholder="Write your message of encouragement or gratitude..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-auto"
            disabled={loading}
            maxLength={280}
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            id="uplift-anonymous"
            type="checkbox"
            checked={anonymous}
            onChange={() => setAnonymous((v) => !v)}
            className="form-checkbox h-4 w-4"
            disabled={loading}
          />
          <label
            htmlFor="uplift-anonymous"
            className="text-sm text-muted-foreground"
          >
            Send anonymously
          </label>
          <Button
            onClick={handleSend}
            className="ml-auto flex gap-1 items-center"
            size="sm"
            disabled={
              loading ||
              submitting ||
              !recipient ||
              !message.trim() ||
              (recipient === user?.id && anonymous)
            }
            title={
              recipient === user?.id && anonymous
                ? "You can't send a fully anonymous note to yourself."
                : "Send Uplift"
            }
          >
            <Send size={16} /> Send Uplift
          </Button>
        </div>
        {loading && (
          <div className="text-center text-muted-foreground py-6">
            Loading notes...
          </div>
        )}
        {!loading && notes.length > 0 && (
          <div>
            <div className="font-semibold mb-2 flex gap-2 items-center">
              <Heart className="text-pink-600" size={16} />
              Kindness Notes Log:
            </div>
            <ul className="space-y-2">
              {notes.map((n) => (
                <li
                  key={n.id}
                  className={`border rounded p-2 text-sm flex flex-col transition-all ${
                    n.recipient_id === user?.id
                      ? "bg-pink-50/40"
                      : "bg-white"
                  }`}
                >
                  <span className="text-sm">
                    <span className="font-medium">
                      {n.anonymous
                        ? "Anonymous"
                        : n.sender?.name || "Unknown"}
                    </span>
                    {" "}
                    <span className="text-muted-foreground">➜</span>{" "}
                    <span className="italic">{n.recipient?.name || "Someone"}</span>
                  </span>
                  <span className="block break-words mt-1">{n.message}</span>
                  <span className="text-xs text-muted-foreground mt-1">
                    {new Date(n.sent_at).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {!loading && notes.length === 0 && (
          <div className="text-muted-foreground text-sm text-center py-4">
            No kindness notes sent or received yet.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PeerUpliftNotes;
