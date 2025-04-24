
import React, { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface NotificationSetting {
  email_enabled: boolean;
  app_enabled: boolean;
}

const NotificationPreferences: React.FC = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState<NotificationSetting>({
    email_enabled: true,
    app_enabled: true
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user?.id) {
      fetchNotificationSettings();
    }
  }, [user]);

  const fetchNotificationSettings = async () => {
    if (!user?.id) return;
    
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('user_notification_settings')
        .select('email_enabled, app_enabled')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error("Error fetching notification settings:", error);
        // Don't show error to user, just use defaults
        return;
      }

      if (data) {
        setSettings({
          email_enabled: data.email_enabled,
          app_enabled: data.app_enabled
        });
      }
    } catch (err) {
      console.error("Failed to fetch notification settings:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateNotificationSetting = async (type: keyof NotificationSetting, value: boolean) => {
    if (!user?.id) return;
    
    setSettings(prev => ({ ...prev, [type]: value }));
    
    try {
      const { error } = await supabase
        .from('user_notification_settings')
        .upsert({ 
          user_id: user.id,
          [type]: value,
          updated_at: new Date().toISOString()
        }, { 
          onConflict: 'user_id'
        });

      if (error) {
        console.error(`Error updating ${type} notification setting:`, error);
        toast.error(`Failed to update ${type} notifications. Please try again.`);
        // Revert the local state on error
        setSettings(prev => ({ ...prev, [type]: !value }));
      } else {
        const displayType = type === 'email_enabled' ? 'Email' : 'App';
        toast.success(`${displayType} notifications ${value ? 'enabled' : 'disabled'}`);
      }
    } catch (err) {
      console.error(`Failed to update ${type} notification setting:`, err);
      toast.error(`Failed to update ${type} notifications. Please try again.`);
      // Revert the local state on error
      setSettings(prev => ({ ...prev, [type]: !value }));
    }
  };

  return (
    <div className="space-y-4 pt-4 border-t">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h4 className="text-sm font-medium">Email Notifications</h4>
          <p className="text-sm text-muted-foreground">
            Receive email notifications for important updates
          </p>
        </div>
        <Switch 
          checked={settings.email_enabled}
          disabled={isLoading}
          onCheckedChange={(value) => updateNotificationSetting('email_enabled', value)}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h4 className="text-sm font-medium">App Notifications</h4>
          <p className="text-sm text-muted-foreground">
            Receive in-app notifications and alerts
          </p>
        </div>
        <Switch 
          checked={settings.app_enabled}
          disabled={isLoading}
          onCheckedChange={(value) => updateNotificationSetting('app_enabled', value)}
        />
      </div>
    </div>
  );
};

export default NotificationPreferences;
