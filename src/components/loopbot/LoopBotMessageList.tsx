
import React from "react";
import { Message } from "./loopbotUtils";
import { Bot, Flag, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
  flagMessage: (messageId: string) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}
const LoopBotMessageList: React.FC<MessageListProps> = ({
  messages,
  isTyping,
  flagMessage,
  messagesEndRef,
}) => {
  const renderMessage = (message: Message) => {
    switch (message.type) {
      case "user":
        return (
          <div key={message.id} className="flex justify-end mb-4">
            <div className="flex items-end gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => flagMessage(message.id)}
              >
                <Flag className="h-4 w-4" />
              </Button>
              <div className="bg-primary text-primary-foreground rounded-lg px-4 py-2 max-w-[80%]">
                {message.content}
              </div>
            </div>
          </div>
        );
      case "bot":
        return (
          <div key={message.id} className="flex justify-start mb-4">
            <div className="flex items-start gap-2">
              <div className="bg-muted rounded-lg p-1">
                <Bot className="h-5 w-5" />
              </div>
              <div className="space-y-2">
                <div className="bg-muted text-foreground rounded-lg px-4 py-2 max-w-[80%]">
                  {message.content}
                </div>
                {message.hasFlagged && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Flag className="h-3 w-3 text-red-500" />
                    <span>Your counselor has been notified</span>
                  </div>
                )}
                {message.recommendedTool && (
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1 cursor-pointer hover:bg-accent"
                    >
                      <a href={message.recommendedToolPath} className="flex items-center gap-1">
                        {message.recommendedTool} <MoveRight className="h-3 w-3" />
                      </a>
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case "system":
        return (
          <div key={message.id} className="flex justify-center mb-4">
            <div className="bg-muted text-muted-foreground rounded-lg px-4 py-2 text-xs italic">
              {message.content}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      {messages.map(renderMessage)}
      {isTyping && (
        <div className="flex justify-start mb-4">
          <div className="bg-muted text-foreground rounded-lg px-4 py-2">
            <div className="flex gap-1">
              <span className="animate-bounce">.</span>
              <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>
                .
              </span>
              <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>
                .
              </span>
            </div>
          </div>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default LoopBotMessageList;

