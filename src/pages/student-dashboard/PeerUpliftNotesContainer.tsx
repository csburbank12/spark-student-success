
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import { usePeerUpliftUsers } from "./hooks/usePeerUpliftUsers";
import { useSendUpliftNote } from "./hooks/useSendUpliftNote";
import { Heart, Send } from "lucide-react";

const PeerUpliftNotesContainer: React.FC = () => {
  const { user } = useAuth();
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [notes, setNotes] = useState<any[]>([]);

  // Get users for peer uplift
  const { users, loading } = usePeerUpliftUsers(user);

  // Send note functionality
  const { sendNote, submitting } = useSendUpliftNote(
    user?.id, 
    users, 
    setNotes
  );

  // Reset form fields after submission
  const resetFields = () => {
    setRecipient("");
    setMessage("");
    setAnonymous(false);
  };

  // Load existing notes
  useEffect(() => {
    // In a real app, this would fetch notes from the database
    // For now, use demo data
    setNotes([
      {
        id: "note1",
        sender_id: null,
        sender_name: "Anonymous",
        recipient_id: "2",
        recipient_name: "Jamie Smith",
        message: "I noticed how you helped that new student today. That was really kind!",
        anonymous: true,
        sent_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() // 1 day ago
      },
      {
        id: "note2",
        sender_id: user?.id,
        sender_name: "You",
        recipient_id: "4",
        recipient_name: "Morgan Lee",
        message: "Great job on your presentation in class today! Your confidence was inspiring.",
        anonymous: false,
        sent_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days ago
      }
    ]);
  }, [user?.id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendNote({
      recipient,
      message,
      anonymous,
      resetFields
    });
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Heart className="mr-2 h-5 w-5 text-pink-500" />
            Send an Uplift Note
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="recipient">To</Label>
              <Select value={recipient} onValueChange={setRecipient}>
                <SelectTrigger id="recipient">
                  <SelectValue placeholder="Select recipient" />
                </SelectTrigger>
                <SelectContent>
                  {loading ? (
                    <SelectItem value="loading" disabled>
                      Loading users...
                    </SelectItem>
                  ) : (
                    users.map(user => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name} ({user.role})
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Your Message</Label>
              <Textarea
                id="message"
                placeholder="Share something positive about their day, their work, or who they are as a person..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="anonymous"
                checked={anonymous}
                onCheckedChange={setAnonymous}
              />
              <Label htmlFor="anonymous">Send anonymously</Label>
            </div>

            <Button 
              type="submit" 
              disabled={!recipient || !message.trim() || submitting}
              className="w-full"
            >
              {submitting ? (
                "Sending..."
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Uplift Note
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Sent Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notes.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                You haven't sent any uplift notes yet. Share some kindness today!
              </p>
            ) : (
              notes.map(note => (
                <div key={note.id} className="border rounded-lg p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        To: <span className="font-medium">{note.recipient_name}</span>
                      </p>
                      <p className="text-sm text-muted-foreground">
                        From: <span className="font-medium">{note.sender_name}</span>
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {new Date(note.sent_at).toLocaleDateString()}
                    </p>
                  </div>
                  <p>{note.message}</p>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PeerUpliftNotesContainer;
