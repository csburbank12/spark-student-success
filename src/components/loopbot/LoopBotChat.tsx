import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ThumbsUp, Bot } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { useToast } from "@/hooks/use-toast";
import LoopBotMessageList from "./LoopBotMessageList";
import LoopBotInput from "./LoopBotInput";
import { Message, processUserMessage } from "./loopbotUtils";

const LoopBotChat: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast: uiToast } = useToast();

  useEffect(() => {
    if (messages.length === 0) {
      const initialMessages = [
        {
          id: "welcome-1",
          type: "bot" as const,
          content: `Hi ${user?.name || "there"}! I'm LoopBot, your emotional support companion. How are you feeling today?`,
          timestamp: new Date(),
        },
      ];
      setMessages(initialMessages);
    }
  }, [user]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputMessage.trim()) return;

    const userMessageId = `msg-${Date.now()}`;
    const userMessage: Message = {
      id: userMessageId,
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    setTimeout(() => {
      processUserMessage(userMessage, user?.name, setMessages);
      setIsTyping(false);
    }, 1000);
  };

  const flagMessage = (messageId: string) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === messageId ? { ...msg, hasFlagged: true } : msg))
    );

    toast("Message flagged", {
      description: "This message has been flagged for staff review.",
    });
  };

  return (
    <Card className="w-full h-[600px] flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" /> LoopBot
            </CardTitle>
            <CardDescription>Your emotional support companion</CardDescription>
          </div>
          <button
            className="btn btn-outline btn-sm"
            onClick={() =>
              uiToast({
                title: "Feedback recorded",
                description: "Thank you for your feedback!",
              })
            }
          >
            <ThumbsUp className="h-4 w-4 mr-2" /> Helpful
          </button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto">
        <LoopBotMessageList
          messages={messages}
          isTyping={isTyping}
          flagMessage={flagMessage}
          messagesEndRef={messagesEndRef}
        />
      </CardContent>

      <CardFooter>
        <LoopBotInput
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          isTyping={isTyping}
          sendMessage={sendMessage}
        />
      </CardFooter>
    </Card>
  );
};

export default LoopBotChat;
