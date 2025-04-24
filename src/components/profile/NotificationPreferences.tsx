
import React, { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface NotificationSetting {
  email: boolean;
  app: boolean;
}

const NotificationPreferences: React.FC = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState<NotificationSetting>({
    email: true,
    app: true
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
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST200') {
        console.error("Error fetching notification settings:", error);
        // Don't show error to user, just use defaults
      } else if (data) {
        setSettings({
          email: data.email_enabled,
          app: data.app_enabled
        });
      }
    } catch (err) {
      console.error("Failed to fetch notification settings:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateNotificationSetting = async (type: 'email' | 'app', value: boolean) => {
    if (!user?.id) return;
    
    setSettings(prev => ({ ...prev, [type]: value }));
    
    try {
      const column = type === 'email' ? 'email_enabled' : 'app_enabled';
      
      const { error } = await supabase
        .from('user_notification_settings')
        .upsert({ 
          user_id: user.id,
          [column]: value,
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
        toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} notifications ${value ? 'enabled' : 'disabled'}`);
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
          checked={settings.email} 
          disabled={isLoading}
          onCheckedChange={(value) => updateNotificationSetting('email', value)} 
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
          checked={settings.app} 
          disabled={isLoading}
          onCheckedChange={(value) => updateNotificationSetting('app', value)} 
        />
      </div>
    </div>
  );
};

export default NotificationPreferences;
