
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Shield, Check, X, Info } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ParentPreferencesCard: React.FC = () => {
  const [sharingPreferences, setSharingPreferences] = React.useState({
    shareAcademicData: true,
    shareEmotionalData: true,
    shareBehavioralData: false,
    shareWithTeachers: true,
    shareWithCounselors: true,
    shareWithAdmins: false,
    allowEmergencyAlerts: true,
    allowAutomaticIntervention: false,
  });
  
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const handleToggle = (key: keyof typeof sharingPreferences) => {
    setSharingPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  const handleSave = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Privacy preferences updated successfully!");
    } catch (error) {
      toast.error("Failed to update privacy preferences. Please try again.");
      console.error("Privacy preferences update error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shield className="h-5 w-5 mr-2" />
          Privacy & Data Sharing Settings
        </CardTitle>
        <CardDescription>
          Control how your child's data is shared within the school system
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-medium">Data Types</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="shareAcademicData" className="text-base">Academic Data</Label>
                <p className="text-sm text-muted-foreground">
                  Grades, assignments, and academic progress
                </p>
              </div>
              <Switch 
                id="shareAcademicData" 
                checked={sharingPreferences.shareAcademicData}
                onCheckedChange={() => handleToggle('shareAcademicData')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="shareEmotionalData" className="text-base">Emotional Data</Label>
                <p className="text-sm text-muted-foreground">
                  Mood check-ins and emotional well-being indicators
                </p>
              </div>
              <Switch 
                id="shareEmotionalData" 
                checked={sharingPreferences.shareEmotionalData}
                onCheckedChange={() => handleToggle('shareEmotionalData')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="shareBehavioralData" className="text-base">Behavioral Data</Label>
                <p className="text-sm text-muted-foreground">
                  Classroom behavior logs and intervention records
                </p>
              </div>
              <Switch 
                id="shareBehavioralData" 
                checked={sharingPreferences.shareBehavioralData}
                onCheckedChange={() => handleToggle('shareBehavioralData')}
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-medium">Staff Access</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="shareWithTeachers" className="text-base">Teachers</Label>
                <p className="text-sm text-muted-foreground">
                  Allow your child's teachers to access shared data
                </p>
              </div>
              <Switch 
                id="shareWithTeachers" 
                checked={sharingPreferences.shareWithTeachers}
                onCheckedChange={() => handleToggle('shareWithTeachers')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="shareWithCounselors" className="text-base">Counselors</Label>
                <p className="text-sm text-muted-foreground">
                  Allow school counselors to access shared data
                </p>
              </div>
              <Switch 
                id="shareWithCounselors" 
                checked={sharingPreferences.shareWithCounselors}
                onCheckedChange={() => handleToggle('shareWithCounselors')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="shareWithAdmins" className="text-base">Administrators</Label>
                <p className="text-sm text-muted-foreground">
                  Allow school administrators to access shared data
                </p>
              </div>
              <Switch 
                id="shareWithAdmins" 
                checked={sharingPreferences.shareWithAdmins}
                onCheckedChange={() => handleToggle('shareWithAdmins')}
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-medium">Alerts & Interventions</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="allowEmergencyAlerts" className="text-base">Emergency Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Receive alerts for critical situations
                </p>
              </div>
              <Switch 
                id="allowEmergencyAlerts" 
                checked={sharingPreferences.allowEmergencyAlerts}
                onCheckedChange={() => handleToggle('allowEmergencyAlerts')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="allowAutomaticIntervention" className="text-base">Automatic Interventions</Label>
                <p className="text-sm text-muted-foreground">
                  Allow system to suggest interventions automatically
                </p>
              </div>
              <Switch 
                id="allowAutomaticIntervention" 
                checked={sharingPreferences.allowAutomaticIntervention}
                onCheckedChange={() => handleToggle('allowAutomaticIntervention')}
              />
            </div>
          </div>
        </div>
        
        <div className="flex items-center p-3 rounded-md bg-blue-50 text-blue-800 text-sm">
          <Info className="h-4 w-4 mr-2 flex-shrink-0" />
          <p>
            Your privacy settings are compliant with FERPA (Family Educational Rights and Privacy Act) and other state educational privacy laws.
          </p>
        </div>
        
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline">Reset to Defaults</Button>
          <Button onClick={handleSave} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Preferences"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ParentPreferencesCard;
