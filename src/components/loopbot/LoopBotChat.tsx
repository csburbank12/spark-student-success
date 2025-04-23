
import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Send, Bot, ThumbsUp, Flag, MoveRight } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

type MessageType = "user" | "bot" | "system";

interface Message {
  id: string;
  type: MessageType;
  content: string;
  timestamp: Date;
  hasFlagged?: boolean;
  recommendedTool?: string;
  recommendedToolPath?: string;
}

const LoopBotChat: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast: uiToast } = useToast();
  
  // Initial greeting when component mounts
  useEffect(() => {
    if (messages.length === 0) {
      const initialMessages = [
        {
          id: "welcome-1",
          type: "bot" as MessageType,
          content: `Hi ${user?.name || "there"}! I'm LoopBot, your emotional support companion. How are you feeling today?`,
          timestamp: new Date(),
        }
      ];
      setMessages(initialMessages);
    }
  }, [user]);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessageId = `msg-${Date.now()}`;
    const userMessage: Message = {
      id: userMessageId,
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);
    
    try {
      // Process message with AI/rules
      setTimeout(() => {
        processUserMessage(userMessage);
        setIsTyping(false);
      }, 1000);
      
    } catch (error) {
      console.error("Error processing message:", error);
      setIsTyping(false);
      
      // Add error message
      setMessages(prev => [...prev, {
        id: `error-${Date.now()}`,
        type: "system",
        content: "Sorry, I'm having trouble processing your message right now.",
        timestamp: new Date(),
      }]);
    }
  };

  const processUserMessage = (userMessage: Message) => {
    // This is a simplified rule-based implementation
    // In a production app, this would call the AI edge function
    
    const message = userMessage.content.toLowerCase();
    
    // Check for emotional distress keywords
    const distressKeywords = ["sad", "depressed", "anxious", "worried", "stressed", "overwhelmed", "scared"];
    const angerKeywords = ["angry", "mad", "frustrated", "hate"];
    const positiveKeywords = ["happy", "good", "great", "excited", "glad"];
    
    let response: Message;
    
    // Check for distress signals that should be flagged
    if (message.includes("hurt myself") || message.includes("suicide") || 
        message.includes("kill myself") || message.includes("end my life") ||
        message.includes("don't want to live")) {
      
      response = {
        id: `bot-${Date.now()}`,
        type: "bot",
        content: "I'm concerned about what you just shared. It's important that you talk to a trusted adult or counselor right away. Would you like me to help connect you with the school counselor?",
        timestamp: new Date(),
        hasFlagged: true
      };
      
      // In a real implementation, this would trigger an alert to school staff
      toast("Response flagged for staff review", {
        description: "The student's message has been flagged for immediate staff attention.",
      });
      
    } else if (distressKeywords.some(keyword => message.includes(keyword))) {
      // Recommend self-regulation toolbox
      response = {
        id: `bot-${Date.now()}`,
        type: "bot",
        content: "I hear that you're feeling down. Would you like to try some calming activities from our Self-Regulation Toolbox? It might help you feel better.",
        timestamp: new Date(),
        recommendedTool: "Self-Regulation Toolbox",
        recommendedToolPath: "/self-regulation-toolbox"
      };
      
    } else if (angerKeywords.some(keyword => message.includes(keyword))) {
      // Recommend reset room
      response = {
        id: `bot-${Date.now()}`,
        type: "bot",
        content: "It sounds like you might be feeling frustrated. The Reset Room has some great exercises that can help you manage these feelings.",
        timestamp: new Date(),
        recommendedTool: "Reset Room",
        recommendedToolPath: "/reset-room"
      };
      
    } else if (positiveKeywords.some(keyword => message.includes(keyword))) {
      response = {
        id: `bot-${Date.now()}`,
        type: "bot",
        content: "I'm glad to hear you're feeling good! Is there anything specific that made your day better?",
        timestamp: new Date()
      };
      
    } else if (message.includes("journal") || message.includes("write")) {
      response = {
        id: `bot-${Date.now()}`,
        type: "bot",
        content: "Writing down your thoughts can be really helpful! Would you like to open your Digital Journal?",
        timestamp: new Date(),
        recommendedTool: "Digital Journal",
        recommendedToolPath: "/digital-journal"
      };
      
    } else {
      response = {
        id: `bot-${Date.now()}`,
        type: "bot",
        content: "Thank you for sharing. How else can I help you today?",
        timestamp: new Date()
      };
    }
    
    setMessages(prev => [...prev, response]);
  };

  const flagMessage = (messageId: string) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? {...msg, hasFlagged: true} : msg
    ));
    
    toast("Message flagged", {
      description: "This message has been flagged for staff review.",
    });
  };

  const renderMessage = (message: Message) => {
    switch (message.type) {
      case 'user':
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
      
      case 'bot':
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
                    <Badge variant="outline" className="flex items-center gap-1 cursor-pointer hover:bg-accent">
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
      
      case 'system':
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
    <Card className="w-full h-[600px] flex flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" /> LoopBot
            </CardTitle>
            <CardDescription>
              Your emotional support companion
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={() => {
            uiToast({
              title: "Feedback recorded",
              description: "Thank you for your feedback!",
            });
          }}>
            <ThumbsUp className="h-4 w-4 mr-2" /> Helpful
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-auto">
        <div className="space-y-4">
          {messages.map(renderMessage)}
          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="bg-muted text-foreground rounded-lg px-4 py-2">
                <div className="flex gap-1">
                  <span className="animate-bounce">.</span>
                  <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>.</span>
                  <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>.</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      
      <CardFooter>
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
      </CardFooter>
    </Card>
  );
};

export default LoopBotChat;
