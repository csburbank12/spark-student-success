
import React from "react";
import { Heart } from "lucide-react";

interface UserOpt {
  id: string;
  name: string;
  role: string;
}

export interface KindnessNote {
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

export interface KindnessNoteCardProps {
  note: KindnessNote;
  isRecipient: boolean;
}

const KindnessNoteCard: React.FC<KindnessNoteCardProps> = ({ note, isRecipient }) => {
  return (
    <li
      className={`border rounded p-2 text-sm flex flex-col transition-all ${
        isRecipient ? "bg-pink-50/40" : "bg-white"
      }`}
    >
      <span className="text-sm">
        <span className="font-medium">
          {note.anonymous ? "Anonymous" : note.sender?.name || "Unknown"}
        </span>
        {" "}
        <span className="text-muted-foreground">➜</span>{" "}
        <span className="italic">{note.recipient?.name || "Someone"}</span>
      </span>
      <span className="block break-words mt-1">{note.message}</span>
      <span className="text-xs text-muted-foreground mt-1">
        {new Date(note.sent_at).toLocaleString()}
      </span>
    </li>
  );
};

export default KindnessNoteCard;
