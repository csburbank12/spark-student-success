
import React, { useCallback } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Upload } from "lucide-react";
import { toast } from "sonner";

interface AvatarUploadProps {
  currentUrl?: string | null;
  onUploadComplete: (url: string) => void;
  fallback?: string;
}

export const AvatarUpload = ({ currentUrl, onUploadComplete, fallback }: AvatarUploadProps) => {
  const handleUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      if (file.size > 2 * 1024 * 1024) {
        toast.error('File size must be less than 2MB');
        return;
      }

      const fileExt = file.name.split('.').pop() || '';
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from('profile-pictures')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('profile-pictures')
        .getPublicUrl(filePath);

      onUploadComplete(publicUrl);
      toast.success('Profile picture updated successfully');
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast.error('Error uploading profile picture');
    }
  }, [onUploadComplete]);

  return (
    <div className="flex flex-col items-center gap-4">
      <Avatar className="h-24 w-24">
        <AvatarImage src={currentUrl || undefined} alt="Profile" />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
      
      <Button variant="outline" className="relative" asChild>
        <label className="cursor-pointer">
          <Upload className="h-4 w-4 mr-2" />
          Change Picture
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleUpload}
            aria-label="Upload profile picture"
          />
        </label>
      </Button>
    </div>
  );
};
