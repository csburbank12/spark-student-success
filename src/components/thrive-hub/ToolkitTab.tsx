
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useStudentToolkit, useAddToolkitItem } from "@/hooks/useStudentToolkit";
import { 
  BookOpen, 
  Music, 
  Video, 
  Link, 
  Quote, 
  Smile, 
  HeartHandshake,
  X,
  ExternalLink,
  Plus
} from "lucide-react";
import { toast } from "sonner";

export function ToolkitTab() {
  const { user } = useAuth();
  const { data: toolkitItems } = useStudentToolkit(user?.id);
  const { mutate: addToolkitItem } = useAddToolkitItem();
  
  const [open, setOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    type: "",
    label: "",
    url: "",
    content: ""
  });
  
  const handleAddItem = () => {
    if (!newItem.type || !newItem.label) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    addToolkitItem({
      type: newItem.type,
      label: newItem.label,
      url: newItem.url || undefined,
      content: newItem.content || undefined
    }, {
      onSuccess: () => {
        setOpen(false);
        setNewItem({ type: "", label: "", url: "", content: "" });
        toast.success("Added to your toolkit!");
      }
    });
  };
  
  // Group toolkit items by type
  const itemsByType = toolkitItems?.reduce((acc, item) => {
    const type = item.item_type || 'Other';
    if (!acc[type]) acc[type] = [];
    acc[type].push(item);
    return acc;
  }, {} as Record<string, typeof toolkitItems>) || {};
  
  // Get icon based on item type
  const getItemIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'video':
        return <Video className="h-5 w-5" />;
      case 'music':
        return <Music className="h-5 w-5" />;
      case 'article':
        return <BookOpen className="h-5 w-5" />;
      case 'affirmation':
        return <Quote className="h-5 w-5" />;
      case 'strategy':
        return <HeartHandshake className="h-5 w-5" />;
      case 'activity':
        return <Smile className="h-5 w-5" />;
      default:
        return <Link className="h-5 w-5" />;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Wellness Toolkit</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add to Toolkit
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add to Your Toolkit</DialogTitle>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="type">Type</Label>
                <Select 
                  value={newItem.type} 
                  onValueChange={(value) => setNewItem({...newItem, type: value})}
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="music">Music</SelectItem>
                    <SelectItem value="article">Article</SelectItem>
                    <SelectItem value="affirmation">Affirmation</SelectItem>
                    <SelectItem value="strategy">Strategy</SelectItem>
                    <SelectItem value="activity">Activity</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="label">Title/Label</Label>
                <Input 
                  id="label" 
                  value={newItem.label}
                  onChange={(e) => setNewItem({...newItem, label: e.target.value})}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="url">URL (optional)</Label>
                <Input 
                  id="url" 
                  value={newItem.url}
                  onChange={(e) => setNewItem({...newItem, url: e.target.value})}
                  placeholder="https://..."
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="content">Notes (optional)</Label>
                <Input 
                  id="content" 
                  value={newItem.content}
                  onChange={(e) => setNewItem({...newItem, content: e.target.value})}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={handleAddItem}>Add to Toolkit</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      {Object.keys(itemsByType).length > 0 ? (
        Object.entries(itemsByType).map(([type, items]) => (
          <Card key={type}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getItemIcon(type)}
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {items?.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 p-3 bg-muted rounded-lg">
                    <div className="bg-primary/10 p-2 rounded-md">
                      {getItemIcon(item.item_type || type)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.item_label}</h4>
                      {item.item_content && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.item_content}
                        </p>
                      )}
                    </div>
                    {item.item_url && (
                      <a 
                        href={item.item_url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex-shrink-0"
                      >
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <ExternalLink className="h-4 w-4" />
                          <span className="sr-only">Open</span>
                        </Button>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center py-12">
            <HeartHandshake className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">Your toolkit is empty</h3>
            <p className="text-muted-foreground text-center max-w-md mb-6">
              Add videos, music, articles, and strategies that help you feel better
            </p>
            <Button onClick={() => setOpen(true)}>Add Your First Tool</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
