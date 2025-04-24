
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useAddToolkitItem } from "@/hooks/useStudentToolkit";

interface AddToolkitItemDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function AddToolkitItemDialog({ open, setOpen }: AddToolkitItemDialogProps) {
  const { mutate: addToolkitItem } = useAddToolkitItem();
  const [newItem, setNewItem] = React.useState({
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

  return (
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
  );
}
