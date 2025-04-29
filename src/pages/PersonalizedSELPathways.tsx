
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SELLesson } from '@/types/roles';

// Mock component to replace the missing RecommendedPathwaysGrid
const RecommendedPathwaysGrid = ({ onLessonClick, studentId }: { onLessonClick: (lesson: SELLesson) => void, studentId: string }) => {
  // Sample data for demonstration
  const recommendedLessons: SELLesson[] = [
    {
      id: '1',
      title: 'Understanding Emotions',
      description: 'Learn to identify and understand different emotions',
      competencyArea: 'Self-Awareness',
      recommendedMoods: ['Anxious', 'Confused'],
      contentUrl: 'https://example.com/lessons/emotions',
      activityType: 'Interactive',
      estimatedDuration: 30,
      duration: 30, // Added for compatibility
      evidenceBase: 'CASEL Framework',
      gradeRange: ['6', '7', '8'],
      culturalFocus: 'Universal',
      createdBy: 'SEL Expert Team',
      ageRange: '11-14',
      caselCompetency: 'Self-Awareness'
    },
    {
      id: '2',
      title: 'Mindfulness Practice',
      description: 'Daily mindfulness exercises for stress reduction',
      competencyArea: 'Self-Management',
      recommendedMoods: ['Stressed', 'Overwhelmed'],
      contentUrl: 'https://example.com/lessons/mindfulness',
      activityType: 'Practice',
      estimatedDuration: 15,
      duration: 15, // Added for compatibility
      evidenceBase: 'Mindfulness-Based Stress Reduction',
      gradeRange: ['6', '7', '8'],
      culturalFocus: 'Universal',
      createdBy: 'Mindfulness Institute',
      ageRange: '11-14',
      caselCompetency: 'Self-Management'
    }
  ];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {recommendedLessons.map((lesson) => (
        <Card 
          key={lesson.id}
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onLessonClick(lesson)}
        >
          <CardHeader>
            <CardTitle>{lesson.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{lesson.description}</p>
            <div className="mt-2 flex justify-between text-sm">
              <span>{lesson.competencyArea}</span>
              <span>{lesson.duration} minutes</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Mock service to replace the missing lessonService
const assignLesson = (lesson: SELLesson) => {
  console.log('Assigning lesson:', lesson);
  // In a real implementation, this would call an API
  return Promise.resolve({ success: true });
};

const PersonalizedSELPathways = () => {
  const [studentId, setStudentId] = useState<string>('');
  const [lessonData, setLessonData] = useState<any[]>([]);

  // Create a compatibility function to handle assignment with consistent types
  const handleLessonAssign = (lesson: SELLesson) => {
    // Convert between types if necessary
    const standardizedLesson = {
      ...lesson,
      duration: lesson.estimatedDuration || 0,
    };
    
    // Call the assign function with compatible type
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
