
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Search, UserPlus, Filter, Download, Trash2, Edit, User, Mail } from "lucide-react";

const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock user data
  const users = [
    { 
      id: 1, 
      name: 'John Smith', 
      email: 'john.smith@school.edu', 
      role: 'teacher', 
      school: 'Washington High School',
      status: 'active'
    },
    { 
      id: 2, 
      name: 'Emma Davis', 
      email: 'emma.davis@school.edu', 
      role: 'teacher', 
      school: 'Lincoln Middle School',
      status: 'active'
    },
    { 
      id: 3, 
      name: 'Sarah Johnson', 
      email: 'sarah.johnson@family.com', 
      role: 'parent', 
      school: 'Multiple',
      status: 'active'
    },
    { 
      id: 4, 
      name: 'Principal Wilson', 
      email: 'wilson@district.edu', 
      role: 'admin', 
      school: 'District Office',
      status: 'active'
    },
    { 
      id: 5, 
      name: 'Alex Johnson', 
      email: 'alex@school.edu', 
      role: 'student', 
      school: 'Washington High School',
      status: 'active'
    },
    { 
      id: 6, 
      name: 'Ms. Rodriguez', 
      email: 'rodriguez@school.edu', 
      role: 'teacher', 
      school: 'Washington High School',
      status: 'inactive'
    },
  ];
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.school.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge className="bg-purple-100 text-purple-800">Admin</Badge>;
      case 'teacher':
        return <Badge className="bg-green-100 text-green-800">Teacher</Badge>;
      case 'student':
        return <Badge className="bg-blue-100 text-blue-800">Student</Badge>;
      case 'parent':
        return <Badge className="bg-amber-100 text-amber-800">Parent</Badge>;
      default:
        return <Badge>{role}</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">User Management</h2>
      </div>
      
      <Tabs defaultValue="all">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <TabsList>
            <TabsTrigger value="all">All Users</TabsTrigger>
            <TabsTrigger value="teachers">Teachers</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="parents">Parents</TabsTrigger>
            <TabsTrigger value="admins">Admins</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search users..."
                className="pl-8 w-full md:w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle>Users</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <table className="w-full caption-bottom text-sm">
                <thead>
                  <tr className="border-b transition-colors hover:bg-muted/50">
                    <th className="h-12 px-4 text-left align-middle font-medium">Name</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Email</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Role</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">School</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                    <th className="h-12 px-4 text-right align-middle font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr key={user.id} className="border-b transition-colors hover:bg-muted/50">
                      <td className="p-4 align-middle">{user.name}</td>
                      <td className="p-4 align-middle">{user.email}</td>
                      <td className="p-4 align-middle">{getRoleBadge(user.role)}</td>
                      <td className="p-4 align-middle">{user.school}</td>
                      <td className="p-4 align-middle">
                        {user.status === 'active' ? 
                          <Badge className="bg-green-100 text-green-800">Active</Badge> : 
                          <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
                        }
                      </td>
                      <td className="p-4 align-middle text-right">
                        <div className="flex justify-end gap-2">
                          <button className="inline-flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted">
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </button>
                          <button className="inline-flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted">
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredUsers.length === 0 && (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <User className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No users match your search.</p>
                </div>
              )}
            </div>
            
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-muted-foreground">Showing <strong>{filteredUsers.length}</strong> of <strong>{users.length}</strong> users</div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled>Previous</Button>
                <Button variant="outline" size="sm" disabled>Next</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Bulk Operations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-medium">Import Users</h3>
                  <p className="text-sm text-muted-foreground">Upload a CSV file to add multiple users at once.</p>
                  <div className="flex gap-2 mt-2">
                    <Button>Upload CSV</Button>
                    <Button variant="outline">Download Template</Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Bulk Email</h3>
                  <p className="text-sm text-muted-foreground">Send an email to all users matching your current filter.</p>
                  <Button className="mt-2">
                    <Mail className="mr-2 h-4 w-4" />
                    Compose Email
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Tabs>
    </div>
  );
};

export default UserManagement;
