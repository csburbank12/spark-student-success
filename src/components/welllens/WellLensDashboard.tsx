import React from 'react';
import { StudentMoodAnalysis } from '@/components/predictive-support/StudentMoodAnalysis';

const WellLensDashboard = () => {
  const selectedStudent = "studentId"; // Replace with actual logic to get the selected student ID

  return (
    <div>
      <h1>WellLens Dashboard</h1>
      <StudentMoodAnalysis 
        studentId={selectedStudent} 
        moodTrends={[
          { date: '2025-04-22', mood: 7, energy: 6 },
          { date: '2025-04-23', mood: 6, energy: 5 },
          { date: '2025-04-24', mood: 8, energy: 7 },
          { date: '2025-04-25', mood: 7, energy: 8 },
          { date: '2025-04-26', mood: 9, energy: 8 },
          { date: '2025-04-27', mood: 8, energy: 7 },
          { date: '2025-04-28', mood: 9, energy: 9 },
        ]} 
      />
    </div>
  );
};

export default WellLensDashboard;
