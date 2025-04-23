
import React, { useTransition } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Suspense } from "react";
import { Loader } from "@/components/ui/loader";
import { SettingsHeader } from "@/components/settings/SettingsHeader";
import { AccountSettings } from "@/components/settings/AccountSettings";
import { NotificationSettings } from "@/components/settings/NotificationSettings";
import { AppearanceSettings } from "@/components/settings/AppearanceSettings";

const LoadingFallback = () => (
  <div className="flex items-center justify-center p-8">
    <Loader size="lg" />
  </div>
);

const Settings = () => {
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = React.useState("account");

  const handleTabChange = (value: string) => {
    startTransition(() => {
      setActiveTab(value);
    });
  };

  const handleSave = () => {
    startTransition(() => {
      toast.success("Settings saved successfully!");
    });
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <SettingsHeader />

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <Suspense fallback={<LoadingFallback />}>
          <TabsContent value="account" className="space-y-4 mt-4">
            <AccountSettings onSave={handleSave} isPending={isPending} />
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-4 mt-4">
            <NotificationSettings onSave={handleSave} isPending={isPending} />
          </TabsContent>
          
          <TabsContent value="appearance" className="space-y-4 mt-4">
            <AppearanceSettings onSave={handleSave} isPending={isPending} />
          </TabsContent>
        </Suspense>
      </Tabs>
    </div>
  );
};

export default Settings;
