
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Settings, Palette, School, Bell, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const AdminSystemSettingsCard: React.FC = () => {
  const [formData, setFormData] = React.useState({
    schoolName: "Lincoln High School",
    district: "Northern Valley School District",
    timeZone: "America/New_York",
    primaryColor: "#4f46e5",
    secondaryColor: "#a78bfa",
    logoUrl: "https://example.com/logo.png",
    emailSender: "notifications@lincolnhigh.edu"
  });
  
  const [systemSettings, setSystemSettings] = React.useState({
    maintenanceMode: false,
    allowNewRegistrations: true,
    emailNotifications: true,
    automaticDataBackup: true,
    newsAnnouncements: true,
    demoMode: false
  });
  
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleToggle = (key: keyof typeof systemSettings) => {
    setSystemSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  const handleSave = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("System settings updated successfully!");
    } catch (error) {
      toast.error("Failed to update system settings. Please try again.");
      console.error("System settings update error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleClearCache = () => {
    toast.info("System cache cleared successfully.");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <School className="h-5 w-5 mr-2" />
            School Configuration
          </CardTitle>
          <CardDescription>
            Basic information about your school
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="schoolName">School Name</Label>
              <Input 
                id="schoolName" 
                name="schoolName" 
                value={formData.schoolName} 
                onChange={handleInputChange} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="district">District</Label>
              <Input 
                id="district" 
                name="district" 
                value={formData.district} 
                onChange={handleInputChange} 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="timeZone">Time Zone</Label>
              <Select
                value={formData.timeZone}
                onValueChange={(value) => handleSelectChange('timeZone', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a time zone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                  <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                  <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                  <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                  <SelectItem value="America/Anchorage">Alaska Time (AKT)</SelectItem>
                  <SelectItem value="Pacific/Honolulu">Hawaii Time (HT)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="emailSender">Notification Email</Label>
              <Input 
                id="emailSender" 
                name="emailSender" 
                value={formData.emailSender} 
                onChange={handleInputChange} 
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Palette className="h-5 w-5 mr-2" />
            Appearance
          </CardTitle>
          <CardDescription>
            Customize the look and feel of the platform
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="primaryColor">Primary Color</Label>
              <div className="flex gap-2">
                <Input 
                  id="primaryColor" 
                  name="primaryColor" 
                  value={formData.primaryColor} 
                  onChange={handleInputChange} 
                />
                <div 
                  className="h-10 w-10 rounded-md border" 
                  style={{ backgroundColor: formData.primaryColor }}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="secondaryColor">Secondary Color</Label>
              <div className="flex gap-2">
                <Input 
                  id="secondaryColor" 
                  name="secondaryColor" 
                  value={formData.secondaryColor} 
                  onChange={handleInputChange} 
                />
                <div 
                  className="h-10 w-10 rounded-md border" 
                  style={{ backgroundColor: formData.secondaryColor }}
                />
              </div>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="logoUrl">Logo URL</Label>
              <Input 
                id="logoUrl" 
                name="logoUrl" 
                value={formData.logoUrl} 
                onChange={handleInputChange} 
              />
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <Button variant="outline">Upload New Logo</Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            System Settings
          </CardTitle>
          <CardDescription>
            Configure system-wide settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="maintenanceMode" className="text-base">Maintenance Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Put site in maintenance mode (only admins can access)
                </p>
              </div>
              <Switch 
                id="maintenanceMode" 
                checked={systemSettings.maintenanceMode}
                onCheckedChange={() => handleToggle('maintenanceMode')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="allowNewRegistrations" className="text-base">Allow New Registrations</Label>
                <p className="text-sm text-muted-foreground">
                  Allow new users to register on the platform
                </p>
              </div>
              <Switch 
                id="allowNewRegistrations" 
                checked={systemSettings.allowNewRegistrations}
                onCheckedChange={() => handleToggle('allowNewRegistrations')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="emailNotifications" className="text-base">Email Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Send email notifications for system events
                </p>
              </div>
              <Switch 
                id="emailNotifications" 
                checked={systemSettings.emailNotifications}
                onCheckedChange={() => handleToggle('emailNotifications')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="automaticDataBackup" className="text-base">Automatic Data Backup</Label>
                <p className="text-sm text-muted-foreground">
                  Create nightly backups of all data
                </p>
              </div>
              <Switch 
                id="automaticDataBackup" 
                checked={systemSettings.automaticDataBackup}
                onCheckedChange={() => handleToggle('automaticDataBackup')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="newsAnnouncements" className="text-base">News & Announcements</Label>
                <p className="text-sm text-muted-foreground">
                  Enable news and announcements on dashboards
                </p>
              </div>
              <Switch 
                id="newsAnnouncements" 
                checked={systemSettings.newsAnnouncements}
                onCheckedChange={() => handleToggle('newsAnnouncements')}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="demoMode" className="text-base">Demo Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Run site with synthetic data for demonstrations
                </p>
              </div>
              <Switch 
                id="demoMode" 
                checked={systemSettings.demoMode}
                onCheckedChange={() => handleToggle('demoMode')}
              />
            </div>
          </div>
          
          <div className="flex justify-between pt-4 border-t">
            <Button variant="outline" onClick={handleClearCache}>Clear System Cache</Button>
            <div className="flex gap-3">
              <Button variant="outline">Reset to Defaults</Button>
              <Button onClick={handleSave} disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Settings"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSystemSettingsCard;
