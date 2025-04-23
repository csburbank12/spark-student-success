
import React from "react";
import KindnessNoteCard, { KindnessNote } from "./KindnessNoteCard";
import { Heart } from "lucide-react";

interface KindnessNoteListProps {
  notes: KindnessNote[];
  userId: string | undefined;
  loading: boolean;
}

const KindnessNoteList: React.FC<KindnessNoteListProps> = ({ notes, userId, loading }) => {
  if (loading) {
    return (
      <div className="text-center text-muted-foreground py-6">
        Loading notes...
      </div>
    );
  }
  if (!loading && notes.length === 0) {
    return (
      <div className="text-muted-foreground text-sm text-center py-4">
        No kindness notes sent or received yet.
      </div>
    );
  }

  return (
    <div>
      <div className="font-semibold mb-2 flex gap-2 items-center">
        <Heart className="text-pink-600" size={16} />
        Kindness Notes Log:
      </div>
      <ul className="space-y-2">
        {notes.map((note) => (
          <KindnessNoteCard
            key={note.id}
            note={note}
            isRecipient={note.recipient_id === userId}
          />
        ))}
      </ul>
    </div>
  );
};

export default KindnessNoteList;
