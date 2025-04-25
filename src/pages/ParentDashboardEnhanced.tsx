
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import PageHeader from "@/components/layout/PageHeader";
import ChildSelector from "./parent-dashboard-enhanced/ChildSelector";
import WellnessSummaryCard from "./parent-dashboard-enhanced/WellnessSummaryCard";
import ParentStatCardsRow from "./parent-dashboard-enhanced/ParentStatCardsRow";
import DashboardTabs from "./parent-dashboard-enhanced/DashboardTabs";
import ParentNav from "./parent-dashboard-enhanced/ParentNav";
import { getRiskColor } from "@/data/mockParentDashboard";
import { useChildManagement } from "@/hooks/useChildManagement";
import { RiskLevel } from "@/types/parent-dashboard";
import { Skeleton } from "@/components/ui/skeleton";

const ParentDashboardEnhanced = () => {
  const { user } = useAuth();
  const { selectedChild, selectedChildData, handleChildChange, children, isLoading } = useChildManagement();
  const [activeTab, setActiveTab] = useState<string>("overview");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

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
        title={`Welcome, ${user?.name?.split(" ")[0] || "Parent"}!`} 
        showBackButton={false}
      />
      
      <ParentNav />
      
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-medium">
          {isLoading ? (
            <Skeleton className="h-8 w-48" />
          ) : (
            selectedChild ? children.find(child => child.id === selectedChild)?.name + "'s Dashboard" : "Child Dashboard"
          )}
        </h2>
        <ChildSelector 
          childrenList={children} 
          selectedChild={selectedChild} 
          onChange={handleChildChange} 
        />
      </div>

      {isLoading ? (
        <div className="space-y-6">
          <Skeleton className="h-[200px] w-full" />
          <div className="grid gap-4 md:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-[100px]" />
            ))}
          </div>
          <Skeleton className="h-[400px] w-full" />
        </div>
      ) : (
        <>
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
              statusColor: getRiskColor(selectedChildData.behaviorRiskLevel as RiskLevel)
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
            getRiskColor={getRiskColor}
          />
        </>
      )}
    </div>
  );
};

export default ParentDashboardEnhanced;
