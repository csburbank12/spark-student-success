
import React, { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AvatarUpload } from "./AvatarUpload";

interface ProfileFormProps {
  formData: {
    name: string;
    email: string;
    avatarUrl?: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    name: string;
    email: string;
    avatarUrl?: string;
  }>>;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ 
  formData, 
  setFormData, 
  onSubmit, 
  onCancel,
  isSubmitting = false
}) => {
  const handleAvatarUpload = useCallback((url: string) => {
    setFormData(prev => ({ ...prev, avatarUrl: url }));
  }, [setFormData]);

  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, name: e.target.value }));
  }, [setFormData]);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, email: e.target.value }));
  }, [setFormData]);

  return (
    <form onSubmit={onSubmit} className="space-y-6 max-w-2xl mx-auto">
      <AvatarUpload
        currentUrl={formData.avatarUrl}
        onUploadComplete={handleAvatarUpload}
        fallback={formData.name?.charAt(0) || '?'}
      />
      
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={handleNameChange}
          disabled={isSubmitting}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={handleEmailChange}
          disabled={isSubmitting || true}
        />
      </div>
      
      <div className="flex gap-2 justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
