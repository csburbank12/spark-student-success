
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUp, Key, Lock, LinkIcon, Download, UploadCloud } from "lucide-react";
import { EducationSystem } from "@/types/roles";
import { toast } from "sonner";

interface StepConnectSISProps {
  system: EducationSystem;
  connectionConfig: Record<string, any>;
  onConnectionUpdate: (config: Record<string, any>) => void;
}

const StepConnectSIS: React.FC<StepConnectSISProps> = ({ 
  system, 
  connectionConfig,
  onConnectionUpdate 
}) => {
  const [activeTab, setActiveTab] = useState<'api' | 'oauth' | 'csv' | 'sftp'>('api');
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const handleApiConnect = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsConnecting(true);
    
    // Get form values
    const formData = new FormData(e.currentTarget);
    const apiKey = formData.get('apiKey') as string;
    const apiUrl = formData.get('apiUrl') as string;
    
    // Simulate API connection
    setTimeout(() => {
      onConnectionUpdate({
        connectionType: 'api',
        apiKey,
        apiUrl,
        connected: true,
        connectionTimestamp: new Date().toISOString()
      });
      
      toast.success(`Successfully connected to ${system.replace('_', ' ')} via API!`);
      setIsConnecting(false);
    }, 1500);
  };
  
  const handleOAuthConnect = () => {
    setIsConnecting(true);
    
    // Simulate OAuth flow
    setTimeout(() => {
      onConnectionUpdate({
        connectionType: 'oauth',
        oauthToken: 'simulated-oauth-token-' + Math.random().toString(36).substring(2, 10),
        connected: true,
        connectionTimestamp: new Date().toISOString()
      });
      
      toast.success(`Successfully authenticated with ${system.replace('_', ' ')}!`);
      setIsConnecting(false);
    }, 1500);
  };
  
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      onConnectionUpdate({
        connectionType: 'csv',
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        connected: true,
        connectionTimestamp: new Date().toISOString()
      });
      
      toast.success(`File "${file.name}" selected successfully!`);
    }
  };
  
  const handleSftpConnect = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsConnecting(true);
    
    // Get form values
    const formData = new FormData(e.currentTarget);
    const sftpHost = formData.get('sftpHost') as string;
    const sftpUser = formData.get('sftpUser') as string;
    
    // Simulate SFTP connection
    setTimeout(() => {
      onConnectionUpdate({
        connectionType: 'sftp',
        sftpHost,
        sftpUser,
        connected: true,
        connectionTimestamp: new Date().toISOString()
      });
      
      toast.success(`SFTP connection established to ${sftpHost}!`);
      setIsConnecting(false);
    }, 1500);
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value as 'api' | 'oauth' | 'csv' | 'sftp');
  };
  
  const renderSystemSpecificFields = () => {
    switch (system) {
      case 'skyward':
        return (
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div>
              <Label htmlFor="districtCode">District Code</Label>
              <Input id="districtCode" name="districtCode" placeholder="Enter your district code" required />
            </div>
          </div>
        );
      case 'powerschool':
        return (
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div>
              <Label htmlFor="clientId">Client ID</Label>
              <Input id="clientId" name="clientId" placeholder="Enter your PowerSchool client ID" required />
            </div>
            <div>
              <Label htmlFor="clientSecret">Client Secret</Label>
              <Input id="clientSecret" name="clientSecret" type="password" placeholder="Enter your client secret" required />
            </div>
          </div>
        );
      case 'infinite_campus':
        return (
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div>
              <Label htmlFor="appKey">Application Key</Label>
              <Input id="appKey" name="appKey" placeholder="Enter your Infinite Campus app key" required />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderDownloadTemplateButton = () => {
    return (
      <Button variant="outline" className="mb-4" onClick={() => toast.success("Template downloaded")}>
        <Download className="mr-2 h-4 w-4" />
        Download CSV Template
      </Button>
    );
  };
  
  const getConnectedMessage = () => {
    if (connectionConfig.connected) {
      switch (connectionConfig.connectionType) {
        case 'api':
          return `✓ Connected to ${system.replace('_', ' ')} API`;
        case 'oauth':
          return `✓ Authenticated via OAuth`;
        case 'csv':
          return `✓ File selected: ${connectionConfig.fileName}`;
        case 'sftp':
          return `✓ SFTP connected to ${connectionConfig.sftpHost}`;
        default:
          return null;
      }
    }
    return null;
  };
  
  const connectedMessage = getConnectedMessage();

  return (
    <div className="space-y-6">
      {connectedMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 rounded-md p-4 flex items-center mb-4">
          <div className="h-6 w-6 bg-green-100 rounded-full flex items-center justify-center mr-3">
            <div className="h-3 w-3 bg-green-500 rounded-full"></div>
          </div>
          <p>{connectedMessage}</p>
        </div>
      )}

      <Tabs defaultValue="api" value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-4">
          <TabsTrigger value="api">
            <Key className="h-4 w-4 mr-2" />
            API Key
          </TabsTrigger>
          <TabsTrigger value="oauth" disabled={system === 'csv'}>
            <LinkIcon className="h-4 w-4 mr-2" />
            OAuth
          </TabsTrigger>
          <TabsTrigger value="csv">
            <FileUp className="h-4 w-4 mr-2" />
            CSV Upload
          </TabsTrigger>
          <TabsTrigger value="sftp">
            <Lock className="h-4 w-4 mr-2" />
            SFTP
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle>Connect via API</CardTitle>
              <CardDescription>
                Enter your {system.replace('_', ' ')} API credentials to connect
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleApiConnect}>
                {renderSystemSpecificFields()}
                
                <div className="grid grid-cols-1 gap-4 mb-6">
                  <div>
                    <Label htmlFor="apiKey">API Key</Label>
                    <Input id="apiKey" name="apiKey" placeholder="Enter your API key" required />
                  </div>
                  <div>
                    <Label htmlFor="apiUrl">API URL</Label>
                    <Input id="apiUrl" name="apiUrl" placeholder={`https://api.${system.replace('_', '')}.com`} required />
                  </div>
                </div>
                
                <Button type="submit" disabled={isConnecting || connectionConfig.connected}>
                  {isConnecting ? "Connecting..." : connectionConfig.connected ? "Connected" : "Connect"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="oauth">
          <Card>
            <CardHeader>
              <CardTitle>Connect via OAuth</CardTitle>
              <CardDescription>
                Authenticate with {system.replace('_', ' ')} securely using OAuth
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-muted-foreground">
                You'll be redirected to {system.replace('_', ' ')} to authorize access to your data. 
                After authorization, you'll be redirected back to complete the setup.
              </p>
              
              <Button onClick={handleOAuthConnect} disabled={isConnecting || connectionConfig.connected}>
                {isConnecting ? "Authenticating..." : connectionConfig.connected ? "Authenticated" : `Sign in with ${system.replace('_', ' ')}`}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="csv">
          <Card>
            <CardHeader>
              <CardTitle>Upload CSV/Excel File</CardTitle>
              <CardDescription>
                Upload your student data in CSV or Excel format
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderDownloadTemplateButton()}
              
              <div className="border-2 border-dashed rounded-md p-6 mb-6 bg-muted/50">
                <div className="flex flex-col items-center justify-center">
                  <UploadCloud className="h-10 w-10 text-muted-foreground mb-4" />
                  
                  {selectedFile ? (
                    <div className="space-y-2 text-center">
                      <p className="font-medium">Selected file: {selectedFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2 text-center">
                      <p className="font-medium">Drag and drop file here, or click to browse</p>
                      <p className="text-xs text-muted-foreground">
                        CSV or Excel files only, 10MB max
                      </p>
                    </div>
                  )}
                  
                  <input 
                    type="file" 
                    id="csvFile" 
                    className="hidden"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileSelect}
                  />
                  
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => document.getElementById("csvFile")?.click()}
                  >
                    {selectedFile ? "Change File" : "Select File"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sftp">
          <Card>
            <CardHeader>
              <CardTitle>SFTP Connection</CardTitle>
              <CardDescription>
                Set up scheduled imports via SFTP
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSftpConnect}>
                <div className="grid grid-cols-1 gap-4 mb-6">
                  <div>
                    <Label htmlFor="sftpHost">SFTP Host</Label>
                    <Input id="sftpHost" name="sftpHost" placeholder="sftp.yourdomain.com" required />
                  </div>
                  <div>
                    <Label htmlFor="sftpUser">SFTP Username</Label>
                    <Input id="sftpUser" name="sftpUser" placeholder="username" required />
                  </div>
                  <div>
                    <Label htmlFor="sftpPassword">SFTP Password</Label>
                    <Input id="sftpPassword" name="sftpPassword" type="password" placeholder="••••••••" required />
                  </div>
                  <div>
                    <Label htmlFor="sftpPath">Path to Files</Label>
                    <Input id="sftpPath" name="sftpPath" placeholder="/exports/students/" required />
                  </div>
                </div>
                
                <Button type="submit" disabled={isConnecting || connectionConfig.connected}>
                  {isConnecting ? "Connecting..." : connectionConfig.connected ? "Connected" : "Connect to SFTP"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StepConnectSIS;
