
import React from "react";
import MoodChart from "./student-dashboard/MoodChart";
import StatCardsRow from "./student-dashboard/StatCardsRow";
import SuggestionList from "./student-dashboard/SuggestionList";
import AchievementGrid from "./student-dashboard/AchievementGrid";
import MoodComparisonChart from "./student-dashboard/MoodComparisonChart";
import PeerUpliftNotes from "./student-dashboard/PeerUpliftNotes";

const StudentDashboardEnhanced = () => {
  return (
    <div className="space-y-8">
      <StatCardsRow />
      <div className="grid md:grid-cols-2 gap-8">
        <MoodChart />
        <MoodComparisonChart />
      </div>
      <SuggestionList />
      <AchievementGrid />
      <PeerUpliftNotes />
    </div>
  );
};

export default StudentDashboardEnhanced;
