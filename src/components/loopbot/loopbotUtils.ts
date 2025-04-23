
import { toast } from "@/components/ui/sonner";

export type MessageType = "user" | "bot" | "system";

export interface Message {
  id: string;
  type: MessageType;
  content: string;
  timestamp: Date;
  hasFlagged?: boolean;
  recommendedTool?: string;
  recommendedToolPath?: string;
}

export const processUserMessage = (
  userMessage: Message,
  userName: string | undefined,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
) => {
  const message = userMessage.content.toLowerCase();

  const distressKeywords = [
    "sad", "depressed", "anxious", "worried", "stressed", "overwhelmed", "scared"
  ];
  const angerKeywords = ["angry", "mad", "frustrated", "hate"];
  const positiveKeywords = ["happy", "good", "great", "excited", "glad"];

  let response: Message;

  if (
    message.includes("hurt myself") ||
    message.includes("suicide") ||
    message.includes("kill myself") ||
    message.includes("end my life") ||
    message.includes("don't want to live")
  ) {
    response = {
      id: `bot-${Date.now()}`,
      type: "bot",
      content:
        "I'm concerned about what you just shared. It's important that you talk to a trusted adult or counselor right away. Would you like me to help connect you with the school counselor?",
      timestamp: new Date(),
      hasFlagged: true,
    };
    toast("Response flagged for staff review", {
      description: "The student's message has been flagged for immediate staff attention.",
    });
  } else if (distressKeywords.some((keyword) => message.includes(keyword))) {
    response = {
      id: `bot-${Date.now()}`,
      type: "bot",
      content:
        "I hear that you're feeling down. Would you like to try some calming activities from our Self-Regulation Toolbox? It might help you feel better.",
      timestamp: new Date(),
      recommendedTool: "Self-Regulation Toolbox",
      recommendedToolPath: "/self-regulation-toolbox",
    };
  } else if (angerKeywords.some((keyword) => message.includes(keyword))) {
    response = {
      id: `bot-${Date.now()}`,
      type: "bot",
      content:
        "It sounds like you might be feeling frustrated. The Reset Room has some great exercises that can help you manage these feelings.",
      timestamp: new Date(),
      recommendedTool: "Reset Room",
      recommendedToolPath: "/reset-room",
    };
  } else if (positiveKeywords.some((keyword) => message.includes(keyword))) {
    response = {
      id: `bot-${Date.now()}`,
      type: "bot",
      content:
        "I'm glad to hear you're feeling good! Is there anything specific that made your day better?",
      timestamp: new Date(),
    };
  } else if (message.includes("journal") || message.includes("write")) {
    response = {
      id: `bot-${Date.now()}`,
      type: "bot",
      content:
        "Writing down your thoughts can be really helpful! Would you like to open your Digital Journal?",
      timestamp: new Date(),
      recommendedTool: "Digital Journal",
      recommendedToolPath: "/digital-journal",
    };
  } else {
    response = {
      id: `bot-${Date.now()}`,
      type: "bot",
      content: "Thank you for sharing. How else can I help you today?",
      timestamp: new Date(),
    };
  }
  setMessages((prev) => [...prev, response]);
};

