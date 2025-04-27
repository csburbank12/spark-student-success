
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

interface KindnessNoteListProps {
  notes: Note[];
  userId: string | undefined;
  loading: boolean;
}

const KindnessNoteList: React.FC<KindnessNoteListProps> = ({ notes, userId, loading }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Kindness Notes</h3>
        <div className="flex items-center justify-center h-24">
          <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Kindness Notes</h3>
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            No kindness notes yet. Be the first to send one!
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Kindness Notes</h3>
        <Badge variant="outline" className="bg-primary/5">
          {notes.length} Total
        </Badge>
      </div>
      
      <div className="space-y-3">
        {notes.map(note => (
          <Card key={note.id} className={`transition-all hover:shadow-sm ${
            note.sender_id === userId ? "bg-primary/5 border-primary/20" : ""
          }`}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  {note.sender_id === userId ? (
                    <Badge variant="outline" className="bg-primary/10 text-primary">Sent</Badge>
                  ) : (
                    <Badge variant="outline" className="bg-green-50 text-green-600">Received</Badge>
                  )}
                  <span className="ml-2 text-sm font-medium">
                    {note.sender_id === userId 
                      ? `To: ${note.recipient_name}`
                      : `From: ${note.sender_name}`
                    }
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {formatDate(note.sent_at)}
                </span>
              </div>
              <p className="text-sm leading-relaxed">{note.message}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default KindnessNoteList;
