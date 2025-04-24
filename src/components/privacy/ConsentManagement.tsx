
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

type ConsentItem = {
  id: string;
  title: string;
  description: string;
  required: boolean;
  checked: boolean;
};

export const ConsentManagement = () => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consents, setConsents] = useState<ConsentItem[]>([
    {
      id: "data-collection",
      title: "Educational Data Collection",
      description: "Consent to collect academic performance, attendance, and behavioral data to provide educational services.",
      required: true,
      checked: true,
    },
    {
      id: "mental-health",
      title: "Mental Health Monitoring",
      description: "Allow monitoring of mood check-ins and emotional wellness data to provide support services.",
      required: true,
      checked: true,
    },
    {
      id: "parent-communication",
      title: "Parent/Guardian Communication",
      description: "Permission to share relevant educational data with authorized parents/guardians.",
      required: true,
      checked: true,
    },
    {
      id: "intervention-sharing",
      title: "Intervention Sharing",
      description: "Allow sharing intervention data with relevant staff members who provide direct support.",
      required: true,
      checked: true,
    },
    {
      id: "research",
      title: "Anonymized Research",
      description: "Permission to use anonymized data for educational research to improve services (no personally identifiable information will be shared).",
      required: false,
      checked: false,
    },
    {
      id: "photos",
      title: "Photo Usage",
      description: "Allow photos/videos to be used within the platform for student recognition.",
      required: false,
      checked: false,
    },
  ]);

  const handleConsentChange = (id: string, checked: boolean) => {
    setConsents(consents.map(consent => 
      consent.id === id ? { ...consent, checked } : consent
    ));
  };

  const handleSubmit = async () => {
    // Validate that all required consents are checked
    const missingRequired = consents.filter(c => c.required && !c.checked);
    
    if (missingRequired.length > 0) {
      toast.error("You must agree to all required consent items");
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real implementation, this would save to a consents table in Supabase
      // For now, we'll simulate this with a console log
      console.log("Saving consents for user:", user?.id, consents);
      
      // This would be the actual implementation:
      // const { error } = await supabase
      //   .from('user_consents')
      //   .upsert(
      //     consents.map(c => ({
      //       user_id: user?.id,
      //       consent_id: c.id,
      //       consented: c.checked,
      //       consented_at: new Date().toISOString()
      //     }))
      //   );
      
      // if (error) throw error;

      toast.success("Your consent preferences have been saved");
    } catch (error) {
      console.error("Error saving consents:", error);
      toast.error("Failed to save consent preferences");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>FERPA Consent Management</CardTitle>
        <CardDescription>
          Manage how your educational data is collected and shared according to FERPA guidelines
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {consents.map((consent) => (
          <div key={consent.id} className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id={`consent-${consent.id}`}
                checked={consent.checked}
                onCheckedChange={(checked) => handleConsentChange(consent.id, checked === true)}
                disabled={consent.required}
              />
              <label htmlFor={`consent-${consent.id}`} className="font-medium cursor-pointer">
                {consent.title} {consent.required && <span className="text-destructive">*</span>}
              </label>
            </div>
            <p className="text-muted-foreground text-sm pl-6">{consent.description}</p>
            <Separator className="my-2" />
          </div>
        ))}
        <p className="text-sm text-muted-foreground">
          <span className="text-destructive">*</span> Required consents are necessary for providing essential educational services in compliance with FERPA.
        </p>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save Consent Preferences"}
        </Button>
      </CardFooter>
    </Card>
  );
};
