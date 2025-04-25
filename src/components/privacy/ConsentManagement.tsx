
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface ConsentOption {
  id: string;
  label: string;
  description: string;
  value: boolean;
}

interface UserConsentSettings {
  user_id: string;
  data_collection?: boolean;
  third_party_sharing?: boolean;
  ai_processing?: boolean;
  research?: boolean;
  [key: string]: boolean | string | undefined;
}

interface ConsentManagementProps {
  studentId?: string;
}

export const ConsentManagement: React.FC<ConsentManagementProps> = ({ studentId }) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [consentOptions, setConsentOptions] = useState<ConsentOption[]>([
    {
      id: 'data_collection',
      label: 'Data Collection',
      description: 'Allow collection of mood data, academic progress, and behavioral metrics to improve student support',
      value: true
    },
    {
      id: 'third_party_sharing',
      label: 'Third-party Sharing',
      description: 'Allow limited data sharing with authorized educational service providers',
      value: false
    },
    {
      id: 'ai_processing',
      label: 'AI Processing',
      description: 'Allow AI analysis of student data to identify patterns and personalize support',
      value: true
    },
    {
      id: 'research',
      label: 'Research Use',
      description: 'Allow anonymized data to be used for educational research purposes',
      value: false
    }
  ]);

  useEffect(() => {
    const fetchConsentSettings = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        const targetId = studentId || user.id;
        
        // Using a generic query approach to avoid type issues
        const { data, error } = await supabase
          .from('user_consent_settings' as any)
          .select('*')
          .eq('user_id', targetId)
          .maybeSingle();
        
        if (error) throw error;
        
        if (data) {
          // Update consent options with saved values
          setConsentOptions(prev => 
            prev.map(option => ({
              ...option,
              value: data[option.id] ?? option.value
            }))
          );
        }
      } catch (error) {
        console.error('Error fetching consent settings:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchConsentSettings();
  }, [user, studentId]);

  const handleConsentChange = (id: string, checked: boolean) => {
    setConsentOptions(options => 
      options.map(option => 
        option.id === id ? { ...option, value: checked } : option
      )
    );
  };

  const saveConsentSettings = async () => {
    if (!user) return;
    
    try {
      setIsSaving(true);
      const targetId = studentId || user.id;
      
      // Convert options array to object format for database
      const settingsObject: UserConsentSettings = consentOptions.reduce((acc, option) => {
        return { ...acc, [option.id]: option.value };
      }, { user_id: targetId });
      
      const { error } = await supabase
        .from('user_consent_settings' as any)
        .upsert(settingsObject, { onConflict: 'user_id' });
      
      if (error) throw error;
      
      toast.success('Consent settings saved successfully');
    } catch (error) {
      console.error('Error saving consent settings:', error);
      toast.error('Failed to save consent settings');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-6">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Consent Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {consentOptions.map(option => (
            <div key={option.id} className="flex items-start space-x-3">
              <Checkbox 
                id={option.id}
                checked={option.value} 
                onCheckedChange={(checked) => handleConsentChange(option.id, !!checked)}
              />
              <div>
                <Label 
                  htmlFor={option.id} 
                  className="font-medium cursor-pointer"
                >
                  {option.label}
                </Label>
                <p className="text-sm text-muted-foreground mt-1">{option.description}</p>
              </div>
            </div>
          ))}
          
          <div className="pt-4 flex justify-end">
            <Button onClick={saveConsentSettings} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Consent Settings'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConsentManagement;
