
import React from "react";
import MoodChart from "./student-dashboard/MoodChart";
import StatCardsRow from "./student-dashboard/StatCardsRow";
import SuggestionList from "./student-dashboard/SuggestionList";
import AchievementGrid from "./student-dashboard/AchievementGrid";
import MoodComparisonChart from "./student-dashboard/MoodComparisonChart";
import PeerUpliftNotes from "./student-dashboard/PeerUpliftNotes";
import { SELRecommendedSection } from "@/components/student/SELRecommendedSection";
import { useAuth } from "@/contexts/AuthContext";

const StudentDashboardEnhanced = () => {
  const { user } = useAuth();
  
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold">
          Welcome back, {user?.name?.split(" ")[0]}!
        </h2>
      </div>
      
      <StatCardsRow />
      <div className="grid md:grid-cols-2 gap-8">
        <MoodChart />
        <MoodComparisonChart />
      </div>
      
      {/* Added SEL Recommendations Section */}
      <SELRecommendedSection />
      
      <SuggestionList />
      <AchievementGrid />
      <PeerUpliftNotes />
    </div>
  );
};

export default StudentDashboardEnhanced;
