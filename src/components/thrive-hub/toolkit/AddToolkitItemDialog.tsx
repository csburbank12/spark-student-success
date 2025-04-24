
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { useAddToolkitItem } from "@/hooks/useStudentToolkit";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface AddToolkitItemDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function AddToolkitItemDialog({ open, setOpen }: AddToolkitItemDialogProps) {
  const { user } = useAuth();
  const { mutate: addItem, isPending } = useAddToolkitItem();

  const [itemType, setItemType] = useState("");
  const [itemLabel, setItemLabel] = useState("");
  const [itemUrl, setItemUrl] = useState("");
  const [itemContent, setItemContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.id || !itemType || !itemLabel) {
      return;
    }

    addItem({
      type: itemType,
      label: itemLabel,
      url: itemUrl || undefined,
      content: itemContent || undefined,
      studentId: user.id
    }, {
      onSuccess: () => {
        setOpen(false);
        resetForm();
      }
    });
  };

  const resetForm = () => {
    setItemType("");
    setItemLabel("");
    setItemUrl("");
    setItemContent("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add to Toolkit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add to Your Wellness Toolkit</DialogTitle>
          <DialogDescription>
            Add resources, strategies, and activities that help support your wellness.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="item-type">Item Type</Label>
              <Select value={itemType} onValueChange={setItemType} required>
                <SelectTrigger id="item-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Strategy">Coping Strategy</SelectItem>
                  <SelectItem value="Video">Video</SelectItem>
                  <SelectItem value="Music">Music</SelectItem>
                  <SelectItem value="Article">Article</SelectItem>
                  <SelectItem value="Activity">Activity</SelectItem>
                  <SelectItem value="Affirmation">Affirmation</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="item-label">Title</Label>
              <Input
                id="item-label"
                value={itemLabel}
                onChange={(e) => setItemLabel(e.target.value)}
                placeholder="Give your item a title"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="item-url">
                URL <span className="text-sm text-muted-foreground">(optional)</span>
              </Label>
              <Input
                id="item-url"
                type="url"
                value={itemUrl}
                onChange={(e) => setItemUrl(e.target.value)}
                placeholder="https://example.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="item-content">
                Notes <span className="text-sm text-muted-foreground">(optional)</span>
              </Label>
              <Textarea
                id="item-content"
                value={itemContent}
                onChange={(e) => setItemContent(e.target.value)}
                placeholder="Add any helpful notes or instructions"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending || !itemType || !itemLabel}>
              {isPending ? "Adding..." : "Add to Toolkit"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
