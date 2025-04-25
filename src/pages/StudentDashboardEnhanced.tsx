
import React, { useState, useEffect } from "react";
import MoodChart from "./student-dashboard/MoodChart";
import StatCardsRow from "./student-dashboard/StatCardsRow";
import SuggestionList from "./student-dashboard/SuggestionList";
import AchievementGrid from "./student-dashboard/AchievementGrid";
import MoodComparisonChart from "./student-dashboard/MoodComparisonChart";
import PeerUpliftNotes from "./student-dashboard/PeerUpliftNotes";
import { SELRecommendedSection } from "@/components/student/SELRecommendedSection";
import { WelcomeMessage } from "@/components/ui/welcome-message/WelcomeMessage";
import { AchievementNotification } from "@/components/ui/achievement-notification/AchievementNotification";
import { useAchievements } from "@/hooks/useAchievements";

const StudentDashboardEnhanced = () => {
  const { 
    recentlyUnlocked, 
    showCelebration, 
    clearCelebration 
  } = useAchievements();
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate loading for better UX
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }
  
  return (
    <>
      {showCelebration && recentlyUnlocked && (
        <AchievementNotification 
          title={recentlyUnlocked.title}
          description={recentlyUnlocked.description}
          isOpen={showCelebration}
          onClose={clearCelebration}
        />
      )}
      
      <div className="space-y-8">
        <WelcomeMessage />
        
        <div className="fade-slide-up opacity-0">
          <StatCardsRow />
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 fade-slide-up opacity-0 delay-100">
          <MoodChart />
          <MoodComparisonChart />
        </div>
        
        <div className="fade-slide-up opacity-0 delay-200">
          <SELRecommendedSection />
        </div>
        
        <div className="fade-slide-up opacity-0 delay-200">
          <SuggestionList />
        </div>
        
        <div className="fade-slide-up opacity-0 delay-300">
          <AchievementGrid />
        </div>
        
        <div className="fade-slide-up opacity-0 delay-300">
          <PeerUpliftNotes />
        </div>
      </div>
    </>
  );
};

export default StudentDashboardEnhanced;
