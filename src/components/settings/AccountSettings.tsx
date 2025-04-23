
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";

export function AccountSettings({ onSave, isPending }: { onSave: () => void; isPending: boolean }) {
  const { user } = useAuth();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Information</CardTitle>
        <CardDescription>
          Manage your personal information and account settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <input
              id="name"
              className="w-full p-2 border rounded"
              defaultValue={user?.name || ""}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <input
              id="email"
              className="w-full p-2 border rounded"
              defaultValue={user?.email || ""}
              type="email"
            />
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h3 className="text-lg font-medium mb-4">Account Security</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Button variant="outline" className="w-full">Change Password</Button>
            </div>
            <div>
              <Button variant="outline" className="w-full">Two-Factor Authentication</Button>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button onClick={onSave} disabled={isPending}>
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
