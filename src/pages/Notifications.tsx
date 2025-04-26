
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Bell, Check, Clock, Settings as SettingIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Mock notification data
const mockNotifications = [
  {
    id: "1",
    title: "Daily Check-in Reminder",
    description: "Don't forget to complete your daily check-in.",
    time: "10 minutes ago",
    read: false,
    category: "reminders"
  },
  {
    id: "2",
    title: "New Resource Available",
    description: "A new wellness resource has been added to your dashboard.",
    time: "2 hours ago",
    read: true,
    category: "updates"
  },
  {
    id: "3",
    title: "Message from Dr. Martinez",
    description: "Please review the feedback on your recent assessment.",
    time: "1 day ago",
    read: false,
    category: "messages"
  },
  {
    id: "4",
    title: "Survey Response Recorded",
    description: "Thank you for completing the wellness survey.",
    time: "2 days ago",
    read: true,
    category: "updates"
  },
  {
    id: "5",
    title: "Weekly Progress Report",
    description: "Your weekly progress report is now available.",
    time: "3 days ago",
    read: false,
    category: "reminders"
  },
  {
    id: "6",
    title: "Account Security Update",
    description: "We've enhanced security measures for your account.",
    time: "5 days ago",
    read: true,
    category: "updates"
  },
];

const Notifications = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState(mockNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;
  
  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !notification.read;
    return notification.category === activeTab;
  });

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground mt-2">
            Stay updated on important events and information
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
          >
            <Check className="mr-2 h-4 w-4" />
            Mark all as read
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href="/settings">
              <SettingIcon className="mr-2 h-4 w-4" />
              Notification Settings
            </a>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>All Notifications</CardTitle>
          <CardDescription>
            You have {unreadCount} unread notification{unreadCount !== 1 ? "s" : ""}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="all">
                All
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="ml-2">{unreadCount}</Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="reminders">Reminders</TabsTrigger>
              <TabsTrigger value="updates">Updates</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-4 space-y-4">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification, index) => (
                  <div key={notification.id}>
                    <div className={`flex items-start p-2 rounded-md ${notification.read ? '' : 'bg-primary/5'}`}>
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full ${notification.read ? 'bg-muted' : 'bg-primary/10'} mr-3`}>
                        <Bell className={`h-5 w-5 ${notification.read ? 'text-muted-foreground' : 'text-primary'}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className={`font-medium ${notification.read ? '' : 'text-primary'}`}>{notification.title}</h3>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {notification.time}
                            </span>
                            {!notification.read && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0" 
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                      </div>
                    </div>
                    {index < filteredNotifications.length - 1 && <Separator className="my-2" />}
                  </div>
                ))
              ) : (
                <div className="py-8 text-center">
                  <Bell className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-4 text-lg font-medium">No notifications</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    You're all caught up!
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;
