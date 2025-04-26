
import React from "react";
import { ConsentManagement } from "@/components/privacy/ConsentManagement";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText, Shield } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";

const PrivacySettings = () => {
  return (
    <div className="space-y-6">
      <PageHeader title="Privacy Settings" />
      
      <div className="flex justify-end">
        <Button variant="outline" asChild>
          <Link to="/privacy-policy">
            <FileText className="mr-2 h-4 w-4" />
            View Privacy Policy
          </Link>
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>FERPA Privacy Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Under the Family Educational Rights and Privacy Act (FERPA), you have certain rights regarding 
            your child's educational records. Use the controls below to manage how your child's data is 
            accessed and shared.
          </p>
          
          <ConsentManagement />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Directory Information</CardTitle>
          <Shield className="h-5 w-5 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Directory information may be disclosed without your consent, but you can opt out.
            This includes information like your child's name, address, email, and photograph.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h4 className="font-medium">Public Directory Listing</h4>
                <p className="text-sm text-muted-foreground">Allow your child's basic information to be included in school directories</p>
              </div>
              <div className="flex items-center">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
            
            <div className="flex items-center justify-between border-b pb-4">
              <div>
                <h4 className="font-medium">Photo Release</h4>
                <p className="text-sm text-muted-foreground">Allow your child's photo to be used in school publications</p>
              </div>
              <div className="flex items-center">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Third-Party Educational Tools</h4>
                <p className="text-sm text-muted-foreground">Allow your child to use third-party educational tools</p>
              </div>
              <div className="flex items-center">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacySettings;
