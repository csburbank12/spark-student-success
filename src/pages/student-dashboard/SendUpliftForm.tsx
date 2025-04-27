
import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface SendUpliftFormProps {
  users: any[];
  recipient: string;
  setRecipient: (value: string) => void;
  message: string;
  setMessage: (value: string) => void;
  anonymous: boolean;
  setAnonymous: (value: boolean) => void;
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
  userId
}) => {
  return (
    <div className="space-y-4 bg-card border rounded-lg p-4">
      <h3 className="text-lg font-medium">Send a Kind Note</h3>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="recipient">To</Label>
          <Select
            value={recipient}
            onValueChange={setRecipient}
            disabled={loading || submitting}
          >
            <SelectTrigger id="recipient" className="w-full">
              <SelectValue placeholder="Select recipient" />
            </SelectTrigger>
            <SelectContent>
              {users.map(user => (
                <SelectItem key={user.id} value={user.id}>
                  {user.name} ({user.role})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            placeholder="Write your kind note here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[120px]"
            disabled={loading || submitting}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Switch
              checked={anonymous}
              onCheckedChange={setAnonymous}
              disabled={loading || submitting}
              id="anonymous"
            />
            <Label htmlFor="anonymous">Send anonymously</Label>
          </div>
          
          <Button 
            onClick={onSend}
            disabled={!message.trim() || !recipient || loading || submitting}
            className="ml-auto"
          >
            {submitting ? (
              <>
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                Sending...
              </>
            ) : (
              "Send Note"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SendUpliftForm;
