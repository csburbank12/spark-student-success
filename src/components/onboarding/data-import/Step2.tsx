
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Step2Props {
  onNext: () => void;
}

export const Step2: React.FC<Step2Props> = ({ onNext }) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Configure Connection</CardTitle>
        <CardDescription>
          Provide the necessary connection details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="connection-type">Connection Type</Label>
          <Select defaultValue="api">
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Select connection type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Connection Types</SelectLabel>
                <SelectItem value="api">API</SelectItem>
                <SelectItem value="oauth">OAuth</SelectItem>
                <SelectItem value="csv">CSV Upload</SelectItem>
                <SelectItem value="sftp">SFTP</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="source">Data Source</Label>
          <Select defaultValue="powerschool">
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Select data source" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Student Information Systems</SelectLabel>
                <SelectItem value="powerschool">PowerSchool</SelectItem>
                <SelectItem value="skyward">Skyward</SelectItem>
                <SelectItem value="infinite_campus">Infinite Campus</SelectItem>
                <SelectItem value="aeries">Aeries</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label>Authentication Details</Label>
          <div className="space-y-2">
            <Label htmlFor="api-url">API URL</Label>
            <Input id="api-url" placeholder="https://api.example.com/v1" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="api-key">API Key</Label>
            <Input id="api-key" placeholder="Enter your API key" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="api-secret">API Secret</Label>
            <Input id="api-secret" placeholder="Enter your API secret" type="password" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={onNext}>Next</Button>
      </CardFooter>
    </Card>
  );
};
