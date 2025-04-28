
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Shield, Eye, Key, Lock, FileCheck, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const AdminSecurityCard: React.FC = () => {
  const [securitySettings, setSecuritySettings] = React.useState({
    twoFactorAuth: true,
    dataEncryption: true,
    passwordComplexity: true,
    passwordExpiry: false,
    ipFiltering: false,
    auditLogging: true,
    sensitiveDataMasking: true,
    ferpaCompliance: true
  });
  
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const handleToggle = (key: keyof typeof securitySettings) => {
    setSecuritySettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  const handleSave = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Security settings updated successfully!");
    } catch (error) {
      toast.error("Failed to update security settings. Please try again.");
      console.error("Security settings update error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleRunAudit = () => {
    toast.info("Security audit has been initiated. This may take a few minutes.");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Security Settings
          </CardTitle>
          <CardDescription>
            Configure security settings for your organization
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-base font-medium">Authentication & Access</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="twoFactorAuth" className="text-base">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Require 2FA for all admin and staff accounts
                  </p>
                </div>
                <Switch 
                  id="twoFactorAuth" 
                  checked={securitySettings.twoFactorAuth}
                  onCheckedChange={() => handleToggle('twoFactorAuth')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="passwordComplexity" className="text-base">Password Complexity</Label>
                  <p className="text-sm text-muted-foreground">
                    Require strong passwords (min 8 chars, special chars, numbers)
                  </p>
                </div>
                <Switch 
                  id="passwordComplexity" 
                  checked={securitySettings.passwordComplexity}
                  onCheckedChange={() => handleToggle('passwordComplexity')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="passwordExpiry" className="text-base">Password Expiry</Label>
                  <p className="text-sm text-muted-foreground">
                    Force password reset every 90 days
                  </p>
                </div>
                <Switch 
                  id="passwordExpiry" 
                  checked={securitySettings.passwordExpiry}
                  onCheckedChange={() => handleToggle('passwordExpiry')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="ipFiltering" className="text-base">IP Filtering</Label>
                  <p className="text-sm text-muted-foreground">
                    Restrict access to specific IP ranges
                  </p>
                </div>
                <Switch 
                  id="ipFiltering" 
                  checked={securitySettings.ipFiltering}
                  onCheckedChange={() => handleToggle('ipFiltering')}
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-base font-medium">Data Protection</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dataEncryption" className="text-base">Data Encryption</Label>
                  <p className="text-sm text-muted-foreground">
                    Encrypt all sensitive data at rest
                  </p>
                </div>
                <Switch 
                  id="dataEncryption" 
                  checked={securitySettings.dataEncryption}
                  onCheckedChange={() => handleToggle('dataEncryption')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="sensitiveDataMasking" className="text-base">Sensitive Data Masking</Label>
                  <p className="text-sm text-muted-foreground">
                    Mask sensitive data in reports and logs
                  </p>
                </div>
                <Switch 
                  id="sensitiveDataMasking" 
                  checked={securitySettings.sensitiveDataMasking}
                  onCheckedChange={() => handleToggle('sensitiveDataMasking')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auditLogging" className="text-base">Audit Logging</Label>
                  <p className="text-sm text-muted-foreground">
                    Log all system access and changes
                  </p>
                </div>
                <Switch 
                  id="auditLogging" 
                  checked={securitySettings.auditLogging}
                  onCheckedChange={() => handleToggle('auditLogging')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="ferpaCompliance" className="text-base">FERPA Compliance Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Apply strict FERPA compliance rules to all data
                  </p>
                </div>
                <Switch 
                  id="ferpaCompliance" 
                  checked={securitySettings.ferpaCompliance}
                  onCheckedChange={() => handleToggle('ferpaCompliance')}
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline">Reset to Defaults</Button>
            <Button onClick={handleSave} disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Settings"}
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileCheck className="h-5 w-5 mr-2" />
            Security Audit
          </CardTitle>
          <CardDescription>
            Run security audits and view compliance reports
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-between items-center p-4 rounded-md bg-green-50 border border-green-200">
            <div className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-green-600" />
              <div>
                <p className="font-medium text-green-800">Last Security Audit: Passed</p>
                <p className="text-sm text-green-700">Completed on October 12, 2023</p>
              </div>
            </div>
            <Badge variant="outline" className="bg-green-100 border-green-300 text-green-800">
              95/100
            </Badge>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <h3 className="text-base font-medium">Audit History</h3>
              <Button variant="outline" size="sm">View Full History</Button>
            </div>
            
            <div className="space-y-2">
              {[
                { date: "Oct 12, 2023", score: "95/100", status: "passed" },
                { date: "Sep 10, 2023", score: "87/100", status: "passed" },
                { date: "Aug 15, 2023", score: "92/100", status: "passed" },
                { date: "Jul 12, 2023", score: "78/100", status: "warning" },
                { date: "Jun 10, 2023", score: "94/100", status: "passed" }
              ].map((audit, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-md border">
                  <div className="text-sm">{audit.date}</div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant="outline" 
                      className={
                        audit.status === "passed" ? "bg-green-100 border-green-300 text-green-800" : 
                        audit.status === "warning" ? "bg-amber-100 border-amber-300 text-amber-800" : 
                        "bg-red-100 border-red-300 text-red-800"
                      }
                    >
                      {audit.score}
                    </Badge>
                    {audit.status === "warning" && <AlertTriangle className="h-4 w-4 text-amber-500" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline">Download Latest Report</Button>
            <Button onClick={handleRunAudit}>Run New Audit</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSecurityCard;
