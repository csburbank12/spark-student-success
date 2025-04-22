
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Book, Calendar as CalendarIcon, Save, Lock, AlertTriangle } from "lucide-react";
import JournalEntryList from "./journal/JournalEntryList";
import JournalSentimentChart from "./journal/JournalSentimentChart";
import { analyzeSentiment } from "./journal/sentimentAnalysis";

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

const JournalComponent: React.FC = () => {
  const [activeTab, setActiveTab] = useState("write");
  const [journalContent, setJournalContent] = useState("");
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  // Load journal entries from local storage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem("journalEntries");
    if (savedEntries) {
      try {
        const parsedEntries = JSON.parse(savedEntries).map((entry: any) => ({
          ...entry,
          date: new Date(entry.date)
        }));
        setJournalEntries(parsedEntries);
      } catch (error) {
        console.error("Error parsing journal entries:", error);
      }
    }
  }, []);

  // Save journal entries to local storage when they change
  useEffect(() => {
    if (journalEntries.length > 0) {
      localStorage.setItem("journalEntries", JSON.stringify(journalEntries));
    }
  }, [journalEntries]);

  const saveJournalEntry = async () => {
    if (!journalContent.trim()) {
      toast({
        title: "Cannot save empty journal entry",
        description: "Please write something before saving.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);

    try {
      // Analyze sentiment of the journal content
      const sentimentResult = await analyzeSentiment(journalContent);
      
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        date: selectedDate,
        content: journalContent,
        sentiment: sentimentResult,
      };

      setJournalEntries([newEntry, ...journalEntries]);
      setJournalContent("");
      
      // Show appropriate toast based on sentiment
      if (sentimentResult.flagged) {
        toast({
          title: "Journal Entry Saved - Support Alert",
          description: "Your entry has been flagged for possible support needs. A staff member may reach out to check on you.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Journal Entry Saved",
          description: `Your journal entry for ${format(selectedDate, "MMM d, yyyy")} has been saved.`,
        });
      }

      // If sentiment is concerning, we would normally notify appropriate staff here
      if (sentimentResult.flagged) {
        console.log("Crisis alert would be sent to staff for review");
        // This would connect to a notification system in a real implementation
      }

      setActiveTab("entries");
    } catch (error) {
      console.error("Error saving journal entry:", error);
      toast({
        title: "Error saving entry",
        description: "There was a problem saving your journal entry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const getSentimentBadge = (sentiment: JournalEntry["sentiment"]) => {
    switch (sentiment.label) {
      case "positive":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Positive</Badge>;
      case "neutral":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">Neutral</Badge>;
      case "negative":
        return <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">Negative</Badge>;
      case "concerning":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">Concerning</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">Digital Journal</h2>
        <div className="flex items-center space-x-2">
          <Lock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Private & Secure</span>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Thoughts & Reflections</CardTitle>
          <CardDescription>
            Express yourself freely in a safe space. Only you can see your journal entries, unless our system detects content that suggests you might need support.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="write" className="flex items-center gap-2">
                <Book className="h-4 w-4" />
                <span>Write Entry</span>
              </TabsTrigger>
              <TabsTrigger value="entries" className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                <span>Past Entries</span>
              </TabsTrigger>
              <TabsTrigger value="insights" className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4" />
                <span>Mood Insights</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="write" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-3">
                  <Textarea
                    placeholder="How are you feeling today? What's on your mind? This is a safe space to share..."
                    className="min-h-[200px]"
                    value={journalContent}
                    onChange={(e) => setJournalContent(e.target.value)}
                  />
                </div>
                <div className="md:col-span-1">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Entry Date</p>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={(date) => date && setSelectedDate(date)}
                        className="rounded-md border"
                      />
                    </div>
                    <div className="pt-2">
                      <Button 
                        onClick={saveJournalEntry} 
                        className="w-full"
                        disabled={isSaving || !journalContent.trim()}
                      >
                        {isSaving ? (
                          "Saving..."
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save Entry
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-sm text-muted-foreground pt-2">
                <p className="flex items-center">
                  <Lock className="h-4 w-4 mr-1" />
                  Your entries are private. Only you can see them unless our system detects content suggesting you need immediate support.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="entries">
              {journalEntries.length > 0 ? (
                <JournalEntryList 
                  entries={journalEntries} 
                  getSentimentBadge={getSentimentBadge}
                  onDeleteEntry={(id) => {
                    setJournalEntries(journalEntries.filter(entry => entry.id !== id));
                    toast({
                      title: "Entry deleted",
                      description: "Your journal entry has been deleted.",
                    });
                  }}
                />
              ) : (
                <div className="text-center py-10">
                  <Book className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No journal entries yet</h3>
                  <p className="mt-2 text-muted-foreground">
                    Start writing your thoughts to see them here.
                  </p>
                  <Button
                    onClick={() => setActiveTab("write")}
                    variant="outline"
                    className="mt-6"
                  >
                    Write Your First Entry
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="insights">
              {journalEntries.length > 0 ? (
                <JournalSentimentChart entries={journalEntries} />
              ) : (
                <div className="text-center py-10">
                  <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No data available</h3>
                  <p className="mt-2 text-muted-foreground">
                    Start writing journal entries to see mood insights.
                  </p>
                  <Button
                    onClick={() => setActiveTab("write")}
                    variant="outline"
                    className="mt-6"
                  >
                    Write Your First Entry
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default JournalComponent;
