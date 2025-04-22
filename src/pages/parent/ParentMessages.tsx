
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

const ParentMessages = () => {
  // In a real app, this data would be fetched from an API
  const messages = [
    {
      id: 1,
      from: "Ms. Rodriguez",
      role: "Math Teacher",
      avatar: "/teacher-avatar.png",
      subject: "Weekly Progress Update",
      preview: "Alex has been making excellent progress in math class this week...",
      date: "Today, 2:30 PM",
      unread: true
    },
    {
      id: 2,
      from: "Principal Wilson",
      role: "School Principal",
      avatar: "/admin-avatar.png",
      subject: "Upcoming School Event",
      preview: "We're excited to announce our annual Science Fair will be held on...",
      date: "Yesterday, 10:15 AM",
      unread: true
    },
    {
      id: 3,
      from: "School Counselor",
      role: "Guidance Counselor",
      avatar: "/placeholder.svg",
      subject: "Social-Emotional Learning Workshop",
      preview: "We'd like to invite you to an upcoming workshop on supporting your child's...",
      date: "Apr 19, 4:45 PM",
      unread: false
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">Messages</h2>
        <Button>
          <MessageSquare className="mr-2 h-4 w-4" />
          New Message
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inbox</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {messages.map(message => (
              <div 
                key={message.id} 
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${message.unread ? 'bg-muted/50 border-muted-foreground/20' : 'hover:bg-muted/20'}`}
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
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ParentMessages;
