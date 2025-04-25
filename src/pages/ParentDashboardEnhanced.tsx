
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useSearchParams, useNavigate } from "react-router-dom";
import PageHeader from "@/components/layout/PageHeader";
import ChildSelector from "./parent-dashboard-enhanced/ChildSelector";
import WellnessSummaryCard from "./parent-dashboard-enhanced/WellnessSummaryCard";
import ParentStatCardsRow from "./parent-dashboard-enhanced/ParentStatCardsRow";
import OverviewTab from "./parent-dashboard-enhanced/OverviewTab";
import WellnessTab from "./parent-dashboard-enhanced/WellnessTab";
import AcademicsTab from "./parent-dashboard-enhanced/AcademicsTab";
import ResourcesTab from "./parent-dashboard-enhanced/ResourcesTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "@/components/ui/router";
import { ArrowLeft, ChevronRight } from "lucide-react";

const ParentDashboardEnhanced = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const router = useRouter();
  const [searchParams] = useSearchParams();
  const childParam = searchParams.get('child');
  
  const [selectedChild, setSelectedChild] = useState<string>(
    childParam || (user?.children?.[0]?.id || "child1")
  );
  const [activeTab, setActiveTab] = useState<string>("overview");

  useEffect(() => {
    if (childParam !== selectedChild && selectedChild) {
      navigate(`/parent-dashboard-enhanced?child=${selectedChild}`, { replace: true });
    }
  }, [selectedChild, childParam, navigate]);

  const handleChildChange = (childId: string) => {
    setSelectedChild(childId);
    toast.success(`Viewing ${children.find(child => child.id === childId)?.name}'s information`);
  };

  const children = [
    {
      id: "child1",
      name: "Alex Johnson",
      grade: "10th Grade",
      school: "Washington High School",
      recentMood: "Good",
      moodTrend: "stable",
      attendance: 92,
      attendanceTrend: "up",
      checkIns: 14,
      academicStanding: "On Track",
      behaviorRisk: 38,
      behaviorRiskLevel: "low",
      behaviorTrend: "down",
      recentNotes: [
        { date: "Apr 21, 2025", note: "Great participation in class discussion today." },
        { date: "Apr 19, 2025", note: "Completed all assignments for the week." },
      ],
      alerts: 0
    },
    {
      id: "child2",
      name: "Jordan Johnson",
      grade: "7th Grade",
      school: "Lincoln Middle School",
      recentMood: "Okay",
      moodTrend: "down",
      attendance: 85,
      attendanceTrend: "down",
      checkIns: 10,
      academicStanding: "Needs Support",
      behaviorRisk: 65,
      behaviorRiskLevel: "medium",
      behaviorTrend: "up",
      recentNotes: [
        { date: "Apr 20, 2025", note: "Struggled to stay focused in math class." },
        { date: "Apr 18, 2025", note: "Missing one homework assignment this week." },
      ],
      alerts: 1
    }
  ];

  const selectedChildData = children.find(child => child.id === selectedChild) || children[0];

  const getHomeStrategies = () => {
    if (selectedChildData.behaviorRiskLevel === "medium" || selectedChildData.behaviorRiskLevel === "high") {
      return [
        "Schedule regular check-in conversations with your child about how school is going",
        "Create a consistent homework routine with a dedicated quiet space",
        "Acknowledge small improvements and celebrate successes together",
        "Maintain consistent communication with teachers through the messaging system",
        "Practice mindfulness activities together as a family (see Resources tab)"
      ];
    }
    return [
      "Continue your current supportive approach",
      "Encourage your child to share their daily school experiences",
      "Maintain the consistent homework routine",
      "Participate in school events when possible"
    ];
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-amber-100 text-amber-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <span className="text-green-500">↑</span>;
    if (trend === "down") return <span className="text-red-500">↓</span>;
    return null;
  };

  const getWellnessSummary = () => {
    if (selectedChildData.behaviorRiskLevel === "high") {
      return {
        title: "Needs Additional Support",
        description: "Our team has noticed some challenges that may need attention.",
        statusColor: "text-red-500"
      };
    }
    if (selectedChildData.behaviorRiskLevel === "medium") {
      return {
        title: "Some Areas Need Support",
        description: "Your child is doing well in some areas but could use extra support in others.",
        statusColor: "text-amber-500"
      };
    }
    return {
      title: "Doing Well Overall",
      description: "Your child is showing positive engagement and wellness at school.",
      statusColor: "text-green-500"
    };
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  // Navigation links for quick access to other parent pages
  const parentNavLinks = [
    { name: "Child Activity", href: "/child-activity" },
    { name: "Messages", href: "/messages" },
    { name: "Resources", href: "/parent-resources" },
    { name: "Privacy Settings", href: "/privacy-settings" }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title={`Welcome, ${user?.name?.split(" ")[0]}!`} 
        showBackButton={false}
      />
      
      {/* Navigation breadcrumbs and quick links */}
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-4">
        <div className="text-sm flex items-center text-muted-foreground">
          <span className="font-medium text-foreground">Parent Dashboard</span>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          {parentNavLinks.map((link, index) => (
            <Button 
              key={index} 
              variant="outline" 
              size="sm" 
              className="text-xs md:text-sm"
              onClick={() => navigate(link.href)}
            >
              {link.name}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-medium">{selectedChild ? children.find(child => child.id === selectedChild)?.name + "'s Dashboard" : "Child Dashboard"}</h2>
        <ChildSelector 
          childrenList={children} 
          selectedChild={selectedChild} 
          onChange={handleChildChange} 
        />
      </div>

      <WellnessSummaryCard
        childData={selectedChildData}
        getWellnessSummary={getWellnessSummary}
        getTrendIcon={getTrendIcon}
      />

      <ParentStatCardsRow selectedChildData={selectedChildData} />

      <Tabs defaultValue="overview" value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="wellness">Mood & Wellness</TabsTrigger>
          <TabsTrigger value="academics">Academics</TabsTrigger>
          <TabsTrigger value="resources">Family Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 pt-4">
          <OverviewTab selectedChildData={selectedChildData} getHomeStrategies={getHomeStrategies} />
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events & Reminders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Parent-Teacher Conference</p>
                      <p className="text-sm text-muted-foreground">Thursday, May 2nd at 4:00 PM</p>
                    </div>
                    <Button size="sm">Add to Calendar</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Field Trip Permission Slip</p>
                      <p className="text-sm text-muted-foreground">Due by Friday, May 3rd</p>
                    </div>
                    <Button size="sm" variant="outline">Sign Online</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="wellness" className="space-y-6 pt-4">
          <WellnessTab selectedChildData={selectedChildData} getRiskColor={getRiskColor} />
        </TabsContent>

        <TabsContent value="academics" className="space-y-6 pt-4">
          <AcademicsTab selectedChildData={selectedChildData} />
        </TabsContent>

        <TabsContent value="resources" className="space-y-6 pt-4">
          <ResourcesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ParentDashboardEnhanced;
