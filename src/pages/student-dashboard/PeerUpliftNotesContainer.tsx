
import React, { useState, useEffect, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";
import KindnessNoteList from "./KindnessNoteList";
import SendUpliftForm from "./SendUpliftForm";
import { useAuth } from "@/contexts/AuthContext";
import { usePeerUpliftUsers } from "./hooks/usePeerUpliftUsers";
import { usePeerUpliftNotes } from "./hooks/usePeerUpliftNotes";
import { useSendUpliftNote } from "./hooks/useSendUpliftNote";

const PeerUpliftNotesContainer: React.FC = () => {
  const { user } = useAuth();
  const { users, loading: usersLoading } = usePeerUpliftUsers(user);
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [anonymous, setAnonymous] = useState(false);

  const {
    notes,
    setNotes,
    loading: notesLoading,
    fetchNotes
  } = usePeerUpliftNotes(user?.id, users);

  const { sendNote, submitting } = useSendUpliftNote(
    user?.id,
    users,
    setNotes
  );

  // (Re)fetch notes when users list changes
  useEffect(() => {
    if (user?.id && users.length > 0) {
      fetchNotes();
    }
  }, [user?.id, users, fetchNotes]);

  // Used so we can reset form fields after successful send
  const handleSend = useCallback(() => {
    sendNote({
      recipient,
      message,
      anonymous,
      resetFields: () => {
        setMessage("");
        setRecipient("");
        setAnonymous(false);
      }
    });
  }, [sendNote, recipient, message, anonymous]);

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
          loading={usersLoading || notesLoading}
          submitting={submitting}
          onSend={handleSend}
          userId={user?.id}
        />
        <KindnessNoteList notes={notes} userId={user?.id} loading={usersLoading || notesLoading} />
      </CardContent>
    </Card>
  );
};

export default PeerUpliftNotesContainer;
