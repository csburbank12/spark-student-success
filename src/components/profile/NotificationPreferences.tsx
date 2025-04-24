
import React, { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';

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
    if (!user?.id) return;
    
    const fetchSettings = async () => {
      setIsLoading(true);
      try {
        // Try to get settings from Supabase
        const { data, error } = await supabase
          .from('user_notification_settings')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();
          
        if (error) {
          console.error("Supabase error:", error);
          throw error;
        }
        
        if (data) {
          setSettings({
            email_enabled: data.email_enabled,
            app_enabled: data.app_enabled
          });
        } else {
          // No settings found, use default and create record
          await supabase
            .from('user_notification_settings')
            .insert({
              user_id: user.id,
              email_enabled: true,
              app_enabled: true
            });
        }
      } catch (err) {
        console.error("Failed to load notification settings:", err);
        
        // Fallback to localStorage if Supabase fails
        try {
          const savedSettings = localStorage.getItem(`notification_settings_${user.id}`);
          if (savedSettings) {
            setSettings(JSON.parse(savedSettings));
          }
        } catch (storageErr) {
          console.error("localStorage fallback error:", storageErr);
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSettings();
  }, [user?.id]);

  const updateNotificationSetting = async (type: keyof NotificationSetting, value: boolean) => {
    if (!user?.id) return;
    
    setSettings(prev => ({ ...prev, [type]: value }));
    
    try {
      // Update in Supabase if possible
      try {
        const { error } = await supabase
          .from('user_notification_settings')
          .update({ [type]: value })
          .eq('user_id', user.id);
          
        if (error) throw error;
      } catch (supabaseErr) {
        console.error(`Supabase update error for ${type}:`, supabaseErr);
        
        // Fallback to localStorage
        localStorage.setItem(
          `notification_settings_${user.id}`, 
          JSON.stringify({ ...settings, [type]: value })
        );
      }
      
      const displayType = type === 'email_enabled' ? 'Email' : 'App';
      toast.success(`${displayType} notifications ${value ? 'enabled' : 'disabled'}`);
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
