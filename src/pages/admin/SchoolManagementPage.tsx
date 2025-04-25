
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { School } from '@/types/trusted-adults';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Filter, Building, Users, Edit, Trash2 } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";

// Mock data for initial display
const mockSchools: School[] = [
  {
    id: "1",
    name: "Washington High School",
    code: "WHS001",
    studentCount: 1250,
    staffCount: 85,
    address: {
      street: "123 Education Blvd",
      city: "Springfield",
      state: "IL",
      zip: "62701"
    },
    enableWellLens: true,
    enableSEL: true,
    enableSkyward: false,
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    name: "Lincoln Middle School",
    code: "LMS002",
    studentCount: 780,
    staffCount: 54,
    address: {
      street: "456 Knowledge Ave",
      city: "Springfield",
      state: "IL",
      zip: "62702"
    },
    enableWellLens: true,
    enableSEL: true,
    enableSkyward: true,
    created_at: new Date().toISOString()
  },
  {
    id: "3",
    name: "Roosevelt Elementary",
    code: "RES003",
    studentCount: 560,
    staffCount: 42,
    address: {
      street: "789 Learning Lane",
      city: "Springfield",
      state: "IL",
      zip: "62703"
    },
    enableWellLens: false,
    enableSEL: true,
    enableSkyward: false,
    created_at: new Date().toISOString()
  },
];

const SchoolManagementPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  // When connected to Supabase, this would fetch actual schools
  const { data: schools = mockSchools, isLoading } = useQuery({
    queryKey: ["schools"],
    queryFn: async () => {
      // This would be the actual fetch from Supabase
      // const { data, error } = await supabase
      //   .from("schools")
      //   .select("*");
      
      // if (error) throw error;
      // return data as School[];
      
      // Using mock data for now
      return mockSchools;
    }
  });
  
  const filteredSchools = schools.filter(school => 
    school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    school.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (school.address?.city && school.address.city.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const columns: ColumnDef<School>[] = [
    {
      accessorKey: "name",
      header: "School Name",
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.original.name}</div>
          <div className="text-sm text-muted-foreground">{row.original.code}</div>
        </div>
      ),
    },
    {
      accessorKey: "address",
      header: "Location",
      cell: ({ row }) => {
        const address = row.original.address;
        return address ? `${address.city}, ${address.state}` : "N/A";
      },
    },
    {
      accessorKey: "studentCount",
      header: "Students",
      cell: ({ row }) => row.original.studentCount || 0,
    },
    {
      accessorKey: "staffCount",
      header: "Staff",
      cell: ({ row }) => row.original.staffCount || 0,
    },
    {
      id: "features",
      header: "Features",
      cell: ({ row }) => {
        return (
          <div className="flex flex-wrap gap-1">
            {row.original.enableWellLens && (
              <Badge className="bg-blue-100 text-blue-800">WellLens</Badge>
            )}
            {row.original.enableSEL && (
              <Badge className="bg-green-100 text-green-800">SEL</Badge>
            )}
            {row.original.enableSkyward && (
              <Badge className="bg-purple-100 text-purple-800">Skyward</Badge>
            )}
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <div className="flex justify-end gap-2">
            <Link to={`/admin/schools/${row.original.id}`}>
              <Button variant="outline" size="sm">View</Button>
            </Link>
            <Link to={`/admin/schools/${row.original.id}/edit`}>
              <Button variant="outline" size="sm">
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
            </Link>
            <Button 
              variant="outline"
              size="sm"
              className="text-red-600 border-red-200 hover:bg-red-50"
              onClick={() => handleDeleteSchool(row.original.id)}
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          </div>
        );
      },
    },
  ];

  const handleDeleteSchool = (id: string) => {
    // In a real app, this would call an API to delete the school
    toast.info(`Delete school with ID: ${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">School Management</h2>
        <Link to="/admin/schools/new">
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
              <h3 className="text-2xl font-bold">
                {schools.reduce((sum, school) => sum + (school.studentCount || 0), 0)}
              </h3>
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
              <h3 className="text-2xl font-bold">
                {schools.reduce((sum, school) => sum + (school.staffCount || 0), 0)}
              </h3>
              <p className="text-sm text-muted-foreground">Total Staff</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Tabs 
          defaultValue="all" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList>
            <TabsTrigger value="all">All Schools</TabsTrigger>
            <TabsTrigger value="welllens">WellLens Enabled</TabsTrigger>
            <TabsTrigger value="sel">SEL Enabled</TabsTrigger>
            <TabsTrigger value="skyward">Skyward Linked</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search schools..."
            className="pl-8 w-full md:w-[250px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <DataTable 
        columns={columns} 
        data={filteredSchools.filter(school => {
          if (activeTab === "all") return true;
          if (activeTab === "welllens") return school.enableWellLens;
          if (activeTab === "sel") return school.enableSEL;
          if (activeTab === "skyward") return school.enableSkyward;
          return true;
        })}
        searchField="name"
      />
      
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
            <Link to="/admin/schools/new">
              <Button>Start Onboarding Process</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SchoolManagementPage;
