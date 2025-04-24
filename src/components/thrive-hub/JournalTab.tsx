
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useStudentReflections } from "@/hooks/useStudentReflections";
import { useAuth } from "@/contexts/AuthContext";
import { Calendar, Book, Share2 } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

export function JournalTab() {
  const { user } = useAuth();
  const { data: reflections } = useStudentReflections(user?.id);
  const { mutate: addReflection } = useAddReflection();
  const [newEntry, setNewEntry] = useState("");
  const [prompt, setPrompt] = useState<string | null>(null);
  
  // Sample journal prompts
  const journalPrompts = [
    "What made you smile today?",
    "How did you overcome a challenge recently?",
    "What are three things you're grateful for?",
    "What's something you're looking forward to?"
  ];

  const handleSubmitEntry = () => {
    if (!newEntry.trim()) return;
    
    addReflection({
      reflectionText: newEntry,
      promptUsed: prompt || undefined
    }, {
      onSuccess: () => {
        setNewEntry("");
        setPrompt(null);
        toast.success("Journal entry saved!");
      }
    });
  };

  const handleSelectPrompt = (selectedPrompt: string) => {
    setPrompt(selectedPrompt);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Book className="h-5 w-5" />
            New Journal Entry
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {prompt && (
              <div className="bg-muted p-3 rounded-md">
                <p className="text-sm font-medium">{prompt}</p>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="mt-1 h-7 text-xs"
                  onClick={() => setPrompt(null)}
                >
                  Choose different prompt
                </Button>
              </div>
            )}
            
            {!prompt && (
              <div>
                <p className="text-sm mb-2">Select a prompt or start writing:</p>
                <div className="flex flex-wrap gap-2">
                  {journalPrompts.map((p, i) => (
                    <Button 
                      key={i} 
                      variant="outline" 
                      size="sm"
                      className="text-xs"
                      onClick={() => handleSelectPrompt(p)}
                    >
                      {p.length > 30 ? p.substring(0, 30) + '...' : p}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            <Textarea
              placeholder="Write your thoughts here..."
              className="min-h-[150px]"
              value={newEntry}
              onChange={(e) => setNewEntry(e.target.value)}
            />
            
            <Button onClick={handleSubmitEntry} className="w-full">
              Save Entry
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Previous Entries
          </CardTitle>
        </CardHeader>
        <CardContent>
          {reflections && reflections.length > 0 ? (
            <div className="space-y-6">
              {reflections.map((entry) => (
                <div key={entry.id} className="border-b pb-4 last:border-0">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(entry.date_submitted), 'MMM d, yyyy')}
                    </p>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Share2 className="h-4 w-4" />
                      <span className="sr-only">Share</span>
                    </Button>
                  </div>
                  
                  {entry.prompt_used && (
                    <p className="text-sm font-medium italic mb-2">
                      "{entry.prompt_used}"
                    </p>
                  )}
                  
                  <p className="text-sm whitespace-pre-wrap">{entry.reflection_text}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Book className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
              <p>No journal entries yet.</p>
              <p className="text-sm text-muted-foreground">
                Start writing to see your entries here
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Add import for the useAddReflection hook
import { useAddReflection } from "@/hooks/useStudentReflections";
