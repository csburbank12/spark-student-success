
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { School, SchoolStats } from "@/types/trusted-adults";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Edit,
  Users,
  Layers,
  BookOpen,
  BarChart4,
  RefreshCcw,
  AlertCircle,
  Building,
  Phone,
  Mail,
  Clock,
  MapPin,
} from "lucide-react";
import { Loader } from "@/components/ui/loader";

// Mock data for the school profile
const mockSchool: School = {
  id: "1",
  name: "Washington High School",
  district: "Springfield School District",
  code: "WHS001",
  address: {
    street: "123 Education Blvd",
    city: "Springfield",
    state: "IL",
    zip: "62701",
  },
  contactEmail: "info@washingtonhigh.edu",
  contactPhone: "(555) 123-4567",
  principalName: "Dr. Emily Johnson",
  timeZone: "America/Chicago",
  logoUrl: "https://via.placeholder.com/150",
  studentCount: 1250,
  staffCount: 85,
  enableWellLens: true,
  enableSEL: true,
  enableSkyward: false,
  created_at: "2023-09-01T00:00:00Z",
  updated_at: "2023-09-01T00:00:00Z",
};

// Mock data for school stats
const mockStats: SchoolStats = {
  totalStudents: 1250,
  flaggedStudents: 42,
  selEngagementRate: 78,
  averageMood: 3.7,
  completedCheckIns: 952,
  totalCheckIns: 1250,
};

// Mock for the last Skyward sync
const mockSyncData = {
  lastSync: "2023-09-12T15:30:00Z",
  status: "success",
  syncedRecords: 1250,
  failedRecords: 0,
};

const SchoolProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("general");

  // In a real app, this would fetch the school data from the API
  const { data: school = mockSchool, isLoading } = useQuery({
    queryKey: ["school", id],
    queryFn: async () => {
      // In a real app, we'd fetch from Supabase
      // const { data, error } = await supabase
      //   .from("schools")
      //   .select("*")
      //   .eq("id", id)
      //   .single();
      
      // if (error) throw error;
      // return data as School;
      
      return mockSchool;
    },
  });

  // In a real app, this would fetch the school stats from the API
  const { data: stats = mockStats } = useQuery({
    queryKey: ["school-stats", id],
    queryFn: async () => {
      // In a real app, we'd fetch from Supabase
      return mockStats;
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center p-8">
        <Loader size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <h2 className="text-3xl font-heading font-bold">{school.name}</h2>
            {school.enableWellLens && <Badge className="bg-blue-100 text-blue-800">WellLens</Badge>}
            {school.enableSEL && <Badge className="bg-green-100 text-green-800">SEL</Badge>}
            {school.enableSkyward && <Badge className="bg-purple-100 text-purple-800">Skyward</Badge>}
          </div>
          <p className="text-muted-foreground">
            {school.district} · Code: {school.code}
          </p>
        </div>
        <div className="flex space-x-2">
          <Link to={`/admin/schools/${id}/edit`}>
            <Button>
              <Edit className="mr-2 h-4 w-4" />
              Edit School
            </Button>
          </Link>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-6 w-full">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="classes">Classes</TabsTrigger>
          <TabsTrigger value="interventions">Interventions</TabsTrigger>
          <TabsTrigger value="sel">SEL Dashboard</TabsTrigger>
          <TabsTrigger value="welllens">WellLens</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">School Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center">
                  {school.logoUrl ? (
                    <img
                      src={school.logoUrl}
                      alt={`${school.name} Logo`}
                      className="h-16 w-16 rounded-md mr-4 object-contain"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-md bg-muted flex items-center justify-center mr-4">
                      <Building className="h-8 w-8 text-muted-foreground" />
                    </div>
                  )}
                  <div>
                    <div className="font-medium">{school.name}</div>
                    <div className="text-sm text-muted-foreground">{school.district}</div>
                    <div className="text-sm text-muted-foreground">Code: {school.code}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div className="text-sm">
                      <p>{school.address?.street}</p>
                      <p>
                        {school.address?.city}, {school.address?.state} {school.address?.zip}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{school.contactEmail}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{school.contactPhone}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{school.timeZone}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Population</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Students</span>
                  <span className="text-lg font-bold">{school.studentCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Staff</span>
                  <span className="text-lg font-bold">{school.staffCount}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Student to Staff Ratio</span>
                  <span className="text-lg font-bold">
                    {school.staffCount
                      ? (school.studentCount / school.staffCount).toFixed(1)
                      : "N/A"}
                    :1
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Status & Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">WellLens AI</span>
                    <Badge
                      className={
                        school.enableWellLens
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }
                    >
                      {school.enableWellLens ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">SEL Tracking</span>
                    <Badge
                      className={
                        school.enableSEL
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }
                    >
                      {school.enableSEL ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Skyward Integration</span>
                    <Badge
                      className={
                        school.enableSkyward
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }
                    >
                      {school.enableSkyward ? "Connected" : "Not Connected"}
                    </Badge>
                  </div>
                </div>

                {school.enableSkyward && (
                  <div className="pt-2">
                    <h4 className="text-sm font-medium mb-2">Skyward Sync Status</h4>
                    <div className="p-3 rounded-md bg-blue-50 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Last Sync</span>
                        <span>
                          {new Date(mockSyncData.lastSync).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Status</span>
                        <Badge
                          className={
                            mockSyncData.status === "success"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }
                        >
                          {mockSyncData.status === "success" ? "Success" : "Failed"}
                        </Badge>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Records</span>
                        <span>
                          {mockSyncData.syncedRecords} synced,{" "}
                          {mockSyncData.failedRecords} failed
                        </span>
                      </div>
                      <Button size="sm" className="w-full mt-2">
                        <RefreshCcw className="h-4 w-4 mr-2" />
                        Sync Now
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {school.enableWellLens && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">WellLens Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-muted-foreground">
                        Students Flagged
                      </div>
                      <div className="flex items-center">
                        <AlertCircle className="h-5 w-5 text-orange-500 mr-1" />
                        <span className="text-xl font-bold">{stats.flaggedStudents}</span>
                        <span className="text-sm text-muted-foreground ml-2">
                          ({((stats.flaggedStudents / stats.totalStudents) * 100).toFixed(1)}%)
                        </span>
                      </div>
                    </div>
                    <Link to={`/admin/schools/${id}/welllens`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}

            {school.enableSEL && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">SEL Engagement</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Check-in Completion</span>
                      <span>
                        {stats.completedCheckIns} / {stats.totalCheckIns} (
                        {((stats.completedCheckIns / stats.totalCheckIns) * 100).toFixed(1)}%)
                      </span>
                    </div>
                    <Progress value={stats.selEngagementRate} />
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <div className="text-sm font-medium text-muted-foreground">
                        Average Mood Rating
                      </div>
                      <div className="text-xl font-bold">{stats.averageMood.toFixed(1)} / 5</div>
                    </div>
                    <Link to={`/admin/schools/${id}/sel`}>
                      <Button variant="outline" size="sm">
                        SEL Dashboard
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Users</CardTitle>
                <Button size="sm">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Users
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                User management interface will display here. This would include student, teacher,
                and admin users associated with this school.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="classes" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Classes</CardTitle>
                <Button size="sm">
                  <Layers className="mr-2 h-4 w-4" />
                  Manage Classes
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                Class management interface will display here. This would include all classes,
                their teachers, and enrolled students.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interventions" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Interventions</CardTitle>
                <Button size="sm">
                  <BookOpen className="mr-2 h-4 w-4" />
                  View All Interventions
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                Intervention tracking and management interface will display here. This would
                include active interventions and their status.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sel" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>SEL Dashboard</CardTitle>
                <Button size="sm">
                  <BarChart4 className="mr-2 h-4 w-4" />
                  Full SEL Report
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                The SEL Dashboard will display here. This would include check-in analytics,
                mood trends, and SEL lesson completion metrics.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="welllens" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>WellLens Insights</CardTitle>
                <Button size="sm">
                  <BarChart4 className="mr-2 h-4 w-4" />
                  Advanced Analytics
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                The WellLens AI insights dashboard will display here. This would include
                risk levels, flagged students, and trend analysis.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SchoolProfilePage;
