
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquare, Search, Filter, Plus, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const ParentMessages = () => {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState<"list" | "detail" | "compose">("list");
  const [activeMessage, setActiveMessage] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const form = useForm({
    defaultValues: {
      recipient: "",
      subject: "",
      message: ""
    }
  });

  // In a real app, this data would be fetched from an API
  const messages = [
    {
      id: 1,
      from: "Ms. Rodriguez",
      role: "Math Teacher",
      avatar: "/teacher-avatar.png",
      subject: "Weekly Progress Update",
      preview: "Alex has been making excellent progress in math class this week. He completed all assignments on time and scored well on the quiz. I've noticed he's been helping other students, which is wonderful to see. Keep encouraging his interest in mathematics at home!",
      fullMessage: "Alex has been making excellent progress in math class this week. He completed all assignments on time and scored well on the quiz. I've noticed he's been helping other students, which is wonderful to see. Keep encouraging his interest in mathematics at home!\n\nNext week, we'll be starting a new unit on geometry. If Alex continues at this pace, I expect he'll do very well.\n\nPlease let me know if you have any questions or concerns.\n\nBest regards,\nMs. Rodriguez",
      date: "Today, 2:30 PM",
      unread: true,
      thread: [
        {
          id: 101,
          from: "Ms. Rodriguez",
          avatar: "/teacher-avatar.png",
          date: "Apr 20, 8:30 AM",
          content: "Good morning! Just wanted to let you know that Alex did exceptionally well on yesterday's math quiz."
        }
      ]
    },
    {
      id: 2,
      from: "Principal Wilson",
      role: "School Principal",
      avatar: "/admin-avatar.png",
      subject: "Upcoming School Event",
      preview: "We're excited to announce our annual Science Fair will be held on May 15th. Students have been preparing their projects in class, and we invite all parents to attend. The event will begin at 4:00 PM in the gymnasium. Light refreshments will be provided.",
      fullMessage: "Dear Parents,\n\nWe're excited to announce our annual Science Fair will be held on May 15th. Students have been preparing their projects in class, and we invite all parents to attend. The event will begin at 4:00 PM in the gymnasium. Light refreshments will be provided.\n\nThis is a wonderful opportunity to see the hard work and creativity of our students. Many teachers and staff will be present to answer any questions you might have about our science curriculum.\n\nWe hope to see you there!\n\nSincerely,\nPrincipal Wilson",
      date: "Yesterday, 10:15 AM",
      unread: true,
      thread: []
    },
    {
      id: 3,
      from: "School Counselor",
      role: "Guidance Counselor",
      avatar: "/placeholder.svg",
      subject: "Social-Emotional Learning Workshop",
      preview: "We'd like to invite you to an upcoming workshop on supporting your child's social-emotional development. The session will cover strategies for helping children manage emotions, build resilience, and develop healthy relationships.",
      fullMessage: "Dear Parent,\n\nWe'd like to invite you to an upcoming workshop on supporting your child's social-emotional development. The session will cover strategies for helping children manage emotions, build resilience, and develop healthy relationships.\n\nDate: May 10th\nTime: 6:00 PM - 7:30 PM\nLocation: School Library\n\nChildcare will be provided for school-age children. Please RSVP by May 5th if you plan to attend.\n\nThank you,\nSchool Counseling Team",
      date: "Apr 19, 4:45 PM",
      unread: false,
      thread: []
    }
  ];

  const filteredMessages = messages.filter(message => 
    message.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
    message.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMessageClick = (message) => {
    setActiveMessage(message);
    setActiveView("detail");
    
    // In a real app, this would update the message's read status in the database
    // For now, we'll just simulate that the message has been read
  };

  const handleBackToList = () => {
    setActiveView("list");
    setActiveMessage(null);
  };

  const handleComposeNew = () => {
    form.reset();
    setActiveView("compose");
  };

  const handleReply = (message) => {
    form.setValue("recipient", message.from);
    form.setValue("subject", `Re: ${message.subject}`);
    setActiveView("compose");
  };

  const onSubmit = (data) => {
    console.log("Sending message:", data);
    // In a real app, this would send the message to the API
    toast.success("Message sent successfully!");
    setActiveView("list");
  };

  const recipientOptions = [
    { value: "Ms. Rodriguez", label: "Ms. Rodriguez (Math Teacher)" },
    { value: "Principal Wilson", label: "Principal Wilson (School Principal)" },
    { value: "School Counselor", label: "School Counselor (Guidance Counselor)" },
    { value: "Mr. Johnson", label: "Mr. Johnson (Science Teacher)" },
    { value: "Mrs. Davis", label: "Mrs. Davis (English Teacher)" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">Messages</h2>
        {activeView === "list" && (
          <Button onClick={handleComposeNew}>
            <MessageSquare className="mr-2 h-4 w-4" />
            New Message
          </Button>
        )}
        {activeView !== "list" && (
          <Button variant="outline" onClick={handleBackToList}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Inbox
          </Button>
        )}
      </div>

      {activeView === "list" && (
        <>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          <Card>
            <CardHeader>
              <Tabs defaultValue="inbox">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="inbox">
                    Inbox
                    <Badge variant="secondary" className="ml-2">
                      {messages.filter(m => m.unread).length}
                    </Badge>
                  </TabsTrigger>
                  <TabsTrigger value="sent">Sent</TabsTrigger>
                  <TabsTrigger value="archived">Archived</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredMessages.length > 0 ? (
                  filteredMessages.map(message => (
                    <div 
                      key={message.id} 
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${message.unread ? 'bg-muted/50 border-muted-foreground/20' : 'hover:bg-muted/20'}`}
                      onClick={() => handleMessageClick(message)}
                    >
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={message.avatar} alt={message.from} />
                          <AvatarFallback>{message.from[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <h3 className={`font-medium ${message.unread ? 'text-foreground' : 'text-muted-foreground'}`}>{message.from}</h3>
                            <span className="text-xs text-muted-foreground">{message.date}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{message.role}</p>
                          <h4 className={`text-sm mt-1 ${message.unread ? 'font-medium' : ''}`}>{message.subject}</h4>
                          <p className="text-sm text-muted-foreground mt-1 truncate">{message.preview}</p>
                        </div>
                        {message.unread && (
                          <div className="h-2 w-2 rounded-full bg-primary"></div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No messages found</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {activeView === "detail" && activeMessage && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{activeMessage.subject}</CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <Avatar>
                    <AvatarImage src={activeMessage.avatar} alt={activeMessage.from} />
                    <AvatarFallback>{activeMessage.from[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{activeMessage.from}</p>
                    <p className="text-sm text-muted-foreground">{activeMessage.role}</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">{activeMessage.date}</p>
              </div>
              <Button onClick={() => handleReply(activeMessage)}>Reply</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="whitespace-pre-wrap">{activeMessage.fullMessage}</div>
              
              {activeMessage.thread.length > 0 && (
                <div className="mt-8 border-t pt-4">
                  <h4 className="font-medium mb-4">Previous Messages</h4>
                  {activeMessage.thread.map((msg) => (
                    <div key={msg.id} className="border-l-4 border-muted pl-4 py-2 mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={msg.avatar} alt={msg.from} />
                          <AvatarFallback>{msg.from[0]}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-sm">{msg.from}</span>
                        <span className="text-xs text-muted-foreground">{msg.date}</span>
                      </div>
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {activeView === "compose" && (
        <Card>
          <CardHeader>
            <CardTitle>Compose Message</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="recipient"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>To</FormLabel>
                      <FormControl>
                        <select 
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          {...field}
                          required
                        >
                          <option value="" disabled>Select recipient</option>
                          {recipientOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Message subject" required {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Type your message here..." 
                          className="min-h-[200px]" 
                          required
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={handleBackToList}>
                    Cancel
                  </Button>
                  <Button type="submit">Send Message</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ParentMessages;
