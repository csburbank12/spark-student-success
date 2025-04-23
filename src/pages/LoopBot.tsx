
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import LoopBotChat from "@/components/loopbot/LoopBotChat";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot } from "lucide-react";

const LoopBot: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-heading font-bold">LoopBot</h2>
        <p className="text-muted-foreground">Your AI emotional support companion</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <LoopBotChat />
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">About LoopBot</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                LoopBot is your AI companion that's here to listen, support, and guide you through your 
                emotions and challenges.
              </p>
              
              <div className="space-y-2">
                <h4 className="font-medium">How LoopBot helps:</h4>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  <li>Talk about your feelings in a safe, private space</li>
                  <li>Get recommendations for helpful tools and activities</li>
                  <li>Connect with trusted adults when needed</li>
                  <li>Build emotional awareness and vocabulary</li>
                </ul>
              </div>
              
              <div className="rounded-lg bg-muted p-3">
                <p className="text-sm font-medium mb-1">Privacy Note</p>
                <p className="text-xs text-muted-foreground">
                  LoopBot will alert school staff if it detects concerning messages about harm to yourself 
                  or others. Otherwise, your conversations are private.
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Suggested Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Not sure what to talk about? Try these:</p>
                <ul className="space-y-2">
                  {[
                    "How was your day today?",
                    "I'm feeling stressed about...",
                    "Something good that happened recently...",
                    "I need help with...",
                    "I'm worried about..."
                  ].map((topic, i) => (
                    <li key={i}>
                      <button 
                        className="w-full text-left px-3 py-2 text-sm hover:bg-accent rounded-md transition-colors"
                      >
                        {topic}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoopBot;
