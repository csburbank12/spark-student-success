
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { Clock, BookOpen, Award } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

export const SELRecommendedSection: React.FC = () => {
  const { user } = useAuth();
  const [viewAll, setViewAll] = useState(false);
  
  const { data: selActivities, isLoading } = useQuery({
    queryKey: ['sel-recommendations', user?.id],
    queryFn: async () => {
      // In a real app, this would fetch from Supabase
      // For demo purposes, returning mock data
      return [
        {
          id: '1',
          title: 'Emotional Awareness Check-In',
          description: 'A quick exercise to identify and name your current emotions',
          duration: 5,
          tags: ['Self-Awareness', 'Emotional Literacy'],
          isAssigned: true,
          dueDate: '2025-05-01'
        },
        {
          id: '2',
          title: 'Stress-Busting Breathing Technique',
          description: 'Learn a simple breathing technique to reduce stress',
          duration: 3,
          tags: ['Self-Management', 'Stress Reduction'],
          isAssigned: false
        },
        {
          id: '3',
          title: 'Active Listening Practice',
          description: 'Improve your social relationships through better listening',
          duration: 10,
          tags: ['Social Awareness', 'Communication'],
          isAssigned: false
        },
        {
          id: '4',
          title: 'Gratitude Journal Entry',
          description: 'Strengthen positive thinking by noting what you're grateful for',
          duration: 5,
          tags: ['Positive Mindset', 'Well-being'],
          isAssigned: true,
          dueDate: '2025-04-30'
        },
        {
          id: '5',
          title: 'Conflict Resolution Strategies',
          description: 'Practice resolving disagreements in a healthy way',
          duration: 15,
          tags: ['Relationship Skills', 'Problem Solving'],
          isAssigned: false
        }
      ];
    },
    refetchOnWindowFocus: false
  });

  const displayActivities = viewAll ? selActivities : selActivities?.slice(0, 3);
  
  const handleStartActivity = (activityId: string, activityTitle: string) => {
    // In a real app, this would update the database
    toast.success(`Starting "${activityTitle}"`, {
      description: "Your progress will be saved automatically."
    });
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!selActivities?.length) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BookOpen className="mr-2 h-5 w-5 text-primary" />
          <span>SEL Activities</span>
        </CardTitle>
        <CardDescription>
          Activities to support your social and emotional growth
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayActivities?.map((activity) => (
            <Card key={activity.id} className="overflow-hidden">
              <div className="p-4 border-l-4 border-primary">
                <div className="flex justify-between">
                  <div className="space-y-1">
                    <h3 className="font-medium">{activity.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {activity.description}
                    </p>
                  </div>
                  {activity.isAssigned && (
                    <Badge variant="outline" className="ml-2 h-fit">
                      Assigned
                    </Badge>
                  )}
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-4 w-4" />
                    <span>{activity.duration} min</span>
                    
                    {activity.dueDate && (
                      <span className="ml-3">
                        Due: {new Date(activity.dueDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => handleStartActivity(activity.id, activity.title)}
                  >
                    Start
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
      {selActivities.length > 3 && (
        <CardFooter>
          <Button 
            variant="ghost" 
            className="w-full" 
            onClick={() => setViewAll(!viewAll)}
          >
            {viewAll ? "Show Less" : "View All Activities"}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
