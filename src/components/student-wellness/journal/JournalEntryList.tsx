
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface JournalEntry {
  id: string;
  date: Date;
  content: string;
  sentiment: {
    score: number;
    label: "positive" | "neutral" | "negative" | "concerning";
    flagged: boolean;
  };
}

interface JournalEntryListProps {
  entries: JournalEntry[];
  getSentimentBadge: (sentiment: JournalEntry["sentiment"]) => React.ReactNode;
  onDeleteEntry: (id: string) => void;
}

const JournalEntryList: React.FC<JournalEntryListProps> = ({ entries, getSentimentBadge, onDeleteEntry }) => {
  const [expandedEntryId, setExpandedEntryId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedEntryId(expandedEntryId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <Card key={entry.id} className={`transition-all duration-200 ${entry.sentiment.flagged ? 'border-red-300 dark:border-red-800' : ''}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <span className="font-medium">{format(entry.date, "MMMM d, yyyy")}</span>
                <span className="mx-2">•</span>
                {getSentimentBadge(entry.sentiment)}
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => toggleExpand(entry.id)}
                  className="h-8 w-8 p-0"
                >
                  {expandedEntryId === entry.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Journal Entry</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this journal entry? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => onDeleteEntry(entry.id)}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
            {expandedEntryId === entry.id ? (
              <ScrollArea className="h-[200px] mt-2">
                <div className="whitespace-pre-wrap">{entry.content}</div>
              </ScrollArea>
            ) : (
              <p className="text-muted-foreground truncate">{entry.content.substring(0, 100)}{entry.content.length > 100 ? '...' : ''}</p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default JournalEntryList;
