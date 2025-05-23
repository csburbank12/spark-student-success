
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, BarChart3, Download, Calendar, Users, BookOpen, UserCircle } from "lucide-react";
import StudentRiskDashboard from "./students/StudentRiskDashboard";
import { Link, useNavigate } from "react-router-dom";
import RiskTrendsChart from "./students/RiskTrendsChart";
import { useAuth } from "@/contexts/AuthContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserRole } from "@/types/roles";

const WellLensDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const { user, setRole } = useAuth();
  const navigate = useNavigate();
  
  // Mock student data that would come from your database
  const students = Array(25).fill(null).map((_, idx) => ({
    id: `s${idx + 1}`,
    full_name: `Student ${idx + 1}`,
    email: `student${idx + 1}@example.com`,
    grade: Math.floor(Math.random() * 12) + 1,
  }));
  
  // Handler for profile role change
  const handleRoleChange = (role: string) => {
    setRole(role as UserRole);
  };

  // Handler for logout
  const handleLogout = () => {
    navigate("/dashboard");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">
          WellLens™ Predictive Support
        </h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link to="/filters" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/export" className="flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Link>
          </Button>
          <Button asChild>
            <Link to="/predictive-support" className="flex items-center">
              <BarChart3 className="h-4 w-4 mr-2" />
              Advanced Dashboard
            </Link>
          </Button>
        </div>
      </div>
      
      {/* User context banner with explicit profile selection */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <UserCircle className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-medium">Welcome, {user?.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Your WellLens insights are customized for your {user?.role} profile
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Select onValueChange={handleRoleChange} defaultValue={user?.role}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Profile" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={UserRole.student}>Student View</SelectItem>
                  <SelectItem value={UserRole.teacher}>Teacher View</SelectItem>
                  <SelectItem value={UserRole.parent}>Parent View</SelectItem>
                  <SelectItem value={UserRole.admin}>Admin View</SelectItem>
                  <SelectItem value={UserRole.staff}>Staff View</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={handleLogout}>
                Back to Dashboard
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <Users className="h-8 w-8 text-primary mb-2" />
            <div className="text-2xl font-bold">247</div>
            <p className="text-sm text-muted-foreground">Total Students</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <BookOpen className="h-8 w-8 text-amber-500 mb-2" />
            <div className="text-2xl font-bold">38</div>
            <p className="text-sm text-muted-foreground">At-Risk Students</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <Calendar className="h-8 w-8 text-green-500 mb-2" />
            <div className="text-2xl font-bold">42</div>
            <p className="text-sm text-muted-foreground">Active Interventions</p>
          </CardContent>
        </Card>
      </div>

      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search students, interventions, or risk factors..."
          className="pl-8 w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs 
        defaultValue="overview" 
        className="w-full"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
          <TabsTrigger value="overview">Risk Overview</TabsTrigger>
          <TabsTrigger value="trends">Trend Analysis</TabsTrigger>
          <TabsTrigger value="interventions">Interventions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4 mt-4">
          <StudentRiskDashboard students={students} />
        </TabsContent>
        
        <TabsContent value="trends" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Mood & Risk Trends</CardTitle>
            </CardHeader>
            <CardContent className="h-96">
              <RiskTrendsChart />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="interventions" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Intervention Tracking</CardTitle>
            </CardHeader>
            <CardContent className="h-96 flex items-center justify-center">
              <p className="text-muted-foreground">
                Intervention tracking dashboard coming soon
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WellLensDashboard;
