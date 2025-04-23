
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { useTeacherMoodCheckIns } from '@/hooks/useTeacherMoodCheckIns';
import { Smile, Frown, Meh, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface MoodOption {
  value: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

interface TeacherMoodTrackerProps {
  studentId: string;
  studentName: string;
}

const TeacherMoodTracker: React.FC<TeacherMoodTrackerProps> = ({ studentId, studentName }) => {
  const { user } = useAuth();
  const { addTeacherMoodCheckIn } = useTeacherMoodCheckIns(studentId);
  
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [energyLevel, setEnergyLevel] = useState<number>(5);
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const moodOptions: MoodOption[] = [
    { value: 'happy', label: 'Happy', icon: <Smile className="h-8 w-8" />, color: 'bg-green-100 border-green-400 text-green-700' },
    { value: 'good', label: 'Good', icon: <ThumbsUp className="h-8 w-8" />, color: 'bg-blue-100 border-blue-400 text-blue-700' },
    { value: 'okay', label: 'Okay', icon: <Meh className="h-8 w-8" />, color: 'bg-yellow-100 border-yellow-400 text-yellow-700' },
    { value: 'sad', label: 'Sad', icon: <Frown className="h-8 w-8" />, color: 'bg-orange-100 border-orange-400 text-orange-700' },
    { value: 'stressed', label: 'Stressed', icon: <ThumbsDown className="h-8 w-8" />, color: 'bg-red-100 border-red-400 text-red-700' },
  ];

  const handleSubmit = async () => {
    if (!selectedMood) return;
    
    setIsSubmitting(true);
    
    await addTeacherMoodCheckIn({
      student_id: studentId,
      teacher_id: user?.id || '',
      mood_type: selectedMood,
      energy_level: energyLevel,
      notes: notes.trim() || undefined,
    });
    
    // Reset form
    setSelectedMood(null);
    setEnergyLevel(5);
    setNotes('');
    setIsSubmitting(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Teacher's Perception of Student Mood</CardTitle>
        <CardDescription>
          Record how you perceive {studentName}'s mood today
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-5 gap-2">
          {moodOptions.map((option) => (
            <div 
              key={option.value}
              className={`flex flex-col items-center p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                selectedMood === option.value 
                  ? `${option.color} border-2` 
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
              onClick={() => setSelectedMood(option.value)}
            >
              {option.icon}
              <span className="mt-1 text-sm font-medium">{option.label}</span>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Low Energy</span>
            <span>High Energy</span>
          </div>
          <Slider 
            value={[energyLevel]} 
            min={1} 
            max={10} 
            step={1}
            onValueChange={(values) => setEnergyLevel(values[0])}
          />
          <div className="flex justify-between">
            <span className="text-xs text-muted-foreground">1</span>
            <span className="text-xs text-muted-foreground">10</span>
          </div>
        </div>

        <Textarea
          placeholder="Optional notes about the student's mood or behavior"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="min-h-[100px]"
        />

        <Button 
          onClick={handleSubmit} 
          disabled={!selectedMood || isSubmitting} 
          className="w-full"
        >
          Record Student Mood
        </Button>
      </CardContent>
    </Card>
  );
};

export default TeacherMoodTracker;
