
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Users, Edit, Trash2, Building } from "lucide-react";

const SchoolManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock school data
  const schools = [
    {
      id: 1,
      name: "Washington High School",
      code: "WHS001",
      studentCount: 1250,
      staffCount: 85,
      address: "123 Education Blvd, Springfield, IL 62701",
      status: "active"
    },
    {
      id: 2,
      name: "Lincoln Middle School",
      code: "LMS002",
      studentCount: 780,
      staffCount: 54,
      address: "456 Knowledge Ave, Springfield, IL 62702",
      status: "active"
    },
    {
      id: 3,
      name: "Roosevelt Elementary",
      code: "RES003",
      studentCount: 560,
      staffCount: 42,
      address: "789 Learning Lane, Springfield, IL 62703",
      status: "active"
    },
    {
      id: 4,
      name: "Jefferson Academy",
      code: "JFA004",
      studentCount: 420,
      staffCount: 35,
      address: "101 Wisdom Way, Springfield, IL 62704",
      status: "pending"
    },
  ];
  
  const filteredSchools = schools.filter(school => 
    school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    school.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    school.address.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">School Management</h2>
        <Link to="/school-onboarding">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add School
          </Button>
        </Link>
      </div>
      
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-blue-50">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                <Building className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold">{schools.length}</h3>
              <p className="text-sm text-muted-foreground">Total Schools</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-green-50">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold">{schools.reduce((sum, school) => sum + school.studentCount, 0)}</h3>
              <p className="text-sm text-muted-foreground">Total Students</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-50">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold">{schools.reduce((sum, school) => sum + school.staffCount, 0)}</h3>
              <p className="text-sm text-muted-foreground">Total Staff</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Schools Directory</h3>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search schools..."
            className="pl-8 w-[250px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="grid gap-4">
        {filteredSchools.map(school => (
          <Card key={school.id}>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium">{school.name}</h3>
                    {school.status === 'active' ? (
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    ) : (
                      <Badge className="bg-amber-100 text-amber-800">Pending</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{school.code} • {school.address}</p>
                  <div className="flex gap-4 mt-2">
                    <span className="text-sm">{school.studentCount} Students</span>
                    <span className="text-sm">{school.staffCount} Staff</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                  <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remove
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {filteredSchools.length === 0 && (
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center justify-center text-center py-8">
                <Building className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No schools found</h3>
                <p className="text-muted-foreground">No schools match your search criteria.</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>School Onboarding Guide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md bg-blue-50 p-4">
            <h3 className="font-medium text-blue-800">Steps to add a new school</h3>
            <ol className="list-decimal list-inside text-sm text-blue-700 mt-2 space-y-1">
              <li>Collect school information (name, address, contact details)</li>
              <li>Create the school in the system</li>
              <li>Upload staff roster through the bulk user import tool</li>
              <li>Upload student roster through the bulk user import tool</li>
              <li>Set up administrative access and permissions</li>
              <li>Configure school-specific settings and branding</li>
            </ol>
          </div>
          
          <div className="flex justify-end">
            <Link to="/school-onboarding">
              <Button>Start Onboarding Process</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SchoolManagement;
