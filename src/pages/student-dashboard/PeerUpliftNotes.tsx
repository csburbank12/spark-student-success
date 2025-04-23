
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { User } from "@/types";

interface KindnessNote {
  id: string;
  sender: string | null;
  recipient: string;
  message: string;
  anonymous: boolean;
  sentAt: string;
  signed: boolean;
}

const demoUsers = [
  { id: "anon", name: "Anonymous" },
  { id: "self", name: "Myself" },
  { id: "staff1", name: "Mr. Lee (Staff)" },
  { id: "student2", name: "Jane Doe (Student)" }
];

const PeerUpliftNotes: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [notes, setNotes] = useState<KindnessNote[]>([]);
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [anonymous, setAnonymous] = useState(false);

  const handleSend = () => {
    if (!recipient || !message.trim()) {
      toast({ title: "Please fill in recipient and message." });
      return;
    }
    const note: KindnessNote = {
      id: Math.random().toString(36).slice(2),
      sender: anonymous ? null : user?.full_name ?? null,
      recipient,
      message: message.trim(),
      anonymous,
      sentAt: new Date().toISOString(),
      signed: !anonymous,
    };
    setNotes((prev) => [note, ...prev]);
    setMessage("");
    setRecipient("");
    setAnonymous(false);
    toast({ title: "Uplift sent!", description: "Your kindness note has been sent." });
    // TODO: Persist in SEL records and show received notes (requires SQL backend + RLS)
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Peer Uplift System</CardTitle>
        <div className="text-muted-foreground text-sm">
          Send an anonymous or signed note of kindness to a peer or staff member. Notes will appear here and be recorded.
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col md:flex-row gap-2">
          <Input
            placeholder="Recipient (type a name)"
            list="uplift-recipients"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="md:w-48"
          />
          <datalist id="uplift-recipients">
            {demoUsers.map((u) => (
              <option key={u.id} value={u.name} />
            ))}
          </datalist>
          <Textarea
            placeholder="Write your message of encouragement or gratitude..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-auto"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            id="uplift-anonymous"
            type="checkbox"
            checked={anonymous}
            onChange={() => setAnonymous((v) => !v)}
            className="form-checkbox h-4 w-4"
          />
          <label
            htmlFor="uplift-anonymous"
            className="text-sm text-muted-foreground"
          >
            Send anonymously
          </label>
          <Button onClick={handleSend} className="ml-auto" size="sm">
            Send Uplift
          </Button>
        </div>
        {notes.length > 0 && (
          <div>
            <div className="font-semibold mb-2">Kindness Notes Log:</div>
            <ul className="space-y-2">
              {notes.map((n) => (
                <li
                  key={n.id}
                  className="border rounded p-2 text-sm flex flex-col"
                >
                  <span>
                    <span className="font-medium">
                      {n.anonymous ? "Anonymous" : n.sender}
                    </span>{" "}
                    ➜ <span className="italic">{n.recipient}</span>
                  </span>
                  <span className="block break-words mt-1">{n.message}</span>
                  <span className="text-xs text-muted-foreground mt-1">
                    {new Date(n.sentAt).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PeerUpliftNotes;
