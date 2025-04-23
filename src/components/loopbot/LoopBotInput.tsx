
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface LoopBotInputProps {
  inputMessage: string;
  setInputMessage: (msg: string) => void;
  isTyping: boolean;
  sendMessage: (e: React.FormEvent) => void;
}

const LoopBotInput: React.FC<LoopBotInputProps> = ({
  inputMessage,
  setInputMessage,
  isTyping,
  sendMessage,
}) => (
  <form onSubmit={sendMessage} className="w-full flex gap-2">
    <Input
      value={inputMessage}
      onChange={(e) => setInputMessage(e.target.value)}
      placeholder="Type a message..."
      disabled={isTyping}
      className="flex-1"
    />
    <Button type="submit" disabled={isTyping}>
      <Send className="h-4 w-4" />
    </Button>
  </form>
);

export default LoopBotInput;

