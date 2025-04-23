
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface UserOpt {
  id: string;
  name: string;
  role: string;
}

interface SendUpliftFormProps {
  users: UserOpt[];
  recipient: string;
  setRecipient: (id: string) => void;
  message: string;
  setMessage: (msg: string) => void;
  anonymous: boolean;
  setAnonymous: (anon: boolean | ((prev: boolean) => boolean)) => void;
  loading: boolean;
  submitting: boolean;
  onSend: () => void;
  userId: string | undefined;
}

const SendUpliftForm: React.FC<SendUpliftFormProps> = ({
  users,
  recipient,
  setRecipient,
  message,
  setMessage,
  anonymous,
  setAnonymous,
  loading,
  submitting,
  onSend,
  userId,
}) => {
  return (
    <>
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
          onChange={() => setAnonymous((v: boolean) => !v)}
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
          onClick={onSend}
          className="ml-auto flex gap-1 items-center"
          size="sm"
          disabled={
            loading ||
            submitting ||
            !recipient ||
            !message.trim() ||
            (recipient === userId && anonymous)
          }
          title={
            recipient === userId && anonymous
              ? "You can't send a fully anonymous note to yourself."
              : "Send Uplift"
          }
        >
          <Send size={16} /> Send Uplift
        </Button>
      </div>
    </>
  );
};

export default SendUpliftForm;
