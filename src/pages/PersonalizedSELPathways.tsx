import React, { useState } from 'react';
import { RecommendedPathwaysGrid } from '@/components/RecommendedPathwaysGrid';
import { assignLesson } from '@/services/lessonService';

const PersonalizedSELPathways = () => {
  const [studentId, setStudentId] = useState<string>('');
  const [lessonData, setLessonData] = useState<any[]>([]); // Replace with actual type

  // Create a compatibility function to handle assignment with consistent types
  const handleLessonAssign = (lesson: any) => {
    // Convert between types if necessary
    const standardizedLesson = {
      ...lesson,
      duration: lesson.estimatedDuration || 0,
    };
    
    // Call the original assign function with compatible type
    assignLesson(standardizedLesson);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Personalized SEL Pathways</h1>
      <RecommendedPathwaysGrid 
        onLessonClick={handleLessonAssign} 
        studentId={studentId} 
      />
    </div>
  );
};

export default PersonalizedSELPathways;
