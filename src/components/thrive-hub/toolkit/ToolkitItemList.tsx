
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Music, 
  Video, 
  Link, 
  Quote, 
  Smile, 
  HeartHandshake,
  ExternalLink,
  Trash2
} from "lucide-react";
import { useDeleteToolkitItem } from "@/hooks/useStudentToolkit";
import type { ToolkitItem, ToolkitItemsByType } from "@/types/toolkit";
import { toast } from "sonner";

interface ToolkitItemListProps {
  itemsByType: ToolkitItemsByType;
}

export function ToolkitItemList({ itemsByType }: ToolkitItemListProps) {
  const { mutate: deleteItem, isPending } = useDeleteToolkitItem();

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

  const handleDelete = (id: string, label: string) => {
    if (confirm(`Are you sure you want to remove "${label}" from your toolkit?`)) {
      deleteItem(id);
    }
  };

  return (
    <>
      {Object.entries(itemsByType).map(([type, items]) => (
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
                  <div className="flex-shrink-0 flex gap-1">
                    {item.item_url && (
                      <a 
                        href={item.item_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-shrink-0"
                        title="Open resource"
                      >
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <ExternalLink className="h-4 w-4" />
                          <span className="sr-only">Open</span>
                        </Button>
                      </a>
                    )}
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      onClick={() => handleDelete(item.id, item.item_label)}
                      disabled={isPending}
                      title="Remove from toolkit"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}
