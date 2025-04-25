import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useSearchParams, useNavigate } from "react-router-dom";
import PageHeader from "@/components/layout/PageHeader";
import ChildSelector from "./parent-dashboard-enhanced/ChildSelector";
import WellnessSummaryCard from "./parent-dashboard-enhanced/WellnessSummaryCard";
import ParentStatCardsRow from "./parent-dashboard-enhanced/ParentStatCardsRow";
import DashboardTabs from "./parent-dashboard-enhanced/DashboardTabs";
import ParentNav from "./parent-dashboard-enhanced/ParentNav";
import { toast } from "sonner";

const ParentDashboardEnhanced = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
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

  const handleTabChange = (value: string) => {
    setActiveTab(value);
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

  return (
    <div className="space-y-6">
      <PageHeader 
        title={`Welcome, ${user?.name?.split(" ")[0]}!`} 
        showBackButton={false}
      />
      
      <ParentNav />
      
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-medium">
          {selectedChild ? children.find(child => child.id === selectedChild)?.name + "'s Dashboard" : "Child Dashboard"}
        </h2>
        <ChildSelector 
          childrenList={children} 
          selectedChild={selectedChild} 
          onChange={handleChildChange} 
        />
      </div>

      <WellnessSummaryCard
        childData={selectedChildData}
        getWellnessSummary={() => ({
          title: selectedChildData.behaviorRiskLevel === "high" 
            ? "Needs Additional Support"
            : selectedChildData.behaviorRiskLevel === "medium"
            ? "Some Areas Need Support"
            : "Doing Well Overall",
          description: selectedChildData.behaviorRiskLevel === "high"
            ? "Our team has noticed some challenges that may need attention."
            : selectedChildData.behaviorRiskLevel === "medium"
            ? "Your child is doing well in some areas but could use extra support in others."
            : "Your child is showing positive engagement and wellness at school.",
          statusColor: selectedChildData.behaviorRiskLevel === "high"
            ? "text-red-500"
            : selectedChildData.behaviorRiskLevel === "medium"
            ? "text-amber-500"
            : "text-green-500"
        })}
        getTrendIcon={(trend) => {
          if (trend === "up") return <span className="text-green-500">↑</span>;
          if (trend === "down") return <span className="text-red-500">↓</span>;
          return null;
        }}
      />

      <ParentStatCardsRow selectedChildData={selectedChildData} />

      <DashboardTabs
        activeTab={activeTab}
        onTabChange={handleTabChange}
        selectedChildData={selectedChildData}
        getHomeStrategies={getHomeStrategies}
      />
    </div>
  );
};

export default ParentDashboardEnhanced;
