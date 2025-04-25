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
import { mockParentDashboardData } from "@/data/mockParentDashboard";
import { Child } from "@/types/parent-dashboard";

const ParentDashboardEnhanced = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const childParam = searchParams.get('child');
  
  const [selectedChild, setSelectedChild] = useState<string>(
    childParam || (user?.children?.[0]?.id || mockParentDashboardData.children[0].id)
  );
  const [activeTab, setActiveTab] = useState<string>("overview");

  useEffect(() => {
    if (childParam !== selectedChild && selectedChild) {
      navigate(`/parent-dashboard-enhanced?child=${selectedChild}`, { replace: true });
    }
  }, [selectedChild, childParam, navigate]);

  const handleChildChange = (childId: string) => {
    setSelectedChild(childId);
    const selectedChild = mockParentDashboardData.children.find(child => child.id === childId);
    if (selectedChild) {
      toast.success(`Viewing ${selectedChild.name}'s information`);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const selectedChildData = mockParentDashboardData.children.find(
    child => child.id === selectedChild
  ) || mockParentDashboardData.children[0];

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
          {selectedChild ? mockParentDashboardData.children.find(child => child.id === selectedChild)?.name + "'s Dashboard" : "Child Dashboard"}
        </h2>
        <ChildSelector 
          childrenList={mockParentDashboardData.children} 
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
