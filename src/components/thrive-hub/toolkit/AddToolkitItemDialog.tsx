
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useAddToolkitItem } from "@/hooks/useStudentToolkit";
import type { ToolkitItemInput } from "@/types/toolkit";

interface AddToolkitItemDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function AddToolkitItemDialog({ open, setOpen }: AddToolkitItemDialogProps) {
  const initialState: ToolkitItemInput = {
    type: "",
    label: "",
    url: "",
    content: "",
  };

  const [formData, setFormData] = useState<ToolkitItemInput>(initialState);
  const { mutate: addItem, isPending } = useAddToolkitItem();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, type: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.type || !formData.label) {
      return; // Form validation
    }
    
    addItem(formData, {
      onSuccess: () => {
        setOpen(false);
        setFormData(initialState);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add to Toolkit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add to Your Toolkit</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Select value={formData.type} onValueChange={handleTypeChange} required>
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
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="label">Title</Label>
            <Input
              id="label"
              name="label"
              value={formData.label}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">URL (optional)</Label>
            <Input
              id="url"
              name="url"
              type="url"
              value={formData.url || ""}
              onChange={handleChange}
              placeholder="https://example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Notes (optional)</Label>
            <Textarea
              id="content"
              name="content"
              value={formData.content || ""}
              onChange={handleChange}
              rows={3}
              placeholder="Additional notes or description"
            />
          </div>
          <DialogFooter className="pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={!formData.type || !formData.label || isPending}>
              {isPending ? "Adding..." : "Add to Toolkit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
